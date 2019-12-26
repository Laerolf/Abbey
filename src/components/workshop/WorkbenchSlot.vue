<template>
  <div class="tile box">
    <div class="container">
      <div class="columns is-vbottom">
        <div class="column">
          <div class="field">
            <label class="label">Resource</label>
            <div class="control select is-fullwidth">
              <select v-model="resource">
                <option v-for="{ label, value } in items" :key="value" :value="value">
                  {{ label }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="column is-4">
          <div class="field">
            <label class="label">Amount</label>
            <div class="control">
              <input
                :disabled="!hasResource"
                class="input"
                type="number"
                min="1"
                :max="maxAmount"
                v-model.number="amount"
              />
            </div>
          </div>
        </div>
        <div class="column is-2">
          <div class="field">
            <div class="control">
              <button class="button is-danger" @click="deleteWorkbenchSlot">
                <font-awesome-icon icon="trash" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WorkbenchSlot",
  props: {
    workbenchSlot: { type: Object, default: undefined },
    items: { type: Array, default: () => [] }
  },
  computed: {
    hasResource() {
      return !!this.items.find(item => item.value === this.resource);
    },
    resource: {
      get() {
        return this.workbenchSlot.resource;
      },
      set(newResource) {
        this.$set(this.workbenchSlot, "resource", newResource);
        this.updateWorkbenchSlot();
      }
    },
    amount: {
      get() {
        if (this.workbenchSlot.amount <= this.maxAmount) {
          return this.workbenchSlot.amount;
        } else {
          this.$set(this.workbenchSlot, "amount", this.maxAmount);
          this.$emit("update", { slot: this.workbenchSlot });
          return this.maxAmount;
        }
      },
      set(newAmount) {
        this.workbenchSlot.amount = newAmount;
        this.updateWorkbenchSlot();
      }
    },
    maxAmount() {
      if (this.hasResource) {
        return this.items.find(item => item.value === this.resource).quantity;
      }
      return 0;
    }
  },
  methods: {
    updateWorkbenchSlot() {
      this.$emit("update", { slot: this.workbenchSlot });
    },
    deleteWorkbenchSlot() {
      this.$emit("deletion");
    }
  }
};
</script>

<style scoped></style>
