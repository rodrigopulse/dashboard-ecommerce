<template>
  <div class="container">
    <Alerta :mensagem="alerta.mensagem" :tipo="alerta.tipo" :estado="alerta.show" />
    <div class="row">
      <div class="col-6">
        <h1>Gestão de Produtos</h1>
      </div>
      <div class="col-6">
        <b-input-group
          size="lg"
          class="mb-3"
        >
          <b-form-input v-model="busca" placeholder="Encontre o produto"></b-form-input>
          <b-input-group-append>
            <b-button size="sm" text="Button" @click="buscar()" variant="primary">Buscar</b-button>
          </b-input-group-append>
        </b-input-group>
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
    <Paginacao @pagina="selecionaPagina" :totalPaginas="paginacao.total" v-if="paginacao.total > 1"/>
  </div>
</template>
<script>
import Produto from '../api/produto'
// Components
import Alerta from '../components/Alerta'
import Paginacao from '../components/Paginacao'

const produto = new Produto()

export default {
  data() {
    return {
      alerta: {
        show: false,
        mensagem: '',
        tipo: ''
      },
      busca: '',
      paginacao: {
        total: ''
      },
      dados: [],
      fields: [{ key: 'titulo', label: 'Título' }, { key: 'descricao', label: 'Descrição' }],
    }
  },
  created () {
    document.title = "E-commerce - Gestão de Produtos";
    this.getProdutos(1)
  },
  components: {
    Alerta,
    Paginacao
  },
  methods: {
    getProdutos(pagina) {
      produto.getProdutos(20, pagina)
      .then( (res) => {
        this.paginacao.total = res.data.totalPaginas
        this.dados = res.data.produto
      })
    },
    selecionaPagina(e) {
      this.getProdutos(e)
    },
    buscar() {
      produto.busca(this.busca)
      .then( (res) => {
        this.dados = res.data
      })
    }
  }
}
</script>