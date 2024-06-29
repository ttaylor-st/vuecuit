import { defineStore } from 'pinia'
import { useUrlStore } from './urlStore'
import {CapacitorHttp, CapacitorCookies} from '@capacitor/core';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    loading: false,
    error: String,
    xcsrfToken: localStorage.getItem('csrfToken') || null,
    history: []
  }),

  actions: {
    async makeRequest(url: string, options = {}) {
      this.loading = true
      this.error = null

      try {
        const response = await CapacitorHttp.request({
          url,
          headers: {
            ...options.headers,
            'X-Csrf-Token': this.xcsrfToken,
            Cookie: `csrftoken=${this.xcsrfToken}`
          },
          ...options
        })

        return response

      } catch (error) {
        this.error = error.message || 'An error occurred'
      } finally {
        this.loading = false
      }
    },

    async login(username: string, password: string) {
      const { apiUrl } = useUrlStore()
      this.loading = true
      this.error = null

      try {
        const response = await this.makeRequest(`${apiUrl}/_login`, {
          method: 'POST',
          data: JSON.stringify({ username, password })
        })

        if (!response) {
          this.error = 'No response'
          return
        }

        if (response.status === 200) {
          this.user = response.data
          localStorage.setItem('user', JSON.stringify(this.user))

          const cookies = await CapacitorCookies.getCookies()
          const csrfToken = cookies.csrftoken
          await this.setXcsrfToken(csrfToken)
          return this.user
        } else if (response.status === 401) {
          this.error = response.data.message
          return response.data
        }
      } catch (error) {
        this.error = error
        console.log(error)
      } finally {
        this.loading = false
      }
    },

    async logout() {
      const { apiUrl } = useUrlStore()

      try {
        const response = await this.makeRequest(`${apiUrl}/_login?action=logout`, { method: 'POST' })

        if (response.status === 200) {
          this.user = null
          localStorage.removeItem('user')
        } else {
          this.error = await response.text()
        }
      } catch (error) {
        this.error = error
        this.user = null
      }
    },

    async initial() {
      const { apiUrl } = useUrlStore()

      try {
        await this.makeRequest(`${apiUrl}/_initial`)
        const cookies = await CapacitorCookies.getCookies()
        const csrfToken = cookies.csrftoken
        await this.setXcsrfToken(csrfToken)
      } catch (error) {
        console.log(error)
        this.error = error
      }
    },

    async fetchUser() {
      const { apiUrl } = useUrlStore()
      this.loading = true
      this.error = null

      try {
        const response = await this.makeRequest(`${apiUrl}/_user`)
        if (response.status === 200) {
          this.user = await response.data
          return this.user
        }
      } catch (error) {
        this.error = error
        console.log(error)
      } finally {
        this.loading = false
      }
    },

    async setXcsrfToken(token: string) {
      this.xcsrfToken = token
      localStorage.setItem('csrfToken', token)
    }
  },

  getters: {
    isLoggedIn: (state) => state.user !== null,
    getHistory: (state) => state.history,
    getUser: (state) => state.user,
  },

})
