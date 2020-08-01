const routes = [
  {
    path: "teacherLogin",
    component: () => import("layouts/TeacherLayout.vue"),
    children: [
      { path: "", component: () => import("pages/teachers/TeacherLogin.vue") }
    ]
  },
  {
    path: "/teacherHome",
    meta: { requiresAuth: true },
    component: () => import("layouts/TeacherLayout.vue"),
    children: [
      { path: "", component: () => import("pages/teachers/TeacherHome.vue") }
    ]
  },
  {
    path: "/teacherLogin",
    component: () => import("layouts/TeacherLayout.vue"),
    children: [
      { path: "", component: () => import("pages/teachers/AddTeacher.vue") }
    ]
  },
  {
    path: "/adminLogger",
    meta: { requiresAuth: true },
    component: () => import("layouts/AdminLayout.vue"),
    children: [{ path: "", component: () => import("pages/admin/Logger.vue") }]
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
  {
    path: "/adminLogger",
    meta: { requiresAuth: true },
    component: () => import("layouts/AdminLayout.vue"),
    children: [{ path: "", component: () => import("pages/admin/Logger.vue") }]
  },
  {
    path: "/menu",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Menu.vue") }]
  },
  {
    path: "/:compositionId",
    component: () => import("pages/Composition.vue")
  },
  {
    path: "/",
    component: () => import("pages/Home.vue")
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
