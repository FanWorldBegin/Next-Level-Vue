import Vue from 'vue'
import Router from 'vue-router'
import EventCreate from './views/EventCreate.vue'
import EventList from './views/EventList.vue'
import EventShow from './views/EventShow.vue'
import NProgress from 'nprogress'
import store from '@/store/store'
import NotFound from './views/NotFound.vue'
import NetworkIssue from './views/NetworkIssue.vue'
import Validation from './views/validation.vue'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList,
      props: true
    },
    {
      path: '/event/create',
      name: 'event-create',
      component: EventCreate
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: EventShow,
      props: true,
      // this runs after the global beforeEach
      beforeEnter(routeTo, routeFrom, next) {
        // receive event from Action
        store
          .dispatch('event/fetchEvent', routeTo.params.id)
          .then(event => {
            routeTo.params.event = event
            // fetchEvent 返回promise
            next()
          })
          // on error redirect to 404 with the name of resource missing
          .catch(error => {
            if (error.response && error.response.status == 404) {
              next({ name: '404', params: { resource: 'event' } })
            } else {
              next({ name: 'network-issue' })
            }
          })
      }
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
      // send in resource params as prop
      props: true
    },
    {
      // will catch all navigation that doesn't match
      path: '*',
      // Specify missing resource
      redirect: { name: '404', params: { resource: 'page' } }
    },
    {
      path: '/network-issue',
      name: 'network-issue',
      component: NetworkIssue
    },
    {
      path: '/validation',
      name: 'validation',
      component: Validation
    },
    {
      path: '/filter',
      name: 'filter',
      component: () => import('@/views/filters')
    }
  ]
})

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  next()
})

router.afterEach((routeTo, routeFrom) => {
  NProgress.done()
})

export default router
