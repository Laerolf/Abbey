<template>
  <div>
    <div class="tabs">
      <ul>
        <router-link v-for="tab in tabs" :to="tab.to" :key="tab.name" tag="li">
          <a>
            <span class="icon is-small"><font-awesome-icon :icon="tab.icon"/></span>
            <span>{{ tab.name }}</span>
          </a>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubNav",
  props: { tabs: { type: Array, default: () => [] } }
};
</script>

<style scoped></style>
