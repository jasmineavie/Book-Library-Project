import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Register from '../views/Register.vue'
import store from '../store/index'
import NewBookForm from '../views/NewBook.vue'
// import ReadingList from '../components/ReadingList.vue'
import SavedList from '../views/SavedList.vue'
import ForumTopicsView from '../views/ForumTopicsView.vue'
import TopicPostsView from "../views/TopicPostsView.vue"
import NewTopicView from "../views/NewTopicView"
import ReplyForm from "../components/ReplyForm.vue"

Vue.use(Router)

/**
 * The Vue Router is used to "direct" the browser to render a specific view component
 * inside of App.vue depending on the URL.
 *
 * It also is used to detect whether or not a route requires the user to have first authenticated.
 * If the user has not yet authenticated (and needs to) they are redirected to /login
 * If they have (or don't need to) they're allowed to go about their way.
 */

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
         requiresAuth: false
        // requiresAuth: true // original

      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requiresAuth: false // original
        // requiresAuth: true

      }
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout,
      meta: {
        // requiresAuth: false 
        requiresAuth: true // original

      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requiresAuth: false // original
        // requiresAuth: true

      }
    },
    {
      path: "/add-book",
      name: 'add-book',
      component: NewBookForm,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: "/user/list",
      name: 'my-list',
      component: SavedList,
      meta: {
        // requiresAuth: false
        requiresAuth: true // original
      }
    },
    {
      path: "/forum",
      name: 'all-topics',
      component: ForumTopicsView,
      meta: {
        requiresAuth: true
      }
    },
      {
        path: "/forum/:id",
        name: 'topic-posts',
        component: TopicPostsView,
        meta: {
          requiresAuth: true
        }
      },

      {
        path: "/forum/add-forum-topic",
        name: 'add-a-topic',
        component: NewTopicView
      },
      
      {
        path: "/forum/topic/add-post",
        name: 'reply-to-post',
        component: ReplyForm

      }

  ]
})

router.beforeEach((to, from, next) => {
  // Determine if the route requires Authentication
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  // If it does and they are not logged in, send the user to "/login"
  if (requiresAuth && store.state.token === '') {
    next("/login");
  } else {
    // Else let them go to their next destination
    next();
  }
});

export default router;
