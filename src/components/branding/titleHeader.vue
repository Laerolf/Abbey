<template>
  <nav
    abbey-token="abbey-header"
    class="navbar is-light"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <h4 class="navbar-item title is-4">{{ $t("game.general.name") }}</h4>
    </div>

    <div class="navbar-menu">
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link v-if="player.name" to="/game/player" tag="a" class="button is-primary">{{
              $t("game.general.greeting", { name: player.name })
            }}</router-link>
            <router-link v-if="!player.name" to="/game/player" tag="a" class="button is-primary">{{
              $t("game.general.name", { name: $t("game.general.unknownUser") })
            }}</router-link>
            <a class="button is-danger" @click="logout">{{
              $t("game.general.actions.logOutButton")
            }}</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import router from "@/router";

const fromPlayer = createNamespacedHelpers("player");
const fromUser = createNamespacedHelpers("user");

export default {
  name: "TitleHeader",
  computed: {
    ...fromUser.mapState({
      user: state => state
    }),
    ...fromPlayer.mapState({
      player: state => state
    })
  },
  methods: {
    async logout() {
      await this.$axios.post("logout");

      router.push("/login");
    }
  }
};
</script>

<style scoped>
.navbar-nav > button {
  margin-right: 1%;
}

.navbar-nav > button:last-child {
  margin-right: 0;
}
</style>
