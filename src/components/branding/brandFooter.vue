<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        {{ $t("game.general.name") }} <font-awesome-icon icon="copyright" />
        <a
          abbey-token="abbey-donate"
          href="https://opencollective.com/abbey"
          target="_blank"
          class="btn"
          data-toggle="tooltip"
          >{{ $t("game.general.donate") }}</a
        >
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "BrandFooter"
};
</script>

<style scoped></style>
