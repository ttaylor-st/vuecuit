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
            document.getElementById('app')?.classList.toggle('dark', this.darkMode)
        },

        setTheme(theme: string) {
            this.theme = theme
            document.getElementById('app')?.classList.toggle('oled', this.theme === 'oled')
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