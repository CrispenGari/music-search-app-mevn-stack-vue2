<template>
  <div class="historycard" @click="openInHome(name)">
    <v-avatar class="history__profile__avatar">
      <img :src="profile" :alt="name" :title="name" />
    </v-avatar>
    <div class="history__center">
      <h1>{{ name }}</h1>
      <small>{{ genre }}</small>
    </div>
    <button title="delete">
      <v-icon class="history__delete__icon" @click="deleteHistory(id)">
        mdi-delete
      </v-icon>
    </button>
  </div>
</template>

<script>
import axios from "../../history";

export default {
  name: "HistoryCard",
  data() {
    return { gotoHomeAfter: true };
  },
  props: {
    history: Object,
  },
  methods: {
    deleteHistory(id) {
      this.gotoHomeAfter = false;
      (async () => {
        await axios
          .delete(`/v1/history/${id}`)
          .catch((error) => console.log(error))
          .finally(() => {
            (async () => {
              const data = await axios.get("/v1/history");
              this.$store.commit("setHistory", data.data);
            })();
          });
      })();
    },
    openInHome(name) {
      if (this?.gotoHomeAfter) {
        this.$router?.push("/");
        this.$store?.commit("setQuery", {
          query: name,
          run: true,
        });
      }
    },
  },
  computed: {
    name() {
      return this?.history?.name;
    },
    profile() {
      return this?.history?.profile;
    },
    genre() {
      return this?.history?.genre;
    },
    id() {
      return this?.history?._id;
    },
  },
};
</script>

<style scoped>
.historycard {
  color: white;
  background: black;
  border-radius: 5px;
  border-bottom: 1px solid lightgray;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  user-select: none;
  user-zoom: none;
  cursor: pointer;
}
.historycard:hover {
  opacity: 0.8;
}
.history__center {
  flex: 1;
  margin: 0px 10px;
  display: flex;
  flex-direction: column;
}
.history__center > small {
  color: gray;
  margin: 5px 0;
}
.history__center > h1 {
  font-size: 16px;
  text-transform: capitalize;
}
.history__profile__avatar {
  background: white !important;
}
.historycard > button {
  width: fit-content !important;
  height: fit-content !important;
  background: gray !important;
  border-radius: 50%;
  padding: 5px;
  outline: none;
  z-index: 100 !important;
}
</style>
