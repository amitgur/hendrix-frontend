const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }]
  },
  {
    path: "/adminLogin",
    component: () => import("layouts/AdminLayout.vue"),
    children: [{ path: "", component: () => import("pages/admin/Login.vue") }]
  },
  {
    path: "/adminHome",
    meta: { requiresAuth: true },
    component: () => import("layouts/AdminLayout.vue"),
    children: [{ path: "", component: () => import("pages/admin/Home.vue") }]
  },
  {
    path: "/adminSignUp",
    component: () => import("layouts/AdminLayout.vue"),
    children: [{ path: "", component: () => import("pages/admin/SignUp.vue") }]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
