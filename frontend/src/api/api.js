import axios from "axios";

// Configure the base URL of the API
const API_BASE_URL = "https://todo-vue-laravel-production.up.railway.app/api";

// Create an instance of Axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add the authentication token to each request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Functions to interact with the API

// User registration
export const register = async (name, email, password) => {
  try {
    const response = await apiClient.post("/register", {
      name,
      email,
      password,
    });
    const token = response.data.token;
    localStorage.setItem("token", token);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// User login
export const login = async (email, password) => {
  try {
    const response = await apiClient.post("/login", {
      email,
      password,
    });
    const token = response.data.token;
    localStorage.setItem("token", token);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// User logout
export const logout = async () => {
  try {
    const response = await apiClient.post("/logout");
    localStorage.removeItem("token");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get all notes of the authenticated user
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

// Get a note by ID
export const getNoteById = async (id) => {
  try {
    const response = await apiClient.get(`/notes/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Create a new note
export const createNote = async (noteData) => {
  try {
    const response = await apiClient.post("/notes", noteData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update an existing note
export const updateNote = async (id, noteData) => {
  try {
    const response = await apiClient.put(`/notes/${id}`, noteData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Delete a note
export const deleteNote = async (id) => {
  try {
    const response = await apiClient.delete(`/notes/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get notes of a specific user by their ID
export const getNotesByUserId = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}/notes`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
