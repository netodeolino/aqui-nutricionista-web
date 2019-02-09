<template>
  <div class="name-card">
    <v-card :color="color" ref="card" :dark="dark" :img="cardBgImage">
      <v-card-media v-if="showTopNav">
        <v-layout row justify-space-between class="ma-0">
          <v-flex xs2>
            <v-icon color="pink">favorite</v-icon>
          </v-flex>
          <v-flex xs2 class="text-sm-right">
            <v-icon>more_vert</v-icon>
          </v-flex>
        </v-layout>
      </v-card-media>    
      <v-card-text>
        <div class="layout ma-0 align-center" :class="computeCardLayout">
          <v-avatar :size="computeAvatarSize" color="primary">
            <img :src="`${URL_API}${avatarSrc}`" v-bind:alt="name" v-if="showAvatar">
            <span v-else class="white--text headline">{{ name.charAt(0) }}</span>
          </v-avatar>
          <div class="flex" :class="computeTextAlgin">
            <div class="subheading">{{name}}</div>
            <span class="caption">{{jobTitle}}</span>
          </div>
        </div>
      </v-card-text>
    </v-card>
    <v-bottom-nav :value="true" color="transparent" :height="64" v-if="showBottomNav">
      <v-btn v-on:click="openProfile()" flat color="teal" value="favorites">
        <span>Ver perfil</span>
        <v-icon>person</v-icon>
      </v-btn>
      <v-btn flat color="teal" value="nearby">
        <span>Localização</span>
        <v-icon>place</v-icon>
      </v-btn>
    </v-bottom-nav>   
  </div>
</template>

<script>
import { URL_API } from '@/util/constants'
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    avatarSrc: {
      type: String,
      default: ''
    },
    jobTitle: {
      type: String,
      default: ''
    },
    cardBgImage: {
      type: String,
    },
    color: {
      type: String,
      default: ''
    },
    dark: {
      type: Boolean,
      default: false
    },
    bottomNav: {
      type: Boolean,
      default: false
    },
    topNav: {
      type: Boolean,
      default: false
    },
    mini: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    URL_API
  }),
  computed: {
    computeCardLayout () {
      return (this.mini) ? 'row' : 'column';
    },
    computeTextAlgin () {
      return (this.mini) ? 'text-sm-right' : 'text-sm-center';
    },
    computeAvatarSize () {
      return (this.mini) ? '48' : '96';
    },
    showAvatar () {
      return this.avatarSrc !== null;
    },
    showBottomNav () {
      return (this.mini === false && this.bottomNav); 
    },
    showTopNav () {
      return (this.mini === false && this.topNav); 
    }
  },
  methods: {
    openProfile: function() {
      if (this.userId) {
        this.$router.push({ path: `/usuario/${this.userId}` });
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
  .caption, .subheading {
    font-weight:200;  
  }
</style>