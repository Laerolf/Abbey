<template>
  <button class="button is-info" @click="openModal">{{ vendor.name }}</button>
</template>

<script>
import VendorModal from "./vendorModal";

export default {
  name: "VendorButton",
  props: ["vendor"],
  computed: {
    getTitle: function() {
      const interests = this.vendor.interests;

      let title = `Interests:`;

      for (let interest in interests) {
        if (interests.hasOwnProperty(interest)) {
          let selectedInterest = interests[interest];

          title += `</br>- ${selectedInterest}`;
        }
      }

      return title;
    }
  },
  methods: {
    openModal: function() {
      this.$modal.show(
        VendorModal,
        {
          vendor: this.vendor
        },
        { height: "auto", scrollable: true }
      );
    }
  }
};
</script>

<style scoped></style>
