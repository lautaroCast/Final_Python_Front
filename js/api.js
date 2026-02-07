// ===============================
// API – Config
// ===============================

const API_BASE_URL = "http://localhost:8000";

// ===============================
// Helper interno para fetch
// ===============================

async function fetchJSON(url, options = {}) {
  const response = await fetch(url, options);

  let data;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.message || "Error en la comunicación con el servidor");
  }

  return data;
}

// ===============================
// API – Endpoints
// ===============================

export async function createClient(clientData) {
  return fetchJSON(`${API_BASE_URL}/clients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(clientData)
  });
}

export async function getClients() {
  return fetchJSON(`${API_BASE_URL}/clients`);
}

export async function getProducts() {
  return fetchJSON(`${API_BASE_URL}/products`);
}
