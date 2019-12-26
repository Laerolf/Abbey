<template>
  <div class="card">
    <header class="card-header">
      <div class="card-header-title">
        {{ category.name | capitalize }}
        <div class="tags">
          <span class="tag is-info">{{ category.items.length }}</span>
        </div>
      </div>
    </header>
    <div class="card-content">
      <div class="columns is-multiline">
        <div v-for="item in category.items" :key="item.name" class="column is-3">
          <div class="tile is-ancestor">
            <stockItem :stock-item="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import stockItem from "@/components/stock/stockItem";

export default {
  name: "StockCategory",
  components: { stockItem },
  props: ["category"]
};
</script>

<style scoped></style>
