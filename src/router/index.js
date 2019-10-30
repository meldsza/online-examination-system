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
    name: 'faculty.test.create',
    component: () => import('../views/faculty/CreateTest')
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
