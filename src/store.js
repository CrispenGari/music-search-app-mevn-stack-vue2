import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    albums: [],
    artist: {},
    history: [],
    searchQuery: {
      query: "",
      run: false,
    },
  },
  mutations: {
    setAlbums(state, value) {
      state.albums = value;
    },
    setArtist(state, value) {
      state.artist = value;
    },
    setHistory(state, value) {
      state.history = value;
    },
    setQuery(state, value) {
      state.searchQuery = value;
    },
  },
});

export default store;
