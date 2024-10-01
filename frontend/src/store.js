// src/store.js
import { createStore } from "vuex";

export default createStore({
  state: {
    notes: {
      active: [],
      completed: [],
      expired: [],
    },
  },
  mutations: {
    ADD_NOTE(state, note) {
      // Añadir la nota con el estado 'active' por defecto
      note.state = "active";
      state.notes.active.push(note);
    },
    MOVE_NOTE(state, { note, from, to }) {
      const index = state.notes[from].indexOf(note);
      if (index !== -1) {
        state.notes[from].splice(index, 1);
        note.state = to; // Actualizar el estado de la nota
        state.notes[to].push(note);
      }
    },
    DELETE_NOTE(state, note) {
      const index = state.notes.expired.indexOf(note);
      if (index !== -1) {
        state.notes.expired.splice(index, 1); // Eliminar la nota del estado expired
      }
    },
  },
  actions: {
    addNote({ commit }, note) {
      commit("ADD_NOTE", note);
    },
    moveNote({ commit }, payload) {
      commit("MOVE_NOTE", payload);
    },
    deleteNote({ commit }, note) {
      commit("DELETE_NOTE", note);
    },
  },
  getters: {
    activeNotes: (state) => state.notes.active,
    completedNotes: (state) => state.notes.completed,
    expiredNotes: (state) => state.notes.expired,
  },
});
