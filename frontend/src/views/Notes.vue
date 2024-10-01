<script setup>
  import { computed } from "vue";
  import { useStore } from "vuex";

  const store = useStore();

  const activeNotes = computed(() => store.getters.activeNotes);
  const completedNotes = computed(() => store.getters.completedNotes);
  const expiredNotes = computed(() => store.getters.expiredNotes);

  let draggedNote = null;
  let draggedFrom = null;

  // Drag event handlers
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
        draggable="true"
        @dragstart="onDragStart($event, note, 'expired')"
      >
        <div class="flex items-center justify-between">
          <div>
            <h4 class="font-bold">{{ note.title }}</h4>
            <p>{{ note.description }}</p>
          </div>
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
</template>
