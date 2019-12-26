<template>
  <nav class="level has-background-light">
    <div class="level-item has-text-centered">
      <div>
        <Date />
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">
          <font-awesome-icon icon="stop-circle" class="text-gold" />
          {{ player.goldenCoins }}
        </p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">
          <font-awesome-icon icon="heart" class="text-red" />
          {{ player.reputation }}
        </p>
      </div>
    </div>
  </nav>
</template>

<script>
import Date from "@/components/counter/date";

import { fromPlayer } from "@/store/modules/player";

export default {
  name: "Counter",
  components: { Date },
  computed: {
    ...fromPlayer.mapState({
      player: state => state
    })
  }
};
</script>

<style scoped>
.text-gold {
  color: gold;
}

.text-red {
  color: red;
}

nav {
  padding: 2% 0;
}
</style>
