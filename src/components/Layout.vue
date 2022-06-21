<script setup lang="ts">
import Header from './Header.vue'
import Footer from './Footer.vue'
</script>

<template>
  <Header />
  <div class="bg-gray-800">
    <div class="min-h-[calc(100vh-160px)] pb-10">
      <router-view />
    </div>
  </div>
  <Footer />
</template>
