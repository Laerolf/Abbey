<template>
  <div id="'abbey-marketplace" class="card">
    <div class="card-header">
      <p class="card-header-title">
        {{ $t("game.marketplace.title") }}
      </p>
    </div>
    <div class="card-content">
      <SubNav :tabs="tabs" />
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import SubNav from "@/components/navigation/subNav";

export default {
  name: "Marketplace",
  components: { SubNav },
  data() {
    return {
      tabs: [
        {
          to: "/game/marketplace/vendors",
          name: this.$t("game.marketplace.navigation.vendors"),
          icon: "comments"
        }
      ]
    };
  }
};
</script>

<style scoped></style>
