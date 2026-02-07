console.log("🟢 main.js cargado");

// ===============================
// Imports
// ===============================

import { initUI, renderProducts, updateAuthUI, closeModal } from "./ui.js";
import { registerAuth, loginAuth, logoutAuth, isLoggedIn } from "./auth.js";
import { createClient, getProducts } from "./api.js";

// ===============================
// App Init
// ===============================

document.addEventListener("DOMContentLoaded", async () => {
  initUI();
  updateAuthUI(isLoggedIn());
  initAuthEvents();
  initProductEvents();

  // ✅ CARGA AUTOMÁTICA DE PRODUCTOS (productos.html)
  const productCards = document.getElementById("product-cards");

  if (productCards) {
    console.log("🟢 Estamos en productos.html, cargando productos...");

    try {
      const products = await getProducts();
      console.log("📦 Productos recibidos:", products);
      renderProducts(products);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }
});

// ===============================
// Auth Events
// ===============================

function initAuthEvents() {
  initSignup();
  initLogin();
  initLogout();
}

function initSignup() {
  const signupForm = document.getElementById("signupForm");
  if (!signupForm) return;

  signupForm.addEventListener("submit", async e => {
    e.preventDefault();

    const userData = {
      name: document.getElementById("firstName").value,
      lastname: document.getElementById("lastName").value,
      email: document.getElementById("signupEmail").value,
      telephone: document.getElementById("phone").value,
      password: document.getElementById("signupPassword").value
    };

    try {
      registerAuth(userData.email, userData.password);
      await createClient(userData);

      alert("Registro exitoso ✅");
      closeModal("signup");
      updateAuthUI(true);

    } catch (error) {
      alert(error.message);
    }
  });
}

function initLogin() {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return;

  loginForm.addEventListener("submit", async e => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      loginAuth(email, password);

      alert("Login exitoso 👌");
      closeModal("login");
      updateAuthUI(true);

    } catch (error) {
      alert(error.message);
    }
  });
}

function initLogout() {
  const profileBtn = document.getElementById("profileBtn");
  if (!profileBtn) return;

  profileBtn.addEventListener("click", () => {
    if (!confirm("¿Cerrar sesión?")) return;

    logoutAuth();
    updateAuthUI(false);
    alert("Sesión cerrada 👋");
  });
}

// ===============================
// Products (solo botón en index.html)
// ===============================

function initProductEvents() {
  const productsBtn = document.getElementById("viewProductsBtn");
  if (!productsBtn) return;

  productsBtn.addEventListener("click", () => {
    window.location.href = "productos.html";
  });
}
