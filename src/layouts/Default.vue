<template>
  <div>
    <brandHeader />

    <section class="section">
      <router-view />
    </section>

    <brand-footer />
  </div>
</template>

<script>
import brandHeader from "@/components/branding/brandHeader";
import BrandFooter from "@/components/branding/brandFooter";
import { fromTranslations } from "@/store/modules/translations";

export default {
  name: "Default",
  components: {
    BrandFooter,
    brandHeader
  },
  async created() {
    await this.loadLanguage("en");
    await this.loadLanguage("nl");
  },
  methods: {
    ...fromTranslations.mapActions(["loadLanguage"])
  }
};
</script>
