<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSearch } from '../store/useSearch'

const emit = defineEmits<{
  (e: 'on-close'): void
}>()

const router = useRouter()

const searchStore = useSearch()
const searchRef = ref<HTMLInputElement>()

const searchText = ref('')
const searchOption = ref(searchStore.type === 'MOVIE' ? 'film' : 'show')

const handleSearch = () => {
  if (searchText.value.trim()) {
    router.push({
      name: 'search',
      params: {
        type: searchOption.value,
        text: searchText.value.toLowerCase().trim(),
      },
    })
    emit('on-close')
  }
}

onMounted(() => {
  searchRef.value?.focus()
})
</script>

<template>
  <div
    class="absolute bg-gray-600/75 h-screen w-screen flex justify-center items-start z-[100] top-0 left-0 px-5"
    @click.self="emit('on-close')"
  >
    <div
      class="w-full px-10 pt-5 pb-8 bg-gray-800 rounded-xl h-100 max-w-[500px] mt-32"
    >
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-light text-gray-300 uppercase">Search</h2>
        <button @click="emit('on-close')">
          <font-awesome-icon
            :icon="['fas', 'close']"
            class="text-2xl text-gray-300"
          />
        </button>
      </div>
      <form
        @submit.prevent="handleSearch"
        class="flex w-full overflow-hidden rounded"
      >
        <div class="relative flex-1">
          <input
            ref="searchRef"
            autofocus
            class="w-full px-2 py-2 text-black outline-none text-md"
            type="text"
            v-model="searchText"
            placeholder="Search"
          />
          <button
            type="submit"
            class="absolute top-[calc(50%-10px)] text-gray-700 right-2"
          >
            <font-awesome-icon :icon="['fas', 'search']" class="text-xl" />
          </button>
        </div>
        <select
          id="type"
          name="type"
          class="block h-auto px-2 text-gray-200 uppercase bg-gray-600 outline-none text-md"
          v-model="searchOption"
        >
          <option value="film">Film</option>
          <option value="show">TV</option>
        </select>
      </form>
    </div>
  </div>
</template>
