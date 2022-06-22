<script setup lang="ts">
import { getPoster } from '../../../helpers/items'
import { IMovie, IShow } from '../../../interfaces/movieApi.interfaces'

defineProps<{
  item: IMovie & IShow
}>()
const emit = defineEmits<{
  (e: 'on-close'): void
}>()
</script>

<template>
  <div
    class="absolute bg-gray-600/75 h-screen w-screen grid place-items-center z-[100] top-0 left-0 px-5"
    @click.self="emit('on-close')"
  >
    <div class="w-full px-5 py-5 bg-gray-800 rounded h-100 max-w-[500px]">
      <div class="flex items-center justify-between mb-8">
        <div class="flex space-x-4">
          <img
            v-if="item.poster_path"
            class="aspect-[1/1.5] rounded md:h-auto md:order-1 col-span-2 max-w-[60px]"
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
      <form>
        <textarea
          class="w-full p-2 bg-blue-200 rounded outline-none min-h-[150px] focus:bg-white"
          placeholder="Add your review..."
        ></textarea>
        <div class="flex justify-between mt-5">
          <div class="space-y-1">
            <div class="space-x-5">
              <label class="text-sm text-gray-200" for="rating">Rating</label>
              <span class="text-sm text-gray-400">2.5 out of 5</span>
            </div>
            <div class="flex space-x-2">
              <stars-rating
                :show-rating="false"
                active-color="#16a34a"
		inactive-color="#4b5563"
                increment="0.5"
                :star-size="25"
              />
              <button class="mt-1">
                <font-awesome-icon :icon="['fas', 'close']" class="text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
