<script setup lang="ts">
import { useHeader } from '../../../store/useHeader'
import { useAuthStore } from '../../auth/store'

defineProps<{
  itemId: number
}>()
const authStore = useAuthStore()
const headerStore = useHeader()

const handleRecord = () => {
  if (!authStore.authenticated) {
    headerStore.handleLoginModalOpen(true)
  }
}
</script>

<template>
  <button
    @click="handleRecord"
    class="w-16 h-16 text-gray-200 bg-green-600 rounded-full md:w-20 md:h-20"
  >
    <font-awesome-icon :icon="['fas', 'plus']" class="text-2xl md:text-3xl" />
  </button>
</template>
