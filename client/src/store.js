import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const username = ref('');
  const repos = ref('');
  const loggedIn = ref('');

  return { username, repos, loggedIn };
});
