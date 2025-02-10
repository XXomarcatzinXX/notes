<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useNotesStore } from '../stores/notes';

const store = useNotesStore();
const newNote = ref<string>('');
const selectedCategory = ref<string>('Personal');

const categories = computed(() => Object.keys(store.categories)); // Asegura que son strings

const addNote = () => {
  if (newNote.value.trim() && selectedCategory.value in store.categories) {
    store.addNote(selectedCategory.value as keyof typeof store.categories, newNote.value);
    newNote.value = '';
  }
};

onMounted(() => {
  store.loadFromLocalStorage();
});
</script>

<template>
  <div>
    <h1>Bloc de Notas</h1>
    <select v-model="selectedCategory">
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>
    </select>
    <input v-model="newNote" placeholder="Escribe una nota" />
    <button @click="addNote">Agregar</button>
    
    <div v-for="(notes, category) in store.categories" :key="category">
      <h2>{{ category }}</h2>
      <ul>
        <li v-for="(note, index) in notes" :key="index">
          {{ note }} <button @click="store.removeNote(category, index)">X</button>
        </li>
      </ul>
    </div>
  </div>
</template>
