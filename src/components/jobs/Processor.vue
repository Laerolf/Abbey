<template>
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">{{ processor.name | capitalize }}</p>
    </div>
    <div class="card-content">
      <div class="columns is-multiline">
        <div class="column is-half">
          <p class="title">{{ $t("game.jobs.processor.input.title") }}</p>
          <div v-if="hasInputOptions" class="tile box">
            <div class="container">
              <div class="columns is-multiline">
                <div class="column">
                  <div class="field">
                    <label class="label">{{ $t("game.jobs.processor.input.resource") }}</label>
                    <div class="control select is-fullwidth">
                      <select v-model="selectedResource">
                        <option
                          v-for="{ value, label } in inputAsOptions"
                          :key="value"
                          :value="value"
                        >
                          {{ label }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="column">
                  <div class="field">
                    <label class="label">{{ $t("game.jobs.processor.input.amount") }}</label>
                    <div class="control">
                      <input
                        :disabled="!selectedResource"
                        class="input"
                        type="number"
                        min="0"
                        :max="maxAmount"
                        v-model.number="selectedAmount"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="tile box output--placeholder">
            <p>{{ $t("game.jobs.processor.input.noInputOptions") }}</p>
          </div>
        </div>

        <div class="column is-half">
          <p class="title">{{ $t("game.jobs.processor.output.title") }}</p>
          <div
            class="tile box output"
            v-for="{ resource, quantity } in output"
            :key="resource.name"
          >
            <div class="container">
              <div class="columns is-vbottom">
                <div class="column">
                  <div class="field">
                    <label class="label">{{ $t("game.jobs.processor.output.resource") }}</label>
                    <div class="control">
                      <p>{{ resource.name }}</p>
                    </div>
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <label class="label">{{ $t("game.jobs.processor.output.amount") }}</label>
                    <div class="control">
                      <p>{{ quantity }}</p>
                    </div>
                  </div>
                </div>
                <div class="column is-one-quarter">
                  <button class="button is-warning" @click="process">
                    {{ $t("game.jobs.processor.process") }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="tile box output--placeholder" v-if="!hasAvailableTransmutation">
            <p>{{ $t("game.jobs.processor.output.noProcess") }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fromProcessors } from "@/store/modules/processors";
import { fromResources } from "@/store/modules/resources";
import { fromStock } from "@/store/modules/stock";
import { fromTransmutations } from "@/store/modules/transmutations";

export default {
  name: "Processor",
  props: {
    processor: { type: Object, required: true }
  },
  methods: {
    ...fromProcessors.mapActions(["setProcessorSelectedInput"]),
    ...fromStock.mapActions(["increaseStock", "decreaseStock"]),
    process() {
      const { amount: inputAmount, resource: inputResource } = this.selectedInput;

      this.decreaseStock({
        item: inputResource,
        quantity: inputAmount
      });

      this.output.forEach(outputItem => {
        const { quantity: outputAmount, resource: outputResource } = outputItem;
        this.increaseStock({
          stockItemName: outputResource.id,
          quantity: outputAmount
        });
      });
    }
  },
  computed: {
    ...fromResources.mapState({ resources: state => state }),
    ...fromStock.mapState({ stock: state => state }),
    ...fromTransmutations.mapState({ transmutations: state => state }),
    selectedInput() {
      return this.processor.selectedInput;
    },
    hasSelectedInput() {
      return !!this.selectedInput;
    },
    selectedResource: {
      get() {
        return this.hasSelectedInput ? this.selectedInput.resource : undefined;
      },
      set(newResource) {
        this.setProcessorSelectedInput({
          processorId: this.processor._id,
          key: "resource",
          value: newResource
        });
      }
    },
    selectedAmount: {
      get() {
        return this.hasSelectedInput ? this.selectedInput.amount : 0;
      },
      set(newAmount) {
        this.setProcessorSelectedInput({
          processorId: this.processor._id,
          key: "amount",
          value: newAmount
        });
      }
    },
    input() {
      return this.processor.input.map(inputItem =>
        this.resources.find(resource => resource._id === inputItem)
      );
    },
    inputAsOptions() {
      return this.input
        .filter(item => {
          return !!Object.values(this.stock).find(inputItem => {
            return inputItem.resource === item._id;
          });
        })
        .map(item => {
          return {
            value: item._id,
            label: item.name
          };
        });
    },
    hasInputOptions() {
      return !!this.inputAsOptions.length;
    },
    maxAmount() {
      const stockInput = Object.values(this.stock).find(
        item => item.resource === this.selectedResource
      );

      return stockInput ? stockInput.quantity : 0;
    },
    processorTransmutations() {
      return this.transmutations.filter(
        transmutation => transmutation.category === this.processor.mapName
      );
    },
    availableTransmutations() {
      return this.processorTransmutations.filter(transmutation =>
        transmutation.input.every(
          requirement =>
            requirement.resource === this.selectedInput.resource &&
            requirement.quantity <= this.selectedInput.amount
        )
      );
    },
    hasAvailableTransmutation() {
      return !!this.availableTransmutations.length;
    },
    output() {
      let availableTransmutationsOutput = [];
      if (this.hasAvailableTransmutation) {
        this.availableTransmutations.forEach(transmutation => {
          const { output } = transmutation;
          availableTransmutationsOutput = output.map(outputItem => {
            return {
              resource: {
                name: this.resources.find(item => item._id === outputItem.resource).name,
                id: outputItem.resource
              },
              quantity: outputItem.quantity * this.selectedAmount
            };
          });
        });
      }
      return availableTransmutationsOutput;
    }
  }
};
</script>

<style scoped>
.output--placeholder {
  padding-top: 2.75rem;
  padding-bottom: 2.75rem;
}

.output {
  padding-top: 1.75rem;
  padding-bottom: 1.75rem;
}
</style>
