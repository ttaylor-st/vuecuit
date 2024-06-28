import { defineStore } from 'pinia'
import { useUrlStore } from './urlStore'

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
        return await fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            'X-Csrf-Token': this.xcsrfToken,
            Cookie: `csrftoken=${this.xcsrfToken}`
          }
        })
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
          body: JSON.stringify({ username, password })
        })

        if (!response) {
          this.error = 'No response'
          return
        }

        if (response.ok) {
          this.user = await response.json()
          localStorage.setItem('user', JSON.stringify(this.user))

          // Get Set-Cookie
          const setCookie = response.headers.get('Set-Cookie') || ''
          const csrfToken = setCookie.split(';')[0].split('=')[1]
          await this.setXcsrfToken(csrfToken)
        } else {
          this.error = await response.text()
        }
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async logout() {
      const { apiUrl } = useUrlStore()

      try {
        const response = await this.makeRequest(`${apiUrl}/_login?action=logout`, { method: 'POST' })

        if (response.ok) {
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
      this.loading = true
      this.error = null

      try {
        const response = await this.makeRequest(`${apiUrl}/_initial`)
        const csrfToken = response.headers.get('Csrf-Token')

        if (response.ok) await this.setXcsrfToken(csrfToken)
        else this.error = await response.text()
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async fetchUser() {
      const { apiUrl } = useUrlStore()
      this.loading = true
      this.error = null

      try {
        const response = await this.makeRequest(`${apiUrl}/_user`)

        if (response.ok) {
          this.user = await response.json()
          return this.user
        } else this.error = await response.text()
      } catch (error) {
        this.error = error
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
    getHistory: (state) => state.history
  },

})
