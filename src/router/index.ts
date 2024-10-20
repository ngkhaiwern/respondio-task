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
      path: '/:id',
      name: 'auto-reply-bot-with-drawer',
      component: AutoReplyBotView,
    },
  ],
})

export default router
