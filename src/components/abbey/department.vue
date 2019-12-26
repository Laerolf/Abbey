<template>
  <div>
    <h5 class="title is-5">{{ department.name | capitalize }}</h5>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Amount of monks</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input
              v-model.number.lazy="assignedMonks"
              :max="availableMonks"
              min="0"
              class="input"
              type="number"
            />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { fromAbbey } from "@/store/modules/abbey";

export default {
  name: "Department",
  props: ["department"],
  computed: {
    ...fromAbbey.mapState(["departments", "totalAmtOfMonks"]),
    assignedMonks: {
      get() {
        return this.department.monks;
      },
      set(amountOfMonks) {
        if (!!amountOfMonks && amountOfMonks <= this.availableMonks && amountOfMonks >= 0) {
          this.setDepartment({
            department: this.department.name.toLowerCase(),
            value: amountOfMonks
          });
        } else {
          this.setDepartment({
            department: this.department.name.toLowerCase(),
            value:
              amountOfMonks < 0
                ? 0
                : amountOfMonks > this.availableMonks
                ? this.availableMonks
                : amountOfMonks
          });
        }
      }
    },
    occupiedMonks: function() {
      let amountOfOccupiedMonks = 0;

      Object.values(this.departments).forEach(department => {
        amountOfOccupiedMonks += department.monks;
      });

      return amountOfOccupiedMonks;
    },
    availableMonks: function() {
      return this.totalAmtOfMonks - this.occupiedMonks + this.assignedMonks;
    }
  },
  methods: {
    ...fromAbbey.mapActions(["setDepartment"])
  }
};
</script>
