'use strict';

const API_URL = 'https://appointyify-api.vercel.app';

function getAuthHeaders() {
    const token = localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json' };
    // Only add Authorization if token exists and is not the literal string "undefined"
    if (token && token !== 'undefined' && token !== 'null') {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
}

function getToken() {
    const token = localStorage.getItem('token');
    if (!token || token === 'undefined' || token === 'null') return null;
    return token;
}

async function handleResponse(response) {
    // Safely parse body — some endpoints return 204 No Content or HTML error pages
    let data = null;
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
        try { data = await response.json(); } catch (e) { data = null; }
    } else if (!response.ok) {
        // Non-JSON error body — read as text for the message
        try { const txt = await response.text(); data = { msg: txt || 'Request failed' }; } catch (e) { data = { msg: 'Request failed' }; }
    }

    if (!response.ok) {
        // Token expired or invalid — clear session and redirect to login
        if (response.status === 401) {
            const storedUser = (() => { try { return JSON.parse(localStorage.getItem('user') || '{}'); } catch (e) { return {}; } })();
            const isBusiness = storedUser.role === 'business';
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            const loginPage = isBusiness ? '/Auth/bussiness-sign-in.html' : '/Auth/user-sign-in.html';
            window.location.replace(loginPage);
        }
        throw {
            status: response.status,
            message: (data && (data.msg || data.message)) || ('Request failed (' + response.status + ')'),
            errors: (data && data.errors) || []
        };
    }

    return data;
}

async function register(userData) {
    try {
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Register error:', error);
        throw error;
    }
}

