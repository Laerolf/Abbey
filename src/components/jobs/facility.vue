<template>
  <div :abbey-token="`abbey-facility-${facility.name}`" class="card">
    <div class="card-header" :abbey-token="`abbey-facility-header-${facility.name}`">
      <p class="card-header-title">{{ facility.name | capitalize }}</p>
    </div>
    <div class="card-content" :abbey-token="`abbey-facility-content-${facility.name}`">
      <div class="content">
        <progress
          :abbey-token="`abbey-facility-content-progress-${facility.name}`"
          :value="progress"
          :min="minProgress"
          :max="maxProgress"
          class="progress is-info"
        />

        <div
          :abbey-token="`abbey-facility-content-actions-${facility.name}`"
          class="field is-grouped"
        >
          <div v-show="!collectable && !hasFullStorage && !hasActiveJob" class="control">
            <button
              :disabled="!this.isAutomatic && this.hasFullStorage"
              :abbey-token="`abbey-facility-content-actions-fetch-${facility.name}`"
              class="button is-info"
              @click="fetch"
            >
              Fetch
            </button>
          </div>
          <div v-show="collectable || !hasEmptyStorage" class="control">
            <button
              :abbey-token="`abbey-facility-content-actions-collect-${facility.name}`"
              class="button is-success"
              @click="collect"
            >
              Collect
            </button>
          </div>
          <div class="control">
            <button
              :abbey-token="`abbey-facility-content-actions-options-${facility.name}`"
              class="button is-info"
              :class="{ 'is-outlined': showOptions }"
              @click="toggleOptions"
            >
              Options
            </button>
          </div>
          <div class="control">
            <button
              :abbey-token="`abbey-facility-content-actions-storage-${facility.name}`"
              class="button is-info"
              :class="{
                'is-outlined': showStorage,
                'is-danger': hasFullStorage,
                'is-warning': hasHalfStorage
              }"
              @click="toggleStorage"
            >
              Storage
              <span v-if="hasFullStorage" class="icon is-medium">
                <font-awesome-icon icon="exclamation" />
              </span>
            </button>
          </div>
        </div>

        <facility-options
          @update="updateAssignedMonks"
          :show="showOptions"
          :assigned-monks="facilityMonks"
          :available-monks="availableMonks"
          :facility-name="facility.name"
        />

        <facility-storage
          :facility-name="facility.name"
          :resources="resources"
          :show="showStorage"
          :facility-storage="storage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Chance from "chance";
import { fromAbbey } from "@/store/modules/abbey";
import { fromResources } from "@/store/modules/resources";
import { fromFacilities } from "@/store/modules/facilities";
import { fromStock } from "@/store/modules/stock";
import FacilityOptions from "@/components/jobs/facility/FacilityOptions";
import FacilityStorage from "@/components/jobs/facility/FacilityStorage";

