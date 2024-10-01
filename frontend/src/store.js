// src/store.js
import { createStore } from "vuex";
import dayjs from "dayjs";

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
      note.state = "active";
      state.notes.active.push(note);
    },
    MOVE_NOTE(state, { note, from, to }) {
      const index = state.notes[from].indexOf(note);
      if (index !== -1) {
        state.notes[from].splice(index, 1);
        note.state = to;
        state.notes[to].push(note);
      }
    },
    EDIT_NOTE(state, updatedNote) {
      console.log("EDIT_NOTE called with:", updatedNote);
      const lists = ["active", "completed", "expired"];
      for (const list of lists) {
        const index = state.notes[list].findIndex(
          (note) => note.id === updatedNote.id
        );
        if (index !== -1) {
          console.log(`Found note in ${list} at index ${index}`);
          state.notes[list].splice(index, 1, { ...updatedNote });
          break;
        }
      }
    },
    DELETE_NOTE(state, note) {
      const index = state.notes.expired.indexOf(note);
      if (index !== -1) {
        state.notes.expired.splice(index, 1);
      }
    },
  },
  actions: {
    addNote({ commit, dispatch }, note) {
      commit("ADD_NOTE", note);
      dispatch("checkExpiredNotes");
    },
    moveNote({ commit }, payload) {
      commit("MOVE_NOTE", payload);
    },
    deleteNote({ commit }, note) {
      commit("DELETE_NOTE", note);
    },
    editNote({ commit }, note) {
      console.log("editNote action called with:", note);
      commit("EDIT_NOTE", note);
    },
    checkExpiredNotes({ state, commit }) {
      const now = dayjs().format("YYYY-MM-DD");
      state.notes.active.forEach((note) => {
        if (dayjs(note.dueDate).isBefore(now)) {
          commit("MOVE_NOTE", { note, from: "active", to: "expired" });
        }
      });
    },
  },
  getters: {
    activeNotes: (state) => state.notes.active,
    completedNotes: (state) => state.notes.completed,
    expiredNotes: (state) => state.notes.expired,
  },
});
