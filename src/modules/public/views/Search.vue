<script setup lang="ts">
import CardList from '../components/CardList.vue'
import LoadingSpinner from '../../../components/LoadingSpinner.vue'
import { MovieOrShow } from '../../../interfaces/movieApi.interfaces'
import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useSearch } from '../store/useSearch'
import SkeletonCardList from '../components/skeletons/SkeletonCardList.vue'

// Search tore
const searchStore = useSearch()
const {
  page,
  totalPages,
  items,
  fetchingFirst,
  fetchingNextPage,
  error,
  totalResults,
} = storeToRefs(searchStore)

// Route
const route = useRoute()
const router = useRouter()
const { type, text } = route.params

if (type !== 'film' && type !== 'show') router.back()

const typeItem = ref(type.toString())
const textSearch = ref(text.toString())

const itemType = computed<MovieOrShow>(() => {
  return typeItem.value === 'film' ? 'MOVIE' : 'TV'
})

watch(route, async (currentValue) => {
  if (!currentValue.params.type || !currentValue.params.text) return
  typeItem.value = currentValue.params.type.toString()
  textSearch.value = currentValue.params.text.toString()
  searchStore.fetchTypeAndQuery(itemType.value, textSearch.value)
})

// Intersection Observer
const loadingRef = ref<Element>()

const options: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
}

const observer = new IntersectionObserver((entries) => {
  // There is just one entry
  const [entry] = entries
  if (
    entry.isIntersecting &&
    items.value.length &&
    totalPages.value > page.value
  ) {
    searchStore.fetchNextPage()
  }
}, options)

watch(loadingRef, (currentValue) => {
  if (currentValue) {
    observer.observe(loadingRef.value!)
  }
})

// Mounted
onMounted(() => {
  searchStore.fetchTypeAndQuery(itemType.value, textSearch.value)
})
</script>

<template>
  <section class="app-container">
    <h2
      class="inline-block my-8 text-xl font-bold text-gray-200"
      v-if="!fetchingFirst"
    >
      FOUND AT LEAST {{ totalResults }} MATCHES FOR “{{
        textSearch.toUpperCase()
      }}”
    </h2>
    <div v-if="items.length">
      <CardList :items="items" />
      <div
        class="w-full mt-5 text-gray-200 grid place-items-center"
        ref="loadingRef"
        v-if="
          (totalPages > page && !fetchingFirst) ||
          (totalPages === page && fetchingNextPage)
        "
      >
        <LoadingSpinner />
      </div>
    </div>
    <SkeletonCardList v-if="fetchingFirst" class="py-5" />
  </section>
</template>
