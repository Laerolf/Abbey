<template>
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">{{ $t("game.jobs.title") }}</p>
    </div>
    <div class="card-content">
      <SubNav :tabs="tabs" />
      <div class="content">
        <router-view v-if="!loading" />
        <p v-else>Loading ...</p>
      </div>
    </div>
  </div>
</template>

<script>
import SubNav from "@/components/navigation/subNav";
import { fromTransmutations } from "../../store/modules/transmutations";

export default {
  name: "Jobs",
  components: { SubNav },
  data() {
    return {
      tabs: [
        {
          to: "/game/jobs/fields",
          icon: "seedling",
          name: this.$t("game.jobs.navigation.fields")
        },
        {
          to: "/game/jobs/facilities",
          icon: "tree",
          name: this.$t("game.jobs.navigation.facilities")
        },
        {
          to: "/game/jobs/processors",
          icon: "sync-alt",
          name: this.$t("game.jobs.navigation.processors")
        }
      ],
      loading: true
    };
  },
  async created() {
    await this.loadTransmutations();
    this.loading = false;
  },
  methods: {
    ...fromTransmutations.mapActions(["loadTransmutations"])
  }
};
</script>

<style scoped></style>
