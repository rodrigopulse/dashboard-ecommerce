<template>
  <b-alert class="alerta" :show="estado" :variant="tipo" dismissible>{{ mensagem }}</b-alert>
</template>
<script>
export default {
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