<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">{{ $t("game.storybook.title") }}</p>
    </header>
    <div class="card-content">
      <div v-if="!loading" class="content">
        <p v-html="$t(`game.story.storyChapters.${getStoryChapterByChapterNumber(1)}`)" />

        <div class="field is-grouped">
          <p class="control">
            <button
              :disabled="!!boughtBeer"
              :class="{ active: boughtBeer === true }"
              class="button is-success"
              @click="setAnswer('boughtBeer', true)"
            >
              {{ $t("game.storybook.actions.buyBeerButton") }}
            </button>
          </p>
          <p class="control">
            <button
              :disabled="!!boughtBeer"
              :class="{ active: boughtBeer === false }"
              class="button is-danger"
              @click="setAnswer('boughtBeer', false)"
            >
              {{ $t("game.storybook.actions.noBuyBeerButton") }}
            </button>
          </p>
        </div>

        <div v-if="!!boughtBeer">
          <p v-html="$t(`game.story.storyChapters.${getStoryChapterByChapterNumber(2)}`)" />

          <div class="field is-grouped">
            <p class="control">
              <button
                :disabled="!!listenedToStory"
                :class="{ active: listenedToStory === true }"
                class="button is-success"
                @click="setAnswer('listenedToStory', true)"
              >
                {{ $t("game.storybook.actions.listenToStoryButton") }}
              </button>
            </p>
            <p class="control">
              <button
                :disabled="!!listenedToStory"
                :class="{ active: listenedToStory === false }"
                class="button is-danger"
                @click="setAnswer('listenedToStory', false)"
              >
                {{ $t("game.storybook.actions.noListenToStoryButton") }}
              </button>
            </p>
          </div>
        </div>

        <div v-if="!!listenedToStory">
          <p v-html="$t(`game.story.storyChapters.${getStoryChapterByChapterNumber(3)}`)" />
        </div>

        <div v-if="!!listenedToStory">
          <p v-html="$t(`game.story.storyChapters.${getStoryChapterByChapterNumber(4)}`)" />

          <form @submit.prevent="setAnswer('playerName', newPlayerName)">
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">{{ $t("game.storybook.nameFieldLabel") }}</label>
              </div>
              <div class="field-body">
                <div class="field has-addons">
                  <p class="control">
                    <input
                      id="abbey-storybook-name"
                      :disabled="hasPlayerName"
                      v-model="playerName"
                      class="input"
                      type="text"
                      required
                    />
                  </p>
                  <div class="control">
                    <button :disabled="hasPlayerName" class="button" type="submit">
                      <span class="icon is-small">
                        <font-awesome-icon icon="check" class="has-text-success" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div v-if="hasPlayerName">
          <p
            v-html="
              $t(`game.story.storyChapters.${getStoryChapterByChapterNumber(5)}`, {
                randomFact: $t(`game.story.${randomFact}`),
                playerName: playerName
              })
            "
          />

          <div class="field is-grouped">
            <p class="control">
              <button
                :disabled="gender"
                :class="{ active: gender === 'male' }"
                class="button is-info"
                @click="setAnswer('gender', 'male')"
              >
                {{ $t("game.storybook.actions.genderMaleButton") }}
              </button>
            </p>
            <p class="control">
              <button
                :disabled="gender"
                :class="{ active: gender === 'female' }"
                class="button is-info"
                @click="setAnswer('gender', 'female')"
              >
                {{ $t("game.storybook.actions.genderFemaleButton") }}
              </button>
            </p>
          </div>
        </div>

        <div v-if="!!gender">
          <p v-html="$t(`game.story.storyChapters.${getStoryChapterByChapterNumber(6)}`)" />

          <form @submit.prevent="setAnswer('placeName', newPlaceName)">
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">{{ $t("game.storybook.placeFieldLabel") }}</label>
              </div>
              <div class="field-body">
                <div class="field has-addons">
                  <p class="control">
                    <input
                      :disabled="hasPlaceName"
                      v-model="placeName"
                      class="input"
                      type="text"
                      required
                    />
                  </p>
                  <div class="control">
                    <button :disabled="hasPlaceName" class="button" type="submit">
                      <span class="icon is-small">
                        <font-awesome-icon icon="check" class="has-text-success" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div v-if="hasPlaceName">
          <p
            v-html="
              $t(`game.story.storyChapters.${getStoryChapterByChapterNumber(7)}`, {
                placeName: placeName,
                fatherName: fatherName,
                daugtherSon: getDaughterOrSon,
                sheHe: getSheOrHe,
                herHis: getHerOrHis,
                girlBoy: getGirlOrBoy,
                abbotName: $t(`game.story.${abbotName}`)
              })
            "
          />
        </div>

        <div v-if="hasPlaceName">
          <p
            v-html="
              $t(`game.story.storyChapters.${getStoryChapterByChapterNumber(8)}`, {
                placeName: placeName,
                fatherName: fatherName,
                daugtherSon: getDaughterOrSon
              })
            "
          />
        </div>

        <div v-if="hasPlaceName">
          <p v-html="$t(`game.story.storyChapters.${getStoryChapterByChapterNumber(9)}`)" />

          <div class="field is-grouped">
            <p class="control">
              <button
                :disabled="likeStory !== null && likeStory !== undefined"
                :class="{ active: likeStory === true }"
                class="button is-success"
                @click="setAnswer('likeStory', true)"
              >
                {{ $t("game.storybook.actions.likeStoryButton") }}
              </button>
            </p>
            <p class="control">
              <button
                :disabled="likeStory !== null && likeStory !== undefined"
                :class="{ active: likeStory === false }"
                class="button is-danger"
                @click="setAnswer('likeStory', false)"
              >
                {{ $t("game.storybook.actions.noLikeStoryButton") }}
              </button>
            </p>
          </div>

          <div v-if="likeStory !== null && likeStory !== undefined">
            <p v-html="$t(`game.story.storyChapters.${getStoryChapterByChapterNumber(9)}`)" />
          </div>
        </div>

        <div v-if="likeStory !== null && likeStory !== undefined">
          <p v-html="$t(`game.story.storyChapters.${getStoryChapterByChapterNumber(10)}`)" />

          <button
            :disabled="completedStory"
            class="button is-info"
            @click="setStoryCompleted(true)"
          >
            {{ $t("game.storybook.actions.endStoryButton") }}
          </button>
        </div>
      </div>
      <div v-else class="content">
        <p>Loading...</p>
      </div>
    </div>
  </div>
