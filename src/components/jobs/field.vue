<template>
  <div :abbey-token="`abbey-field-${field.number}`" class="field card">
    <div class="card-header" :abbey-token="`abbey-field-header-${field.number}`">
      <p v-if="hasResource" class="card-header-title">
        {{ $t("game.jobs.field.title", { resource: fieldResource.name | capitalize }) }}
      </p>
      <p v-else class="card-header-title">{{ $t("game.jobs.field.noResourceTitle") }}</p>
    </div>
    <div class="card-content" :abbey-token="`abbey-field-content-${field.number}`">
      <div class="content" v-if="hasResource">
        <p class="card-text" :abbey-token="`abbey-field-content-harvestRate-${field.number}`">
          Harvest rate: {{ field.harvestAmount }}
        </p>

        <progress
          :abbey-token="`abbey-field-content-installed-progress-${field.number}`"
          :value="progress"
          :min="minProgress"
          :max="maxProgress"
          class="progress is-info"
        />
      </div>
      <div
        :abbey-token="`abbey-field-content-plain-${field.number}`"
        class="content"
        v-if="!hasResource"
      >
        <div
          :abbey-token="`abbey-field-content-plain-availableSeeds-${field.number}`"
          v-if="availableSeeds.length"
        >
          <p>{{ $t("game.jobs.field.seedToSow") }}</p>

          <div class="field">
            <div class="control">
              <select
                :abbey-token="`abbey-field-content-plain-availableSeeds-seedList-${field.number}`"
                class="select"
                v-model="selectedSeedId"
              >
                <option v-for="{ label, value } in availableSeeds" :key="value" :value="value">{{
                  label
                }}</option>
              </select>
            </div>
          </div>
        </div>

        <div
          :abbey-token="`abbey-field-content-plain-availableSeeds-undefined-${field.number}`"
          v-else
        >
          <p>{{ $t("game.jobs.field.noSeeds") }}</p>
        </div>
      </div>
    </div>
    <div
      :abbey-token="`abbey-field-content-installed-options-${field.number}`"
      v-show="optionsShown"
      class="box field--options"
    >
      <div class="content">
        <h5
          class="title is-5"
          :abbey-token="`abbey-field-content-installed-options-title-${field.number}`"
        >
          {{ $t("game.jobs.field.configuration.title") }}
        </h5>
        <ul :abbey-token="`abbey-field-content-installed-options-details-${field.number}`">
          <li
            :abbey-token="
              `abbey-field-content-installed-options-details-initialValue-${field.number}`
            "
          >
            {{ $t("game.jobs.field.configuration.initialValue") }}
            <font-awesome-icon icon="stop-circle" class="text-gold" />
            {{ field.fieldValue.initial }}
          </li>
          <li
            :abbey-token="
              `abbey-field-content-installed-options-details-currentValue-${field.number}`
            "
          >
            {{ $t("game.jobs.field.configuration.currentValue")
            }}<font-awesome-icon icon="stop-circle" class="text-gold" />
            {{ field.fieldValue.current }}
          </li>
        </ul>

        <div
          class="field is-grouped"
          :abbey-token="`abbey-field-content-installed-options-details-actions-${field.number}`"
        >
          <p class="control">
            <button
              class="button is-success"
              :abbey-token="
                `abbey-field-content-installed-options-details-actions-sell-${field.number}`
              "
              @click="sell"
            >
              {{ $t("game.jobs.field.configuration.actions.sellButton") }}
            </button>
          </p>
          <p class="control">
            <button
              :abbey-token="
                `abbey-field-content-installed-options-details-actions-reset-${field.number}`
              "
              class="button is-danger"
              @click="reset"
            >
              {{ $t("game.jobs.field.configuration.actions.resetButton") }}
            </button>
          </p>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <div v-if="!fieldResource" class="card-footer-item">
        <span>
          <button
            class="button is-success"
            :disabled="!hasSelectedSeed"
            :abbey-token="
              `abbey-field-content-plain-availableSeeds-actions-install-${field.number}`
            "
            @click="install"
          >
            {{ $t("game.jobs.field.actions.installButton") }}
          </button>
        </span>
      </div>
      <div v-if="fieldResource && !harvestable" class="card-footer-item">
        <span>
          <button
            :abbey-token="`abbey-field-content-installed-actions-grow-${field.number}`"
            class="button is-primary"
            @click="grow"
          >
            {{ $t("game.jobs.field.actions.growButton") }}
          </button>
        </span>
      </div>
      <div v-if="fieldResource && harvestable" class="card-footer-item">
        <span>
          <button
            :abbey-token="`abbey-field-content-installed-actions-harvest-${field.number}`"
            class="button is-success"
            @click="harvest"
          >
            {{ $t("game.jobs.field.actions.harvestButton") }}
          </button>
        </span>
      </div>
      <div class="card-footer-item">
        <span>
          <button
            :abbey-token="`abbey-field-content-installed-actions-options-${field.number}`"
            :class="{ 'is-outlined': optionsShown }"
            class="button is-info"
            @click="showOptions"
          >
            {{ $t("game.jobs.field.actions.optionsButton") }}
          </button>
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import { fromStock } from "@/store/modules/stock";
import { fromResources } from "@/store/modules/resources";
import { fromFields } from "@/store/modules/fields";
import { fromPlayer } from "@/store/modules/player";
import { fromTransmutations } from "@/store/modules/transmutations";

