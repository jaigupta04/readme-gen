<template>
  <div class="app">
    <nav-bar />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { provide } from 'vue';
import NavBar from './components/NavBar.vue';

// Provide GitHub colors as global values
provide('githubColors', {
  primary: '#58a6ff',
  background: '#0d1117',
  secondaryBg: '#161b22',
  text: '#c9d1d9',
  border: '#30363d',
  success: '#2ea043',
});
</script>

<style>
:root {
  --primary: #58a6ff;
  --background: #0d1117;
  --secondary-bg: #161b22;
  --text: #c9d1d9;
  --border: #30363d;
  --success: #2ea043;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
}

body {
  background-color: var(--background);
  color: var(--text);
  line-height: 1.5;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  line-height: 20px;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border: 1px solid;
  border-radius: 6px;
  appearance: none;
  transition: background-color 0.2s ease;
}

.btn-primary {
  color: #fff;
  background-color: var(--primary);
  border-color: var(--primary);
}

.btn-primary:hover {
  background-color: #0255b3;
}

.btn-success {
  color: #fff;
  background-color: var(--success);
  border-color: var(--success);
}

.btn-success:hover {
  background-color: #2c974b;
}

.btn-outline {
  color: var(--primary);
  background-color: transparent;
  border-color: var(--border);
}

.btn-outline:hover {
  color: #fff;
  background-color: var(--primary);
  border-color: var(--primary);
}

.card {
  background-color: var(--background);
  border: 1px solid var(--border);
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.form-group {
  margin-bottom: 1rem;
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--text);
  background-color: var(--background);
  border: 1px solid var(--border);
  border-radius: 6px;
  transition: border-color 0.15s ease-in-out;
}

.form-control:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(3, 102, 214, 0.3);
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
