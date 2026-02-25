// Claves de localStorage
const USERS_KEY = "users_auth";
const CURRENT_USER_KEY = "current_user";

/**
 * Obtiene el mapa de usuarios { email: password }
 */
function getStoredUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || {};
}

/**
 * Guarda el mapa de usuarios
 */
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/**
 * Registra credenciales de un usuario (solo en front)
 */
function registerAuth(email, password) {
  const users = getStoredUsers();

  if (users[email]) {
    throw new Error("Este email ya está registrado");
  }

  users[email] = password;
  saveUsers(users);
}

/**
 * Valida login
 */
function loginAuth(email, password) {
  const users = getStoredUsers();

  if (!users[email]) {
    throw new Error("Usuario no encontrado");
  }

  if (users[email] !== password) {
    throw new Error("Contraseña incorrecta");
  }

  localStorage.setItem(CURRENT_USER_KEY, email);
}

/**
 * Logout
 */
function logoutAuth() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

/**
 * Devuelve el usuario logueado
 */
function getCurrentUser() {
  return localStorage.getItem(CURRENT_USER_KEY);
}

/**
 * Devuelve true si hay sesión activa
 */
function isLoggedIn() {
  return !!getCurrentUser();
}
