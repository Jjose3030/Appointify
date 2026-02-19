'use strict';

/**
 * Appointify API Service
 * Comprehensive API integration based on swagger.js documentation
 * Base URL: https://appointyify-api.onrender.com
 */

const API_URL = 'https://appointyify-api.onrender.com';

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get authentication headers
 */
function getAuthHeaders() {
    const token = localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json' };
    // Only add Authorization if token exists and is not the literal string "undefined"
    if (token && token !== 'undefined' && token !== 'null') {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
}

/**
 * Get raw token string, or null if not available
 */
function getToken() {
    const token = localStorage.getItem('token');
    if (!token || token === 'undefined' || token === 'null') return null;
    return token;
}

/**
 * Handle API response
 */
async function handleResponse(response) {
    const data = await response.json();

    if (!response.ok) {
        // Token expired or invalid — clear session and redirect to login
        if (response.status === 401) {
            const storedUser = (() => { try { return JSON.parse(localStorage.getItem('user') || '{}'); } catch(e) { return {}; } })();
            const isBusiness = storedUser.role === 'business';
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            const loginPage = isBusiness ? '/Auth/bussiness-sign-in.html' : '/Auth/user-sign-in.html';
            window.location.replace(loginPage);
        }
        throw {
            status: response.status,
            message: data.msg || 'Request failed',
            errors: data.errors || []
        };
    }

    return data;
}

// ============================================
// AUTH APIs
// ============================================

/**
 * Register a new user
 * POST /api/auth/register
 * @param {Object} userData - { name, email, password, role, phone }
 * @returns {Promise<{token: string, user: Object}>}
 */
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

/**
 * Login user
 * POST /api/auth/login
 * @param {Object} credentials - { email, password }
 * @returns {Promise<{token: string, user: Object}>}
 */
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

/**
 * Get current user profile
 * GET /api/auth/me
 * @returns {Promise<Object>} Current user data
 */
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

/**
 * Update user profile
 * PUT /api/auth/profile
 * @param {Object} updates - { name, email, phone, address, bio }
 * @returns {Promise<Object>} Updated user data
 */
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

// ============================================
// BUSINESS APIs
// ============================================

/**
 * Create a new business
 * POST /api/business
 * @param {Object} businessData - Business details
 * @returns {Promise<Object>} Created business
 */
async function createBusiness(businessData) {
    try {
        const response = await fetch(`${API_URL}/api/business`, {
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

/**
 * Get all businesses (with optional filters)
 * GET /api/businesses?category=...&search=...
 * @param {Object} filters - { category, search, isActive }
 * @returns {Promise<Array>} List of businesses
 */
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

/**
 * Get business by ID
 * GET /api/businesses/:id
 * @param {string} businessId
 * @returns {Promise<Object>} Business details
 */
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

/**
 * Update business
 * PATCH /api/businesses/:id
 * @param {string} businessId
 * @param {Object} updates - Business fields to update
 * @returns {Promise<Object>} Updated business
 */
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

/**
 * Delete business
 * DELETE /api/businesses/:id
 * @param {string} businessId
 * @returns {Promise<Object>} Deletion confirmation
 */
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

/**
 * Get my business (for business owners)
 * GET /api/businesses/my-business
 * @returns {Promise<Object>} Owner's business
 */
async function getMyBusiness() {
    try {
        const response = await fetch(`${API_URL}/api/businesses/my-business`, {
            method: 'GET',
            headers: getAuthHeaders()
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Get my business error:', error);
        throw error;
    }
}

// ============================================
// BOOKING APIs
// ============================================

/**
 * Create a new booking
 * POST /api/bookings
 * @param {Object} bookingData - { business, date, startTime, endTime, notes }
 * @returns {Promise<Object>} Created booking
 */
async function createBooking(bookingData) {
    try {
        const response = await fetch(`${API_URL}/api/bookings`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(bookingData)
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Create booking error:', error);
        throw error;
    }
}

/**
 * Get user's bookings
 * GET /api/bookings
 * @param {Object} filters - { status, startDate, endDate }
 * @returns {Promise<Array>} List of bookings
 */
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

/**
 * Get booking by ID
 * GET /api/bookings/:id
 * @param {string} bookingId
 * @returns {Promise<Object>} Booking details
 */
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

/**
 * Update booking status
 * PUT /api/bookings/:id
 * @param {string} bookingId
 * @param {Object} updates - { status, notes }
 * @returns {Promise<Object>} Updated booking
 */
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

/**
 * Cancel booking
 * PUT /api/bookings/:id/cancel
 * @param {string} bookingId
 * @returns {Promise<Object>} Cancelled booking
 */
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

/**
 * Get bookings for a business
 * GET /api/bookings/business/:businessId
 * @param {string} businessId
 * @param {Object} filters - { status, date }
 * @returns {Promise<Array>} Business bookings
 */
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

/**
 * Check availability for a business
 * GET /api/bookings/availability/:businessId?date=YYYY-MM-DD
 * @param {string} businessId
 * @param {string} date - ISO date string
 * @returns {Promise<Array>} Available time slots
 */
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

// ============================================
// MESSAGE APIs
// ============================================

/**
 * Get messages for a booking
 * GET /api/messages/:bookingId
 * @param {string} bookingId
 * @returns {Promise<Array>} Messages
 */
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

/**
 * Send a message (REST API, though WebSocket is preferred)
 * POST /api/messages
 * @param {Object} messageData - { bookingId, content, senderType }
 * @returns {Promise<Object>} Sent message
 */
async function sendMessage(messageData) {
    try {
        const response = await fetch(`${API_URL}/api/messages`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(messageData)
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Send message error:', error);
        throw error;
    }
}

/**
 * Mark messages as read
 * PUT /api/messages/read
 * @param {Array<string>} messageIds - Array of message IDs
 * @returns {Promise<Object>} Update result
 */
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

/**
 * Get all conversations for current user
 * GET /api/messages/conversations
 * @returns {Promise<Array>} List of conversations with last message and unread count
 */
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

/**
 * Get all conversations for a specific business
 * GET /api/messages/business/:businessId/conversations
 * @param {string} businessId
 * @returns {Promise<Array>} List of conversations for the business
 */
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

// ============================================
// ADMIN APIs
// ============================================

/**
 * Get platform statistics (Admin only)
 * GET /api/admin/stats
 * @returns {Promise<Object>} Platform stats
 */
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

/**
 * Get all users (Admin only)
 * GET /api/admin/users?role=...&search=...
 * @param {Object} filters - { role, search, page, limit }
 * @returns {Promise<Array>} List of users
 */
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

/**
 * Update user role (Admin only)
 * PUT /api/admin/users/:userId/role
 * @param {string} userId
 * @param {string} role - 'user', 'business', or 'admin'
 * @returns {Promise<Object>} Updated user
 */
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

/**
 * Delete user (Admin only)
 * DELETE /api/admin/users/:userId
 * @param {string} userId
 * @returns {Promise<Object>} Deletion confirmation
 */
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

// ============================================
// EXPORT API SERVICE
// ============================================

const ApiService = {
    // Auth
    register,
    login,
    getCurrentUser,
    updateProfile,

    // Business
    createBusiness,
    getBusinesses,
    getBusinessById,
    updateBusiness,
    deleteBusiness,
    getMyBusiness,

    // Booking
    createBooking,
    getMyBookings,
    getBookingById,
    updateBooking,
    cancelBooking,
    getBusinessBookings,
    checkAvailability,

    // Messages
    getMessages,
    sendMessage,
    markMessagesAsRead,
    getConversations,
    getBusinessConversations,

    // Admin
    getAdminStats,
    getAdminUsers,
    updateUserRole,
    deleteUser,

    // Utility
    getBaseUrl: function() { return API_URL; },
    getToken
};

// Make it available globally
window.ApiService = ApiService;
