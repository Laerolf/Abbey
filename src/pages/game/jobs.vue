<template>
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">Jobs</p>
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
  name: "Jobs",
  components: { SubNav },
  data() {
    return {
      tabs: [
        {
          to: "/game/jobs/fields",
          icon: "seedling",
          name: "Fields"
        },
        {
          to: "/game/jobs/facilities",
          icon: "tree",
          name: "Facilities"
        }
      ]
    };
  }
};
</script>

<style scoped></style>
