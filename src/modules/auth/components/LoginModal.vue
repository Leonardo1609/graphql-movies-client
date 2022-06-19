<script setup lang="ts">
import { useToast } from 'vue-toastification'
import { object, string, AnySchema } from 'yup'
import { useForm } from '../../../composables/useForm'
import { useAuthStore } from '../store'

const authStore = useAuthStore()
const emit = defineEmits<{
  (e: 'on-close'): void
}>()

interface ILoginForm {
  email: string
  password: string
}

const loginSchema = object<Record<keyof ILoginForm, AnySchema>>({
  email: string().email('Enter a valid email').required('Email is required'),
  password: string().required('Password is required'),
})

const initialValues: ILoginForm = {
  email: '',
  password: '',
}

const { values, errors, handleSumit } = useForm<ILoginForm>(
  initialValues,
  loginSchema
)

const toast = useToast()

const onSubmit = async ({ email, password }: ILoginForm) => {
  try {
    const resp = await authStore.loginUser(email, password)
    if (!resp?.error) {
      toast.success('Welcome back!')
      emit('on-close')
    }
  } catch (err) {
    console.log(err)
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
        <h2 class="text-2xl font-light text-gray-300 uppercase">Login</h2>
        <button @click="emit('on-close')">
          <font-awesome-icon
            :icon="['fas', 'close']"
            class="text-2xl text-gray-300"
          />
        </button>
      </div>
      <form @submit.prevent="handleSumit(onSubmit)">
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
          class="px-10 py-2 mt-5 font-bold text-gray-200 uppercase bg-green-600 rounded"
        >
          Sing in
        </button>
      </form>
    </div>
  </div>
</template>
