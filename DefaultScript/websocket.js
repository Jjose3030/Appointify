'use strict';

var WS_URL = 'https://appointyify-api.onrender.com';

var socket = null;
var wsCurrentBookingId = null;
var wsCurrentUserRole = 'client';

var wsRetryTimer = null;
var wsRetryCount = 0;
var WS_MAX_RETRIES = 3;

function connectToChat() {
    var token = localStorage.getItem('token');
    if (!token || token === 'undefined' || token === 'null') return;

    if (socket && socket.connected) return;

    // Disconnect stale socket before creating a new one
    if (socket) {
        socket.off();
        socket.disconnect();
        socket = null;
    }

    try {
        var userStr = localStorage.getItem('user');
        if (userStr) {
            var parsed = JSON.parse(userStr);
            if (parsed.role === 'business') {
                wsCurrentUserRole = 'business';
            }
        }
    } catch (e) { }

    socket = io(WS_URL, {
        auth: { token: token },
        reconnection: false  // we manage retries manually
    });

    socket.on('connect', function () {
        wsRetryCount = 0;
    });

    socket.on('connect_error', function (err) {
        var msg = (err && err.message) ? err.message.toLowerCase() : '';
        // Do not retry on auth errors
        if (msg.includes('unauthorized') || msg.includes('authentication') || msg.includes('forbidden') || msg.includes('invalid token')) {
            return;
        }
        if (wsRetryCount >= WS_MAX_RETRIES) return;
        wsRetryCount++;
        if (wsRetryTimer) clearTimeout(wsRetryTimer);
        wsRetryTimer = setTimeout(function () {
            connectToChat();
        }, 5000);
    });

    socket.on('disconnect', function () { });

    socket.on('error', function (error) {
        var msg = (error && error.message) ? error.message : String(error || '');
        // Suppress noisy auth errors from console in production
        if (!msg.toLowerCase().includes('unauthorized')) {
            console.error('WebSocket error:', msg);
        }
    });

    socket.on('newMessage', function (message) {
        displayIncomingMessage(message);
        // Dispatch a custom DOM event so any page script can react
        try {
            document.dispatchEvent(new CustomEvent('ws:message', { detail: message }));
        } catch (e) { }
    });

    socket.on('messagesMarkedAsRead', function (data) { });
}

function openChat(bookingId) {
    if (!socket) return;
    wsCurrentBookingId = bookingId;
    socket.emit('joinBooking', bookingId);
}

function sendMessage(text) {
    if (!text) {
        var inputField = document.getElementById('message-input');
        if (inputField) text = inputField.value;
    }

    if (!text || !text.trim()) return;

    if (!socket || !wsCurrentBookingId) return;

    var messageData = {
        bookingId: wsCurrentBookingId,
        content: text.trim(),
        senderType: wsCurrentUserRole
    };

    socket.emit('sendMessage', messageData);
}

function markMessagesAsReadSocket(messageIds) {
    if (!socket || !messageIds || messageIds.length === 0) return;
    socket.emit('markAsRead', { messageIds: messageIds });
}

function displayIncomingMessage(message) {
    var container = document.getElementById('chat-messages-container');
    if (!container) return;

    var currentUserId = null;
    try {
        var userStr = localStorage.getItem('user');
        if (userStr) {
            var parsed = JSON.parse(userStr);
            currentUserId = parsed._id || parsed.id;
        }
    } catch (e) { }

    var senderId = message.sender;
    if (typeof message.sender === 'object' && message.sender !== null) {
        senderId = message.sender._id || message.sender.id;
    }

    var isMine = false;
    if (senderId && currentUserId) {
        isMine = senderId === currentUserId;
    } else if (message.senderType === wsCurrentUserRole) {
        isMine = true;
    }

    if (isMine) return;

    var msgDiv = document.createElement('div');
    var msgClass = (message.senderType === 'client') ? 'customer' : 'bus-owner';
    msgDiv.className = 'message-show ' + msgClass;

    var textP = document.createElement('p');
    textP.className = 'message-text';
    textP.textContent = message.content || '';

    var timeSpan = document.createElement('span');
    timeSpan.className = 'message-time';
    var time = '';
    if (message.createdAt) {
        var d = new Date(message.createdAt);
        if (!isNaN(d.getTime())) {
            time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
    }
    timeSpan.textContent = time;

    msgDiv.appendChild(textP);
    msgDiv.appendChild(timeSpan);

    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;

    if (message._id) {
        markMessagesAsReadSocket([message._id]);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    connectToChat();
});
