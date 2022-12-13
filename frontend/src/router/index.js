import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/homeView.vue"),
      meta: {
        header_active: true,
      }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/loginView.vue"),
      meta: {
        header_active: false,
      }
    },
    {
      path: "/write",
      name: "write",
      component: () => import("../views/writeView.vue"),
      meta: {
        header_active: true,
      }
    },
    {
      path: "/memo/:id",
      name: "memo",
      component: () => import("../views/detailView.vue"),
      meta: {
        header_active: true,
      }
    },
  ]
})

export default router
