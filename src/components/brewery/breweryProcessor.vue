<template>
  <div class="card processor">
    <div class="card-header">
      <p class="card-header-title">
        {{ $t(`game.brewery.breweryProcessors.${breweryProcessor.name}`) | capitalize }}
      </p>
    </div>
    <div class="card-content">
      <div class="content">
        <h5 class="title is-5">{{ $t("game.brewery.breweryProcessor.input.title") }}</h5>
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
            {{ inputItem.quantity }} {{ inputItem.resource.name }}
          </li>
        </ul>

        <div>
          <h5 class="title is-5">{{ $t("game.brewery.breweryProcessor.output.title") }}</h5>
          <ul>
            <li v-for="output in outputResources" :key="output.name">
              {{ output.quantity }} {{ output.resource.name }}
            </li>
          </ul>
        </div>

        <progress
          :abbey-token="`abbey-facility-content-progress-${breweryProcessor.name}`"
          :value="progress"
          :min="minProgress"
          :max="maxProgress"
          class="progress is-info"
        />

        <div v-if="gained">
          <p>
            {{
              $t("game.brewery.breweryProcessor.gain.overviewMessage", {
                outputQuantity: outputResources[0].quantity,
                outputResource: outputResources[0].resource.name
              })
            }}
          </p>
          <ul>
            <li>
              {{
                $t("game.brewery.breweryProcessor.gain.detailMessage", {
                  outputQuantity: outputResources[0].quantity,
                  outputResource: outputResources[0].resource.name
                })
              }}
            </li>
          </ul>
        </div>

        <div class="field is-grouped">
          <p class="control">
            <button
              v-if="!gainable"
              :disabled="!processable"
              class="button is-info"
              @click="process"
            >
              {{ $t("game.brewery.breweryProcessor.buttons.process") }}
            </button>
          </p>
          <p class="control">
            <button v-if="gainable" class="button is-success" @click="gain">
              {{ $t("game.brewery.breweryProcessor.buttons.gain") }}
            </button>
          </p>
          <p class="control">
            <button
              v-if="!inProgress && !gainable"
              :disabled="!processable"
              class="button is-success"
              @click="automaticProcess"
            >
              {{ $t("game.brewery.breweryProcessor.buttons.auto") }}
            </button>
          </p>
        </div>
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
      gainable: this.breweryProcessor.gainable,
      output: undefined,
      gained: false
    };
  },
  computed: {
    ...fromResources.mapState({ resources: state => state }),
    ...fromStock.mapState({ stock: state => state }),
    inProgress: function() {
      return this.progress > 0;
    },
    processed: function() {
      return this.progress === this.maxProgress;
    },
    processable: function() {
      return !!(this.inProgress || this.inputInStock);
    },
    inputInStock: function() {
      let inStock = true;
      this.inputResources.forEach(inputItem => {
        inStock = this.hasInputAvailable(inputItem);
      });

      return inStock;
    },
    inputResources: function() {
      const { input } = this.breweryProcessor;

      return input.map(item => {
        return {
          resource: this.resources.find(resource => resource._id === item.resource),
          quantity: item.quantity
        };
      });
    },
    outputResources: function() {
      const { output } = this.breweryProcessor;

      return output.map(item => {
        return {
          resource: this.resources.find(resource => resource._id === item.resource),
          quantity: item.quantity
        };
      });
    }
  },
  methods: {
    ...fromBreweryProcessors.mapActions(["saveProcessingBreweryProcessor"]),
    ...fromStock.mapActions(["increaseStock", "decreaseStock"]),
    process: function() {
      this.gained = false;

      if (!this.inProgress) {
        this.inputResources.forEach(item => {
          this.decreaseStock({
            item: item.resource._id,
            quantity: item.quantity
          });
        });
      }

      if (!this.processed) {
        this.progress += this.progressStep;
      }

      if (this.processed) {
        this.gainable = true;
      }

      this.saveProcessingBreweryProcessor({
        id: this.breweryProcessor._id,
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

      this.gainable = false;
      this.gained = true;

      this.outputResources.forEach(item => {
        this.increaseStock({
          stockItemName: item.resource._id,
          quantity: item.quantity
        });
      });

      this.saveProcessingBreweryProcessor({
        id: this.breweryProcessor._id,
        progress: this.progress,
        gainable: this.gainable
      });
    },
    hasInputAvailable: function(input) {
      const { resource, quantity } = input;

      return !!Object.values(this.stock).find(
        item => item.resource === resource._id && quantity <= item.quantity
      );
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
