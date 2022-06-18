<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../modules/auth/store'
import { storeToRefs } from 'pinia'
import RegisterModal from '../modules/auth/components/RegisterModal.vue'
import LoginModal from '../modules/auth/components/LoginModal.vue'

const isLoginModalOpen = ref(false)
const isRegisterModalOpen = ref(false)
const isSearchModalOpen = ref(false)
const isNavbarOpen = ref(false)

const handleLoginModalOpen = (value: boolean) => {
  isLoginModalOpen.value = value
}

const handleRegisterModal = (value: boolean) => {
  isRegisterModalOpen.value = value
}

const authStore = useAuthStore()
const { authenticated } = storeToRefs(authStore)
</script>

<template>
  <header class="w-full h-20 bg-gray-900">
    <div class="hidden app-container md:flex">
      <h1>App</h1>
      <div>
        <nav>
          <button>Sign In</button>
          <button>Sign up</button>
          <a href="">Films</a>
          <a href="">Shows</a>
        </nav>
        <input type="text" placeholder="Search" />
      </div>
    </div>
    <!-- Mobile -->
    <div
      class="flex items-center justify-between h-full text-gray-200 app-container md:hidden"
    >
      <router-link :to="{ name: 'home' }"
        ><h1 class="text-2xl font-bold">MovieGraph</h1></router-link
      >
      <div class="flex text-2xl space-x-5">
        <template v-if="!authenticated">
          <button @click="handleLoginModalOpen(true)">
            <font-awesome-icon :icon="['fas', 'user-lock']" />
          </button>
          <button @click="handleRegisterModal(true)">
            <font-awesome-icon :icon="['fas', 'user-plus']" />
          </button>
        </template>
        <template v-else>
          <button v-if="isNavbarOpen">
            <font-awesome-icon :icon="['fas', 'close']" />
          </button>
          <button v-else>
            <font-awesome-icon :icon="['fas', 'bars']" />
          </button>
        </template>
        <button>
          <font-awesome-icon :icon="['fas', 'search']" />
        </button>
      </div>
    </div>
  </header>
  <RegisterModal
    v-if="isRegisterModalOpen"
    @on-close="handleRegisterModal(false)"
  />
  <LoginModal v-if="isLoginModalOpen" @on-close="handleLoginModalOpen(false)" />
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
