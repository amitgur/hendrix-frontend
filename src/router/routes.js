const routes = [
  /**
   * Teacher routes
   */
  {
    path: "/teachersSignUp",
    component: () => import("layouts/TeacherLayout.vue"),
    children: [
      { path: "", component: () => import("pages/teachers/AddTeacher.vue") }
    ]
  },
  {
    path: "teachersLogin",
    component: () => import("layouts/TeacherLayout.vue"),
    children: [
      { path: "", component: () => import("pages/teachers/TeacherLogin.vue") }
    ]
  },
  {
    path: "/teachersHome",
    meta: { requiresAuth: true },
    component: () => import("layouts/TeacherLayout.vue"),
    children: [
      { path: "", component: () => import("pages/teachers/TeacherHome.vue") }
    ]
  },
  {
    path: "/teachersLogin",
    component: () => import("layouts/TeacherLayout.vue"),
    children: [
      { path: "", component: () => import("pages/teachers/TeacherLogin.vue") }
    ]
  },
  {
    path: "/teachersStudentList",
    component: () => import("layouts/TeacherLayout.vue"),
    children: [
      { path: "", component: () => import("pages/teachers/StudentsList.vue") }
    ]
  },

  /**
   * Admin routes
   */

  {
    path: "/adminLogger",
    meta: { requiresAdminAuth: true },
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
    meta: { requiresAdminAuth: true },
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
    meta: { requiresAdminAuth: true },
    component: () => import("layouts/AdminLayout.vue"),
    children: [{ path: "", component: () => import("pages/admin/Logger.vue") }]
  },

  // schools

  {
    path: "/adminCreateSchool",
    meta: { requiresAdminAuth: true },
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      { path: "", component: () => import("pages/admin/school/AddSchool.vue") }
    ]
  },
  {
    path: "/adminListSchools",
    meta: { requiresAdminAuth: true },
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/admin/school/ListSchools.vue")
      }
    ]
  },

  // school accounts
  {
    path: "/adminCreateSchoolAccount",
    meta: { requiresAdminAuth: true },
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        component: () =>
          import("pages/admin/schoolAccount/AddSchoolAccount.vue")
      }
    ]
  },
  {
    path: "/adminListSchoolAccounts",
    meta: { requiresAdminAuth: true },
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        component: () =>
          import("pages/admin/schoolAccount/ListSchoolAccounts.vue")
      }
    ]
  },

  /**
   * Site links
   */

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
