<template>
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">{{ $t("game.jobs.processors.title") }}</p>
    </div>
    <div class="card-content">
      <div v-if="!loading" class="content">
        <p>{{ $t("game.jobs.processors.assignedMonkMessage", { monkAmount: processorMonks }) }}</p>

        <p v-if="hasWorkingChore">{{ $t("game.jobs.processors.workingMonkMessage") }}</p>
        <p v-else>{{ $t("game.jobs.processors.noWorkingMonkMessage") }}</p>

        <div v-if="hasProcessors">
          <processor
            v-for="processor in processors"
            :working="hasWorkingChore"
            :key="processor._id"
            :processor="processor"
          />
        </div>
        <div v-if="!hasProcessors">
          <p class="card-text">{{ $t("game.jobs.processors.noProcessorsMessage") }}</p>
        </div>
      </div>
      <div v-else class="content">
        Loading ...
      </div>
    </div>
  </div>
</template>

<script>
import Processor from "@/components/jobs/Processor";
import { fromProcessors } from "@/store/modules/processors";
import { fromAbbey } from "@/store/modules/abbey";

export default {
  name: "Processors",
  components: { Processor },
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
    ...fromProcessors.mapState({
      processors: state => state
    }),
    hasWorkingChore() {
      return this.currentChore.name === "Work";
    },
    hasProcessors: function() {
      return !!this.processors && !!Object.entries(this.processors).length;
    },
    processorMonks: function() {
      return this.departments.processors.monks;
    }
  },
  async created() {
    await this.loadProcessors();
    this.loading = false;
  },
  methods: {
    ...fromProcessors.mapActions(["loadProcessors"])
  }
};
</script>
