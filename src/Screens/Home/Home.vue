<template>
  <div class="home">
    <Form />
    <Profile v-if="Object.keys(state.artist).length > 0" />
    <div class="home__results__container" v-if="albums.length > 0">
      <h1>Albums</h1>
      <div class="home__results__albums">
        <Album v-for="(album, i) in albums" :key="i" :album="album" />
      </div>
    </div>
    <div class="home__results__notfound" v-else>
      <h1>Opps, No results found!!</h1>
      <small>Try a key word search.</small>
    </div>
  </div>
</template>

<script>
import { Profile, Form, Album } from "../../components";
export default {
  name: "Home",
  components: {
    Profile,
    Form,
    Album,
  },
  data() {
    return {
      state: this.$store.state,
    };
  },
  methods: {},
  computed: {
    albums() {
      return this?.state?.albums;
    },
  },
};
</script>

<style scoped>
.home {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}
.home__results__container {
  padding: 10px;
  border-radius: 5px;
  border-bottom: 1px solid lightgray;
  user-zoom: none;
  user-select: none;
  background: black;
  margin: 10px 0;
}
.home__results__container > h1 {
  text-align: center;
  font-size: 20px;
  margin: 10px 0;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: lightseagreen;
}
.home__results__albums {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
}
.home__results__notfound {
  width: 100%;
  padding: 10px;
  height: 50vh;
  display: grid;
  place-items: center;
  user-select: none;
  background: white;
  border-radius: 5px;
  border-bottom: 1px solid lightgray;
}
.home__results__notfound > h1 {
  color: lightseagreen;
  font-size: 15px;
  letter-spacing: 2px;
  user-select: none;
}
.home__results__notfound {
  color: gray;
}
</style>
