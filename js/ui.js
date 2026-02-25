function mostrarSignupModal() {
  document.getElementById("signupModal").classList.add("show");
}

function ocultarSignupModal() {
  document.getElementById("signupModal").classList.remove("show");
}

function mostrarLoginModal() {
  document.getElementById("loginModal").classList.add("show");
}

function ocultarLoginModal() {
  document.getElementById("loginModal").classList.remove("show");
}


function openModal(type) {
  if (type === "signup") signupModal.style.display = "flex";
  if (type === "login") loginModal.style.display = "flex";
}

function closeModal(type) {
  if (type === "signup") signupModal.style.display = "none";
  if (type === "login") loginModal.style.display = "none";
}

// Botones header
document.getElementById("signupBtn").onclick = () => openModal("signup");
document.getElementById("loginBtn").onclick = () => openModal("login");

// Cerrar modales
document.querySelectorAll(".close").forEach(btn => {
  btn.onclick = () => closeModal(btn.dataset.close);
});

// Click fuera del modal
window.onclick = e => {
  if (e.target === signupModal) closeModal("signup");
  if (e.target === loginModal) closeModal("login");
};

function updateAuthUI() {
  const user = getLoggedUser();

  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const profileBtn = document.getElementById("profileBtn");

  if (user) {
    loginBtn.style.display = "none";
    signupBtn.style.display = "none";
    profileBtn.style.display = "inline-block";
  } else {
    loginBtn.style.display = "inline-block";
    signupBtn.style.display = "inline-block";
    profileBtn.style.display = "none";
  }
}

function updateUI() {
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const profileBtn = document.getElementById("profileBtn");

  if (isLoggedIn()) {
    loginBtn.style.display = "none";
    signupBtn.style.display = "none";
    profileBtn.style.display = "inline-block";
  } else {
    loginBtn.style.display = "inline-block";
    signupBtn.style.display = "inline-block";
    profileBtn.style.display = "none";
  }
}

function renderProducts(products) {
  const productList = document.getElementById("productList");

  if (!productList) return;

  // 👇 MOSTRAR la lista
  productList.style.display = "grid"; // o "block", según tu CSS

  productList.innerHTML = "";

  if (products.length === 0) {
    productList.innerHTML = "<li>No hay productos disponibles</li>";
    return;
  }

  products.forEach(product => {
    const li = document.createElement("li");
    li.classList.add("product-card");

    li.innerHTML = `
      <h3>${product.name}</h3>
      <p>Precio: $${product.price}</p>
      <p class="stock">
      ${product.stock > 0 ? "Stock disponible" : "Sin stock"}
      </p>
    `;

    productList.appendChild(li);
  });
}

// Exponer globalmente
window.renderProducts = renderProducts;
