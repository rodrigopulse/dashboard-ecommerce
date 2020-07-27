<template>
  <div class="container">
    <Alerta :mensagem="alerta.mensagem" :tipo="alerta.tipo" :estado="alerta.show" />
    <div class="row">
      <div class="col-12">
        <h1>Gestão de Produtos</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12 mt-3">
        <b-table striped hover :items="dados" :fields="fields">
          <template v-slot:cell(titulo)="data">
            <a :href="`/produto/cadastra?id=${data.item._id}`">{{ data.value }}</a>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>
<script>
import Produto from '../api/produto'
// Components
import Alerta from '../components/Alerta'

const produto = new Produto()

export default {
  data() {
    return {
      alerta: {
        show: false,
        mensagem: '',
        tipo: ''
      },
      dados: [],
      fields: [{ key: 'titulo', label: 'Título' }, { key: 'descricao', label: 'Descrição' }],
    }
  },
  created () {
    document.title = "E-commerce - Gestão de Produtos";
    this.getProdutos()
  },
  components: {
    Alerta
  },
  methods: {
    getProdutos() {
      produto.getProdutos(20, 1)
      .then( (res) => {
        this.dados = res.data.produto
      })
    }
  }
}
</script>