import axios from "axios";

// Configurar la URL base de la API
const API_BASE_URL = "http://127.0.0.1:8000/api"; // Reemplaza con la URL de tu API

// Crear una instancia de Axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token de autenticación en cada petición
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Obtener el token del localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Agregar el token al header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Funciones para interactuar con la API

// Registro de usuario
export const register = async (name, email, password) => {
  try {
    const response = await apiClient.post("/register", {
      name,
      email,
      password,
    });
    const token = response.data.token;
    localStorage.setItem("token", token); // Guardar el token en localStorage
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Login de usuario
export const login = async (email, password) => {
  try {
    const response = await apiClient.post("/login", {
      email,
      password,
    });
    const token = response.data.token;
    localStorage.setItem("token", token); // Guardar el token en localStorage
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Logout de usuario
export const logout = async () => {
  try {
    const response = await apiClient.post("/logout");
    localStorage.removeItem("token"); // Eliminar el token de localStorage
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Obtener todas las notas del usuario autenticado
export const getNotes = async (sortBy = "created_at") => {
  try {
    const response = await apiClient.get("/notes", {
      params: { sortBy },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Obtener una nota por ID
export const getNoteById = async (id) => {
  try {
    const response = await apiClient.get(`/notes/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Crear una nueva nota
export const createNote = async (noteData) => {
  try {
    const response = await apiClient.post("/notes", noteData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Actualizar una nota existente
export const updateNote = async (id, noteData) => {
  try {
    const response = await apiClient.put(`/notes/${id}`, noteData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Eliminar una nota
export const deleteNote = async (id) => {
  try {
    const response = await apiClient.delete(`/notes/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Obtener notas de un usuario específico por su ID
export const getNotesByUserId = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}/notes`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
