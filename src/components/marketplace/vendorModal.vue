<template>
  <div class="card vendor">
    <div class="card-header">
      <p class="card-header-title">{{ vendor.name }}</p>
    </div>
    <div class="card-content">
      <div class="content">
        <p>Hello there! I'm {{ vendor.name }}.</p>
        <p>Do you want to buy something or sell something to me?</p>

        <div class="field is-grouped">
          <p class="control">
            <button class="button is-danger" @click="setAction('buy')">
              Buy
            </button>
          </p>
          <p class="control">
            <button class="button is-success" @click="setAction('sell')">
              Sell
            </button>
          </p>
        </div>

        <div v-if="action === 'sell'">
          <p v-if="!hasStock">
            It seems you for got to put some goods in your storage.<br />
            Don't worry, I'll be here if you have some goods to sell.
          </p>

          <div v-if="hasStock" class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">I would like to sell</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <div class="select">
                    <select v-model="itemToSell">
                      <option v-for="item in resourceStock" :key="item.name" :value="item.name">{{
                        item.name
                      }}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="itemToSell">
            <p>Some {{ resourceToSell.name.toLowerCase() }}?</p>
            <p v-if="interested">
              Great! I like {{ resourceToSell.category }}!<br />I'll give you an extra
              {{ vendor.interestFactor | percentize }} for it.
            </p>
            <p v-if="!interested">
              Oh... I'm not really interested in
              {{ resourceToSell.category }}...<br />
              I'll give you {{ resourceToSell.value }} for 1
              {{ resourceToSell.name.toLowerCase() }}.<br />
              Does that sounds ok to you?
            </p>
            <p class="card-text">How much would you like to sell?</p>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label>I would like to sell</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control">
                    <input
                      :max="resourceToSell.quantity"
                      :placeholder="0"
                      v-model.number="itemSellQuantity"
                      class="input"
                      type="number"
                      min="0"
                    />
                  </p>
                </div>
              </div>
            </div>

            <div v-if="itemSellQuantity">
              <p class="card-text">
                For {{ itemSellQuantity }} {{ resourceToSell.name.toLowerCase() }} I'll give you
                {{ salesPrice }} golden coins.
              </p>

              <div v-if="itemSellQuantity" class="field is-grouped">
                <p class="control">
                  <button class="btn btn-success" @click="acceptDeal">
                    Accept
                  </button>
                </p>
                <p class="control">
                  <button class="btn btn-danger" @click="declineDeal">
                    Decline
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="action === 'buy'">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">I would like to buy</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <div class="select">
                    <select v-model="itemToBuy">
                      <option
                        v-for="item in itemsForSale"
                        :key="item.resource"
                        :value="item.resource"
                        >{{ item.name | pluralizeBag }}</option
                      >
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="resourceToBuy">
            <p>
              How much
              {{ resourceToBuy.name.toLowerCase() | pluralizeBag }} would you like to buy?
            </p>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">I would like to buy</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control">
                    <input
                      :max="vendor.maxBuyAmt"
                      v-model.number="itemBuyQuantity"
                      class="input"
                      type="number"
                      min="0"
                    />
                  </p>
                </div>
              </div>
            </div>

            <div v-if="itemBuyQuantity">
              <p>
                {{ itemBuyQuantity }}
                {{ resourceToBuy.name.toLowerCase() | pluralizeBagByQuantity(itemBuyQuantity) }}
                will cost you {{ purchasePrice }} golden coins.
              </p>

              <div v-if="itemBuyQuantity" class="field is-grouped">
                <p class="control">
                  <button class="button is-success" @click="acceptDeal">
                    Accept
                  </button>
                </p>
                <p class="control">
                  <button class="button is-danger" @click="declineDeal">
                    Decline
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fromStock } from "@/store/modules/stock";
import { fromPlayer } from "@/store/modules/player";
import { fromResources } from "@/store/modules/resources";

export default {
  name: "VendorModal",
  props: ["vendor"],
  data() {
    return {
      action: undefined,
      itemToSell: undefined,
      itemSellQuantity: undefined,
      itemToBuy: undefined,
      itemBuyQuantity: undefined,
      maxBuyAmt: 10
    };
  },
  computed: {
    ...fromStock.mapState({
      stock: state => state
    }),
    ...fromResources.mapState({
      resources: state => state
    }),
    hasStock() {
      return Object.values(this.stock).length;
    },
    resourceToSell: function() {
      return this.resourceStock.find(item => item.name === this.itemToSell);
    },
    itemsForSale: function() {
      return this.vendor.itemsForSale;
    },
    resourceToBuy: function() {
      return this.itemToBuy
        ? this.resources.filter(resource => resource._id === this.itemToBuy)[0]
        : undefined;
    },
    resourceStock() {
      return Object.values(this.stock).map(stockItem => {
        const { resource, quantity } = stockItem;
        const { name, category, value } = this.resources.find(
          resourceItem => resourceItem._id === resource
        );

        return {
          name: name,
          category: category,
          value: value,
          quantity: quantity,
          resource: resource
        };
      });
    },
    interested: function() {
      return this.vendor.interests.includes(this.resourceToSell.category);
    },
    salesPrice: function() {
      let price = this.resourceToSell.value * this.itemSellQuantity;

      if (this.interested) {
        price = price + Math.floor(price * this.vendor.interestFactor);
      }

      return price;
    },
    purchasePrice: function() {
      const item = this.itemToBuy;
      let purchasePrice = 0;

      this.vendor.itemsForSale.forEach(saleItem => {
        if (saleItem.resource === item) {
          purchasePrice = saleItem.value;
        }
      });

      purchasePrice *= this.itemBuyQuantity;

      return purchasePrice;
    }
  },
  methods: {
    ...fromPlayer.mapActions(["increaseGoldenCoins", "decreaseGoldenCoins", "increaseReputation"]),
    ...fromStock.mapActions(["decreaseStock", "increaseStock"]),
    acceptDeal: function() {
      if (this.action === "sell") {
        this.decreaseStock({
          item: this.resourceToSell.resource,
          quantity: this.itemSellQuantity
        });

        this.increaseGoldenCoins({ amount: this.salesPrice });

        if (this.resourceToSell.category === "beer") {
          this.increaseReputation({
            amount: this.vendor.reputationGiven * this.itemSellQuantity
          });
        }
      } else {
        this.increaseStock({
          stockItemName: this.itemToBuy,
          quantity: this.itemBuyQuantity
        });
        this.decreaseGoldenCoins({ amount: this.purchasePrice });
      }
      this.$emit("close");
    },
    declineDeal: function() {
      this.$emit("close");
    },
    setAction: function(action) {
      this.action = action;
    }
  }
};
</script>

<style scoped>
.input-group > button {
  margin-right: 2%;
}

.input-group > button:last-child {
  margin-right: 0;
}
</style>
