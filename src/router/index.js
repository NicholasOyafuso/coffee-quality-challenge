import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Avaliacoes from '../views/Avaliacoes.vue'
import Ranking from '../views/Ranking.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/home', redirect: '/' },
  { path: '/avaliacoes', name: 'avaliacoes', component: Avaliacoes },
  { path: '/ranking', name: 'ranking', component: Ranking }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
