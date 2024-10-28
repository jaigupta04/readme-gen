<template>
    <main>
      <Readme :doGet="doGet" :doPost="doPost" :repos="repos" :username="username"/>
    </main>
  </template>
  
<script>
  import Readme from '../components/Readme.vue'
  
  export default {
    components: {
      Readme
    },
  
    props: {
      doGet: Function,
      doPost: Function,
      repos: Array,
      username: String
    },
  
    data() {
      return {};
    },

    watch: {
      username() {},
      repos() {}
    },
  }
</script>
