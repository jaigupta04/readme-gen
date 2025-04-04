<template>
  <main class="home">
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Generate awesome GitHub README files</h1>
          <p class="hero-description">
            Create professional README.md files for your GitHub repositories in seconds.
            No more struggling with markdown syntax or formatting.
          </p>
          <div class="hero-actions">
            <router-link to="/generator" class="btn btn-primary">Get Started</router-link>
            <a href="#features" class="btn btn-outline">Learn More</a>
          </div>
        </div>
        <div class="hero-image">
          <div class="image-3d-wrapper">
            <img src="../../public/readme.png" alt="README Generator Preview" />
          </div>
        </div>
      </div>
    </section>

    <section id="features" class="features">
      <div class="container">
        <h2 class="section-title">Features</h2>
        <div class="features-grid">
          <div class="feature-card card">
            <div class="feature-icon">📝</div>
            <h3 class="feature-title">Easy to Use</h3>
            <p class="feature-description">
              Simply enter your GitHub details and generate a professional README in seconds.
            </p>
          </div>
          <div class="feature-card card">
            <div class="feature-icon">👁️</div>
            <h3 class="feature-title">Live Preview</h3>
            <p class="feature-description">
              See how your README will look before downloading or copying it.
            </p>
          </div>
          <!-- <div class="feature-card card">
            <div class="feature-icon">🔄</div>
            <h3 class="feature-title">Customizable</h3>
            <p class="feature-description">
              Tailor your README to fit your project's specific needs.
            </p>
          </div> -->
          <div class="feature-card card">
            <div class="feature-icon">🚀</div>
            <h3 class="feature-title">GitHub Integration</h3>
            <p class="feature-description">
              Login with GitHub to access your repositories directly.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="how-it-works">
      <div class="container">
        <h2 class="section-title">How It Works</h2>
        <div class="steps">
          <div class="step">
            <div class="step-number">1</div>
            <h3 class="step-title">Enter Repository Details</h3>
            <p class="step-description">
              Provide your GitHub username, repository name, branch, and file name.
            </p>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <h3 class="step-title">Generate README</h3>
            <p class="step-description">
              Click the generate button and wait for our backend to create your README.
            </p>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <h3 class="step-title">Preview & Download</h3>
            <p class="step-description">
              Preview the generated README, then copy or download it for your repository.
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.home {
  flex: 1;
}

.hero {
  padding: 4rem 0;
  background-color: var(--secondary-bg);
}

.hero .container {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.hero-content {
  flex: 1;
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
  width: 100%; 
  max-width: 500px; 
  height: auto;
}

.hero-image img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text);
}

.hero-description {
  font-size: 1.25rem;
  color: #8b949e;
  margin-bottom: 2rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.features {
  padding: 4rem 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.feature-description {
  color: #8b949e;
}

.how-it-works {
  padding: 4rem 0;
  background-color: var(--secondary-bg);
}

.steps {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}

.step {
  flex: 1;
  text-align: center;
  position: relative;
}

.step:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 2rem;
  right: -1rem;
  width: 2rem;
  height: 2px;
  background-color: var(--border);
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1rem;
  background-color: var(--primary);
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  border-radius: 50%;
}

.step-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.step-description {
  color: #8b949e;
}

.image-3d-wrapper {
  perspective: 1000px; /* Creates the 3D perspective */
}

.image-3d-wrapper img {
  transform: rotateY(-15deg) rotateX(5deg);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 12px;
}

.image-3d-wrapper img:hover {
  transform: rotateY(-5deg) rotateX(0deg) scale(1.03);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
}

@media (max-width: 768px) {
  .hero .container {
    flex-direction: column;
  }
  
  .steps {
    flex-direction: column;
  }
  
  .step:not(:last-child)::after {
    display: none;
  }
}
</style>
