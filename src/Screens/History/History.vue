<template>
  <div class="history">
    <form class="history__form" @submit.prevent="search">
      <div class="history__form__search">
        <v-icon class="history__form__icons">
          mdi-magnify
        </v-icon>
        <input
          type="text"
          placeholder="Search history e.g. Drake"
          v-model.trim="searchQuery"
        />
        <v-icon
          class="history__form__icons__cancel"
          v-if="searchQuery"
          @click="clear"
        >
          mdi-close-circle
        </v-icon>
      </div>
    </form>
    <div class="history__container">
      <h1>Search History</h1>
      <div class="history__nohistory" v-if="histories.length === 0">
        <h1>No search history found</h1>
      </div>
      <HistoryCard
        v-for="(history, i) in histories"
        :key="i"
        :history="history"
      />
    </div>
    {{ hist }}
  </div>
</template>

<script>
import { HistoryCard } from "../../components";
import axios from "../../history";
export default {
  name: "History",
  components: {
    HistoryCard,
  },
  data() {
    return {
      searchQuery: "",
      state: this?.$store?.state,
    };
  },
  methods: {
    search() {
      (async () => {
        const data = await axios.get(
          `v1/history/${String(this.searchQuery).toLowerCase()}`
        );
        this.$store.commit("setHistory", data?.data);
      })();
    },
    clear() {
      this.searchQuery = "";
    },
  },
  computed: {
    histories() {
      return this.state?.history;
    },
  },
  mounted() {
    (async () => {
      this.$store.commit("setHistory", []);
      const history = await axios.get("v1/history");
      this.$store.commit("setHistory", history?.data);
    })();
  },
};
</script>

<style scoped>
.history {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}
.history__form {
  width: 100%;
  max-width: 600px;
  background: white;
  margin: 5px 0;
  padding: 10px;
  border-bottom: 1px solid lightgray;
  position: sticky;
  z-index: 1;
  border-radius: 5px;
}
.history__form__search {
  display: flex;
  align-items: center;
  background: lightgray;
  padding: 0px 20px;
  border-radius: 999px;
  z-index: 10;
}
.history__form__search:focus-within {
  background-color: #f5f5f5;
}
.history__form__search > input {
  text-align: center;
  flex: 1;
  margin: 0px 10px 0 0;
  border: none;
  padding: 5px;
  outline: none;
  z-index: 10;
}
.history__form__icons {
  color: green !important;
  margin-right: 10px;
}
.history__form__icons__cancel {
  color: lightseagreen !important;
  margin-left: 10px;
  cursor: pointer;
}
.history__container {
  background: white;
  padding: 10px;
  display: flex;
  flex-direction: column;
}
.history__container > h1 {
  color: lightseagreen !important;
  font-size: 20px;
  letter-spacing: 2px;
  user-select: none;
  user-select: none;
  text-align: center;
  margin: 10px;
}
.history__nohistory {
  width: 100%;
  padding: 10px;
  height: 50vh;
  display: grid;
  place-items: center;
}
.history__nohistory > h1 {
  color: gray;
  font-size: 15px;
  letter-spacing: 2px;
  user-select: none;
}
</style>
