<template>
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">{{ $t("game.abbey.title") }}</p>
    </div>
    <div class="card-content">
      <div class="content">
        <p>{{ $t("game.abbey.description") }}</p>

        <ul>
          <li>{{ $t("game.abbey.chores.previous", { choreName: previousChore.name }) }}</li>
          <li>{{ $t("game.abbey.chores.current", { choreName: currentChore.name }) }}</li>
          <li>{{ $t("game.abbey.chores.next", { choreName: nextChore.name }) }}</li>
        </ul>

        <p
          v-html="
            $t('game.abbey.monksCurrentlyWorking', {
              totalMonksAmount: totalAmtOfMonks,
              occupiedMonks: occupiedMonks
            })
          "
        />

        <department
          v-for="department in departments"
          :key="department.id"
          :department="department"
        />
      </div>
    </div>
  </div>
</template>
<script>
import department from "@/components/abbey/department";
import { fromAbbey } from "@/store/modules/abbey";

export default {
  name: "Abbey",
  components: { department },
  computed: {
    ...fromAbbey.mapState(["departments", "totalAmtOfMonks", "departments", "schedule"]),
    ...fromAbbey.mapGetters(["getChores"]),
    occupiedMonks: function() {
      let amountOfOccupiedMonks = 0;

      for (let department in this.departments) {
        if (this.departments.hasOwnProperty(department)) {
          let selectedDepartment = this.departments[department];
          amountOfOccupiedMonks += selectedDepartment.monks;
        }
      }

      return amountOfOccupiedMonks;
    },
    availableMonks: function() {
      return this.totalAmtMonks - this.occupiedMonks;
    },
    previousChore: function() {
      const currentChoreIndex = this.getChores.findIndex(
        chore => chore.time === this.currentChore.time
      );

      return currentChoreIndex === 0
        ? Object.values(this.getChores)[this.getChores.length - 1]
        : Object.values(this.getChores)[currentChoreIndex - 1];
    },
    currentChore() {
      return this.schedule.currentChore;
    },
    nextChore: function() {
      const currentChoreIndex = this.getChores.findIndex(
        chore => chore.time === this.currentChore.time
      );

      return currentChoreIndex === this.getChores.length - 1
        ? Object.values(this.getChores)[0]
        : Object.values(this.getChores)[currentChoreIndex + 1];
    }
  }
};
</script>

<style scoped></style>
