// store/notes.ts
import { defineStore } from 'pinia';

const STORAGE_KEY = 'notesData';

export const useNotesStore = defineStore('notes', {
    state: () => ({
        categories: JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || {
            Personal: [] as string[],
            Trabajo: [] as string[],
            Ideas: [] as string[],
            Otros: [] as string[]
        }
    }),
    actions: {
        saveToLocalStorage() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.categories));
        },
        addNote(category: keyof typeof this.categories, note: string) {
            if (this.categories[category]) {
                this.categories[category].push(note);
                this.saveToLocalStorage();
            }
        },
        removeNote(category: keyof typeof this.categories, index: number) {
            if (this.categories[category]) {
                this.categories[category].splice(index, 1);
                this.saveToLocalStorage();
            }
        },
        loadFromLocalStorage() {
            const storedData = localStorage.getItem(STORAGE_KEY);
            console.log('data', storedData)
            if (storedData) {
                this.categories = JSON.parse(storedData);
            }
        }
    }
});
