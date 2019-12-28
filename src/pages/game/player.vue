<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">{{ user.username | capitalize }}</p>
    </header>
    <div class="card-content">
      <div class="content">
        <p>{{ $t("game.player.content.title") }}</p>

        <h5>{{ $t("game.player.content.userInformation.title") }}</h5>
        <p>{{ $t("game.player.content.userInformation.username", { username: user.username }) }}</p>
        <p>
          {{
            $t("game.player.content.userInformation.lastLoginDate", {
              loginDate: user.lastLoginDate | formatDateDayNameMonthYearWithTime
            })
          }}
        </p>
        <p>
          {{
            $t("game.player.content.userInformation.registrationDate", {
              registrationDate: user.registrationDate | formatDateDayNameMonthYearWithTime
            })
          }}
        </p>

        <h5>{{ $t("game.player.content.playerInformation.title") }}</h5>
        <p>
          {{ $t("game.player.content.playerInformation.name", { name: player.name }) }}
        </p>

        <p>
          So far, you had {{ player.counter.fields | zeroToNo }}
          {{ "field" | pluralizeByQuantity(player.counter.fields) }}.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { fromPlayer } from "@/store/modules/player";
import { fromUser } from "@/store/modules/user";

export default {
  name: "Player",
  computed: {
    ...fromPlayer.mapState({
      player: state => state
    }),
    ...fromUser.mapState({
      user: state => state
    })
  },
  async created() {
    await this.loadUser();
  },
  methods: {
    ...fromUser.mapActions(["loadUser"])
  }
};
</script>

<style scoped></style>
