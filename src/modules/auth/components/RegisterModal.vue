<script setup lang="ts">
import { object, string, AnySchema } from 'yup'
import { useForm } from '../../../composables/useForm'
import { useAuthStore } from '../store'

const authStore = useAuthStore()
const emit = defineEmits<{
  (e: 'on-close'): void
}>()

interface IRegisterForm {
  username: string
  password: string
  email: string
}

const registerSchema = object<Record<keyof IRegisterForm, AnySchema>>({
  username: string().min(6, 'Min 6 characters').max(15, 'Max 16 characters'),
  password: string().min(6, 'Min 6 characters').max(15, 'Max 16 characters'),
  email: string().email('Enter a valid email').required('Email is required'),
})

const initialValues: IRegisterForm = {
  username: '',
  password: '',
  email: '',
}

const { values, errors, handleSumit } = useForm<IRegisterForm>(
  initialValues,
  registerSchema
)

const onSubmit = async ({ username, password, email }: IRegisterForm) => {
  const resp = await authStore.registerUser(username, password, email)
  if (!resp.error) {
    emit('on-close')
  }
}
</script>

<template>
  <div
    class="absolute bg-gray-600/75 h-screen w-screen grid place-items-center z-[100] top-0 left-0 px-5"
    @click.self="emit('on-close')"
  >
    <div class="w-full px-10 py-5 bg-gray-800 rounded-xl h-100 max-w-[500px]">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-light text-gray-300 uppercase">
          Join MovieGraph
        </h2>
        <button @click="emit('on-close')">
          <font-awesome-icon
            :icon="['fas', 'close']"
            class="text-2xl text-gray-300"
          />
        </button>
      </div>
      <form @submit.prevent="handleSumit(onSubmit)">
        <div class="flex flex-col mb-4 space-y-2">
          <label for="username" class="text-gray-200">Username</label>
          <input
            type="text"
            id="username"
            v-model="values.username"
            class="px-2 py-1 bg-blue-200 rounded outline-none focus:bg-white"
          />
          <div class="h-3">
            <small class="text-red-500" v-if="errors.username">{{
              errors.username
            }}</small>
          </div>
        </div>
        <div class="flex flex-col mb-4 space-y-2">
          <label for="email" class="text-gray-200">Email</label>
          <input
            type="email"
            id="email"
            v-model="values.email"
            class="px-2 py-1 bg-blue-200 rounded outline-none focus:bg-white"
          />
          <div class="h-3">
            <small class="text-red-500" v-if="errors.email">{{
              errors.email
            }}</small>
          </div>
        </div>
        <div class="flex flex-col mb-4 space-y-2">
          <label for="password" class="text-gray-200">Password</label>
          <input
            type="password"
            id="password"
            v-model="values.password"
            class="px-2 py-1 bg-blue-200 rounded outline-none focus:bg-white"
          />
          <div class="h-3">
            <small class="text-red-500" v-if="errors.password">{{
              errors.password
            }}</small>
          </div>
        </div>
        <button
          type="submit"
          class="px-10 py-2 mt-2 font-bold text-gray-200 uppercase bg-green-600 rounded"
        >
          Sing up
        </button>
      </form>
    </div>
  </div>
</template>
