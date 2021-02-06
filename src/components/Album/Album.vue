<template>
  <div
    class="album"
    :style="{
      backgroundImage: 'url(' + image + ')',
    }"
  >
    <h1>{{ name }}</h1>
    <h1>{{ year }}</h1>
  </div>
</template>

<script>
export default {
  name: "Album",
  data() {
    return {};
  },
  props: {
    album: Object,
  },
  computed: {
    name() {
      return this?.album?.strAlbum;
    },
    year() {
      return this?.album?.intYearReleased;
    },
    image() {
      return this?.album?.strAlbumThumb;
    },
  },
};
</script>

<style scoped>
.album {
  width: 25%;
  margin: 5px;
  background-size: cover !important;
  border-radius: 5px;
  border-bottom: 1px solid lightgray;
  height: 25vh;
  color: white;
  user-select: none;
  display: grid;
  place-items: center;
  user-zoom: none;
  cursor: pointer;
  background: black;
}
.album > h1:first-child {
  font-size: 15px;
  transition: transform 100ms ease-in-out;
}
.album:hover {
  opacity: 0.8;
  transform: scale(1.05);
}
</style>
