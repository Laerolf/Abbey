<template>
  <footer class="footer">
    <div class="content">
      <div class="level">
        <div class="level-item">
          <div class="select is-rounded">
            <select v-model="$i18n.locale">
              <option value="en">English</option>
              <option value="nl">Nederlands</option>
            </select>
          </div>
        </div>
        <div class="level-item">
          {{ $t("game.general.name") }} <font-awesome-icon icon="copyright" />
          <a
            abbey-token="abbey-donate"
            href="https://opencollective.com/abbey"
            target="_blank"
            class="btn"
            data-toggle="tooltip"
            >{{ $t("game.general.donate") }}</a
          >
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "BrandFooter"
};
</script>

<style scoped></style>
