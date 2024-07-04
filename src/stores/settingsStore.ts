import {defineStore} from "pinia";

export const useSettingsStore = defineStore('settings', {

    state: () => ({
        firstTime: true,
        darkMode: false,
        theme: 'default',
    }),

    actions: {
        toggleDarkMode() {
            this.darkMode = !this.darkMode
            if (this.darkMode) {
                document.getElementById('app')?.classList.add('dark')
                document.getElementById('app')?.classList.remove('light')
            }
            else {
                document.getElementById('app')?.classList.add('light')
                document.getElementById('app')?.classList.remove('dark')
            }
        },

        setTheme(theme: string) {
            const currentTheme = `${this.theme}-theme`
            this.theme = `${theme}-theme`
            document.getElementById('app')?.classList.remove(currentTheme)
            document.getElementById('app')?.classList.add(this.theme)
        },

        setFirstTime() {
            this.firstTime = false
        },
    },

    getters: {
        isDarkMode() {
            return this.darkMode
        },

        getTheme() {
            return this.theme
        },

        isFirstTime() {
            return this.firstTime
        },
    },

});