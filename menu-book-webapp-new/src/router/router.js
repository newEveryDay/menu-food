import Vue from 'vue'
import store from '../store'
import Router from 'vue-router'
Vue.use(Router)

const routes = [

  {
    name: 'layout',
    component: () => import('../view/layout/layout'),
    meta: {
      title: '首页'
    },
    children: [
      {
        name: 'home',
        component: () => import('../view/home/home'),
        meta: {
          title: '首页'
        }
      },
      {
        name: 'menu',
        component: () => import('../view/category/category'),
        meta: {
          title: '菜谱'
        }
      },
      {
        name: 'collect',
        component: () => import('../view/collect/collect'),
        meta: {
          title: '收藏'
        }
      },
      {
        name: 'user',
        component: () => import('../view/user/user'),
        meta: {
          title: '我的'
        }
      }
    ]
  },

]

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '')
  if (route.children && typeof route.children === "object") {
    route.children.forEach(item => {
      item.path = item.path || '/' + (item.name || '')
    })
  }
})

const router = new Router({ routes })

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title
  if (title) {
    document.title = title
    store.commit('setNavBarTitle', title)
  }
  next()
})
export {
  router
}
