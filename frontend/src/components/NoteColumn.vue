<script setup>
  import { defineProps } from "vue";

  const props = defineProps({
    title: String,
    notes: Array,
    column: String,
    bgColor: String,
  });

  let draggedNote = null;
  let draggedFrom = null;

  const onDragStart = (event, note) => {
    draggedNote = note;
    draggedFrom = props.column;
    event.dataTransfer.effectAllowed = "move";
  };

  const onDrop = (event) => {
    if (draggedNote && draggedFrom) {
      const toColumn = props.column;
      event.emit("note-drop", {
        note: draggedNote,
        from: draggedFrom,
        to: toColumn,
      });
      draggedNote = null;
      draggedFrom = null;
    }
  };

  const onDragOver = (event) => {
    event.preventDefault(); // Permitir el drop
  };
</script>

<template>
  <div
    :class="[bgColor, 'p-4 rounded-lg shadow']"
    @dragover="onDragOver"
    @drop="onDrop"
  >
    <h3 class="text-lg font-bold mb-4">{{ title }}</h3>
    <div
      v-for="(note, index) in notes"
      :key="index"
      class="bg-white p-4 rounded-lg shadow mb-2"
      draggable="true"
      @dragstart="onDragStart($event, note)"
    >
      <h4 class="font-bold">{{ note.title }}</h4>
      <p>{{ note.description }}</p>
      <small>Creado: {{ note.createdAt }}</small
      ><br />
      <small>Vence: {{ note.dueDate }}</small>
    </div>
  </div>
</template>
