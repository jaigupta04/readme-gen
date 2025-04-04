<template>
  <div class="loading-screen">
    <div class="loading-spinner">
      <svg viewBox="0 0 16 16" width="64" height="64" class="spinner">
        <circle
          cx="8"
          cy="8"
          r="7"
          stroke="currentColor"
          stroke-opacity="0.25"
          stroke-width="2"
          fill="none"
        />
        <circle
          cx="8"
          cy="8"
          r="7"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
          class="spinner-path"
        />
      </svg>
    </div>
    <p class="loading-text">{{ loadingMessage }}</p>
    <p v-if="elapsedTime > 10" class="loading-tip">{{ loadingTip }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const elapsedTime = ref(0);
const loadingMessage = ref('Generating your README...');
const loadingTip = ref('');

const tips = [
  'A good README includes installation instructions, usage examples, and contribution guidelines.',
  'Adding screenshots to your README can help users understand your project better.',
  'Consider adding badges to your README to show build status, code coverage, and more.',
  'Including a license section in your README is important for open source projects.',
  'A table of contents can make long READMEs more navigable.'
];

let timer;

onMounted(() => {
  timer = setInterval(() => {
    elapsedTime.value++;
    
    if (elapsedTime.value === 5) {
      loadingMessage.value = 'Still working on your README...';
    } else if (elapsedTime.value === 10) {
      loadingMessage.value = 'Almost there! Finalizing your README...';
      loadingTip.value = tips[Math.floor(Math.random() * tips.length)];
    } else if (elapsedTime.value > 15) {
      loadingMessage.value = 'This is taking longer than expected. Please be patient...';
    }
  }, 1000);
});

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<style scoped>
.loading-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.loading-spinner {
  margin-bottom: 1rem;
  color: var(--primary);
}

.spinner {
  animation: rotate 2s linear infinite;
}

.spinner-path {
  stroke-dasharray: 44;
  stroke-dashoffset: 44;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: 44;
  }
  50% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -44;
  }
}

.loading-text {
  font-size: 1.25rem;
  color: var(--text);
  margin-bottom: 1rem;
  text-align: center;
}

.loading-tip {
  font-size: 0.9rem;
  color: var(--primary);
  max-width: 400px;
  text-align: center;
  line-height: 1.5;
  padding: 0.75rem;
  background-color: rgba(88, 166, 255, 0.1);
  border-radius: 6px;
  border-left: 3px solid var(--primary);
}
</style>
