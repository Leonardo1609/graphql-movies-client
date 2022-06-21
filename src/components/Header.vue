<script setup lang="ts">
import HeaderMobile from './HeaderMobile.vue'
import LoginModal from '../modules/auth/components/LoginModal.vue'
import RegisterModal from '../modules/auth/components/RegisterModal.vue'
import SearchModal from '../modules/public/components/SearchModal.vue'
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../modules/auth/store'
import { useHeader } from '../store/useHeader'
import { useRouter } from 'vue-router'
import { useSearch } from '../modules/public/store/useSearch'

const router = useRouter()

const authStore = useAuthStore()
const { authenticated, user } = storeToRefs(authStore)

const headerStore = useHeader()
const { isLoginModalOpen, isSearchModalOpen, isRegisterModalOpen } =
  storeToRefs(headerStore)

const searchStore = useSearch()

const searchText = ref('')
const searchOption = ref('film')

watch(searchStore, (currentValue) => {
  searchOption.value = currentValue.type === 'MOVIE' ? 'film' : 'show'
})

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
                  @click="headerStore.handleLoginModalOpen(true)"
                >
                  Sign In
                </button>
              </li>
              <li>
                <button
                  class="font-bold uppercase"
                  @click="headerStore.handleRegisterModal(true)"
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
    <HeaderMobile />
  </header>
  <!-- Modals -->
  <RegisterModal
    v-if="isRegisterModalOpen"
    @on-close="headerStore.handleRegisterModal(false)"
  />
  <LoginModal
    v-if="isLoginModalOpen"
    @on-close="headerStore.handleLoginModalOpen(false)"
  />
  <SearchModal
    v-if="isSearchModalOpen"
    @on-close="headerStore.handleSearchModal(false)"
  />
</template>
