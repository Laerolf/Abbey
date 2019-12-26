<template>
  <div class="tile box">
    <div class="container">
      <div class="columns is-vcentered">
        <div class="column">
          <p>{{ outputResource.name }}</p>
        </div>
        <div class="column is-2">
          <div class="field">
            <div class="control">
              <button class="button is-warning" @click="produce">
                <font-awesome-icon icon="cog" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fromResources } from "@/store/modules/resources";

export default {
  name: "AvailableTransmutation",
  props: {
    transmutation: { type: Object, required: true }
  },
  computed: {
    ...fromResources.mapState({
      resources: state => state
    }),
    output() {
      return this.transmutation.output[0];
    },
    outputResource() {
      return this.resources.find(resource => resource._id === this.output.resource);
    }
  },
  methods: {
    produce() {
      this.$emit("production", this.transmutation);
    }
  }
};
</script>

<style scoped></style>
