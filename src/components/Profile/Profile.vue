<template>
  <div
    class="profile"
    :style="{
      backgroundImage: 'url(' + image + ')',
    }"
  >
    <div class="profile__card">
      <v-avatar class="profile__avatar">
        <img :src="profile" :alt="name" :title="name" />
      </v-avatar>
      <div class="profile__artist__info">
        <h1>
          Name <span>{{ name }}</span>
        </h1>
        <h2>
          Gender <span>{{ gender }}</span>
        </h2>
        <h2>
          YOB <span>{{ yob }}</span>
        </h2>
        <h2>
          Genre <span>{{ genre }}</span>
        </h2>
        <h2>
          Country <span>{{ country }}</span>
        </h2>
      </div>
      <div class="profile__social">
        <v-btn small color="profile__button" @click="openWeb">
          <v-icon dark>
            mdi-web
          </v-icon>
        </v-btn>
        <v-btn small color="profile__button" @click="openFacebook">
          <v-icon dark>
            mdi-facebook
          </v-icon>
        </v-btn>
        <v-btn small color="profile__button" @click="openTwitter">
          <v-icon dark>
            mdi-twitter
          </v-icon>
        </v-btn>
      </div>
    </div>
    <div class="profile__more">
      <h1>Biography</h1>
      <p>{{ biography }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      state: this?.$store?.state,
      bannerIndex: 0,
    };
  },
  methods: {
    openTwitter() {
      location.href = this.twitter;
    },
    openFacebook() {
      location.href = this.facebook;
    },
    openWeb() {
      location.href = this.web;
    },
  },
  mounted() {
    setInterval(() => {
      if (this.banners?.length === this.bannerIndex) {
        this.bannerIndex = 0;
      } else {
        this.bannerIndex += 1;
      }
    }, 5000);
  },
  computed: {
    banners() {
      const allBanners = [
        this.state?.artist?.strArtistFanart,
        this.state?.artist?.strArtistFanart1,
        this.state?.artist?.strArtistFanart2,
      ].filter((element) => {
        const ele = String(element);
        return ele !== "undefined";
      });
      return allBanners;
    },
    image() {
      return this.banners?.length === 0
        ? "https://www.theaudiodb.com/images/media/artist/fanart/qxtqrw1340870221.jpg"
        : this.banners[this.bannerIndex];
    },
    data() {
      return this.state?.artist;
    },
    gender() {
      return this.state?.artist?.strGender;
    },
    name() {
      return this.state?.artist?.strArtist;
    },
    country() {
      return this.state?.artist?.strCountry;
    },
    genre() {
      return this.state?.artist?.strGenre;
    },
    profile() {
      return this.state?.artist?.strArtistThumb;
    },
    countryCode() {
      return this.state?.artist?.strCountryCode;
    },
    facebook() {
      return this.state?.artist?.strFacebook;
    },
    twitter() {
      return this.state?.artist?.strTwitter;
    },
    web() {
      return this.state?.artist?.strWebsite;
    },
    yob() {
      return this.state?.artist?.intBornYear;
    },
    biography() {
      return this.state?.artist?.strBiographyEN;
    },
  },
};
</script>

<style scoped>
.profile {
  width: 100%;
  max-width: 600px;
  height: 100%;
  max-height: 50vh;
  background-size: cover !important;
  background-repeat: no-repeat;
  color: white;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  border-bottom: 2px solid lightgray;
  background: black;
}
.profile__card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 10px;
}

.profile__avatar {
  cursor: pointer !important;
  border: 5px solid green !important;
}
.profile__artist__info,
.profile__social {
  background: rgba(0, 0, 0, 0.5) !important;
  border-radius: 5px;
  padding: 10px;
  margin: 5px 0;
  width: 100%;
}
.profile__social {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.profile__artist__info > h1 {
  font-size: 12px;
  text-align: center;
}
.profile__artist__info > h2 {
  font-size: 12px;
  text-align: center;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
}
.profile__more {
  padding: 5px;
}
.profile__more > p {
  color: white;
  user-select: none;
  user-zoom: none;
  background: rgba(0, 0, 0, 0.5) !important;
  border-radius: 5px;
  padding: 5px;
  font-size: small;
  max-height: 90%;
  overflow-x: hidden;
  overflow-y: scroll;
}
.profile__more > p::-webkit-scrollbar {
  display: none !important;
}
.profile__more > h1 {
  font-size: 20px;
  user-zoom: none;
  user-select: none;
}
.profile__button:first-child {
  background-color: green !important;
  color: white;
  width: fit-content;
  height: fit-content;
  margin-right: 2px;
}
.profile__button:nth-child(2) {
  background-color: #4867aa !important;
  color: white;
  width: fit-content;
  height: fit-content;
  margin-right: 2px;
}
.profile__button:last-child {
  background-color: #009deb !important;
  color: white;
  width: fit-content;
  height: fit-content;
}
</style>
