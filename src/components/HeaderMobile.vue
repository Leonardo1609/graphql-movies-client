<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../modules/auth/store'
import { useHeader } from '../store/useHeader'

const authStore = useAuthStore()
const { authenticated, user } = storeToRefs(authStore)

const headerStore = useHeader()
const { isNavbarOpen } = storeToRefs(headerStore)
</script>

<template>
  <div
    class="flex items-center justify-between h-full text-gray-200 app-container md:hidden"
  >
    <router-link :to="{ name: 'home' }"
      ><h1 class="text-2xl font-bold">MovieGraph</h1></router-link
    >
    <div class="flex text-2xl space-x-5">
      <template v-if="!authenticated">
        <button @click="headerStore.handleLoginModalOpen(true)">
          <font-awesome-icon :icon="['fas', 'user-lock']" />
        </button>
        <button @click="headerStore.handleRegisterModal(true)">
          <font-awesome-icon :icon="['fas', 'user-plus']" />
        </button>
      </template>
      <template v-else>
        <button>
          <font-awesome-icon :icon="['fas', 'plus']" />
        </button>
      </template>
      <button v-if="isNavbarOpen" @click="headerStore.handleNavbarOpen(false)">
        <font-awesome-icon :icon="['fas', 'close']" />
      </button>
      <button
        v-else
        @click="headerStore.handleNavbarOpen(true)"
        id="open-navbar-btn"
      >
        <font-awesome-icon
          :icon="['fas', 'bars']"
          class="pointer-events-none"
        />
      </button>
      <button @click="headerStore.handleSearchModal(true)">
        <font-awesome-icon :icon="['fas', 'search']" />
      </button>
    </div>
  </div>
  <nav
    v-click-outside:open-navbar-btn="headerStore.handleClickOutsideNavbar"
    v-if="isNavbarOpen"
    class="absolute left-0 z-50 w-full text-gray-200 bg-gray-900 drop-shadow-2xl mt-[-1px]"
  >
    <ul class="flex flex-col px-5 box-border">
      <li class="w-full" v-if="authenticated">
        <span class="block px-1 py-2 border-b border-gray-400">{{
          user?.username
        }}</span>
        <ul class="p-2 text-sm uppercase">
          <li class="py-1">
            <router-link
              class="block"
              @click="headerStore.handleNavbarOpen(false)"
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
              @click="headerStore.handleNavbarOpen(false)"
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
              @click="headerStore.handleNavbarOpen(false)"
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
              @click="headerStore.handleLogout()"
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
</template>

<style scoped></style>
