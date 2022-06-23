<script setup lang="ts">
import { watch } from 'vue'
import { useForm } from '../../../composables/useForm'
import { getPoster } from '../../../helpers/items'
import { IMovie, IShow } from '../../../interfaces/movieApi.interfaces'

interface IRecord {
  review: string
  rating: number
  like: boolean
  spoilers: boolean
  watched: boolean
  watchlist: boolean
}

defineProps<{
  item: IMovie & IShow
}>()

const emit = defineEmits<{
  (e: 'on-close'): void
}>()

const { values, handleSumit } = useForm<IRecord>({
  review: '',
  rating: 0,
  like: false,
  spoilers: false,
  watched: false,
  watchlist: false,
})

watch(values, (current) => {
  if (!current.review.trim()) {
    values.spoilers = false
  }

  if (!current.watched && current.rating) {
    values.watched = true
  }
})

const handleWatched = () => {
  values.rating = !values.watched ? values.rating : 0
  values.watched = !values.watched
}

const onSubmit = (data: IRecord) => {
  console.log(data)
}
</script>

<template>
  <div
    class="absolute bg-gray-600/75 h-screen w-screen grid place-items-center z-[100] top-0 left-0 px-5"
    @click.self="emit('on-close')"
  >
    <div class="w-full px-5 py-5 bg-gray-800 rounded max-w-[500px]">
      <div class="flex items-center justify-between mb-3 space-x-5">
        <div class="flex space-x-4">
          <img
            v-if="item.poster_path"
            class="aspect-[1/1.5] rounded md:h-auto col-span-2 max-w-[60px] h-full"
            :src="getPoster(item.poster_path) || ''"
            :alt="item.title || item.name"
          />
          <div>
            <h3 class="text-xl font-bold text-gray-200">
              {{ item.title || item.name }}
            </h3>
            <span class="text-lg font-light text-gray-400">{{
              (item.release_date || item.first_air_date)?.toString().slice(0, 4)
            }}</span>
          </div>
        </div>
        <button @click="emit('on-close')" class="self-start">
          <font-awesome-icon
            :icon="['fas', 'close']"
            class="text-2xl text-gray-300"
          />
        </button>
      </div>
      <form @submit.prevent="handleSumit(onSubmit)">
        <!-- Status icons -->
        <div class="flex justify-around py-3 md:justify-center md:space-x-10">
          <!-- Watched -->
          <div
            class="flex flex-col text-sm text-center text-gray-200 space-y-2"
          >
            <label class="text-gray-200 text-md md:text-lg">Watched</label>
            <button @click="handleWatched()" type="button">
              <font-awesome-icon
                :icon="['fas', 'eye']"
                class="text-[40px] transition"
                :class="
                  values.watched
                    ? 'text-green-500'
                    : 'text-gray-600 hover:text-gray-700'
                "
              />
            </button>
          </div>
          <!-- Like -->
          <div
            class="flex flex-col text-sm text-center text-gray-200 space-y-2"
          >
            <label class="text-gray-200 text-md md:text-lg">Like</label>
            <button @click="values.like = !values.like" type="button">
              <font-awesome-icon
                :icon="['fas', 'heart']"
                class="text-[40px] transition"
                :class="
                  values.like
                    ? 'text-red-500'
                    : 'text-gray-600 hover:text-gray-700'
                "
              />
            </button>
          </div>
          <!-- Watchlist -->
          <div class="flex flex-col text-center text-gray-200 space-y-2">
            <label class="text-gray-200 text-md md:text-lg">Watchlist</label>
            <button @click="values.watchlist = !values.watchlist" type="button">
              <font-awesome-icon
                :icon="['fas', 'clock']"
                class="text-[40px] transition"
                :class="
                  values.watchlist
                    ? 'text-blue-500'
                    : 'text-gray-600 hover:text-gray-700'
                "
              />
            </button>
          </div>
        </div>
        <div class="w-full py-4 mt-1 border-gray-600 border-y">
          <!-- Rating -->
          <div class="w-full mb-1 space-y-1">
            <label
              class="block text-center text-gray-200 grid place-items-center text-md md:text-lg"
              for="rating"
              >Rate</label
            >
            <div class="flex justify-center group">
              <div class="relative">
                <stars-rating
                  :show-rating="false"
                  active-color="#16a34a"
                  inactive-color="#4b5563"
                  :increment="0.5"
                  :star-size="45"
                  v-model:rating="values.rating"
                />
                <button
                  class="absolute mt-2 top-1 left-[-25px] hidden group-hover:inline-block"
                  @click="values.rating = 0"
                  v-if="values.rating"
                >
                  <font-awesome-icon
                    :icon="['fas', 'close']"
                    class="text-2xl text-gray-400"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- Review Section -->
        <textarea
          class="w-full p-2 bg-blue-200 rounded outline-none min-h-[100px] focus:bg-white mt-4"
          placeholder="Add your review..."
          v-model="values.review"
        ></textarea>
        <div class="flex items-center mt-2 space-x-2">
          <input
            class="w-5 h-5"
            type="checkbox"
            id="spoilers"
            v-model="values.spoilers"
            :disabled="!values.review.trim()"
          /><label
            class="text-md"
            :class="!values.review.trim() ? 'text-gray-500' : 'text-gray-200'"
            for="spoilers"
            >Contain spoilers</label
          >
        </div>
        <div class="flex justify-end mt-2">
          <button
            type="submit"
            class="px-4 py-2 font-bold text-gray-200 uppercase bg-green-600 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
