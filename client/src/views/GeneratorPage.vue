<template>
  <main class="generator">
    <div class="container">
      <h1 class="page-title">README Generator</h1>
      
      <div class="mode-toggle-container">
        <div class="mode-toggle">
          <button 
            :class="['toggle-btn', { active: mode === 'basic' }]" 
            @click="setMode('basic')"
          >
            Basic
          </button>
          <button 
            :class="['toggle-btn', { active: mode === 'smart' }]" 
            @click="setMode('smart')"
          >
            Smart
            <span class="coming-soon-badge">Coming Soon</span>
          </button>
        </div>
        <div class="mode-description">
          <p v-if="mode === 'basic'">Generate README for a single file in your repository</p>
          <p v-else>Generate comprehensive README for your entire GitHub project</p>
        </div>
      </div>
      
      <div class="generator-container">
        <div class="form-section card">
          <h2 class="section-title">Repository Details</h2>
          <form @submit.prevent="generateReadme" class="generator-form">
            <div class="form-group">
              <label for="github-username" class="form-label">GitHub Username</label>
              <input 
                type="text" 
                id="github-username" 
                v-model="formData.username" 
                class="form-control" 
                placeholder="e.g., octocat"
                required
              />
            </div>
            
            <div v-if="!loggedIn" class="form-group">
              <label for="repo-name" class="form-label">Repository Name</label>
              <input 
                type="text" 
                id="repo-name" 
                v-model="formData.repoName" 
                class="form-control" 
                placeholder="e.g., my-awesome-project"
                required
              />
            </div>

            <!-- Repository Dropdown -->
            <div v-else class="form-group">
              <label for="repo-name" class="form-label">Select Repository</label>
              <div class="custom-select">
                <div 
                  class="select-selected"
                  @click="toggleRepoDropdown"
                >
                  <span>{{ formData.repoName || 'Select a repository' }}</span>
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
                    :class="['chevron-icon', { 'open': isRepoDropdownOpen }]"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
                <div 
                  class="select-items" 
                  :class="{ 'select-hide': !isRepoDropdownOpen }"
                >
                  <div 
                    v-for="repo in repos" 
                    :key="repo.id"
                    @click="selectRepo(repo.name)"
                    class="select-item"
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
                      class="repo-icon"
                    >
                      <path d="M3 3v18h18"></path>
                      <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
                    </svg>
                    {{ repo.name }}
                  </div>
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <label for="branch-name" class="form-label">Branch Name</label>
              <input 
                type="text" 
                id="branch-name" 
                v-model="formData.branchName" 
                class="form-control" 
                placeholder="e.g., main"
                required
              />
            </div>
            
            <div v-if="mode === 'basic'" class="form-group">
              <label for="file-name" class="form-label">File Path</label>
              <div class="file-path-container">
                <input 
                  type="text" 
                  id="file-name" 
                  v-model="formData.fileName" 
                  class="form-control" 
                  placeholder="e.g., index.js or data/index.js"
                  required
                  @focus="showFileTree = true"
                />
                <div 
                  v-if="tree.length > 0" 
                  class="file-tree-toggle"
                  @click="showFileTree = !showFileTree"
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
                  >
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
              </div>
              
              <div v-if="showFileTree && tree.length > 0" class="file-tree-dropdown">
                <div class="file-tree">
                  <div class="file-tree-header">
                    <span>Repository Files</span>
                    <button 
                      type="button" 
                      class="close-tree-btn"
                      @click="showFileTree = false"
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
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                  <div class="file-tree-content">
                    <template v-for="(item, index) in organizedTree" :key="index">
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
              </div>
              
              <small class="form-hint">For files in folders, provide the complete path (e.g., data/index.js)</small>
            </div>
            
            <button 
              type="submit" 
              class="btn btn-success generate-btn"
              :disabled="mode === 'smart'"
            >
              Generate README
            </button>
            
            <div v-if="mode === 'smart'" class="smart-mode-notice">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <p>Smart mode is coming soon! This feature will analyze your entire repository structure and generate a comprehensive README.</p>
            </div>
          </form>
        </div>
        
        <div v-if="isLoading" class="preview-section card loading-container">
          <loading-screen />
        </div>
        
        <div v-else-if="markdownContent" class="preview-section card">
          <div class="preview-header">
            <h2 class="section-title">README Preview</h2>
            <div class="preview-actions">
              <button @click="copyMarkdown" class="btn btn-outline action-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="action-icon">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                Copy Markdown
              </button>
              <button @click="downloadMarkdown" class="btn btn-outline action-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="action-icon">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download .md
              </button>
            </div>
          </div>
          
          <div class="markdown-preview">
            <markdown-preview :content="markdownContent" />
          </div>
          
          <div class="markdown-source">
            <h3 class="source-title">Markdown Source</h3>
            <pre class="source-code"><code>{{ markdownContent }}</code></pre>
          </div>
        </div>
        
        <div v-else class="preview-section card empty-preview">
          <div class="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="empty-icon">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <h3 class="empty-title">No README Generated Yet</h3>
            <p class="empty-description">Fill in the form and click "Generate README" to see a preview here.</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import LoadingScreen from '../components/LoadingScreen.vue';
