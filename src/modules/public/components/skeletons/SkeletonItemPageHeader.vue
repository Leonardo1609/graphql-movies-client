<script setup lang="ts">
import SkeletonCard from './SkeletonCard.vue'
</script>
<template>
  <div class="relative min-h-[350px] md:min-h-[450px]">
    <div class="absolute z-0 object-cover object-top w-full bg-gray-800"></div>
    <div
      class="absolute top-0 left-0 z-10 w-full h-full opacity-80 brightness-[0.3]"
      :style="{ backgroundColor: '#c3c3c3' }"
    ></div>
    <div class="relative z-20 w-full h-full py-5 md:py-10 app-container">
      <div class="z-20 w-full grid grid-cols-6 gap-4 md:gap-16">
        <div class="self-center order-1 md:self-start md:order-2 col-span-4">
          <div class="w-full md:w-3/4">
            <div class="w-full h-8 bg-gray-400 animate-pulse"></div>
            <div class="mt-2">
              <span class="block text-sm text-gray-200 md:text-md">DIRECTED BY</span>
              <div class="w-40 h-5 bg-gray-400 md:w-80 animate-pulse"></div>
            </div>
            <div class="flex mt-2 space-x-10">
              <div class="h-5 bg-gray-400 w-80 animate-pulse"></div>
            </div>
          </div>
          <div class="hidden mt-5 md:block">
            <div class="w-3/4 h-5 mt-2 bg-gray-400 w-30 animate-pulse"></div>
            <div class="w-full h-40 mt-2 bg-gray-400 animate-pulse"></div>
          </div>
        </div>
        <SkeletonCard class="order-2 md:order-1 col-span-2" />
      </div>
      <div class="block mt-3 md:hidden">
        <div class="h-5 mt-2 bg-gray-400 w-80 animate-pulse"></div>
        <div class="w-full h-20 mt-2 bg-gray-400 animate-pulse"></div>
      </div>
    </div>
  </div>
</template>
