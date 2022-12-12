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
    {
      path: "/memo/:id",
      name: "memo",
      component: () => import("../views/detailView.vue")
    },
  ]
})

export default router
