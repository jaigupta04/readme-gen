<template>
  <main class="updates-page">
    <div class="container">
      <h1 class="page-title">Version History</h1>
      
      <div class="updates-container card">
        <div class="updates-header">
          <h2 class="section-title">Changelog</h2>
          <p class="updates-description">
            Track the evolution of README Generator with our detailed version history. See what features and improvements have been added over time.
          </p>
        </div>

      <!-- yello tag for future use-->
        <!-- <div class="feature-item">
          <div class="feature-header">
            <div class="feature-tag improved">Improved</div>
            <h4 class="feature-title">File Tree Navigation</h4>
          </div>
          <p class="feature-description">
            Enhanced the file tree explorer with better visual hierarchy and performance.
          </p>
          <ul class="feature-details">
            <li>Optimized tree rendering for large repositories</li>
            <li>Improved folder expansion/collapse animations</li>
            <li>Better error handling for failed API requests</li>
          </ul>
        </div> -->
        
        <div class="version-timeline">
          <!-- Version 2.1.1 -->
          <div class="version-item">
            <div class="version-badge">
              <span class="version-number">v2.1.1</span>
              <span class="version-date">April 12, 2025</span>
            </div>
            
            <div class="version-content">
              <h3 class="version-title">Github login</h3>
              
              <div class="version-features">
                
                <div class="feature-item">
                  <div class="feature-header">
                    <div class="feature-tag fixed">Fixed</div>
                    <h4 class="feature-title">Automatic Github login</h4>
                  </div>
                  <p class="feature-description">
                    Resolved issue where app auto-logged into GitHub without prompting user for account selection.
                  </p>
                  <ul class="feature-details">
                    <li>More security</li>
                    <li>Asking for account selection before login</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Version 2.1.0 -->
          <div class="version-item">
            <div class="version-badge">
              <span class="version-number">v2.1.0</span>
              <span class="version-date">April 10, 2025</span>
            </div>
            
            <div class="version-content">
              <h3 class="version-title">File Tree Explorer & UI Enhancements</h3>
              
              <div class="version-features">
                <div class="feature-item">
                  <div class="feature-header">
                    <div class="feature-tag new">New</div>
                    <h4 class="feature-title">File Tree Explorer</h4>
                  </div>
                  <p class="feature-description">
                    Added a visual file tree explorer to make it easier to select files from your repository.
                  </p>
                  <ul class="feature-details">
                    <li>Hierarchical display of folders and files</li>
                    <li>Expandable/collapsible folders</li>
                    <li>Visual icons for different file types</li>
                    <li>Click to select files directly from the tree</li>
                  </ul>
                </div>
              
              </div>
            </div>
          </div>
          
          <!-- Version 2.0.1 -->
          <div class="version-item">
            <div class="version-badge">
              <span class="version-number">v2.0.1</span>
              <span class="version-date">April 05, 2025</span>
            </div>
            
            <div class="version-content">
              <h3 class="version-title">Download file extension</h3>
              
              <div class="version-features">   
                <div class="feature-item">
                  <div class="feature-header">
                    <div class="feature-tag fixed">Fixed</div>
                    <h4 class="feature-title">Bug Fixes</h4>
                  </div>
                  <p class="feature-description">
                    Fixed download file extension, which was not .md for some files
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Version 2.0.0 -->
          <div class="version-item">
            <div class="version-badge">
              <span class="version-number">v2.0.0</span>
              <span class="version-date">April 04, 2025</span>
            </div>
            
            <div class="version-content">
              <h3 class="version-title">Initial Release</h3>
              
              <div class="version-features">
                <div class="feature-item">
                  <div class="feature-header">
                    <div class="feature-tag new">New</div>
                    <h4 class="feature-title">Core Functionality</h4>
                  </div>
                  <p class="feature-description">
                    First public release of the GitHub README Generator with core functionality.
                  </p>
                  <ul class="feature-details">
                    <li>GitHub authentication integration</li>
                    <li>Repository selection</li>
                    <li>Basic README generation for individual files</li>
                    <li>Markdown preview and editing</li>
                  </ul>
                </div>
                
                <div class="feature-item">
                  <div class="feature-header">
                    <div class="feature-tag new">New</div>
                    <h4 class="feature-title">User Interface</h4>
                  </div>
                  <p class="feature-description">
                    Clean, GitHub-inspired user interface with responsive design.
                  </p>
                  <ul class="feature-details">
                    <li>Mobile-responsive layout</li>
                    <li>Intuitive navigation</li>
                    <li>Form validation</li>
                    <li>Loading indicators</li>
                  </ul>
                </div>
                
                <div class="feature-item">
                  <div class="feature-header">
                    <div class="feature-tag new">New</div>
                    <h4 class="feature-title">Export Options</h4>
                  </div>
                  <p class="feature-description">
                    Multiple options for exporting and using generated README files.
                  </p>
                  <ul class="feature-details">
                    <li>Copy markdown to clipboard</li>
                    <li>Download as .md file</li>
                    <li>Preview rendered markdown</li>
                  </ul>
                </div>

                <div class="feature-item">
                  <div class="feature-header">
                    <div class="feature-tag new">New</div>
                    <h4 class="feature-title">Smart Mode Preview</h4>
                  </div>
                  <p class="feature-description">
                    Added a preview of the upcoming Smart Mode feature that will generate comprehensive READMEs for entire repositories.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
