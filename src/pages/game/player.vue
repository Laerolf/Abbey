<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">{{ user.username | capitalize }}</p>
    </header>
    <div class="card-content">
      <div class="content">
        <p>Here you can find all we know from you.</p>

        <h5>User information</h5>
        <p>Your username is {{ user.username }}.</p>
        <p>
          The last time you logged in was
          {{ user.lastLoginDate | formatDateDayNameMonthYearWithTime }}.
        </p>
        <p>
          You created your account on
          {{ user.registrationDate | formatDateDayNameMonthYear }}.
        </p>

        <h5>Player information</h5>
        <p>The name of your character is {{ player.name }}.</p>

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
  }
};
</script>

<style scoped></style>
