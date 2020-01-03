<template>
  <div>
    <title-header />

    <section class="section">
      <div class="container is-fluid">
        <div class="columns is-centered">
          <div class="column is-half">
            <counter />
          </div>
        </div>

        <div class="columns is-centered">
          <div class="column is-one-fifth">
            <main-nav :tabs="tabs" />
          </div>

          <div v-if="!loading" class="column">
            <router-view />
          </div>
          <div v-else class="column">
            Loading ...
          </div>
        </div>
      </div>
    </section>

    <brand-footer />
  </div>
</template>

<script>
import TitleHeader from "@/components/branding/titleHeader";
import BrandFooter from "@/components/branding/brandFooter";
import MainNav from "@/components/navigation/mainNav";
import Counter from "@/components/counter/counter";
import { fromPlayer } from "@/store/modules/player";
import { fromResources } from "@/store/modules/resources";
import { fromTranslations } from "@/store/modules/translations";
import { fromAbbey } from "@/store/modules/abbey";

export default {
  name: "Game",
  components: { BrandFooter, MainNav, Counter, TitleHeader },
  data() {
    return {
      tabs: [
        {
          to: "/game/storybook",
          icon: "book-open",
          name: "Storybook"
        },
        {
          to: "/game/stock",
          icon: "box",
          name: "Stock"
        },
        {
          to: "/game/abbey",
          icon: "users",
          name: "Abbey"
        },
        {
          to: "/game/jobs",
          icon: "cogs",
          name: "Jobs"
        },
        {
          to: "/game/marketplace",
          icon: "balance-scale",
          name: "Marketplace"
        },
        {
          to: "/game/brewery",
          icon: "beer",
          name: "Brewery"
        },
        {
          to: "/game/workshop",
          icon: "wrench",
          name: "Workshop"
        }
      ],
      loading: true
    };
  },
  computed: {
    ...fromAbbey.mapGetters(["getChores"]),
    currentChore: function() {
      let scheduledChore = undefined;
      const now = new Date();

      const currentTime = now.getHours() + now.getMinutes() / 100;

      this.getChores.forEach(chore => {
        const { time } = chore;

        if (scheduledChore) {
          if (time < currentTime && scheduledChore.time < time) {
            scheduledChore = chore;
          }
        } else {
          scheduledChore = chore;
        }
      });

      return scheduledChore;
    }
  },
  async created() {
    await this.loadLanguage("en");
    await this.loadLanguage("nl");
    await this.$store.dispatch("loadGame");
    await this.loadPlayer();
    await this.loadResources();
    this.loading = false;
  },
  watch: {
    currentChore() {
      this.setCurrentChore(this.currentChore);
    }
  },
  methods: {
    ...fromTranslations.mapActions(["loadLanguage"]),
    ...fromPlayer.mapActions(["loadPlayer"]),
    ...fromResources.mapActions(["loadResources"]),
    ...fromAbbey.mapActions(["setCurrentChore"])
  }
};
</script>

<style scoped></style>
