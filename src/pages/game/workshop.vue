<template>
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">{{ $t("game.workshop.title") }}</p>
    </div>
    <div class="card-content">
      <sub-nav :tabs="tabs" />
      <div class="content">
        <router-view v-if="!loading" />
        <p v-else>Loading ...</p>
      </div>
    </div>
  </div>
</template>

<script>
import SubNav from "@/components/navigation/subNav";
import { fromTransmutations } from "@/store/modules/transmutations";

export default {
  name: "Workshop",
  components: { SubNav },
  data() {
    return {
      tabs: [
        {
          to: "/game/workshop/workbench",
          icon: "toolbox",
          name: this.$t("game.workshop.navigation.workbench")
        }
      ],
      loading: true
    };
  },
  methods: {
    ...fromTransmutations.mapActions(["loadTransmutations"])
  },
  async created() {
    await this.loadTransmutations();
    this.loading = false;
  }
};
</script>

<style scoped></style>
