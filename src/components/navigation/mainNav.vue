<template>
  <aside class="menu">
    <p class="menu-label">
      Navigation
    </p>
    <ul class="menu-list">
      <li v-for="(tab, tabIndex) in tabs" :key="tabIndex">
        <router-link :to="tab.to">
          <span class="icon is-medium"><font-awesome-icon :icon="tab.icon"/></span>
          <span>{{ tab.name }}</span>
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: "MainNav",
  props: {
    tabs: { type: Array, default: () => [] }
  }
};
</script>

<style scoped></style>
