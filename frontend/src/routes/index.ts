import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import { useAuthStore } from "../stores/authStore";

const routes = [
    //TODO: determine pages that require authentication
    {path:"/", name:"Login", component: Login},
    {path:"/register", name: "Register", component: Register},
    {path:"/login", name: "Login", component: Login},
    {path:"/dashboard", name: "Dashboard", component: Dashboard, meta: { requiresAuth: true }},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();

  // Redirect authenticated users away from login/register
  if (to.matched.some(record => record.meta.requiresGuest)) {
      if (authStore.isAuthenticated) {
          next('/dashboard');
      } else {
          next();
      }
  }

  // Handle routes that require authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!authStore.isAuthenticated) {
          next('/login');
      } else {
          next();
      }
  } else {
      next();
  }
});

export default router;