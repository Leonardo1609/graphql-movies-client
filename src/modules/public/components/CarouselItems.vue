<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { SwiperOptions } from 'swiper/types'
import {
  IMovie,
  IShow,
  MovieOrShow,
} from '../../../interfaces/movieApi.interfaces'
import CardItem from '../components/CardItem.vue'

defineProps<{
  items: Array<IMovie & IShow>
  type: MovieOrShow
}>()

const swiperOptions: SwiperOptions = {
  breakpoints: {
    1024: {
      slidesPerView: 6.5,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 5.5,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 4.5,
      spaceBetween: 10,
    },
    320: {
      slidesPerView: 3.5,
      spaceBetween: 10,
    },
  },
}

</script>

<template>
  <swiper
    :breakpoints="swiperOptions.breakpoints"
    wrapper-tag="ul"
  >
    <swiper-slide v-for="item in items" :key="item.id">
      <CardItem :item="item" :type="type" />
    </swiper-slide>
  </swiper>
</template>

<style scoped>
.swiper-slide {
  height: auto;
}
</style>
