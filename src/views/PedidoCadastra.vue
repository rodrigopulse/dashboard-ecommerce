<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>Edição de Pedido</h1>
      </div>
    </div>
  </div>
</template>
<script>
import Pedido from '../api/pedido'

const pedido = new Pedido()

export default {
  created() {
    document.title = "E-commerce - Edição de Pedido";
    this.getPedido(this.$route.query.id)
  },
  methods: {
    getPedido(id) {
      pedido.getPedido(id)
      .then( (res) => { console.log(res) })
    }
  }
}
</script>