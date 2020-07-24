<template>
  <div class="container">
    <Alerta :mensagem="alerta.mensagem" :tipo="alerta.tipo" :estado="alerta.show" />
    <div class="row">
      <div class="col-12">
        <h1>Pedidos</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12 mt-3">
        <b-table striped hover :items="dados" :fields="fields">
          <template v-slot:cell(codigo)="data">
            <a :href="`/pedido/cadastra?id=${data.item.codigo}`">{{ data.value }}</a>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>
<script>
import Alerta from '../components/Alerta'
import Pedido from '../api/pedido'

const pedido = new Pedido()

const formataPrecoBrasil = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  prefix: 'R$ ',
})

export default {
  data() {
    return {
      alerta: {
        show: false,
        mensagem: '',
        tipo: ''
      },
      dados: [],
      fields: [
        { key: 'codigo', label: 'Código' },
        { key: 'preco', label: 'Valor' },
        { key: 'frete', label: 'Frete' },
        { key: 'usuario', label: 'Comprador' },
        { key: 'status', label: 'Status' },
      ],
    }
  },
  created () {
    document.title = "E-commerce - Pedidos";
    this.getPedidos()
  },
  components: {
    Alerta
  },
  methods: {
    getPedidos() {
      pedido.getPedidos()
      .then( (res) => {
        res.data.forEach((valor) => {
          console.log(valor)
          let valorPedido = formataPrecoBrasil.format(valor.valor.toString())
          let valorFrete = formataPrecoBrasil.format(valor.frete.toString())
          this.dados.push({
            'codigo': valor.codigoPedido,
            'preco': valorPedido,
            'frete': valorFrete,
            'usuario': valor.usuario.email,
            'status': valor.status
          })
        });
      })
    }
  }
}
</script>