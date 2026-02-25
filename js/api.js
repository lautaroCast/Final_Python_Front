const API_BASE_URL = "http://localhost:8000";

/**
 * Crear un cliente en el backend
 * @param {Object} clientData
 */
async function createClient(clientData) {
  const response = await fetch(`${API_BASE_URL}/clients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(clientData)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error al registrar cliente");
  }

  return await response.json();
}

/**
 * Obtener todos los clientes (nos va a servir para login)
 */
async function getClients() {
  const response = await fetch(`${API_BASE_URL}/clients`);

  if (!response.ok) {
    throw new Error("Error al obtener clientes");
  }

  return await response.json();
}

/**
 * Obtener todos los productos
 */
async function getProducts() {
  const response = await fetch(`${API_BASE_URL}/products`);

  if (!response.ok) {
    throw new Error("Error al obtener productos");
  }

  return await response.json();
  
}
