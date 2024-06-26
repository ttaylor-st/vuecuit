import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '@/stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/collections',
      name: 'collections',
      component: () => import('../views/CollectionsView.vue')
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: () => import('../views/NotificationsView.vue')
    },
    {
      path: '/more',
      name: 'more',
      component: () => import('../views/MoreView.vue')
    },
    {
      path: '/profile/:username',
      name: 'profile',
      meta: { inTransition: 'slide-right', outTransition: 'slide-left' },
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/community/:community',
      name: 'community',
      meta: { inTransition: 'slide-right', outTransition: 'slide-left' },
      component: () => import('../views/CommunityView.vue')
    },
    {
      path: '/post/:publicId',
      name: 'post',
      meta: { inTransition: 'slide-right', outTransition: 'slide-left' },
      component: () => import('../views/PostView.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta?.requiresAuth && !useUserStore().isLoggedIn) next({ name: 'login' })
  else next()
})

router.afterEach((to, from, failure) => {
  if (failure) return console.log(failure)

  const history = useUserStore().getHistory
  if (history.length === 0) return history.push(from.name)
  const last = history[history.length - 1]

  if (last !== to.name) to.meta.transition = 'slide-right'
  else to.meta.transition = 'slide-left'
  history.push(from.name)
})

export default router
