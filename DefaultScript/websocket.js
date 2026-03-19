'use strict';

var WS_URL = 'https://appointyify-api.onrender.com';

var socket = null;
var wsCurrentBookingId = null;
var wsCurrentUserRole = 'client';
var wsJoinedBookingId = null;
var wsPendingMessages = [];

var wsRetryTimer = null;
var wsRetryCount = 0;
var WS_MAX_RETRIES = 3;

function normalizeWsSenderRole(role) {
    var value = (role || '').toString().toLowerCase();
    if (value === 'business' || value === 'vendor' || value === 'provider') return 'business';
    if (value === 'client' || value === 'customer' || value === 'user') return 'client';
    return value;
}

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
        withCredentials: true,
        reconnection: false  // we manage retries manually
    });

    socket.on('connect', function () {
        wsRetryCount = 0;
        wsJoinedBookingId = null;
        if (wsCurrentBookingId) {
            ensureJoinedBooking(wsCurrentBookingId);
        }
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

    socket.on('joinedBooking', function (data) {
        try {
            document.dispatchEvent(new CustomEvent('ws:joinedBooking', { detail: data }));
        } catch (e) { }
    });

    socket.on('messagesMarkedAsRead', function (data) { });
    socket.on('bookingCreated', function (booking) {
        try {
            document.dispatchEvent(new CustomEvent('ws:bookingCreated', { detail: booking }));
        } catch (e) { }
    });
    socket.on('bookingUpdated', function (booking) {
        try {
            document.dispatchEvent(new CustomEvent('ws:bookingUpdated', { detail: booking }));
        } catch (e) { }
    });
    socket.on('socketError', function (error) {
        console.error('WebSocket socketError:', error);
    });
}

function openChat(bookingId) {
    wsCurrentBookingId = bookingId;
    wsJoinedBookingId = null;
    if (!socket) {
        connectToChat();
        return;
    }
    ensureJoinedBooking(bookingId);
}

function wsSendMessage(text) {
    if (!text) {
        var inputField = document.getElementById('message-input');
        if (inputField) text = inputField.value;
    }

    if (!text || !text.trim()) return;

    if (!socket || !wsCurrentBookingId) return;

    var messageData = {
        bookingId: wsCurrentBookingId,
        content: text.trim()
    };

    if (wsJoinedBookingId === wsCurrentBookingId) {
        socket.emit('sendMessage', messageData);
        return;
    }

    wsPendingMessages.push(messageData);
    ensureJoinedBooking(wsCurrentBookingId);
}

function markMessagesAsReadSocket(bookingId) {
    if (!socket || !bookingId) return;
    socket.emit('markAsRead', { bookingId: bookingId });
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
    var senderRole = normalizeWsSenderRole(message.senderType || message.role);

    if (senderId && currentUserId) {
        isMine = senderId === currentUserId;
    } else if (senderRole === wsCurrentUserRole) {
        isMine = true;
    }

    if (isMine) return;

    var msgDiv = document.createElement('div');
    var msgClass = (senderRole === 'client') ? 'customer' : 'bus-owner';
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

    if (wsCurrentBookingId) {
        markMessagesAsReadSocket(wsCurrentBookingId);
    }
}

function ensureJoinedBooking(bookingId, callback) {
    if (!socket || !bookingId) return;

    if (!socket.connected) {
        wsCurrentBookingId = bookingId;
        return;
    }

    if (wsJoinedBookingId === bookingId) {
        if (typeof callback === 'function') callback(true);
        flushPendingMessages();
        return;
    }

    socket.emit('joinBooking', bookingId, function (ack) {
        var joined = !ack || ack.success !== false;
        if (joined) {
            wsJoinedBookingId = bookingId;
            flushPendingMessages();
        }
        if (typeof callback === 'function') callback(joined, ack);
    });
}

function flushPendingMessages() {
    if (!socket || !socket.connected || !wsCurrentBookingId || wsJoinedBookingId !== wsCurrentBookingId) return;

    var queue = wsPendingMessages.slice();
    wsPendingMessages = [];

    queue.forEach(function (messageData) {
        if (messageData && messageData.bookingId === wsCurrentBookingId) {
            socket.emit('sendMessage', messageData);
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    connectToChat();
});

window.connectToChat = connectToChat;
window.openChat = openChat;
window.wsSendMessage = wsSendMessage;
window.sendMessage = wsSendMessage;
window.markMessagesAsReadSocket = markMessagesAsReadSocket;