import MarkdownPreview from '../components/MarkdownPreview.vue';
import { useUserStore } from '@/store';
import axios from 'axios';
import FolderTree from '../components/FolderTree.vue';

const store = useUserStore();

const mode = ref('basic'); // 'basic' or 'smart'

const formData = ref({
  username: store.username,
  repoName: '',
  branchName: 'main',
  fileName: ''
});

const repos = computed(() => store.repos);
const loggedIn = computed(() => store.loggedIn);

watch(() => store.username, (newUsername) => {
  formData.value.username = newUsername;
});

const isLoading = ref(false);
const markdownContent = ref('');
const tree = ref([]);
const isRepoDropdownOpen = ref(false);
const showFileTree = ref(false);

const onRepoChange = async () => {
  if (!formData.value.repoName) return;
  
  try {
    const resp = await axios.get('/api/tree', {
      params: {
        githubId: formData.value.username,
        repoName: formData.value.repoName,
        branchName: formData.value.branchName,
      }
    });

    tree.value = resp.data;
  } catch (error) {
    console.error('Error fetching repository tree:', error);
    tree.value = [];
  }
};

// Organize the flat tree into a nested structure
const organizedTree = computed(() => {
  const result = [];
  const folderMap = new Map();
  
  // First pass: create all folders
  tree.value.forEach(path => {
    const parts = path.split('/');
    let currentPath = '';
    
    // Create folder structure
    for (let i = 0; i < parts.length - 1; i++) {
      const folderName = parts[i];
      currentPath = currentPath ? `${currentPath}/${folderName}` : folderName;
      
      if (!folderMap.has(currentPath)) {
        const folder = {
          name: folderName,
          path: currentPath,
          isFolder: true,
          children: []
        };
        folderMap.set(currentPath, folder);
        
        // Add to parent folder or root
        if (i === 0) {
          result.push(folder);
        } else {
          const parentPath = parts.slice(0, i).join('/');
          const parent = folderMap.get(parentPath);
          if (parent) {
            parent.children.push(folder);
          }
        }
      }
    }
  });
  
  // Second pass: add files
  tree.value.forEach(path => {
    const parts = path.split('/');
    const fileName = parts[parts.length - 1];
    
    // File at root level
    if (parts.length === 1) {
      result.push({
        name: fileName,
        path: fileName,
        isFolder: false
      });
    } else {
      // File in a folder
      const folderPath = parts.slice(0, parts.length - 1).join('/');
      const folder = folderMap.get(folderPath);
      if (folder) {
        folder.children.push({
          name: fileName,
          path: path,
          isFolder: false
        });
      }
    }
  });
  
  return result;
});

const toggleRepoDropdown = () => {
  isRepoDropdownOpen.value = !isRepoDropdownOpen.value;
};

const selectRepo = async (repoName) => {
  formData.value.repoName = repoName;
  isRepoDropdownOpen.value = false;
  await onRepoChange();
};

const selectFile = (filePath) => {
  formData.value.fileName = filePath;
  showFileTree.value = false;
};

const setMode = (newMode) => {
  mode.value = newMode;
  // Clear any previous results when switching modes
  if (markdownContent.value) {
    markdownContent.value = '';
  }
};

const generateReadme = async () => {
  if (mode.value === 'smart') {
    // Smart mode is not implemented yet
    return;
  }
  
  isLoading.value = true;

  try {
    const resp = await axios.get('/api/generate', {
      params: {
        githubId: formData.value.username,
        repoName: formData.value.repoName,
        branchName: formData.value.branchName,
        fileName: formData.value.fileName,
      }
    });

    markdownContent.value = resp.data;
  } catch (error) {
    console.error('Error generating README:', error);
    // Handle error
  } finally {
    isLoading.value = false;
  }
};

const copyMarkdown = () => {
  navigator.clipboard.writeText(markdownContent.value)
    .then(() => {
      alert('Markdown copied to clipboard!');
    })
    .catch(err => {
      console.error('Failed to copy text: ', err);
    });
};

