import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import { fb } from '../firebase';

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/Profile'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/pending',
    name: 'pending',
    component: () => import('../views/Pending'),
    // meta: {
    //   requiresAuth: true
    // }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/admins/Admin'),
    meta: {
      requiresAuth: true
    },
    children: 
    [
      {
      path: 'home',
      name: 'home',
      component: () => import('../components/admins/Home.vue')
      }, 
      {
        path: 'approve',
        name: 'approve',
        component: () => import('../components/admins/Approve.vue')
      }, 
      {
        path: 'teacher',
        name: 'teacher',
        component: () => import('../components/admins/TeacherData.vue')
      }, 
      {
        path: 'employee',
        name: 'employee',
        component: () => import('../components/admins/EmployeeData.vue')
      }, 
      {
        path: 'enroll',
        name: 'enroll',
        component: () => import('../components/admins/Enroll.vue')
      }, 
      {
        path: 'course',
        name: 'course',
        component: () => import('../components/admins/AddCourse.vue')
      }, 
      {
        path: 'product',
        name: 'product',
        component: () => import('../components/admins/AddProduct.vue')
      }, 
    ],
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   fb.auth().onAuthStateChanged(userAuth => {
//     if (userAuth) {
//       fb.auth().currentUser.getIdTokenResult().then(function ({ claims }) {
//         console.log(claims);
//         if (claims.isRegisted) {
//           if (to.path !== "/profile" )
//             return next({ path: "/profile" });

//         }
//         else if (claims.isProfile) {
//           if (to.path !== "/pending" )
//             return next({ path: "/isProfile" });

//         }
//         else if (claims.isAdmin) {
//           if (to.path !== "/admin/approve" )
//             return next({ path: "/admin/approve" });
//           // this.$router.push('/admin');
//           // alert('test')

//         }
        
//       });
//     }
//     else {
//       if (to.matched.some(record => record.meta.auth)) {
//         next({
//           path: "/",
//           query: { redirect: to.fullPath }
//         });
//       }
//       else {
//         next();
//       }
//     }
//   });

//   next();
// });

// router.beforeEach((to, from, next) => {

//   const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
//   const currentUser = fb.auth().currentUser

//   if (requiresAuth && !currentUser) {
//     next('/')
//   }
//   else if (requiresAuth && currentUser) {
//     fb.auth().currentUser.getIdTokenResult().then(snapShot => {
//       if (claims.isAdmin) {
//         next()
//       }
//       else {
//         next({ name: 'Home' })
//       }
//     })
//   }
//   else {
//     next()
//   }
// })

export default router