async function login(credentials) {
    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

async function getCurrentUser() {
    try {
        const response = await fetch(`${API_URL}/api/auth/me`, {
            method: 'GET',
            headers: getAuthHeaders()
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Get current user error:', error);
        throw error;
    }
}

async function updateProfile(updates) {
    try {
        const response = await fetch(`${API_URL}/api/auth/profile`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(updates)
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Update profile error:', error);
        throw error;
    }
}

async function updateProfileWithImage(updates, imageFile) {
    try {
        var formData = new FormData();
        formData.append('name', updates.name || '');
        formData.append('email', updates.email || '');
        formData.append('phone', updates.phone || '');
        formData.append('address', updates.address || '');
        if (imageFile) formData.append('image', imageFile);

        var token = localStorage.getItem('token');
        var headers = token ? { 'Authorization': 'Bearer ' + token } : {};

        const response = await fetch(`${API_URL}/api/auth/profile`, {
            method: 'PUT',
            headers: headers,
            body: formData
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Update profile with image error:', error);
        throw error;
    }
}

async function createBusiness(businessData) {
    try {
        const response = await fetch(`${API_URL}/api/businesses`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(businessData)
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Create business error:', error);
        throw error;
    }
}

async function getBusinesses(filters = {}) {
    try {
        const params = new URLSearchParams();
        if (filters.category) params.append('category', filters.category);
        if (filters.search) params.append('search', filters.search);
        if (filters.isActive !== undefined) params.append('isActive', filters.isActive);

        const url = `${API_URL}/api/businesses${params.toString() ? '?' + params.toString() : ''}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Get businesses error:', error);
        throw error;
    }
}

async function getBusinessById(businessId) {
    try {
        const response = await fetch(`${API_URL}/api/businesses/${businessId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Get business error:', error);
        throw error;
    }
}

async function updateBusiness(businessId, updates) {
    try {
        const response = await fetch(`${API_URL}/api/businesses/${businessId}`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify(updates)
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Update business error:', error);
        throw error;
    }
}

async function deleteBusiness(businessId) {
    try {
        const response = await fetch(`${API_URL}/api/businesses/${businessId}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Delete business error:', error);
        throw error;
    }
}

async function getMyBusiness() {
    try {
        const response = await fetch(`${API_URL}/api/businesses/my-business`, {
            method: 'GET',
            cache: 'no-store',
            headers: getAuthHeaders()
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Get my business error:', error);
        throw error;
    }
}

async function createBooking(bookingData) {
    try {
        var hasSampleFile = bookingData && bookingData.sample && typeof FormData !== 'undefined' && typeof File !== 'undefined' && bookingData.sample instanceof File;
        var headers = getAuthHeaders();
        var body = null;

        if (hasSampleFile) {
            var formData = new FormData();
            formData.append('business', bookingData.business || '');
            formData.append('date', bookingData.date || '');
            formData.append('startTime', bookingData.startTime || '');
            formData.append('note', bookingData.note || '');
            formData.append('serviceType', bookingData.serviceType || '');
            formData.append('phone', bookingData.phone || '');
            formData.append('location', bookingData.location || '');
            formData.append('addressDirection', bookingData.addressDirection || '');
            formData.append('budget', bookingData.budget || '');
            formData.append('sample', bookingData.sample);
            delete headers['Content-Type'];
            body = formData;
        } else {
            body = JSON.stringify(bookingData);
        }

        const response = await fetch(`${API_URL}/api/bookings`, {
            method: 'POST',
            headers: headers,
            body: body
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Create booking error:', error);
        throw error;
    }
}

async function getMyBookings(filters = {}) {
    try {
        const params = new URLSearchParams();
        if (filters.status) params.append('status', filters.status);
        if (filters.startDate) params.append('startDate', filters.startDate);
        if (filters.endDate) params.append('endDate', filters.endDate);

        const url = `${API_URL}/api/bookings${params.toString() ? '?' + params.toString() : ''}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: getAuthHeaders()
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Get bookings error:', error);
        throw error;
    }
}

async function getBookingById(bookingId) {
    try {
        const response = await fetch(`${API_URL}/api/bookings/${bookingId}`, {
            method: 'GET',
            headers: getAuthHeaders()
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Get booking error:', error);
        throw error;
    }
}

async function updateBooking(bookingId, updates) {
    try {
        const response = await fetch(`${API_URL}/api/bookings/${bookingId}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(updates)
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Update booking error:', error);
        throw error;
    }
}

async function cancelBooking(bookingId) {
    try {
        const response = await fetch(`${API_URL}/api/bookings/${bookingId}/cancel`, {
            method: 'PUT',
            headers: getAuthHeaders()
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Cancel booking error:', error);
        throw error;
    }
}

async function getBusinessBookings(businessId, filters = {}) {
    try {
        const params = new URLSearchParams();
        if (filters.status) params.append('status', filters.status);
        if (filters.date) params.append('date', filters.date);

        const url = `${API_URL}/api/bookings/business/${businessId}${params.toString() ? '?' + params.toString() : ''}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: getAuthHeaders()
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Get business bookings error:', error);
        throw error;
    }
}

async function checkAvailability(businessId, date) {
    try {
        const response = await fetch(`${API_URL}/api/bookings/availability/${businessId}?date=${date}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Check availability error:', error);
        throw error;
    }
}

async function getMessages(bookingId) {
    try {
        const response = await fetch(`${API_URL}/api/messages/${bookingId}`, {
            method: 'GET',
            headers: getAuthHeaders()
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Get messages error:', error);
        throw error;
    }
}

async function sendMessage(messageData) {
    try {
        var payload = {
            bookingId: messageData && messageData.bookingId,
            content: messageData && messageData.content
        };
        const response = await fetch(`${API_URL}/api/messages`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(payload)
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Send message error:', error);
        throw error;
    }
}

async function markMessagesAsRead(messageIds) {
    try {
        const response = await fetch(`${API_URL}/api/messages/read`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({ messageIds })
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Mark as read error:', error);
        throw error;
    }
}

async function getConversations() {
    try {
        const response = await fetch(`${API_URL}/api/messages/conversations`, {
            method: 'GET',
            headers: getAuthHeaders()
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Get conversations error:', error);
        throw error;
    }
}

async function getBusinessConversations(businessId) {
    try {
        const response = await fetch(`${API_URL}/api/messages/business/${businessId}/conversations`, {
            method: 'GET',
            headers: getAuthHeaders()
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Get business conversations error:', error);
        throw error;
    }
}

async function getAdminStats() {
    try {
        const response = await fetch(`${API_URL}/api/admin/stats`, {
            method: 'GET',
            headers: getAuthHeaders()
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Get admin stats error:', error);
        throw error;
    }
}

async function getAdminUsers(filters = {}) {
    try {
        const params = new URLSearchParams();
        if (filters.role) params.append('role', filters.role);
        if (filters.search) params.append('search', filters.search);
        if (filters.page) params.append('page', filters.page);
        if (filters.limit) params.append('limit', filters.limit);

        const url = `${API_URL}/api/admin/users${params.toString() ? '?' + params.toString() : ''}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: getAuthHeaders()
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Get admin users error:', error);
        throw error;
    }
}

async function updateUserRole(userId, role) {
    try {
        const response = await fetch(`${API_URL}/api/admin/users/${userId}/role`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({ role })
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Update user role error:', error);
        throw error;
    }
}

async function deleteUser(userId) {
    try {
        const response = await fetch(`${API_URL}/api/admin/users/${userId}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Delete user error:', error);
        throw error;
    }
}

async function resendOTP(email) {
    try {
        const response = await fetch(`${API_URL}/api/auth/resend-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Resend OTP error:', error);
        throw error;
    }
}

async function verifyOTP(email, otp) {
    try {
        const response = await fetch(`${API_URL}/api/auth/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp })
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Verify OTP error:', error);
        throw error;
    }
}

async function forgotPassword(email) {
    try {
        const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Forgot password error:', error);
        throw error;
    }
}

async function resetPassword(token, password) {
    try {
        const response = await fetch(`${API_URL}/api/auth/reset-password/${token}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Reset password error:', error);
        throw error;
    }
}

async function uploadProfileImage(file) {
    try {
        var formData = new FormData();
        formData.append('image', file);

        const response = await fetch(`${API_URL}/api/auth/profile/image`, {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + getToken() },
            body: formData
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Upload profile image error:', error);
        throw error;
    }
}

async function deleteProfileImage() {
    try {
        const response = await fetch(`${API_URL}/api/auth/profile/image`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Delete profile image error:', error);
        throw error;
    }
}

async function getMyBusinesses() {
    try {
        const response = await fetch(`${API_URL}/api/businesses/mine`, {
            method: 'GET',
            cache: 'no-store',
            headers: getAuthHeaders()
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Get my businesses error:', error);
        throw error;
    }
}

async function uploadBusinessImage(businessId, file) {
    try {
        var formData = new FormData();
        formData.append('image', file);

        const response = await fetch(`${API_URL}/api/businesses/${businessId}/image`, {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + getToken() },
            body: formData
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Upload business image error:', error);
        throw error;
    }
}

async function deleteBusinessImage(businessId) {
    try {
        const response = await fetch(`${API_URL}/api/businesses/${businessId}/image`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Delete business image error:', error);
        throw error;
    }
}

async function updateBookingStatus(bookingId, status) {
    try {
        const response = await fetch(`${API_URL}/api/bookings/${bookingId}/status`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify({ status })
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Update booking status error:', error);
        throw error;
    }
}

async function cancelBookingPatch(bookingId) {
    try {
        const response = await fetch(`${API_URL}/api/bookings/${bookingId}/cancel`, {
            method: 'PATCH',
            headers: getAuthHeaders()
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Cancel booking (patch) error:', error);
        throw error;
    }
}

async function getMyConversations() {
    try {
        const response = await fetch(`${API_URL}/api/messages/my-conversations`, {
            method: 'GET',
            headers: getAuthHeaders()
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Get my conversations error:', error);
        throw error;
    }
}

async function markMessagesAsReadAlt(messageIds) {
    try {
        const response = await fetch(`${API_URL}/api/messages/mark-read`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ messageIds })
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Mark messages as read (alt) error:', error);
        throw error;
    }
}

async function getBookingMessages(bookingId) {
    try {
        const response = await fetch(`${API_URL}/api/messages/booking/${bookingId}`, {
            method: 'GET',
            headers: getAuthHeaders()
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Get booking messages error:', error);
        throw error;
    }
}

async function getAdminUserById(userId) {
    try {
        const response = await fetch(`${API_URL}/api/admin/users/${userId}`, {
            method: 'GET',
            headers: getAuthHeaders()
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Get admin user by ID error:', error);
        throw error;
    }
}

async function getAdminBusinesses(filters = {}) {
    try {
        const params = new URLSearchParams();
        if (filters.page) params.append('page', filters.page);
        if (filters.limit) params.append('limit', filters.limit);
        if (filters.search) params.append('search', filters.search);
        if (filters.category) params.append('category', filters.category);
        if (filters.owner) params.append('owner', filters.owner);

        const url = `${API_URL}/api/admin/businesses${params.toString() ? '?' + params.toString() : ''}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: getAuthHeaders()
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Get admin businesses error:', error);
        throw error;
    }
}

async function getAdminBookings(filters = {}) {
    try {
        const params = new URLSearchParams();
        if (filters.page) params.append('page', filters.page);
        if (filters.limit) params.append('limit', filters.limit);
        if (filters.business) params.append('business', filters.business);
        if (filters.user) params.append('user', filters.user);
        if (filters.status) params.append('status', filters.status);
        if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
        if (filters.dateTo) params.append('dateTo', filters.dateTo);

        const url = `${API_URL}/api/admin/bookings${params.toString() ? '?' + params.toString() : ''}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: getAuthHeaders()
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Get admin bookings error:', error);
        throw error;
    }
}

const ApiService = {
    // Auth
    register,
    login,
    getCurrentUser,
    updateProfile,
    resendOTP,
    verifyOTP,
    forgotPassword,
    resetPassword,
    uploadProfileImage,
    deleteProfileImage,

    // Business
    createBusiness,
    getBusinesses,
    getBusinessById,
    updateBusiness,
    deleteBusiness,
    getMyBusiness,
    getMyBusinesses,
    uploadBusinessImage,
    deleteBusinessImage,

    // Booking
    createBooking,
    getMyBookings,
    getBookingById,
    updateBooking,
    cancelBooking,
    getBusinessBookings,
    checkAvailability,
    updateBookingStatus,
    cancelBookingPatch,

    // Messages
    getMessages,
    sendMessage,
    markMessagesAsRead,
    getConversations,
    getBusinessConversations,
    getMyConversations,
    markMessagesAsReadAlt,
    getBookingMessages,

    // Admin
    getAdminStats,
    getAdminUsers,
    updateUserRole,
    deleteUser,
    getAdminUserById,
    getAdminBusinesses,
    getAdminBookings,

    // Utility
    getBaseUrl: function () { return API_URL; },
    getToken
};

// Make it available globally
window.ApiService = ApiService;