const downloadMarkdown = () => {
  const blob = new Blob([markdownContent.value], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'README.md';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Close dropdowns when clicking outside
onMounted(() => {
  const handleClickOutside = (event) => {
    const repoDropdown = document.querySelector('.custom-select');
    const fileTreeDropdown = document.querySelector('.file-tree-dropdown');
    
    if (repoDropdown && !repoDropdown.contains(event.target)) {
      isRepoDropdownOpen.value = false;
    }
    
    if (fileTreeDropdown && !fileTreeDropdown.contains(event.target) && 
        !document.querySelector('.file-path-container').contains(event.target)) {
      showFileTree.value = false;
    }
  };

  document.addEventListener('click', handleClickOutside);

  return () => {
    document.removeEventListener('click', handleClickOutside);
  };
});
</script>

<style scoped>
.generator {
  padding: 2rem 0;
  flex: 1;
}

.page-title {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2rem;
}

.mode-toggle-container {
  max-width: 600px;
  margin: 0 auto 2rem;
  text-align: center;
}

.mode-toggle {
  display: flex;
  background-color: var(--secondary-bg);
  border-radius: 8px;
  padding: 0.25rem;
  margin-bottom: 0.75rem;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.toggle-btn {
  flex: 1;
  background: none;
  border: none;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
  cursor: pointer;
  border-radius: 6px;
  position: relative;
  transition: all 0.2s ease;
}

.toggle-btn.active {
  background-color: var(--primary);
  color: #fff;
}

.toggle-btn:not(.active):hover {
  background-color: rgba(88, 166, 255, 0.1);
}

.coming-soon-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: var(--success);
  color: white;
  font-size: 0.6rem;
  padding: 0.2rem 0.4rem;
  border-radius: 10px;
  font-weight: bold;
  transform: scale(0.85);
}

.mode-description {
  color: #8b949e;
  font-size: 1.1rem;
}

.generator-container {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 2rem;
}

.form-section, 
.preview-section {
  padding: 1.5rem;
  overflow-x: hidden; /* Prevent horizontal overflow */
  word-wrap: break-word; /* Ensure long words wrap */
  white-space: pre-wrap; /* Preserve formatting while wrapping text */
  width: 100%; /* Ensure it doesn't exceed its container */
  max-width: 100%; /* Prevent it from growing beyond its parent */
  box-sizing: border-box;
}

.section-title {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.form-group {
  position: relative; /* Add this to ensure proper dropdown positioning */
  margin-bottom: 1rem;
}

.generator-form {
  display: flex;
  flex-direction: column;
}

/* Custom Select Styling */
.custom-select {
  position: relative;
  width: 100%;
}

.select-selected {
  background-color: var(--background);
  color: var(--text);
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: border-color 0.15s ease-in-out;
}

.select-selected:hover {
  border-color: var(--primary);
}

.chevron-icon {
  transition: transform 0.2s ease;
}

.chevron-icon.open {
  transform: rotate(180deg);
}

.select-items {
  position: absolute;
  background-color: var(--secondary-bg);
  top: 100%;
  left: 0;
  right: 0;
  z-index: 99;
  max-height: 250px;
  overflow-y: auto;
  border-radius: 6px;
  margin-top: 0.25rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--border);
}

.select-hide {
  display: none;
}

.select-item {
  color: var(--text);
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.select-item:hover {
  background-color: rgba(88, 166, 255, 0.1);
}

.repo-icon {
  color: var(--primary);
}

/* File Path Input and Tree */
.file-path-container {
  position: relative;
  display: flex;
  align-items: center;
}

.file-tree-toggle {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: var(--text);
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.file-tree-toggle:hover {
  opacity: 1;
}

.file-tree-dropdown {
  position: absolute;
  z-index: 99;
  width: 100%;
  margin-top: 0.25rem;
  background-color: var(--secondary-bg);
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--border);
  max-height: 300px;
  max-width: 100%; /* Ensure it doesn't exceed parent width */
  box-sizing: border-box; /* Include padding and border in the width */
  left: 0; /* Align to the left edge of the parent */
  right: 0; /* Align to the right edge of the parent */
}

.file-tree {
  display: flex;
  flex-direction: column;
}

.file-tree-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border);
  font-weight: 600;
}

.close-tree-btn {
  background: none;
  border: none;
  color: var(--text);
  cursor: pointer;
  padding: 0.25rem;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.close-tree-btn:hover {
  opacity: 1;
}

.file-tree-content {
  padding: 0.5rem 0;
  overflow-y: auto;
  max-height: 250px;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.file-item:hover {
  background-color: rgba(88, 166, 255, 0.1);
}

.file-icon {
  color: #8b949e;
}

.form-hint {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.8rem;
  color: #8b949e;
}

.generate-btn {
  margin-top: 1rem;
}

.generate-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.smart-mode-notice {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: rgba(88, 166, 255, 0.1);
  border-radius: 6px;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.smart-mode-notice svg {
  color: var(--primary);
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.smart-mode-notice p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text);
  line-height: 1.5;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.preview-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.action-icon {
  width: 16px;
  height: 16px;
}

.markdown-preview {
  padding: 1rem;
  background-color: var(--secondary-bg);
  border-radius: 6px;
  margin-bottom: 1.5rem;
  max-height: 400px;
  overflow-y: auto;
}

.markdown-source {
  margin-top: 1.5rem;
}

.source-title {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.source-code {
  background-color: #161b22;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  max-height: 200px;
  overflow-y: auto;
  color: #c9d1d9;
}

.empty-preview {
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-state {
  text-align: center;
  padding: 2rem;
}

.empty-icon {
  color: #8b949e;
  margin-bottom: 1rem;
}

.empty-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.empty-description {
  color: #8b949e;
}

.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

@media (max-width: 992px) {
  .generator-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 576px) {
  .mode-toggle {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .coming-soon-badge {
    top: 0;
    right: 0;
  }
}
</style>
