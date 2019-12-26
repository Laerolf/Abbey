<template>
  <p>
    <span class="heading">
      {{ getInGameDate | formatDateDayNameMonthYear }}
    </span>
  </p>
</template>

<script>
export default {
  name: "Date",
  computed: {
    getInGameDate: function() {
      let inGameDate = new Date();
      inGameDate.setFullYear(inGameDate.getFullYear() - 400);
      return inGameDate;
    },
    getInGameYear: function() {
      return this.getInGameDate.getFullYear();
    },
    getInGameMonth: function() {
      return this.getInGameDate.getMonth();
    },
    getInGameDay: function() {
      return this.getInGameDate.getDay();
    }
  }
};
</script>
