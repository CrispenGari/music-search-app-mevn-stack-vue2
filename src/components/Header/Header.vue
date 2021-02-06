<template>
  <div class="header">
    <div class="header__left">
      <v-icon class="header__icons">
        mdi-home
      </v-icon>
      <router-link to="/" class="header__nav">Home</router-link>
    </div>
    <div class="header__right">
      <v-icon class="header__icons">
        mdi-history
      </v-icon>
      <router-link to="/history" class="header__nav">History</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    clear() {
      this.searchQuery = "";
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  background: black;
  color: white;
  user-zoom: none;
  user-select: none;
  border-bottom: 1px solid lightgray;
  position: sticky;
  top: 0;
  z-index: 10;
}
.header__nav {
  color: white;
  letter-spacing: 2px;
  font-weight: 500;
  font-size: 20px;
  cursor: pointer;
  text-decoration: none;
}

.header__left,
.header__right {
  display: flex;
  align-items: center;
}
.header__icons {
  color: green !important;
  margin-right: 10px;
}
</style>
