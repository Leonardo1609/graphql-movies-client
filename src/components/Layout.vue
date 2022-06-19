<script setup lang="ts">
import { Directive, ref } from 'vue'
import { useAuthStore } from '../modules/auth/store'
import { storeToRefs } from 'pinia'
import RegisterModal from '../modules/auth/components/RegisterModal.vue'
import LoginModal from '../modules/auth/components/LoginModal.vue'
import SearchModal from '../modules/public/components/SearchModal.vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()
const { authenticated, user } = storeToRefs(authStore)

const searchText = ref('')
const searchOption = ref('film')

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

const handleNavbarOpen = (value: boolean) => {
  isNavbarOpen.value = value
}

const handleLogout = () => {
  toast.success('See you soon :)')
  authStore.logout()
  handleNavbarOpen(false)
}

const vClickOutside: Directive = {
  mounted(el, binding) {
    // I saved as a new method of the element, because I can have access later in the unmounted method
    el.clickOutsideEvent = function (event: any) {
      if (
        !(
          el === event.target ||
          el.contains(event.target) ||
          event.target.id === binding.arg
        )
      ) {
        binding.value()
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
}

const handleClickOutsideNavbar = () => {
  handleNavbarOpen(false)
}

const handleSearch = () => {
  if (searchText.value.trim()) {
    router.push({
      name: 'search',
      params: {
        type: searchOption.value,
        text: searchText.value.toLowerCase().trim(),
      },
    })
  }
}

const handleSearchModal = (value: boolean) => {
  isSearchModalOpen.value = value
}
</script>

<template>
  <header class="w-full h-20 bg-gray-900">
    <div
      class="items-center justify-between hidden h-full text-gray-200 app-container md:flex"
    >
      <router-link :to="{ name: 'home' }">
        <h1 class="text-3xl font-bold">Movie App</h1>
      </router-link>
      <div class="flex items-center space-x-5">
        <nav class="uppercase">
          <ul class="flex space-x-4">
            <template v-if="!authenticated">
              <li>
                <button
                  class="font-bold uppercase"
                  @click="handleLoginModalOpen(true)"
                >
                  Sign In
                </button>
              </li>
              <li>
                <button
                  class="font-bold uppercase"
                  @click="handleRegisterModal(true)"
                >
                  Sign up
                </button>
              </li>
            </template>
            <template v-else>
              <li>{{ user?.username }}</li>
            </template>
            <li>
              <span class="font-bold">Films</span>
            </li>
            <li>
              <span class="font-bold">Shows</span>
            </li>
          </ul>
        </nav>
        <form
          @submit.prevent="handleSearch"
          class="max-w-[240px] flex rounded overflow-hidden"
        >
          <div class="relative">
            <input
              class="w-full px-2 py-1 text-sm text-black outline-none"
              type="text"
              v-model="searchText"
              placeholder="Search"
            />
            <button
              type="submit"
              class="absolute top-[0.5px] text-gray-700 right-1"
            >
              <font-awesome-icon :icon="['fas', 'search']" />
            </button>
          </div>
          <select
            id="type"
            name="type"
            class="block h-auto px-1 text-sm uppercase bg-gray-600 outline-none"
            v-model="searchOption"
          >
            <option value="film">Film</option>
            <option value="show">TV</option>
          </select>
        </form>
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
          <button>
            <font-awesome-icon :icon="['fas', 'plus']" />
          </button>
          <button v-if="isNavbarOpen" @click="handleNavbarOpen(false)">
            <font-awesome-icon :icon="['fas', 'close']" />
          </button>
          <button v-else @click="handleNavbarOpen(true)" id="open-navbar-btn">
            <font-awesome-icon
              :icon="['fas', 'bars']"
              class="pointer-events-none"
            />
          </button>
        </template>
        <button @click="handleSearchModal(true)">
          <font-awesome-icon :icon="['fas', 'search']" />
        </button>
      </div>
    </div>
    <nav
      v-click-outside:open-navbar-btn="handleClickOutsideNavbar"
      v-if="isNavbarOpen"
      class="absolute left-0 z-50 w-full text-gray-200 bg-gray-900 drop-shadow-2xl mt-[-1px]"
    >
      <ul class="flex flex-col px-5 box-border">
        <li class="w-full">
          <span class="block px-1 py-2 border-b border-gray-400">{{
            user?.username
          }}</span>
          <ul class="p-2 text-sm uppercase">
            <li class="py-1">
              <router-link
                class="block"
                @click="handleNavbarOpen(false)"
                :to="{
                  name: 'profile',
                  params: { user: user?.username?.toLowerCase() },
                }"
                >Profile</router-link
              >
            </li>
            <li class="py-1">
              <router-link
                class="block"
                @click="handleNavbarOpen(false)"
                :to="{
                  name: 'watchlist',
                  params: { user: user?.username?.toLowerCase() },
                }"
                >Watchlist</router-link
              >
            </li>
            <li class="py-1">
              <router-link
                class="block"
                @click="handleNavbarOpen(false)"
                :to="{
                  name: 'favourites',
                  params: { user: user?.username?.toLowerCase() },
                }"
                >Favourites</router-link
              >
            </li>
            <li class="py-1">
              <button
                class="w-full text-left uppercase"
                @click="handleLogout()"
              >
                Logout
              </button>
            </li>
          </ul>
        </li>
        <li class="w-full uppercase">
          <span
            class="block px-1 py-2 uppercase border-t border-b border-gray-400"
            >Films</span
          >
          <ul class="p-2 text-sm uppercase">
            <li class="py-1">Top 250 Films</li>
            <li class="py-1">Popular</li>
            <li class="py-1">Search</li>
          </ul>
        </li>
        <li class="w-full uppercase">
          <span
            class="block px-1 py-2 uppercase border-t border-b border-gray-400"
            >Shows</span
          >
          <ul class="p-2 text-sm uppercase">
            <li class="py-1">Top 250 Shows</li>
            <li class="py-1">Popular</li>
            <li class="py-1">Search</li>
          </ul>
        </li>
      </ul>
    </nav>
  </header>
  <RegisterModal
    v-if="isRegisterModalOpen"
    @on-close="handleRegisterModal(false)"
  />
  <LoginModal v-if="isLoginModalOpen" @on-close="handleLoginModalOpen(false)" />
  <SearchModal v-if="isSearchModalOpen" @on-close="handleSearchModal(false)" />
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
