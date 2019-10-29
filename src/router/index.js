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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
