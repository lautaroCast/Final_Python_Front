document.addEventListener("DOMContentLoaded", () => {

  // ===== REGISTRO =====
  const signupForm = document.getElementById("signupForm");

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("firstName").value;
    const lastname = document.getElementById("lastName").value;
    const email = document.getElementById("signupEmail").value;
    const telephone = document.getElementById("phone").value;
    const password = document.getElementById("signupPassword").value;

    try {
      // 1️⃣ Guardar contraseña (front)
      registerAuth(email, password);

      // 2️⃣ Crear cliente en backend
      await createClient({
        name,
        lastname,
        email,
        telephone
      });

      alert("Registro exitoso ✅");
      document.getElementById("signupModal").style.display = "none";

    } catch (error) {
      alert(error.message);
    }
  });

  // ===== LOGIN =====
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      loginAuth(email, password);
      alert("Login exitoso 👌");
      document.getElementById("loginModal").style.display = "none";
      updateUI();

    } catch (error) {
      alert(error.message);
    }
  });

  updateUI();

  // ===== LOGOUT =====
  const profileBtn = document.getElementById("profileBtn");

  profileBtn.addEventListener("click", () => {
    const confirmLogout = confirm("¿Cerrar sesión?");

    if (confirmLogout) {
      logoutAuth();
      updateUI();
      alert("Sesión cerrada 👋");
    }
  });

  // ===== PRODUCTOS =====
const productsBtn = document.getElementById("viewProductsBtn");

productsBtn.addEventListener("click", async () => {
  try {
    const products = await getProducts();
    renderProducts(products);
  } catch (error) {
    alert(error.message);
  }
});


});
