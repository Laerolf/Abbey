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
  </nav>
</template>

<script>
export default {
  name: "TitleHeader"
};
</script>
