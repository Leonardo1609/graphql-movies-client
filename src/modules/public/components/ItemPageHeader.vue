<script setup lang="ts">
import RecordButton from '../components/RecordButton.vue'
import FastAverageColor from 'fast-average-color'
import { IMovie, IShow, ICast } from '../../../interfaces/movieApi.interfaces'
import { getBackdrop, getPoster } from '../../../helpers/items'
import { onMounted, ref, watch } from 'vue'

const fac = new FastAverageColor()

const { item } = defineProps<{
  item: IMovie & IShow
  director: ICast | undefined
  date: string | undefined
  trailerUrl: string | null
}>()

const overview = ref<HTMLParagraphElement>()
const overviewNoClamped = ref(false)
const showCompleteOverview = ref(false)
const backdropImage = ref(getBackdrop(item?.backdrop_path || ''))
const backdropAvgColor = ref('#FFF')

const handleShowCompleteOverview = (value: boolean) => {
  showCompleteOverview.value = value
}

// This watcher only runs once
watch(overview, (current) => {
  if (current) {
    overviewNoClamped.value = current.scrollHeight === current.clientHeight
  }
})

onMounted(async () => {
  if (backdropImage.value)
    backdropAvgColor.value = (await fac.getColorAsync(backdropImage.value)).hexa
})
</script>

<template>
  <div class="relative min-h-[350px] md:min-h-[450px]">
    <!-- Background Image -->
    <img
      class="absolute z-0 object-cover object-top w-full h-full"
      :src="backdropImage"
      :alt="item?.title || item?.name"
      v-if="backdropImage"
    />
    <!-- Background Avg Color -->
    <div
      class="absolute top-0 left-0 z-10 w-full h-full opacity-80 brightness-[0.3]"
      :style="{ backgroundColor: backdropAvgColor }"
    ></div>
    <!-- Main Content -->
    <div class="relative z-20 w-full h-full py-5 md:py-10 app-container">
      <div class="z-20 w-full grid grid-cols-6 gap-4 md:gap-16">
        <div
          class="relative self-center order-1 md:self-start md:order-2 col-span-4"
        >
          <!-- Item Information -->
          <div class="w-full md:w-3/4">
            <h1 class="text-xl font-bold text-gray-200 md:text-3xl leading-6">
              {{ item?.title || item?.name }}
            </h1>
            <div class="mt-2 text-gray-300 leading-6">
              <span class="block text-sm md:text-md">DIRECTED BY</span>
              <strong class="block text-md md:text-lg">{{
                director?.name
              }}</strong>
            </div>
            <div class="flex mt-2 space-x-10">
              <p class="text-sm text-gray-300 md:text-lg">
                {{ date }}&nbsp;&nbsp;
                <template v-if="item.runtime">{{ item.runtime }} mins</template>
              </p>
              <a
                v-if="trailerUrl"
                :href="trailerUrl"
                target="_blank"
                class="text-sm font-bold text-gray-200 md:text-lg"
                >TRAILER</a
              >
            </div>
          </div>
          <RecordButton
            class="absolute top-0 right-0 hidden md:block"
            :item-id="item.id!"
          />
          <div class="hidden md:block">
            <p
              class="mt-2 text-sm font-bold text-gray-300 uppercase md:mt-6 md:text-lg"
            >
              {{ item?.tagline }}
            </p>
            <p
              class="mt-2 text-sm text-gray-200 md:text-lg leading-5 md:leading-6"
            >
              {{ item?.overview }}
            </p>
          </div>
        </div>
        <img
          v-if="item.poster_path"
          class="order-2 aspect-[1/1.5] rounded md:h-auto md:order-1 col-span-2"
          :src="getPoster(item.poster_path) || ''"
          :alt="item.title"
        />
        <div
          class="h-full bg-gray-600 grid place-items-center aspect-[1/1.5] order-2 rounded md:order-1 col-span-2"
          v-else
        >
          <img
            class="w-2/3"
            src="/images/no-poster.svg"
            :alt="item.title || item.name"
          />
        </div>
      </div>
      <div class="block mt-3 md:hidden">
        <p class="mt-2 text-sm font-bold text-gray-300 uppercase">
          {{ item?.tagline }}
        </p>
        <p
          class="mt-2 text-sm text-gray-200 leading-5 md:line-clamp-none"
          :class="{ 'line-clamp-3': !showCompleteOverview }"
          ref="overview"
        >
          {{ item?.overview }}
        </p>
        <template v-if="!overviewNoClamped">
          <button
            v-if="!showCompleteOverview"
            class="text-sm font-bold text-gray-400"
            @click="handleShowCompleteOverview(true)"
          >
            More...
          </button>
          <button
            v-else
            class="text-sm font-bold text-gray-400"
            @click="handleShowCompleteOverview(false)"
          >
            Less...
          </button>
        </template>
      </div>
    </div>
  </div>
</template>
