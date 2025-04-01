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
    <p class="loading-text">Generating your README...</p>
  </div>
</template>

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
}
</style>
