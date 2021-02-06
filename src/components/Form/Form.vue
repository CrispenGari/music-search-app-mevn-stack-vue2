<template>
  <form class="form" @submit.prevent="search">
    <div class="form__search">
      <v-icon class="form__icons">
        mdi-magnify
      </v-icon>
      <input
        type="text"
        placeholder="Search music artist e.g Drake"
        v-model="searchQuery"
      />
      <v-icon class="form__icons__cancel" v-if="searchQuery" @click="clear">
        mdi-close-circle
      </v-icon>
    </div>
  </form>
</template>

<script>
import axios from "../../data";
import historyAxios from "../../history";
export default {
  name: "Form",
  data() {
    return {
      searchQuery: "",
      state: this.$store?.state,
    };
  },
  mounted() {
    this.searchQuery = this.state?.searchQuery?.query;
    if (this.state?.searchQuery?.run) {
      this.search();
    }
  },
  methods: {
    clear() {
      this.searchQuery = "";
    },
    search() {
      if (this.searchQuery) {
        this.$store.commit("setAlbums", []);
        this.$store.commit("setArtist", {});
        (async () => {
          const data_1 = await axios.get(
            `searchalbum.php?s=${this.searchQuery}`
          );
          const data_2 = await axios.get(`search.php?s=${this?.searchQuery}`);
          this.$store.commit("setArtist", data_2?.data?.artists[0]);
          if (data_2?.data?.artists?.length > 0) {
            (async () => {
              await historyAxios
                .post("/v1/history", {
                  name: String(
                    data_2?.data?.artists[0]?.strArtist
                  ).toLowerCase(),
                  genre: data_2?.data?.artists[0]?.strGenre,
                  profile: data_2?.data?.artists[0]?.strArtistThumb,
                })
                .catch((error) => console.error(error));
            })();
          }
          this.$store.commit("setAlbums", data_1?.data?.album);
        })();
      }
    },
  },
};
</script>

<style scoped>
.form {
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
.form__search {
  display: flex;
  align-items: center;
  background: lightgray;
  padding: 0px 20px;
  border-radius: 999px;
  z-index: 10;
}
.form__search:focus-within {
  background-color: #f5f5f5;
}
.form__search > input {
  text-align: center;
  flex: 1;
  margin: 0px 10px 0 0;
  border: none;
  padding: 5px;
  outline: none;
  z-index: 10;
}
.form__icons {
  color: green !important;
  margin-right: 10px;
}
.form__icons__cancel {
  color: lightseagreen !important;
  margin-left: 10px;
  cursor: pointer;
}
</style>
