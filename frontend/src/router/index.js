import { createRouter, createWebHistory } from "vue-router";
import Main from "../components/Main.vue";

const routes = [
  {
    path: "/",
    component: Main,
    meta: {
      requireAuth: true,
    },
    children: [
      {
        path: "",
        component: () => import("../views/Notes.vue"),
      },
    ],
  },
  {
    path: "/auth",
    component: () => import("../views/Auth.vue"),
    meta: {
      guestOnly: true,
    },
    children: [
      {
        path: "",
        component: () => import("../components/auth/Login.vue"),
      },
      {
        path: "register",
        component: () => import("../components/auth/Register.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.meta.requireAuth && !token) {
    next("/auth");
  } else if (to.meta.guestOnly && token) {
    next("/");
  } else {
    next();
  }
});

export default router;
