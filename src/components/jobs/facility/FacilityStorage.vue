<template>
  <div :abbey-token="`abbey-facility-content-storage-${facilityName}`" v-show="show" class="box">
    <h5 class="is-title is-5">{{ $t("game.jobs.facility.storage.title") }}</h5>

    <p>
      {{
        $t("game.jobs.facility.storage.storageLevel", {
          storageLevel: storageLevel,
          storageCapacity: storageCapacity
        })
      }}
    </p>

    <ul :abbey-token="`abbey-facility-content-storage-list-${facilityName}`">
      <li
        v-show="!hasItemsInStorage"
        :abbey-token="`abbey-facility-content-storage-list-undefined-${facilityName}`"
      >
        {{ $t("game.jobs.facility.storage.emptyStorage") }}
      </li>
      <li
        v-for="item in storageItems"
        :key="item.resource._id"
        :abbey-token="
          `abbey-facility-content-storage-list-item-${facilityName}-${item.resource._id}`
        "
      >
        {{ item.resource.name }}: {{ item.quantity }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "FacilityOptions",
  props: {
    facilityName: { type: String, required: true },
    facilityStorage: { type: Object, required: true },
    resources: { type: Array, required: true },
    show: { type: Boolean, required: true }
  },
  computed: {
    hasItemsInStorage() {
      return Object.keys(this.storageItems).length;
    },
    storageItems() {
      const storage = [];

      this.facilityStorage.items.forEach(item => {
        const resource = this.resources.filter(resource => resource._id === item.resource)[0];

        const index = storage.findIndex(storageItem => storageItem.resource._id === resource._id);

        if (index === -1) {
          storage.push({ resource: resource, quantity: item.quantity });
        } else {
          storage[index].quantity += item.quantity;
        }
      });

      return storage;
    },
    storageLevel() {
      let storageLevel = 0;

      this.facilityStorage.items.forEach(item => {
        storageLevel += item.quantity;
      });

      return storageLevel;
    },
    storageCapacity() {
      return this.facilityStorage.capacity;
    }
  }
};
</script>

<style scoped></style>
