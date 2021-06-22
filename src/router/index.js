import { createRouter, createWebHashHistory } from 'vue-router'
import Acceuil from '../views/Acceuil'
import Recette from '../views/Recette'

const routes = [
  {
    path: '/',
    name: 'Acceuil',
    component: Acceuil
  },
  {
    path: '/recette/:id/:titre',
    name: 'Recette',
    component: Recette
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
