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
    path: '/faculty/view_test_results/:id',
    name: 'faculty.view_test_results',
    component: () => import('../views/faculty/ViewTestResults.vue')
  },
  {
    path: '/faculty/group_edit/:id',
    name: 'faculty.group_edit',
    component: () => import('../views/faculty/GroupEdit.vue')
  },
  {
    path: '/student',
    name: 'student.dashboard',
    component: () => import('../views/student/Dashboard.vue')
  },
  {
    path: '/student/view_test/:id',
    name: 'student.view_test',
    component: () => import('../views/student/ViewTest.vue')
  },
  {
    path: '/student/attempt_test/:id',
    name: 'student.attempt_test',
    component: () => import('../views/student/TestAttempt.vue')
  },
  {
    path: '/student/attempt_review/:id',
    name: 'student.attempt_review',
    component: () => import('../views/student/TestAttemptReview.vue')
  },
  {
    path: '/faculty/attempt_review/:id',
    name: 'faculty.attempt_review',
    component: () => import('../views/student/TestAttemptReview.vue')
  },
  {
    path: '/faculty/evaluate_attempt/:id',
    name: 'faculty.evaluate_attempt',
    component: () => import('../views/faculty/TestAttempEvaluation.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
