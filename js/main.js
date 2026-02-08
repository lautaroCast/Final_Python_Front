let allProducts = [];
let searchText = "";
let selectedCategories = [];
let onlyWithStock = false;


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
  initHeaderSearch();
  initSidebarSearch();
  initStockFilter();
  initCategoryFilters()
  

  const productCards = document.getElementById("product-cards");

  if (productCards) {
    
    try {
      const products = await getProducts();
      allProducts = products;
      renderProducts(allProducts);
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

      alert("Registro exitoso");
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

      alert("Login exitoso");
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

// ===============================
// Barra de búsqueda (productos.thml)
// ===============================

function aplicarFiltros() {
  let filtrados = allProducts;

  //  Filtro por texto
  if (searchText.trim() !== "") {
    filtrados = filtrados.filter(producto =>
      producto.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  //  Filtro por categoría
  if (selectedCategories.length > 0) {
    filtrados = filtrados.filter(producto =>
      selectedCategories.includes(producto.category_id)
    );
  }

  //  Filtro por stock 
  if (onlyWithStock) {
    filtrados = filtrados.filter(producto => producto.stock > 0);
  }

  renderProducts(filtrados);
}

function initSidebarSearch() {
  const sidebarInput = document.getElementById("searchInput");
  if (!sidebarInput) return;

  sidebarInput.addEventListener("input", e => {
    searchText = e.target.value;
    aplicarFiltros();
  });
}

function initHeaderSearch() {
  const headerInput = document.getElementById("query");
  if (!headerInput) return;

  headerInput.addEventListener("input", e => {
    searchText = e.target.value;
    aplicarFiltros();
  });
}

function initCategoryFilters() {
  const checkboxes = document.querySelectorAll(".category-checkbox");

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      const categoryId = Number(checkbox.value);

      if (checkbox.checked) {
        if (!selectedCategories.includes(categoryId)) {
          selectedCategories.push(categoryId);
        }
      } else {
        selectedCategories = selectedCategories.filter(id => id !== categoryId);
      }

      aplicarFiltros();
    });
  });
}


function initStockFilter() {
  const stockCheckbox = document.getElementById("stockFilter");
  if (!stockCheckbox) return;

  stockCheckbox.addEventListener("change", () => {
    onlyWithStock = stockCheckbox.checked;
    aplicarFiltros();
  });
}

