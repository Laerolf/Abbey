<template>
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">{{ $t("game.jobs.fields.title") }}</p>
    </div>
    <div class="card-content">
      <div v-if="!loading" class="content">
        <div v-if="fields.length > 0">
          <p v-if="fieldMonks < 1">{{ $t("game.jobs.fields.noWorkingMonkMessage") }}</p>

          <p v-if="fieldMonks >= 1">
            {{ $t("game.jobs.fields.workingMonkMessage", { monkAmount: fieldMonks }) }}<br />
            {{ $t("game.jobs.fields.monkBonusMessage", { monkBonus: monkBonus | percentize }) }}
          </p>

          <field v-for="(field, index) in fields" :key="`field-${index}`" :field="field" />
        </div>

        <div v-if="fields.length === 0">
          <p class="card-text">{{ $t("game.jobs.fields.noFieldsMessage") }}</p>
        </div>

        <button
          :disabled="!ableToBuyNewField"
          abbey-token="jobs-fields-buyField"
          class="button is-success"
          @click="buyNewField"
        >
          {{ $t("game.jobs.fields.buyFieldButton") }}
          <font-awesome-icon icon="stop-circle" class="text-gold" />{{ fieldPrice }}
        </button>
      </div>

      <div v-else>
        Loading ...
      </div>
    </div>
  </div>
</template>

<script>
import field from "@/components/jobs/field";
import { fromPlayer } from "@/store/modules/player";
import { fromFields } from "@/store/modules/fields";
import { fromAbbey } from "@/store/modules/abbey";
import { fromTransmutations } from "../../../store/modules/transmutations";

export default {
  name: "Fields",
  components: { field },
  data() {
    return {
      loading: true
    };
  },
  computed: {
    ...fromAbbey.mapState(["departments"]),
    ...fromFields.mapState({
      fields: state => state
    }),
    ...fromPlayer.mapState(["counter", "goldenCoins"]),
    ableToBuyNewField() {
      return this.goldenCoins - this.fieldPrice >= 0 || this.fieldPrice === 0;
    },
    fieldPrice: function() {
      const allTimeFieldCount = this.counter.fields ? this.counter.fields : 0;
      return Math.floor(25 * (allTimeFieldCount * 2.5));
    },
    fieldMonks: function() {
      return this.departments.fields.monks;
    },
    monkBonus: function() {
      return (this.fieldMonks / 100) * 10;
    }
  },
  async created() {
    await this.loadTransmutations();
    this.loading = false;
  },
  methods: {
    ...fromPlayer.mapActions(["decreaseGoldenCoins", "setPlayerCounter"]),
    ...fromFields.mapActions(["buyField"]),
    ...fromTransmutations.mapActions(["loadTransmutations"]),
    buyNewField: function() {
      if (this.ableToBuyNewField) {
        this.decreaseGoldenCoins({ amount: this.fieldPrice });
        this.buyField({ fieldValue: this.fieldPrice });
        this.setPlayerCounter({ type: "fields", quantity: this.counter.fields + 1 || 1 });
      }
    }
  }
};
</script>

<style scoped>
[abbey-token="jobs-fields-buyField"] {
  margin-top: 2rem;
}
</style>
