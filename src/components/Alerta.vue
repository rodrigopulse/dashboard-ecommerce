<template>
  <b-alert class="alerta" v-model="estado" :variant="tipo" dismissible>{{ mensagem }}</b-alert>
</template>
<script>
export default {
  data() {
    return {
      dismissSecs: 10,
      dismissCountDown: 0,
    }
  },
  props: ['tipo', 'mensagem', 'estado']
}
</script>
<style lang="scss" scoped>
.alert {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  text-align: center;
}
</style>