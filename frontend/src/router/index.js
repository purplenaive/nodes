import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/homeView.vue")
    },
    {
      path: "/write",
      name: "write",
      component: () => import("../views/writeView.vue")
    },
  ]
})

export default router
