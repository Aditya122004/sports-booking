/* =====================================================
   api.js — All Backend API Calls
   Base URL: http://localhost:5000/api
   ===================================================== */

const BASE_URL = 'http://localhost:5000/api';

// ─── Helper: Header banao (token ke saath) ───────────
function getHeaders(isFormData = false) {
  const token = AUTH.getToken();
  const headers = {};
  if (!isFormData) headers['Content-Type'] = 'application/json';
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

// ─── Helper: Fetch wrapper ────────────────────────────
async function request(method, endpoint, body = null, isFormData = false) {
  const options = {
    method,
    headers: getHeaders(isFormData),
  };
  if (body) options.body = isFormData ? body : JSON.stringify(body);

  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Kuch gadbad ho gayi!');
  }
  return data;
}

// ─── Toast helper ─────────────────────────────────────
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// =====================================================
// AUTH APIs
// =====================================================
const AuthAPI = {

  // Register (multipart/form-data)
  async register(formData) {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${AUTH.getToken() || ''}` },
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Register nahi hua');
    return data;
  },

  // Login
  async login(email, password) {
    return request('POST', '/auth/login', { email, password });
  },

  // Get Profile
  async getProfile() {
    return request('GET', '/auth/profile');
  },
};

// =====================================================
// SPORTS APIs
// =====================================================
const SportsAPI = {

  // Saare sports list
  async getAll() {
    return request('GET', '/sports');
  },

  // Ek sport details
  async getOne(id) {
    return request('GET', `/sports/${id}`);
  },

  // Sport create (admin)
  async create(formData) {
    const res = await fetch(`${BASE_URL}/sports`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${AUTH.getToken()}` },
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Sport create nahi hua');
    return data;
  },

  // Sport update (admin)
  async update(id, formData) {
    const res = await fetch(`${BASE_URL}/sports/${id}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${AUTH.getToken()}` },
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Update nahi hua');
    return data;
  },

  // Sport delete (admin)
  async delete(id) {
    return request('DELETE', `/sports/${id}`);
  },
};

// =====================================================
// FACILITIES APIs
// =====================================================
const FacilitiesAPI = {

  // Saari facilities (optional: sportId filter)
  async getAll(sportId = null) {
    const query = sportId ? `?sportId=${sportId}` : '';
    return request('GET', `/facilities${query}`);
  },

  // Ek facility details
  async getOne(id) {
    return request('GET', `/facilities/${id}`);
  },

  // Availability check
  async getAvailability(id, date) {
    return request('GET', `/facilities/${id}/availability?date=${date}`);
  },

  // Facility create (admin)
  async create(formData) {
    const res = await fetch(`${BASE_URL}/facilities`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${AUTH.getToken()}` },
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Facility create nahi hui');
    return data;
  },
};

// =====================================================
// BOOKINGS APIs
// =====================================================
const BookingsAPI = {

  // Booking create
  async create(bookingData) {
    return request('POST', '/bookings', bookingData);
  },

  // My bookings
  async getMy() {
    return request('GET', '/bookings/my');
  },
};

// =====================================================
// PAYMENTS APIs
// =====================================================
const PaymentsAPI = {

  // Razorpay order create
  async createOrder(bookingId, amount) {
    return request(
        'POST',
        '/payments/create-order',
        {
            bookingId,
            amount
        }
    );
},

  // Payment verify
  async verify(paymentData) {
    return request('POST', '/payments/verify', paymentData);
  },
};

// =====================================================
// TEAMS APIs
// =====================================================
const TeamsAPI = {

  // My teams
  async getMy() {
    return request('GET', '/teams/my');
  },

  // Team details
  async getOne(id) {
    return request('GET', `/teams/${id}`);
  },

  // Team create
  async create(formData) {
    const res = await fetch(`${BASE_URL}/teams`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${AUTH.getToken()}` },
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Team create nahi hui');
    return data;
  },

  // Member add
  async addMember(teamId, userId) {
    return request('POST', `/teams/${teamId}/members`, { userId });
  },

  // Member remove
  async removeMember(teamId, userId) {
    return request('DELETE', `/teams/${teamId}/members/${userId}`);
  },
};

// =====================================================
// ADMIN APIs
// =====================================================
const AdminAPI = {

  // Dashboard stats
  async getDashboard() {
    return request('GET', '/admin/dashboard');
  },

  // All users
  async getUsers() {
    return request('GET', '/admin/users');
  },

  // All teams
  async getTeams() {
    return request('GET', '/admin/teams');
  },

  // All bookings
  async getBookings() {
    return request('GET', '/admin/bookings');
  },

  // Revenue analytics
  async getRevenue() {
    return request('GET', '/admin/revenue');
  },
};
