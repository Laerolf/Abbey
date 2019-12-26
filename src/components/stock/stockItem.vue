<template>
  <div class="tile is-parent">
    <div class="tile is-child box">
      <p class="title is-5">{{ stockItem.name }}</p>
      <div class="content">
        <p>Quantity: {{ stockItem.quantity }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "StockItem",
  props: ["stockItem"]
};
</script>

<style scoped></style>
