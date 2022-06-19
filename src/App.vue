<script setup lang="ts">
import { useAuthStore } from './modules/auth/store'

const authStore = useAuthStore()
authStore.verifyUser()
</script>

<template>
  <router-view />
</template>

<style></style>
