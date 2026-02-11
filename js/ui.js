// ===============================
// UI – Modales
// ===============================

const signupModal = document.getElementById("signupModal");
const loginModal = document.getElementById("loginModal");

export function openModal(type) {
  if (type === "signup") signupModal.style.display = "flex";
  if (type === "login") loginModal.style.display = "flex";
}

export function closeModal(type) {
  if (type === "signup") signupModal.style.display = "none";
  if (type === "login") loginModal.style.display = "none";
}

// ===============================
// UI – Inicialización de eventos
// ===============================

export function initUI() {
  // Botones del header
  const signupBtn = document.getElementById("signupBtn");
  const loginBtn = document.getElementById("loginBtn");

  if (signupBtn) signupBtn.onclick = () => openModal("signup");
  if (loginBtn) loginBtn.onclick = () => openModal("login");

  // Botones cerrar modal
  document.querySelectorAll(".close").forEach(btn => {
    btn.onclick = () => closeModal(btn.dataset.close);
  });

  // Click fuera del modal
  window.onclick = e => {
    if (e.target === signupModal) closeModal("signup");
    if (e.target === loginModal) closeModal("login");
  };
}

// ===============================
// UI – Auth
// ===============================

export function updateAuthUI(isLoggedIn) {
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const profileBtn = document.getElementById("profileBtn");

  if (!loginBtn || !signupBtn || !profileBtn) return;

  if (isLoggedIn) {
    loginBtn.style.display = "none";
    signupBtn.style.display = "none";
    profileBtn.style.display = "inline-block";
  } else {
    loginBtn.style.display = "inline-block";
    signupBtn.style.display = "inline-block";
    profileBtn.style.display = "none";
  }
}

// ===============================
// UI – Productos
// ===============================

export function crearCardProducto(producto) {
  return `
    <div class="card">
      <img 
        src="https://via.placeholder.com/300x200?text=Producto" 
        alt="${producto.name}"
      >
      <h3>${producto.name}</h3>
      <p>Precio: $${producto.price}</p>
      <p>${producto.stock > 0 ? "Stock disponible" : "Sin stock"}</p>
    </div>
  `;
}


export function renderProducts(products) {
  console.log("renderProducts ejecutada");
  console.log("products recibidos:", products);

  const productList = document.getElementById("product-cards");
  if (!productList) {
    console.error("No se encontró #product-cards");
    return;
  }

  if (products.length === 0) {
    productList.innerHTML = `
      <div class="no-results">
        <p>No hay productos que coincidan con los filtros</p>
      </div>
    `;
    return;
  }

  let html = "";
  products.forEach(producto => {
    html += crearCardProducto(producto);
  });

  productList.innerHTML = html;
}

export function renderCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const countEl = document.getElementById("cart-count");

  container.innerHTML = "";

  cart.forEach(item => {
    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <p>$${item.price}</p>
      </div>
      <div>
        <button onclick="decreaseQuantity(${item.id})">-</button>
        <span>${item.quantity}</span>
        <button onclick="increaseQuantity(${item.id})">+</button>
      </div>
    `;

    container.appendChild(div);
  });

  totalEl.textContent = calculateTotal();
  countEl.textContent = cart.reduce((acc, i) => acc + i.quantity, 0);
}

