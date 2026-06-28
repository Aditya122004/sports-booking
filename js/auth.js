/* =====================================================
   auth.js — JWT Token Management
   ===================================================== */

const AUTH = {

  // Token localStorage mein save karo
  setToken(token) {
    localStorage.setItem('sb_token', token);
  },

  // Token nikalo
  getToken() {
    return localStorage.getItem('sb_token');
  },

  // User info save karo
  setUser(user) {
    localStorage.setItem('sb_user', JSON.stringify(user));
  },

  // User info nikalo
  getUser() {
    const u = localStorage.getItem('sb_user');
    return u ? JSON.parse(u) : null;
  },

  // Login hai ya nahi check karo
  isLoggedIn() {
    return !!this.getToken();
  },

  // Admin hai ya nahi
  isAdmin() {
    const user = this.getUser();
    return user && user.role === 'ADMIN';
  },

  // Logout — sab clear karo
  logout() {
    localStorage.removeItem('sb_token');
    localStorage.removeItem('sb_user');
    window.location.href = '/login.html';
  },

  // Agar login nahi hai toh login page pe bhejo
  requireLogin() {
    if (!this.isLoggedIn()) {
      window.location.href = '/login.html';
    }
  },

  // Agar admin nahi hai toh dashboard pe bhejo
  requireAdmin() {
    if (!this.isLoggedIn()) {
      window.location.href = '/login.html';
      return;
    }
    if (!this.isAdmin()) {
      window.location.href = '/dashboard.html';
    }
  },

  // Agar already logged in hai toh dashboard pe bhejo
  redirectIfLoggedIn() {
    if (this.isLoggedIn()) {
      if (this.isAdmin()) {
        window.location.href = '/admin/dashboard.html';
      } else {
        window.location.href = '/dashboard.html';
      }
    }
  }

};
