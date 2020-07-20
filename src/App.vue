<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueMask from 'v-mask'
import 'cropperjs/dist/cropper.css';

Vue.use(VueMask);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

export default {
  name: 'App',
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700&display=swap');
@import 'node_modules/bootstrap/scss/bootstrap';
@import 'node_modules/bootstrap-vue/src/index.scss';

body {
  font-family: 'Open Sans', sans-serif;
  background: #ccc;
}
.crop-imagem {
  width: 100%;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  background: rgba(0, 0, 0, .8);
  top: 0;
  left: 0;
  &__botoes {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    z-index: 1;
    position: absolute;
    bottom: 10px;
  }
}
.campo-imagem {
  width: 100%;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #ccc;
  border-radius: 14px;
  padding: 10px;
  cursor: pointer;
  img {
    max-width: 90%;
  }
  &__texto {
    font-size: 14px;
  }
}
</style>
