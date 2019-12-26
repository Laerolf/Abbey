<template>
  <div class="card processor">
    <div class="card-header">
      <p class="card-header-title">{{ breweryProcessor.name | capitalize }}</p>
    </div>
    <div class="card-content">
      <div class="content">
        <h5 class="title is-5">Input</h5>
        <ul>
          <li v-for="inputItem in inputResources" :key="inputItem.name">
            <font-awesome-icon
              v-if="!hasInputAvailable(inputItem)"
              icon="times"
              class="has-text-danger"
            />
            <font-awesome-icon
              v-if="hasInputAvailable(inputItem)"
              icon="check"
              class="has-text-success"
            />
            {{ inputItem.quantity }} {{ inputItem.name }}
          </li>
        </ul>

        <div>
          <h5 class="title is-5">Output</h5>
          <ul>
            <li v-for="output in outputResources" :key="output.name">
              {{ output.quantity }} {{ output.name }}
            </li>
          </ul>
        </div>

        <div class="progress">
          <div
            :style="{ width: progress + '%' }"
            :aria-valuenow="progress"
            :aria-valuemin="minProgress"
            :aria-valuemax="maxProgress"
            class="progress-bar bg-success"
            role="progressbar"
          />
        </div>

        <div v-if="gained">
          <p>You got {{ outputResources[0].quantity }} {{ outputResources[0].name }}!</p>
          <ul>
            <li>Regular gain: {{ outputResources[0].quantity }}</li>
          </ul>
        </div>

        <button
          v-if="!inProgress && !gainable"
          :disabled="!processable"
          class="button is-info"
          @click="process"
        >
          Process
        </button>
        <button v-if="gainable" class="button is-success" @click="gain">
          Gain
        </button>
        <button
          v-if="!inProgress && !gainable"
          :disabled="!processable"
          class="button is-success"
          @click="automaticProcess"
        >
          Auto
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { fromStock } from "@/store/modules/stock";
import { fromBreweryProcessors } from "@/store/modules/breweryProcessors";
import { fromResources } from "../../store/modules/resources";

export default {
  name: "BreweryProcessor",
  props: ["breweryProcessor"],
  data() {
    return {
      minProgress: 0,
      maxProgress: 100,
      progress: this.breweryProcessor.progress,
      progressStep: 10,
      processedAmt: 0,
      totalProcessTime: 1000 * 10,
      inProgress: false,
      gainable: this.breweryProcessor.gainable,
      output: undefined,
      gained: false
    };
  },
  computed: {
    ...fromResources.mapState({ resources: state => state }),
    ...fromStock.mapState({ stock: state => state }),
    processable: function() {
      return !!(this.progress > 0 || this.inputInStock);
    },
    inputInStock: function() {
      let inputInStock = true;

      for (let item in this.inputResources) {
        if (this.inputResources.hasOwnProperty(item)) {
          let selectedInputItem = this.inputResources[item];
          let selectedStockItem = this.stock[selectedInputItem.resource];

          if (!selectedStockItem || selectedStockItem.quantity < selectedInputItem.quantity) {
            inputInStock = false;
          }
        }
      }

      return inputInStock;
    },
    inputResources: function() {
      const input = this.breweryProcessor.input;

      const inputResources = [];

      input.forEach(item => {
        let selectedInputResource = this.resources.filter(
          resource => resource._id === item.resource
        )[0];

        inputResources.push({
          name: selectedInputResource.name,
          quantity: item.quantity
        });
      });

      return inputResources;
    },
    outputResources: function() {
      const output = this.breweryProcessor.output;

      const outputResources = [];

      output.forEach(item => {
        let selectedOutputResource = this.resources.filter(
          resource => resource._id === item.resource
        )[0];

        outputResources.push({
          name: selectedOutputResource.name,
          quantity: item.quantity
        });
      });

      return outputResources;
    }
  },
  methods: {
    ...fromBreweryProcessors.mapActions(["saveProcessingBreweryProcessor"]),
    ...fromStock.mapActions(["increaseStock", "decreaseStock"]),
    process: function() {
      this.gained = false;

      if (this.progress === 0) {
        for (let item in this.inputResources) {
          if (this.inputResources.hasOwnProperty(item)) {
            let selectedInputItem = this.inputResources[item];
            this.decreaseStock({
              stockItemName: selectedInputItem.resource,
              quantity: selectedInputItem.quantity
            });
          }
        }
      }

      if (this.progress < 100) {
        this.progress += this.progressStep;
      }

      if (this.progress >= 100) {
        this.gainable = true;
      }

      this.saveProcessingBreweryProcessor({
        name: this.breweryProcessor.name,
        progress: this.progress,
        gainable: this.gainable
      });
    },
    automaticProcess: function() {
      const processor = this;

      processor.gained = false;
      processor.inProgress = true;
      const timePerProgress = this.totalProcessTime / (this.maxProgress / this.progressStep);

      let automation = setInterval(function() {
        processor.process();

        if (processor.progress >= 100) {
          processor.inProgress = false;
          clearInterval(automation);
        }
      }, timePerProgress);
    },
    gain: function() {
      this.progress = 0;
      this.output = this.outputResources;

      this.gainable = false;
      this.gained = true;

      this.increaseStock({
        stockItemName: this.output.resource,
        quantity: this.output.quantity
      });
      this.saveProcessingBreweryProcessor({
        name: this.breweryProcessor.name,
        progress: this.progress,
        gainable: this.gainable
      });
    },
    hasInputAvailable: function(input) {
      let available = false;

      if (this.stock[input.resource] && this.stock[input.resource].quantity >= input.quantity) {
        available = true;
      }

      return available;
    }
  }
};
</script>

<style scoped>
.processor {
  margin-bottom: 2%;
}

.processor:last-child {
  margin-bottom: 0;
}
</style>
