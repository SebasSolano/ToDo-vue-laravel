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
      state.notes.active.push(note);
      console.log(state.notes.active)
    },
    MOVE_NOTE(state, { note, from, to }) {
      const index = state.notes[from].indexOf(note);
      if (index !== -1) {
        state.notes[from].splice(index, 1);
        state.notes[to].push(note);
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
  },
  getters: {
    activeNotes: (state) => state.notes.active,
    completedNotes: (state) => state.notes.completed,
    expiredNotes: (state) => state.notes.expired,
  },
});
