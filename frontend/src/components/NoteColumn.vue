<script setup>
  import draggable from "vuedraggable";
  import { useStore } from "vuex";

  const props = defineProps({
    title: String,
    notes: Array,
    bgColor: String,
    column: String,
  });

  const store = useStore();

  const onMoveNote = (event) => {
    const note = event.item._underlying_vm_;
    store.dispatch("moveNote", {
      note,
      from: event.from.dataset.column,
      to: event.to.dataset.column,
    });
  };
</script>

<template>
  <div :class="[bgColor, 'p-4 rounded-lg shadow']" data-column="column">
    <h3 class="text-lg font-bold mb-4">{{ title }}</h3>
    <draggable v-model="notes" @end="onMoveNote">
      <div
        v-for="note in notes"
        :key="note.title"
        class="bg-white p-4 rounded-lg shadow mb-2"
      >
        <h4 class="font-bold">{{ note.title }}</h4>
        <p>{{ note.description }}</p>
        <small>Creado: {{ note.createdAt }}</small>
        <br />
        <small>Vence: {{ note.dueDate }}</small>
      </div>
    </draggable>
  </div>
</template>
