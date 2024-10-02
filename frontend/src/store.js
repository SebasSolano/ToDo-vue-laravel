import { createStore } from "vuex";
import dayjs from "dayjs";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote as deleteNoteAPI,
} from "./api/api";

export default createStore({
  state: {
    notes: {
      active: [],
      completed: [],
      expired: [],
    },
  },
  mutations: {
    SET_NOTES(state, notes) {
      state.notes = notes;
    },
    ADD_NOTE(state, note) {
      state.notes.active.push(note);
    },
    MOVE_NOTE(state, { note, from, to }) {
      const index = state.notes[from].findIndex((n) => n.id === note.id);
      if (index !== -1) {
        state.notes[from].splice(index, 1);
        state.notes[to].push(note);
      }
    },
    EDIT_NOTE(state, updatedNote) {
      const lists = ["active", "completed", "expired"];
      for (const list of lists) {
        const index = state.notes[list].findIndex(
          (note) => note.id === updatedNote.id
        );
        if (index !== -1) {
          if (list !== updatedNote.status) {
            state.notes[list].splice(index, 1);
            state.notes[updatedNote.status].push(updatedNote);
          } else {
            state.notes[list].splice(index, 1, updatedNote);
          }
          break;
        }
      }
    },
    DELETE_NOTE(state, note) {
      const index = state.notes[note.status].findIndex((n) => n.id === note.id);
      if (index !== -1) {
        state.notes[note.status].splice(index, 1);
      }
    },
  },
  actions: {
    async fetchNotes({ commit }) {
      try {
        const notes = await getNotes();

        const organizedNotes = {
          active: [],
          completed: [],
          expired: [],
        };
        notes.forEach((note) => {
          organizedNotes[note.status].push(note);
        });
        commit("SET_NOTES", organizedNotes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    },
    async addNote({ commit }, note) {
      try {
        const newNote = await createNote({
          title: note.title,
          description: note.description,
          expiration_date: note.dueDate,
          tags: note.tags,
          status: "active",
        });
        commit("ADD_NOTE", newNote);
      } catch (error) {
        console.error("Error adding the note:", error);
      }
    },
    async moveNote({ commit }, { note, from, to }) {
      try {
        const updatedNote = await updateNote(note.id, {
          status: to,
        });
        commit("MOVE_NOTE", { note: updatedNote, from, to });
      } catch (error) {
        console.error("Error moving the note:", error);
      }
    },
    async deleteNote({ commit }, note) {
      try {
        await deleteNoteAPI(note.id);
        commit("DELETE_NOTE", note);
      } catch (error) {
        console.error("Error deleting the note:", error);
      }
    },
    async editNote({ commit }, note) {
      try {
        const updatedNote = await updateNote(note.id, {
          title: note.title,
          description: note.description,
          expiration_date: note.dueDate,
          tags: note.tags,
          status: note.status,
        });
        commit("EDIT_NOTE", updatedNote);
      } catch (error) {
        console.error("Error editing the note:", error);
      }
    },
    async checkExpiredNotes({ state, dispatch }) {
      const now = dayjs().format("YYYY-MM-DD");
      for (const note of state.notes.active) {
        if (dayjs(note.expiration_date).isBefore(now)) {
          await dispatch("moveNote", { note, from: "active", to: "expired" });
        }
      }
    },
  },
  getters: {
    activeNotes: (state) => state.notes.active,
    completedNotes: (state) => state.notes.completed,
    expiredNotes: (state) => state.notes.expired,
  },
});
