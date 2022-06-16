<script setup lang="ts"></script>

<template>
  <header class="w-full h-20 bg-gray-900">
    <div class="flex app-container">
      <h1>App</h1>
      <nav>
        <button>Sign In</button>
        <button>Sign up</button>
        <a href="">Films</a>
        <a href="">Shows</a>
      </nav>
      <input type="text" placeholder="Search" />
    </div>
  </header>
  <div class="bg-gray-800">
    <div class="min-h-[calc(100vh-160px)] pb-10">
      <router-view />
    </div>
  </div>
  <footer class="w-full h-20 bg-gray-900">
    <div class="app-container">
      <p>2022</p>
    </div>
  </footer>
</template>
