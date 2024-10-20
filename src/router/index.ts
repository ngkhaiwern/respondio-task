import { createRouter, createWebHistory } from 'vue-router'
import AutoReplyBotView from '../views/AutoReplyBotView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'auto-reply-bot',
      component: AutoReplyBotView,
    },
    {
      path: '/:param',
      name: 'auto-reply-bot-with-drawer',
      component: AutoReplyBotView,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
