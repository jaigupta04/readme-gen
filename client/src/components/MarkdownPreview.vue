<template>
  <div class="markdown-container" v-html="renderedMarkdown"></div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { marked } from 'marked';

const props = defineProps({
  content: {
    type: String,
    required: true
  }
});

const renderedMarkdown = ref('');

// Parse markdown to HTML
const renderMarkdown = (markdown) => {
  try {
    return marked(markdown);
  } catch (error) {
    console.error('Error rendering markdown:', error);
    return '<p>Error rendering markdown</p>';
  }
};

// Update rendered markdown when content changes
watch(() => props.content, (newContent) => {
  renderedMarkdown.value = renderMarkdown(newContent);
}, { immediate: true });
</script>

<style scoped>
.markdown-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
  line-height: 1.6;
  color: var(--text);
}

.markdown-container :deep(h1) {
  padding-bottom: 0.3em;
  font-size: 2em;
  border-bottom: 1px solid var(--border);
}

.markdown-container :deep(h2) {
  padding-bottom: 0.3em;
  font-size: 1.5em;
  border-bottom: 1px solid var(--border);
}

.markdown-container :deep(h3) {
  font-size: 1.25em;
}

.markdown-container :deep(h4) {
  font-size: 1em;
}

.markdown-container :deep(h5) {
  font-size: 0.875em;
}

.markdown-container :deep(h6) {
  font-size: 0.85em;
  color: #6a737d;
}

.markdown-container :deep(p) {
  margin-top: 0;
  margin-bottom: 16px;
}

.markdown-container :deep(a) {
  color: var(--primary);
  text-decoration: none;
}

.markdown-container :deep(a:hover) {
  text-decoration: underline;
}

.markdown-container :deep(ul),
.markdown-container :deep(ol) {
  padding-left: 2em;
  margin-top: 0;
  margin-bottom: 16px;
}

.markdown-container :deep(li) {
  margin-top: 0.25em;
}

.markdown-container :deep(code) {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(110, 118, 129, 0.4);
  border-radius: 3px;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
}

.markdown-container :deep(pre) {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #161b22;
  border-radius: 3px;
  margin-top: 0;
  margin-bottom: 16px;
}

.markdown-container :deep(pre code) {
  padding: 0;
  margin: 0;
  background-color: transparent;
  border: 0;
  word-break: normal;
  white-space: pre;
}

.markdown-container :deep(blockquote) {
  padding: 0 1em;
  color: #8b949e;
  border-left: 0.25em solid #30363d;
  margin: 0 0 16px 0;
}

.markdown-container :deep(img) {
  max-width: 100%;
  box-sizing: content-box;
  background-color: #0d1117;
}

.markdown-container :deep(hr) {
  height: 0.25em;
  padding: 0;
  margin: 24px 0;
  background-color: #30363d;
  border: 0;
}

.markdown-container :deep(table) {
  border-spacing: 0;
  border-collapse: collapse;
  margin-top: 0;
  margin-bottom: 16px;
  width: 100%;
  overflow: auto;
}

.markdown-container :deep(table th) {
  font-weight: 600;
  padding: 6px 13px;
  border: 1px solid #30363d;
}

.markdown-container :deep(table td) {
  padding: 6px 13px;
  border: 1px solid #30363d;
}

.markdown-container :deep(table tr) {
  background-color: #0d1117;
  border-top: 1px solid #30363d;
}

.markdown-container :deep(table tr:nth-child(2n)) {
  background-color: #161b22;
}
</style>