export default {
  name: "Facility",
  components: { FacilityOptions, FacilityStorage },
  props: ["facility", "working"],
  data() {
    return {
      minProgress: 0,
      maxProgress: 100,
      showOptions: false,
      showStorage: false
    };
  },
  computed: {
    ...fromAbbey.mapState(["departments"]),
    ...fromResources.mapState({ resources: state => state }),
    progresPerSecond() {
      return this.hasActiveJob
        ? this.maxProgress * (this.facility.progressStep * this.facilityMonks)
        : 1;
    },
    isAutomatic() {
      return this.facilityMonks > 0;
    },
    hasActiveJob() {
      return !!this.facility.job;
    },
    hasEmptyStorage() {
      return this.storageLevel === 0;
    },
    hasFullStorage() {
      return this.storageLevel >= this.storage.capacity;
    },
    hasHalfStorage() {
      return this.storageLevel >= this.storage.capacity / 2;
    },
    storageLevel() {
      let storageLevel = 0;

      this.storage.items.forEach(item => {
        storageLevel += item.quantity;
      });

      return storageLevel;
    },
    storage: {
      get() {
        return this.facility.storage;
      },
      set(newStorage) {
        console.log("NEW STORAGE", newStorage);
      }
    },
    progress: {
      get() {
        return this.facility.progress;
      },
      set(newProgress) {
        this.updateFacility({
          facilityId: this.facility._id,
          key: "progress",
          value: newProgress
        });
      }
    },
    collectable() {
      return this.progress >= this.maxProgress;
    },
    facilityMonks: {
      get() {
        return this.departments.facilities.assignedMonks[this.facility._id] || 0;
      },
      set(amountOfMonks) {
        this.setAssignedFacilityMonks({
          facility: this.facility._id,
          quantity:
            amountOfMonks > 0
              ? amountOfMonks > this.availableMonks
                ? this.availableMonks
                : amountOfMonks
              : 0
        });

        /*if (this.isAutomatic && !this.hasFullStorage && this.working) {
          this.stopFetching();
          this.startFetching();
        } else {
          this.stopFetching();
        }*/
      }
    },
    availableMonks() {
      let assignedMonks = 0;

      for (let [key, value] of Object.entries(this.departments.facilities.assignedMonks)) {
        if (key !== this.facility._id) {
          assignedMonks += value;
        }
      }

      return this.departments.facilities.monks - assignedMonks;
    },
    resourceChances() {
      let probabilities = [];
      let resources = [];

      this.facility.resourceChances.forEach(resource => {
        probabilities.push(resource.chance);
        resources.push(resource.resource);
      });

      return { resources: resources, probabilities: probabilities };
    }
  },
  created() {
    /*if (this.isAutomatic && !this.hasActiveJob && !this.hasFullStorage && this.working) {
      console.log("STARTING TO FETCH...");
      this.startFetching();
    }
    this.$notify({
      group: "notifications",
      title: `Last seen`,
      text: `${Date(this.facility.lastTimeVisited)}`,
      type: "success"
    });*/
  },
  beforeDestroy() {
    this.updateFacility({
      facilityId: this.facility._id,
      key: "lastTimeVisited",
      value: new Date()
    });
    this.saveFacility(this.facility);
    this.stopFetching();
  },
  methods: {
    ...fromAbbey.mapActions(["setAssignedFacilityMonks"]),
    ...fromFacilities.mapActions(["saveFetchingFacility", "updateFacility", "saveFacility"]),
    ...fromStock.mapActions(["increaseStock"]),
    toggleOptions: function() {
      this.showOptions = !this.showOptions;
      if (this.showStorage) {
        this.showStorage = false;
      }
    },
    toggleStorage: function() {
      this.showStorage = !this.showStorage;

      if (this.showOptions) {
        this.showOptions = false;
      }
    },
    updateAssignedMonks(data) {
      this.facilityMonks = data.amountOfMonks;
    },
    startFetching() {
      const job = setInterval(() => {
        this.fetch();

        if (this.collectable) {
          this.addToStorage({ resource: this.fetchResource(), quantity: this.fetchAmount() });
          this.updateFacility({
            facilityId: this.facility._id,
            key: "storage",
            value: this.storage
          });
          this.progress = 0;
        }

        if (this.hasFullStorage) {
          this.stopFetching();
        }
      }, 1000);

      const task = {
        category: "facilities",
        name: this.facility._id,
        id: job
      };

      console.log(task);
      // this.addTask(task);
    },
    stopFetching() {
      // this.removeTask({ category: "facilities", name: this.facility._id });
    },
    fetch() {
      this.progress += 50;
    },
    fetchResource: function() {
      const { resources, probabilities } = this.resourceChances;

      const resourceProbability = new Chance();

      const resourceId = resourceProbability.weighted(resources, probabilities);

      return this.resources.filter(resource => resource._id === resourceId)[0];
    },
    fetchAmount: function() {
      const maxAmt = this.facility.collectAmount;

      return Math.floor(Math.random() * maxAmt) + 1;
    },
    addToStorage: function(data) {
      const { resource, quantity } = data;

      const index = this.storage.items.findIndex(item => item.resource === resource._id);

      if (index === -1) {
        this.storage.items.push({ resource: resource._id, quantity: quantity });
      } else {
        this.$set(
          this.storage.items[index],
          "quantity",
          (this.storage.items[index].quantity += quantity)
        );
      }
    },
    collect: function() {
      let message = "<p>";
      if (this.hasEmptyStorage) {
        const resource = this.fetchResource();
        const amount = this.fetchAmount();

        this.increaseStock({
          stockItemName: resource._id,
          quantity: amount
        });

        this.progress = 0;

        message += `You got ${resource.name} ${amount}!`;
      } else {
        message += `You got ${this.storage.items.length} resources.`;

        this.storage.items.forEach(item => {
          const { resource, quantity } = item;

          this.increaseStock({
            stockItemName: resource,
            quantity: quantity
          });
        });

        this.$set(this.storage, "items", []);

        /*if (this.isAutomatic && !this.hasActiveJob && !this.hasFullStorage && this.working) {
          this.startFetching();
        }*/
      }

      message += "</p>";

      this.$notify({
        group: "notifications",
        title: `Fetched`,
        text: message,
        type: "success"
      });
    }
  }
};
</script>

<style scoped lang="scss">
[abbey-token^="abbey-facility-content-actions-options-"].is-info {
  &:hover,
  &.is-hovered {
    background-color: transparent;
    color: #3298dc;
    border-color: #3298dc;
  }

  &.is-outlined,
  &.is-focused,
  &.is-hovered {
    &:focus {
      background-color: transparent;
      color: #3298dc;
      border-color: #3298dc;
    }
  }
}

[abbey-token^="abbey-facility-"].card {
  margin-bottom: 3rem;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
