/* eslint-disable prettier/prettier */
import Vue from "vue";
import Router from "vue-router";

import Default from "@/layouts/Default";
import Game from "@/layouts/Game";

import Login from "@/pages/login";
import Register from "@/pages/register";

import Stock from "@/pages/game/stock";
import Abbey from "@/pages/game/abbey";
import Jobs from "@/pages/game/jobs";
import Fields from "@/pages/game/jobs/fields";
import Facilities from "@/pages/game/jobs/facilities";
import Marketplace from "@/pages/game/marketplace";
import Vendors from "@/pages/game/marketplace/vendors";
import Brewery from "@/pages/game/brewery";
import BookOfRecipes from "@/pages/game/brewery/bookOfRecipes";
import Brew from "@/pages/game/brewery/brew";
import Player from "@/pages/game/player";
import Storybook from "@/pages/game/storybook";
import Workshop from "@/pages/game/workshop";
import Workbench from "@/pages/game/workshop/workbench";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "",
      component: Default,
      children: [
        {
          path: "",
          redirect: "/login"
        },
        {
          name: "Login",
          path: "/login",
          component: Login
        },
        {
          name: "Register",
          path: "/register",
          component: Register
        }
      ]
    },
    {
      component: Game,
      path: "/game",
      children: [
        {
          path: "",
          redirect: "storybook"
        },
        {
          name: "Stock",
          path: "stock",
          component: Stock
        },
        {
          name: "Player",
          path: "player",
          component: Player
        },
        {
          name: "Storybook",
          path: "storybook",
          component: Storybook
        },
        {
          name: "Abbey",
          path: "abbey",
          component: Abbey
        },
        {
          path: "jobs",
          component: Jobs,
          children: [
            {
              path: "",
              redirect: "fields"
            },
            {
              name: "Fields",
              path: "fields",
              component: Fields
            },
            {
              name: "Facilities",
              path: "facilities",
              component: Facilities
            }
          ]
        },
        {
          path: "marketplace",
          component: Marketplace,
          children: [
            {
              path: "",
              redirect: "vendors"
            },
            {
              name: "Vendors",
              path: "vendors",
              component: Vendors
            }
          ]
        },
        {
          path: "brewery",
          component: Brewery,
          children: [
            {
              path: "",
              redirect: "book-of-recipes"
            },
            {
              name: "BookOfRecipes",
              path: "book-of-recipes",
              component: BookOfRecipes
            },
            {
              name: "Brew",
              path: "brew",
              component: Brew
            }
          ]
        },
        {
          path: "workshop",
          component: Workshop,
          children: [
            {
              path: "",
              redirect: "workbench"
            },
            {
              name: "Workbench",
              path: "workbench",
              component: Workbench
            }
          ]
        }
      ]
    }
  ],
  linkActiveClass: "is-active"
});

/* Router.beforeEach((to, from, next) => {
  const toParts = to.path.split('/')
  const gamePath = 'game'

  let tokenNeeded = false

  if (toParts.indexOf(gamePath) !== -1) {
    tokenNeeded = true
  }

  const token = {token: $cookies.get('Token')}

  if (tokenNeeded) {
    axios.post('http://localhost:8000/api/verifyToken', token).then(response => {
      const authenticated = response.data.data.authenticated

      if (authenticated) {
        if (!store.getters.getCompletedStory && toParts.indexOf('storybook') == -1) {
          router.push('/game/storybook')
        } else {
          if (store.getters.getCompletedStory && toParts.indexOf('storybook') !== -1) {
            router.push('/game')
          } else {
            next()
          }
        }
      } else {
        router.push('/')
      }
    }).catch(error => {
      router.push('/')
    })
  } else {
    next()
  }
})

// COPY MAIN

const token = { token: $cookies.get('Token') }

const saveGame = function () {
  const gameSafe = store.getters.getGameSafe
  const playerSafe = store.getters.getPlayerSafe

  axios.put('http://localhost:8000/api/game', {token: $cookies.get('Token'), gameSafe: gameSafe}).then(response => {
    axios.put('http://localhost:8000/api/player', { token: $cookies.get('Token'), playerSafe: playerSafe }).then(response => {

    }).catch(error => {
      console.log('PLAYER SAFE ERROR:', error.response)
    })
  }).catch(error => {
    console.log('GAME SAFE ERROR:', error.response)
  })
}

const loadGame = async function (token) {
  if (token.token) {
    try {
      const gameData = await axios.post('http://localhost:8000/api/loadData', token)

      console.log(gameData)

      store.dispatch('loadUser', gameData.data.data.user)
      store.dispatch('loadGame', gameData.data.data.game)
      store.dispatch('loadPlayer', gameData.data.data.player)

      store.dispatch('loadBeers', gameData.data.data.beers)
      store.dispatch('loadFacilities', gameData.data.data.facilities)
      store.dispatch('loadBreweryProcessors', gameData.data.data.breweryProcessors)
      store.dispatch('loadRecipes', gameData.data.data.recipes)
      store.dispatch('loadResources', gameData.data.data.resources)
      store.dispatch('loadVendors', gameData.data.data.vendors)
      store.dispatch('loadTransmutations', gameData.data.data.transmutations)
      store.dispatch('loadStory', gameData.data.data.story)

new Vue({
  el: '#app',
  components: { App },
  created () {
    window.addEventListener('beforeunload', () => {
      saveGame()
    }, false)
  },
  template: '<App/>',
  store,
  router
})
} catch (error) {
  console.log(error)
}
} else {
  new Vue({
    el: '#app',
    components: { App },
    template: '<App/>',
    store,
    router
  })
}
}

loadGame(token)

*/

export default router;