export default {
  name: "Field",
  props: ["field"],
  data() {
    return {
      minProgress: 0,
      maxProgress: 100,
      progress: this.field.progress,
      harvestable: this.field.harvestable,
      harvested: undefined,
      selectedSeedId: undefined,
      optionsShown: false
    };
  },
  computed: {
    ...fromResources.mapState({
      resources: state => state
    }),
    ...fromStock.mapState({
      stock: state => state
    }),
    ...fromTransmutations.mapState({ transmutations: state => state }),
    hasSelectedSeed() {
      return !!this.selectedSeedId;
    },
    hasResource() {
      return !!this.field.resource;
    },
    fieldResource() {
      return this.hasResource
        ? this.resources.find(resource => resource._id === this.field.resource)
        : undefined;
    },
    availableSeeds: function() {
      return Object.values(this.stock)
        .filter(
          item =>
            !!this.resources.find(
              resource => resource._id === item.resource && resource.category === "seeds"
            )
        )
        .map(seed => {
          return {
            value: seed.resource,
            label: this.resources.find(resource => resource._id === seed.resource).name
          };
        });
    },
    availableTransmutations: function() {
      return this.transmutations.filter(transmutation => transmutation.category === "seeds");
    },
    monkBonus: function() {
      return this.$parent.monkBonus;
    },
    monkBonusAmt: function() {
      return Math.floor(this.monkBonus * this.field.harvestAmount);
    }
  },
  methods: {
    ...fromStock.mapActions(["decreaseStock", "increaseStock"]),
    ...fromFields.mapActions([
      "setFieldResource",
      "saveGrowingField",
      "depreciateField",
      "sellField",
      "renumberFields"
    ]),
    ...fromPlayer.mapActions(["increaseGoldenCoins"]),
    install: function() {
      if (this.hasSelectedSeed) {
        const fieldOutput = this.availableTransmutations.find(transmutation =>
          transmutation.input.every(item => item.resource === this.selectedSeedId)
        ).output;

        fieldOutput.forEach(outputItem => {
          this.setFieldResource({
            fieldNumber: this.field.number,
            resource: outputItem.resource
          });
        });

        this.decreaseStock({ item: this.selectedSeedId, quantity: 1 });
      }
    },
    reset: function() {
      this.setFieldResource({
        fieldNumber: this.field.number,
        resource: undefined
      });
    },
    grow: function() {
      this.harvested = false;

      if (this.progress < 100) {
        this.progress += 10;
      }

      if (this.progress >= 100) {
        this.harvestable = true;
      }

      this.saveGrowingField({
        fieldNumber: this.field.number,
        progress: this.progress,
        harvestable: this.harvestable
      });
    },
    depreciate: function() {
      const newFieldValue = this.field.fieldValue.current - this.field.fieldValue.current * 0.1;
      this.depreciateField({
        fieldNumber: this.field.number,
        fieldValue: newFieldValue
      });
    },
    harvest: function() {
      this.progress = 0;

      this.harvestable = false;
      this.harvested = true;

      let harvestAmount = this.field.harvestAmount + this.monkBonusAmt;

      this.increaseStock({
        stockItemName: this.fieldResource._id,
        quantity: harvestAmount
      });

      this.saveGrowingField({
        fieldNumber: this.field.number,
        progress: this.progress,
        harvestable: this.harvestable
      });

      const message = `
          <p>You got ${this.field.harvestAmount + this.monkBonusAmt} ${this.fieldResource.name}!</p>
          <ul>
            <li>Regular harvest: ${this.field.harvestAmount}</li>
            ${this.monkBonusAmt > 0 ? `<li>Monk bonus: ${this.monkBonusAmt}</li>` : ""}
          </ul>`;

      this.$notify({
        group: "notifications",
        title: `Harvested`,
        text: message,
        type: "success"
      });

      this.depreciate();
    },
    sell: function() {
      this.increaseGoldenCoins({ amount: this.field.fieldValue.current });
      this.sellField({ fieldNumber: this.field.number });
      this.renumberFields();
    },
    showOptions: function() {
      this.optionsShown = !this.optionsShown;
    }
  }
};
</script>

<style scoped lang="scss">
.field .card {
  margin-bottom: 3rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.field--options,
.box:not(:last-child) {
  margin-bottom: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
}
</style>
