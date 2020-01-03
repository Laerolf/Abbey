<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        {{ $t("game.stock.title") }}
      </p>
    </header>
    <div class="card-content">
      <div class="content">
        <stockCategory
          v-for="category in getFilledStockCategories"
          v-if="category.items.length >= 1"
          :key="category.name"
          :category="category"
        />

        <p v-if="getStock.length < 1">
          {{ $t("game.stock.emptyStock") }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import stockCategory from "@/components/stock/stockCategory";
import { fromStock } from "@/store/modules/stock";
import { fromResources } from "@/store/modules/resources";

export default {
  name: "StockList",
  components: { stockCategory },
  computed: {
    ...fromStock.mapState({
      stock: state => state
    }),
    ...fromResources.mapState({
      resources: state => state
    }),
    getStockCategories: function() {
      const categoryList = {};

      for (let resource in this.resources) {
        if (this.resources.hasOwnProperty(resource)) {
          let selectedResource = this.resources[resource];

          if (Object.keys(categoryList).indexOf(selectedResource.category) === -1) {
            categoryList[selectedResource.category] = {
              name: selectedResource.category,
              items: []
            };
          }
        }
      }

      return categoryList;
    },
    getFilledStockCategories: function() {
      const stock = this.getStock;
      const categories = this.getStockCategories;

      for (let stockItem in stock) {
        if (stock.hasOwnProperty(stockItem)) {
          let selectedStockItem = stock[stockItem];

          categories[selectedStockItem.category].items.push(selectedStockItem);
        }
      }

      return categories;
    },
    getStock: function() {
      const stockList = [];

      for (let resource in this.stock) {
        if (this.stock.hasOwnProperty(resource)) {
          // console.log(this.stock, this.resources, resource)
          let selectedStockItem = Object.values(this.stock).filter(
            item => item.resource === resource
          )[0];
          let selectedResource = this.resources.filter(item => item._id === resource)[0];

          stockList.push({
            name: selectedResource.name,
            category: selectedResource.category,
            quantity: selectedStockItem.quantity
          });
        }
      }

      return stockList;
    }
  }
};
</script>

<style scoped></style>
