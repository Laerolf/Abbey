<template>
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">{{ $t("game.jobs.facilities.title") }}</p>
    </div>
    <div class="card-content">
      <div v-if="!loading" class="content">
        <p>{{ $t("game.jobs.facilities.assignedMonkMessage", { monkAmount: facilityMonks }) }}</p>

        <p v-if="hasWorkingChore">{{ $t("game.jobs.facilities.workingMonkMessage") }}</p>
        <p v-else>{{ $t("game.jobs.facilities.noWorkingMonkMessage") }}</p>

        <div v-if="hasFacilities">
          <facility
            v-for="facility in facilities"
            :working="hasWorkingChore"
            :key="facility.name"
            :facility="facility"
          />
        </div>
        <div v-if="!hasFacilities">
          <p class="card-text">{{ $t("game.jobs.facilities.noFacilitiesMessage") }}</p>
        </div>
      </div>
      <div v-else class="content">
        Loading ...
      </div>
    </div>
  </div>
</template>

<script>
import facility from "@/components/jobs/facility";
import { fromFacilities } from "@/store/modules/facilities";
import { fromAbbey } from "@/store/modules/abbey";

export default {
  name: "Facilities",
  components: { facility },
  data() {
    return {
      loading: true
    };
  },
  computed: {
    ...fromAbbey.mapState({
      departments: state => state.departments,
      currentChore: state => state.schedule.currentChore
    }),
    ...fromFacilities.mapState({
      facilities: state => state
    }),
    hasWorkingChore() {
      return this.currentChore.name === "Work";
    },
    hasFacilities: function() {
      return !!this.facilities && !!Object.entries(this.facilities).length;
    },
    facilityMonks: function() {
      return this.departments.facilities.monks;
    }
  },
  async created() {
    await this.loadFacilities();
    this.loading = false;
  },
  methods: {
    ...fromFacilities.mapActions(["loadFacilities"])
  }
};
</script>
