export const mutations = {
  loadGame: function(state, gameInfo) {
    state.abbey = gameInfo.abbey;
    state.brewery = gameInfo.brewery;
    state.fields = gameInfo.fields;
    state.facilities = gameInfo.facilities;
    state.stock = gameInfo.stock;
    state.story = gameInfo.story;
    state.workbench = gameInfo.workbench;
  },
  loadFacilities: function(state, facilitiesInfo) {
    state.facilities = facilitiesInfo;
  },
  loadBeers: function(state, beersInfo) {
    state.beers = beersInfo;
  },
  loadRecipes: function(state, recipesInfo) {
    state.recipes = recipesInfo;
  },
  loadResources: function(state, resourcesInfo) {
    state.resources = resourcesInfo;
  },
  loadTransmutations: function(state, transmutationsInfo) {
    state.transmutations = transmutationsInfo;
  },
  loadVendors: function(state, vendorsInfo) {
    state.vendors = vendorsInfo;
  },
  loadUser: function(state, userInfo) {
    state.user = userInfo;
  },
  loadBreweryProcessors: function(state, breweryProcessorsInfo) {
    state.breweryProcessors = breweryProcessorsInfo;
  },
  loadPlayer: function(state, playerInfo) {
    state.player = playerInfo;
  }
};
export const actions = {
  loadUser: function(context, userSafe) {
    context.commit("loadUser", userSafe);
  },
  loadPlayer: function(context, playerSafe) {
    context.commit("loadPlayer", playerSafe);
  },
  loadBeers: function(context, beersSafe) {
    context.commit("loadBeers", beersSafe);
  },
  loadBreweryProcessors: function(context, brewingProcessorsSafe) {
    context.commit("loadBreweryProcessors", brewingProcessorsSafe);
  },
  loadRecipes: function(context, recipesSafe) {
    context.commit("loadRecipes", recipesSafe);
  },
  loadTransmutations: function(context, transmutationsSafe) {
    context.commit("loadTransmutations", transmutationsSafe);
  },
  loadVendors: function(context, vendorsSafe) {
    context.commit("loadVendors", vendorsSafe);
  }
};
