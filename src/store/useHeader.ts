import { useAuthStore } from '../modules/auth/store'
import { useToast } from 'vue-toastification'
import { defineStore } from 'pinia'

const toast = useToast()

const authStore = useAuthStore()

export const useHeader = defineStore('header', {
  state: () => ({
    isLoginModalOpen: false,
    isRegisterModalOpen: false,
    isSearchModalOpen: false,
    isNavbarOpen: false,
  }),
  actions: {
    handleLoginModalOpen(value: boolean) {
      this.isLoginModalOpen = value
    },

    handleSearchModal(value: boolean) {
      this.isSearchModalOpen = value
    },
    handleRegisterModal(value: boolean) {
      this.isRegisterModalOpen = value
    },
    handleNavbarOpen(value: boolean) {
      this.isNavbarOpen = value
    },
    handleLogout() {
      toast.success('See you soon :)')
      authStore.logout()
      this.handleNavbarOpen(false)
    },
    handleClickOutsideNavbar() {
      this.handleNavbarOpen(false)
    },
  },
})
