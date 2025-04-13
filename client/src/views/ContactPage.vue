<template>
  <main class="contact-page">
    <div class="container">
      <h1 class="page-title">Contact Us</h1>
      
      <div class="contact-container">
        <div class="contact-info card">
          <h2 class="section-title">Get in Touch</h2>
          <p class="contact-description">
            Have questions, suggestions, or feedback about the README Generator? We'd love to hear from you! Fill out the form and we'll get back to you as soon as possible.
          </p>
          
          <div class="contact-methods">
            <!-- <div class="contact-method">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="contact-icon">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <div class="contact-details">
                <h3 class="method-title">Email</h3>
                <a href="mailto:contact@readmegenerator.com" class="contact-link">contact@readmegenerator.com</a>
              </div>
            </div> -->
            
            <div class="contact-method">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="contact-icon">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              <div class="contact-details">
                <h3 class="method-title">GitHub</h3>
                <a href="https://github.com/jaigupta04" target="_blank" rel="noopener noreferrer" class="contact-link">github.com/jaigupta04</a>
              </div>
            </div>
            
            <div class="contact-method">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="contact-icon">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              <div class="contact-details">
                <h3 class="method-title">LinkedIn</h3>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" class="contact-link">linkedin.com/in/yourusername</a>
              </div>
            </div>
          </div>
        </div>
        
        <div class="contact-form card">
          <h2 class="section-title">Send a Message</h2>
          <form @submit.prevent="submitForm" class="form">
            <div class="form-group">
              <label for="name" class="form-label">Name</label>
              <input 
                type="text" 
                id="name" 
                v-model="formData.name" 
                class="form-control" 
                placeholder="Your name"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <input 
                type="email" 
                id="email" 
                v-model="formData.email" 
                class="form-control" 
                placeholder="Your email address"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="subject" class="form-label">Subject</label>
              <input 
                type="text" 
                id="subject" 
                v-model="formData.subject" 
                class="form-control" 
                placeholder="What is this regarding?"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="message" class="form-label">Message</label>
              <textarea 
                id="message" 
                v-model="formData.message" 
                class="form-control" 
                placeholder="Your message"
                rows="5"
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              class="btn btn-success submit-btn"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting">
                <svg class="spinner" viewBox="0 0 50 50">
                  <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                </svg>
                Sending...
              </span>
              <span v-else>Send Message</span>
            </button>
            
            <div v-if="formSubmitted" class="form-success">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="success-icon">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <p>Thank you for your message! We'll get back to you soon.</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const isSubmitting = ref(false);
const formSubmitted = ref(false);

const submitForm = async () => {
  isSubmitting.value = true;
  
  try {
    await axios.post('/api/contact', formData.value);

    formData.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
    
    formSubmitted.value = true;
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      formSubmitted.value = false;
    }, 5000);
  } catch (error) {
    console.error('Error submitting form:', error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.contact-page {
  padding: 2rem 0;
  flex: 1;
}

.page-title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
}

.contact-container {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 2rem;
}

.contact-info,
.contact-form {
  padding: 2rem;
}

.section-title {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.contact-description {
  color: var(--text);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-method {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.contact-icon {
  color: var(--primary);
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.method-title {
  font-size: 1.1rem;
  margin: 0 0 0.5rem 0;
}

.contact-link {
  color: var(--text);
  text-decoration: none;
  transition: color 0.2s ease;
}

.contact-link:hover {
  color: var(--primary);
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-weight: 500;
}

.form-control {
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  background-color: var(--background);
  color: var(--text);
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.form-control:focus {
  outline: none;
  border-color: var(--primary);
}

.form-control::placeholder {
  color: #8b949e;
}

textarea.form-control {
  resize: vertical;
  min-height: 120px;
}

.submit-btn {
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
}

.spinner {
  animation: rotate 2s linear infinite;
  width: 20px;
  height: 20px;
}

.spinner .path {
  stroke: #ffffff;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}

.form-success {
  margin-top: 1rem;
  padding: 1rem;
  background-color: rgba(46, 160, 67, 0.1);
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.success-icon {
  color: var(--success);
  flex-shrink: 0;
}

.form-success p {
  margin: 0;
  color: var(--text);
}

@media (max-width: 992px) {
  .contact-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 576px) {
  .contact-info,
  .contact-form {
    padding: 1.5rem;
  }
}
</style>
