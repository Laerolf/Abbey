<template>
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">Work bench</p>
    </div>
    <div class="card-content">
      <div class="columns is-multiline is-centered">
        <div class="column is-5">
          <div class="card">
            <div class="card-header">
              <p class="card-header-title">Input</p>
            </div>
            <div class="card-content">
              <div class="columns is-multiline">
                <div class="column is-full" v-for="(slot, slotIndex) in slots" :key="slotIndex">
                  <workbench-slot
                    @update="updateWorkbenchSlot"
                    @deletion="deleteWorkbenchSlot({ slotIndex: slotIndex })"
                    :workbenchSlot="slot"
                    :items="items"
                  />
                </div>
                <div class="column is-full has-text-centered">
                  <button class="button is-success" @click="addWorkbenchSlot">
                    <font-awesome-icon icon="plus" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="column"></div>

        <div class="column is-5">
          <div class="card">
            <div class="card-header">
              <p class="card-header-title">Output</p>
            </div>
            <div class="card-content">
              <div class="columns is-multiline">
                <div
                  class="column is-full"
                  v-for="(transmutation, transmutationIndex) in availableTransmutations"
                  :key="transmutationIndex"
                >
                  <available-transmutation @production="produce" :transmutation="transmutation" />
                </div>
                <div v-show="!hasAvailableTransmutations" class="column is-full">
                  <div class="tile box">
                    <div class="container">
                      <div class="columns is-vcentered">
                        <div class="column">
                          <p>No possible output for this combination.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { fromResources } from "@/store/modules/resources";
import { fromStock } from "@/store/modules/stock";
import { fromWorkbench } from "@/store/modules/workbench";
import { fromTransmutations } from "@/store/modules/transmutations";
import WorkbenchSlot from "@/components/workshop/WorkbenchSlot";
import AvailableTransmutation from "../../../components/workshop/AvailableTransmutation";

export default {
  name: "Workbench",
  components: { AvailableTransmutation, WorkbenchSlot },
  computed: {
    ...fromResources.mapState({ resources: state => state }),
    ...fromStock.mapState({ stock: state => state }),
    ...fromTransmutations.mapState({ transmutations: state => state }),
    ...fromWorkbench.mapState(["slots"]),
    items() {
      return Object.values(this.stock).map(item => {
        return {
          label: this.resources.find(resource => resource._id === item.resource).name,
          value: item.resource,
          quantity: item.quantity
        };
      });
    },
    workbenchTransmutations() {
      return this.transmutations.filter(transmutation => transmutation.category === "workbench");
    },
    availableTransmutations() {
      return this.workbenchTransmutations.filter(transmutation =>
        transmutation.input.every(
          requirement =>
            !!this.slots.find(
              slot => requirement.resource === slot.resource && requirement.quantity <= slot.amount
            )
        )
      );
    },
    hasAvailableTransmutations() {
      return !!this.availableTransmutations.length;
    }
  },
  methods: {
    ...fromWorkbench.mapActions(["addWorkbenchSlot", "updateWorkbenchSlot", "deleteWorkbenchSlot"]),
    ...fromStock.mapActions(["increaseStock", "decreaseStock"]),
    produce(data) {
      const { input, output } = data;

      input.forEach(item => {
        const { resource, quantity } = item;

        this.decreaseStock({
          item: resource,
          quantity: quantity
        });

        this.deleteEmptyWorkbenchSlots();
      });

      output.forEach(item => {
        const { resource: outputResource, quantity } = item;
        const { name } = this.resources.find(resource => resource._id === outputResource);

        this.increaseStock({
          stockItemName: outputResource,
          quantity: quantity
        });

        this.$notify({
          group: "notifications",
          title: "Successful production",
          text: `You produced ${quantity} ${name}.`,
          type: "success"
        });
      });
    },
    deleteEmptyWorkbenchSlots() {
      this.slots.forEach((slot, slotIndex) => {
        const { resource } = slot;

        if (!Object.values(this.stock).find(item => resource === item.resource)) {
          this.deleteWorkbenchSlot({ slotIndex: slotIndex });
        }
      });
    }
  }
};
</script>
<style scoped></style>
