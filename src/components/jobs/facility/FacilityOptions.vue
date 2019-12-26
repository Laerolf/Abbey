<template>
  <div
    :abbey-token="`abbey-facility-content-autoFetch-options-${facilityName}`"
    v-show="show"
    class="box"
  >
    <h5 class="title is-5">Options</h5>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Assigned monks</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input
              :abbey-token="
                `abbey-facility-content-autoFetch-options-assignedMonks-${facilityName}`
              "
              :max="availableMonks"
              v-model.number.lazy="facilityMonks"
              type="number"
              min="0"
              class="input"
            />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FacilityOptions",
  props: {
    facilityName: { type: String, required: true },
    assignedMonks: { type: Number, required: true },
    availableMonks: { type: Number, required: true },
    show: { type: Boolean, default: false }
  },
  computed: {
    facilityMonks: {
      get() {
        return this.assignedMonks;
      },
      set(amountOfMonks) {
        this.$emit("update", { amountOfMonks: amountOfMonks });
      }
    }
  }
};
</script>

<style scoped></style>
