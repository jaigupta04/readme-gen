<template>
  <div class="folder-container">
    <div 
      class="folder-header"
      @click="toggleFolder"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="folder-icon"
        :class="{ 'open': isOpen }"
      >
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
      </svg>
      <span>{{ folder.name }}</span>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="12" 
        height="12" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
        class="chevron-icon"
        :class="{ 'open': isOpen }"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </div>
    <div v-if="isOpen" class="folder-content">
      <template v-for="(item, index) in folder.children" :key="index">
        <div 
          v-if="!item.isFolder" 
          class="file-item"
          @click="selectFile(item.path)"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
            class="file-icon"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
          <span>{{ item.name }}</span>
        </div>
        <folder-tree 
          v-else 
          :folder="item" 
          @select-file="selectFile"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  folder: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['select-file']);

const isOpen = ref(false);

const toggleFolder = () => {
  isOpen.value = !isOpen.value;
};

const selectFile = (path) => {
  emit('select-file', path);
};
</script>

<style scoped>
.folder-container {
  margin-left: 0.5rem;
}

.folder-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.folder-header:hover {
  background-color: rgba(88, 166, 255, 0.1);
}

.folder-icon {
  color: #e3b341;
}

.folder-icon.open {
  color: #f0c64b;
}

.chevron-icon {
  margin-left: auto;
  transition: transform 0.2s ease;
}

.chevron-icon.open {
  transform: rotate(180deg);
}

.folder-content {
  margin-left: 1rem;
  border-left: 1px dashed var(--border);
  padding-left: 0.5rem;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.file-item:hover {
  background-color: rgba(88, 166, 255, 0.1);
}

.file-icon {
  color: #8b949e;
}
</style>
