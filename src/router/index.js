import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/faculty/login',
    name: 'faculty.login',
    component: () => import('../views/login/FacultyLogin.vue')
  },
  {
    path: '/student/login',
    name: 'student.login',
    component: () => import('../views/login/StudentLogin.vue')
  }
  ,
  {
    path: '/faculty',
    name: 'faculty.dashboard',
    component: () => import('../views/faculty/Dashboard')
  },

  {
    path: '/faculty/createTest',
    name: 'faculty.tests.create',
    component: () => import('../views/faculty/CreateTest')
  },
  {
    path: '/faculty/editTest/:id',
    name: 'faculty.tests.edit',
    component: () => import('../views/faculty/EditTest')
  },
  {
    path: '/faculty/tests',
    name: 'faculty.tests',
    component: () => import('../views/faculty/Tests.vue')
  },
  {
    path: '/faculty/groups',
    name: 'faculty.groups',
    component: () => import('../views/faculty/Groups.vue')
  },
  {
    path: '/faculty/view_test_results',
    name: 'faculty.view_test_results',
    component: () => import('../views/faculty/ViewTestResults.vue')
  },
  {
    path: '/student',
    name: 'student.dashboard',
    component: () => import('../views/student/Dashboard')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
