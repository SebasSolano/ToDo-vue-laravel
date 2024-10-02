<script setup>
  import { computed, onMounted } from "vue";
  import { useStore } from "vuex";
  import NoteForm from "../components/NoteForm.vue";
  import dayjs from "dayjs";
  import { DeleteOutlined } from "@ant-design/icons-vue";

  const store = useStore();

  // Getters for notes
  const activeNotes = computed(() => store.getters.activeNotes);
  const completedNotes = computed(() => store.getters.completedNotes);
  const expiredNotes = computed(() => store.getters.expiredNotes);


  const checkExpiredNotes = () => {
    const now = dayjs().format("YYYY-MM-DD");
    activeNotes.value.forEach((note) => {
      if (dayjs(note.dueDate).isBefore(now)) {
        store.dispatch("moveNote", { note, from: "active", to: "expired" });
      }
    });
  };


  onMounted(() => {
    store.dispatch("fetchNotes").then(() => {
      checkExpiredNotes();
    });
  });

  // Event handlers for drag and drop
  let draggedNote = null;
  let draggedFrom = null;

  const onDragStart = (event, note, fromColumn) => {
    draggedNote = note;
    draggedFrom = fromColumn;
    event.dataTransfer.effectAllowed = "move";
  };

  const onDrop = (event, toColumn) => {
    if (draggedNote && draggedFrom) {
      store.dispatch("moveNote", {
        note: draggedNote,
        from: draggedFrom,
        to: toColumn,
      });
      draggedNote = null;
      draggedFrom = null;
    }
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const deleteNote = (note) => {
    store.dispatch("deleteNote", note);
  };

  const colors = ["pink", "red", "orange", "green", "cyan", "blue", "purple"];
  let colorIndex = 0;

  const getRandomColor = () => {
    const color = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
    return color;
  };
</script>

<template>
  <div class="grid grid-cols-3 gap-6 p-5">
    <!-- Active -->
    <div
      class="bg-yellow-100 p-4 rounded-lg shadow"
      @dragover="onDragOver"
      @drop="onDrop($event, 'active')"
    >
      <h3 class="text-lg font-bold mb-4">Active</h3>
      <div
        v-for="(note, index) in activeNotes"
        :key="index"
        class="bg-white p-4 rounded-lg shadow mb-2 w-full"
        draggable="true"
        @dragstart="onDragStart($event, note, 'active')"
      >
        <div class="flex items-center justify-between">
          <div>
            <h4 class="font-bold">{{ note.title }}</h4>
            <p>{{ note.description }}</p>
          </div>

          <NoteForm :notes="note" />
        </div>

        <div class="flex items-center justify-between">
          <div>
            <a-tag
              v-for="(tag, index) in note.tags"
              :key="index"
              :color="getRandomColor()"
              >{{ tag }}</a-tag
            >
          </div>

          <div class="flex flex-col items-end space-y-2">
            <small class="bg-green-100 p-2 rounded cursor-pointer"
              >Created: {{ note.createdAt }}</small
            >
            <small class="bg-red-100 p-2 rounded cursor-pointer"
              >Due: {{ note.dueDate }}</small
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Completed -->
    <div
      class="bg-green-100 p-4 rounded-lg shadow"
      @dragover="onDragOver"
      @drop="onDrop($event, 'completed')"
    >
      <h3 class="text-lg font-bold mb-4">Completed</h3>
      <div
        v-for="(note, index) in completedNotes"
        :key="index"
        class="bg-white p-4 rounded-lg shadow mb-2 w-full"
        draggable="true"
        @dragstart="onDragStart($event, note, 'completed')"
      >
        <div class="flex items-center justify-between">
          <div>
            <h4 class="font-bold">{{ note.title }}</h4>
            <p>{{ note.description }}</p>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div>
            <a-tag
              v-for="(tag, index) in note.tags"
              :key="index"
              :color="getRandomColor()"
              >{{ tag }}</a-tag
            >
          </div>

          <div class="flex flex-col items-end space-y-2">
            <small class="bg-green-100 p-2 rounded cursor-pointer"
              >Created: {{ note.createdAt }}</small
            >
            <small class="bg-red-100 p-2 rounded cursor-pointer"
              >Due: {{ note.dueDate }}</small
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Expired -->
    <div
      class="bg-red-100 p-4 rounded-lg shadow"
      @dragover="onDragOver"
      @drop="onDrop($event, 'expired')"
    >
      <h3 class="text-lg font-bold mb-4">Expired</h3>
      <div
        v-for="(note, index) in expiredNotes"
        :key="index"
        class="bg-white p-4 rounded-lg shadow mb-2 w-full"
        draggable="false"
        @dragstart="onDragStart($event, note, 'expired')"
      >
        <div class="flex items-center justify-between">
          <div>
            <h4 class="font-bold">{{ note.title }}</h4>
            <p>{{ note.description }}</p>
          </div>

          <a-button
            @click="deleteNote(note)"
            class="flex items-center justify-center text-lg"
            danger
            type="text"
            ><DeleteOutlined
          /></a-button>
        </div>

        <div class="flex items-center justify-between">
          <div>
            <a-tag
              v-for="(tag, index) in note.tags"
              :key="index"
              :color="getRandomColor()"
              >{{ tag }}</a-tag
            >
          </div>

          <div class="flex flex-col items-end space-y-2">
            <small class="bg-green-100 p-2 rounded cursor-pointer"
              >Created: {{ note.createdAt }}</small
            >
            <small class="bg-red-100 p-2 rounded cursor-pointer"
              >Due: {{ note.dueDate }}</small
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
