import { defineStore } from 'pinia'
import { mutation, query } from '../../../client'
import { loginUserMutation, registerUserMutation } from '../mutations'
import { verifyUserQuery } from '../queries'

interface IAuthStore {
  token: string
  authenticated: boolean
  user: { email: string; username: string } | undefined | null
}

const initialAuthStore: IAuthStore = {
  token: '',
  authenticated: false,
  user: null,
}

export const useAuthStore = defineStore('auth', {
  state: (): IAuthStore => ({
    ...initialAuthStore,
  }),
  actions: {
    async registerUser(username: string, password: string, email: string) {
      const resp = await mutation<{ createUser: string }>(
        registerUserMutation,
        {
          username,
          password,
          email,
        }
      )

      if (!resp.error) {
        this.loginUser(email, password)
      }

      return resp
    },
    async loginUser(email: string, password: string) {
      const resp = await mutation<{ login: string }>(loginUserMutation, {
        email,
        password,
      })
      if (!resp.error) {
        this.token = resp.data?.login!
        localStorage.setItem('token', this.token)
        this.authenticated = true
        await this.verifyUser()
      } else {
        this.authenticated = false
      }

      return resp
    },
    async verifyUser() {
      const resp = await query<{
        verifyUser: {
          token: string
          user: {
            email: string
            username: string
          }
        }
      }>(verifyUserQuery)
      if (!resp.error) {
        this.user = resp.data?.verifyUser.user
        this.authenticated = true
        return
      }
      localStorage.removeItem('token')
      this.resetStore()
    },
    logout() {
      localStorage.removeItem('token')
      this.resetStore()
    },
    resetStore() {
      this.token = ''
      this.authenticated = false
      this.user = null
    },
  },
})
