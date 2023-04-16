import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home/HomeView.vue";
import Login from "@/views/Login/MainLogin.vue";
import Admin from "@/views/Admin/AdminPage.vue";
import Signup from "@/views/Login/Signup.vue";

const routes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/admin",
    component: Admin,
    meta: { requiresAuth: true, role: [0] },
  },
  {
    path: "/home",
    component: Home,
    meta: { requiresAuth: true, role: [0] },
  },
  {
    path: "/signup",
    component: Signup,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && !localStorage.getItem("user")) {
    next("/");
  } else {
    const user = JSON.parse(localStorage.getItem("user"));
    if (to.meta.roles && !to.meta.roles.includes(user.role)) {
      next("/");
    } else {
      next();
    }
  }
});

export default router;