</template>
<script>
import { fromStory } from "@/store/modules/story";
import { fromPlayer } from "@/store/modules/player";

export default {
  name: "Storybook",
  data() {
    return {
      beerPrice: 10,
      reputationReward: 1,
      newPlayerName: "",
      newPlaceName: "",
      loading: true
    };
  },
  computed: {
    ...fromStory.mapState([
      "storyAnswers",
      "completeStory",
      "chapters",
      "randomFacts",
      "abbotNames"
    ]),
    hasPlaceName() {
      return !!this.storyAnswers.placeName;
    },
    hasPlayerName() {
      return !!this.storyAnswers.playerName;
    },
    boughtBeer() {
      return this.storyAnswers.boughtBeer !== null ? this.storyAnswers.boughtBeer : undefined;
    },
    listenedToStory() {
      return this.storyAnswers.listenedToStory === null
        ? undefined
        : this.storyAnswers.listenedToStory;
    },
    playerName: {
      get() {
        return this.hasPlayerName ? this.storyAnswers.playerName : this.newPlayerName;
      },
      set(newPlayerName) {
        this.newPlayerName = newPlayerName;
      }
    },
    fatherName: {
      get() {
        return this.storyAnswers.fatherName !== null ? this.storyAnswers.fatherName : undefined;
      },
      set(newFathername) {
        this.setAnswer("fatherName", newFathername);
      }
    },
    abbotName() {
      return this.storyAnswers.abbotName !== null
        ? this.$t(`abbotNames.${this.storyAnswers.abbotName}`)
        : undefined;
    },
    randomFact() {
      return this.storyAnswers.randomFact !== null
        ? this.$t(`randomFacts.${this.storyAnswers.randomFact}`)
        : undefined;
    },
    gender() {
      return this.storyAnswers.gender !== null ? this.storyAnswers.gender : undefined;
    },
    placeName: {
      get() {
        return this.hasPlaceName ? this.storyAnswers.placeName : this.newPlaceName;
      },
      set(newPlaceName) {
        this.newPlaceName = newPlaceName;
      }
    },
    likeStory() {
      return this.storyAnswers.likeStory !== null ? this.storyAnswers.likeStory : undefined;
    },
    completedStory() {
      return this.completeStory !== null ? this.completeStory : false;
    },
    getSheOrHe: function() {
      let sheHe;
      if (this.gender) {
        if (this.gender === "female") {
          sheHe = "she";
        } else {
          sheHe = "he";
        }
      }
      return sheHe;
    },
    getHerOrHis: function() {
      let herHis;
      if (this.gender) {
        if (this.gender === "female") {
          herHis = "her";
        } else {
          herHis = "his";
        }
      }
      return herHis;
    },
    getDaughterOrSon: function() {
      let daughterSon;
      if (this.gender) {
        if (this.gender === "female") {
          daughterSon = "daughter";
        } else {
          daughterSon = "son";
        }
      }
      return daughterSon;
    },
    getGirlOrBoy: function() {
      let girlBoy;
      if (this.gender) {
        if (this.gender === "female") {
          girlBoy = "girl";
        } else {
          girlBoy = "boy";
        }
      }
      return girlBoy;
    }
  },
  watch: {
    completeStory() {
      window.scrollTo(0, 0);
    }
  },
  async created() {
    if (!this.completedStory) {
      this.setAbbotName();
    }

    this.loading = false;
  },
  methods: {
    ...fromStory.mapActions(["setStoryCompleted", "saveAnswer"]),
    ...fromPlayer.mapActions(["decreaseGoldenCoins", "increaseReputation", "setPlayerName"]),
    getStoryChapterByChapterNumber: function(chapterNumber) {
      switch (chapterNumber) {
        case 2:
          if (this.boughtBeer) {
            return this.chapters["2-1"];
          } else {
            return this.chapters["2--1"];
          }

        case 3:
          return this.chapters[`${chapterNumber}-${this.evaluateStory()}`];

        case 9:
          if (this.likeStory !== undefined) {
            if (this.likeStory) {
              return this.chapters["9-1"];
            } else {
              return this.chapters["9-2"];
            }
          } else {
            return this.chapters["9"];
          }

        default:
          return this.chapters[chapterNumber];
      }
    },
    setRandomFact: function() {
      const random =
        this.playerName === "Nicolas"
          ? 6
          : Math.floor(Math.random() * Object.values(this.randomFacts).length);
      this.setAnswer("randomFact", Object.values(this.randomFacts)[random]);
    },
    setAbbotName: function() {
      const random = Math.floor(Math.random() * Object.values(this.abbotNames).length);
      this.setAnswer("abbotName", Object.values(this.abbotNames)[random]);
    },
    setAnswer: function(question, answer) {
      const answerInfo = {
        question: question,
        answer: answer
      };

      this.saveAnswer(answerInfo);

      switch (question) {
        case "boughtBeer":
          this.decreaseGoldenCoins({ amount: this.beerPrice });
          this.increaseReputation({ amount: this.reputationReward });
          break;
        case "playerName":
          this.setPlayerName(this.playerName);
          this.setRandomFact();
          break;
      }
    },
    evaluateStory: function() {
      let score = 0;

      const questionsToEvaluate = {
        boughtBeer: this.boughtBeer,
        listenedToStory: this.listenedToStory
      };

      for (let question in questionsToEvaluate) {
        if (questionsToEvaluate.hasOwnProperty(question)) {
          let selectedAnswer = questionsToEvaluate[question];

          if (selectedAnswer !== undefined) {
            if (selectedAnswer) {
              score += 1;
            } else {
              score -= 1;
            }
          }
        }
      }

      return score;
    }
  }
};
</script>

<style scoped>
button.active {
  opacity: 1;
}
</style>