// No additional script needed for this static page
</script>

<style scoped>
.updates-page {
  padding: 2rem 0;
  flex: 1;
}

.page-title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
}

.updates-container {
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.updates-header {
  margin-bottom: 3rem;
  text-align: center;
}

.section-title {
  margin-bottom: 1rem;
  font-size: 1.75rem;
}

.updates-description {
  color: var(--text);
  line-height: 1.6;
  max-width: 700px;
  margin: 0 auto;
}

.version-timeline {
  position: relative;
}

.version-timeline::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 120px;
  width: 2px;
  background-color: var(--border);
}

.version-item {
  position: relative;
  display: flex;
  margin-bottom: 4rem;
}

.version-item:last-child {
  margin-bottom: 0;
}

.version-badge {
  position: relative;
  width: 120px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-right: 2rem;
}

.version-number {
  display: inline-block;
  background-color: var(--primary);
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  margin-bottom: 0.5rem;
  z-index: 1;
}

.version-date {
  font-size: 0.8rem;
  color: #8b949e;
}

.version-content {
  position: relative;
  padding-left: 2rem;
  flex-grow: 1;
}

.version-content::before {
  content: '';
  position: absolute;
  left: -5px;
  top: 8px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--primary);
  border: 2px solid var(--background);
  z-index: 1;
}

.version-title {
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  color: var(--text);
}

.version-features {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.feature-item {
  border-left: 2px solid var(--border);
  padding-left: 1.25rem;
}

.feature-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.feature-tag {
  display: inline-block;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
}

.feature-tag.new {
  background-color: rgba(88, 166, 255, 0.1);
  color: #58a6ff;
}

.feature-tag.improved {
  background-color: rgba(246, 185, 59, 0.1);
  color: #f6b93b;
}

.feature-tag.fixed {
  background-color: rgba(249, 62, 62, 0.1);
  color: #f93e3e;
}

.feature-title {
  font-size: 1.1rem;
  margin: 0;
  color: var(--text);
}

.feature-description {
  margin: 0 0 0.75rem 0;
  color: var(--text);
  line-height: 1.6;
}

.feature-details {
  margin: 0;
  padding-left: 1.25rem;
}

.feature-details li {
  margin-bottom: 0.5rem;
  color: #8b949e;
}

.feature-details li:last-child {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .updates-container {
    padding: 1.5rem;
  }
  
  .version-timeline::before {
    left: 20px;
  }
  
  .version-item {
    flex-direction: column;
  }
  
  .version-badge {
    width: 100%;
    padding-right: 0;
    padding-left: 50px;
    margin-bottom: 1rem;
  }
  
  .version-content {
    padding-left: 50px;
  }
  
  .version-content::before {
    left: 20px;
  }
}

@media (max-width: 576px) {
  .version-title {
    font-size: 1.2rem;
  }
  
  .feature-item {
    padding-left: 1rem;
  }
  
  .feature-title {
    font-size: 1rem;
  }
}
</style>
