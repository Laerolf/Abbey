<template>
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">{{ $t("game.marketplace.vendors.title") }}</p>
    </div>
    <div class="card-content">
      <div v-if="!loading" class="content">
        <VendorButton v-for="vendor in vendors" :key="vendor.name" :vendor="vendor" />
      </div>
      <div v-else class="content">
        <p>Loading ...</p>
      </div>
    </div>
  </div>
</template>

<script>
import VendorButton from "@/components/marketplace/vendorButton";
import { fromVendors } from "@/store/modules/vendors";

export default {
  name: "Vendors",
  components: { VendorButton },
  data() {
    return {
      loading: true
    };
  },
  computed: {
    ...fromVendors.mapState({
      vendors: state => state
    })
  },
  async created() {
    await this.loadVendors();
    this.loading = false;
  },
  methods: {
    ...fromVendors.mapActions(["loadVendors"])
  }
};
</script>

<style scoped></style>
