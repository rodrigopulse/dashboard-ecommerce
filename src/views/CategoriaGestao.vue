<template>
  <div class="container">
    <Alerta :mensagem="alertaMensagem" :tipo="alertaTipo" :estado="alerta" />
    <Carregando v-if="carregando" />
    <div class="row">
      <div class="col-12">
        <h1>Gestão de Categorias</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12 mt-3">
        <b-table striped hover :items="dados" :fields="fields">
          <template v-slot:cell(titulo)="data">
            <a :href="`/categoria/cadastra?id=${data.item._id}`">{{ data.value }}</a>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>
<script>
import Categoria from '../api/categoria'
// Components
import Alerta from '../components/Alerta'
import Carregando from '../components/Carregando'

const categoria = new Categoria()

export default {
  data() {
    return {
      alerta: false,
      alertaMensagem: '',
      alertaTipo: '',
      carregando: false,
      dados: [],
      fields: [{ key: 'titulo', label: 'Título' }, { key: 'descricao', label: 'Descrição' }],
    }
  },
  components: {
    Alerta,
    Carregando
  },
  created () {
    document.title = "E-commerce - Gestão de Categoria";
    this.getCategorias()
  },
  methods: {
    getCategorias() {
      this.carregando = true
      categoria.getCategorias()
        .then( (res) => {
          this.carregando = false
          this.dados = res.data
        }) .catch (() => {
          this.carregando = false
        })
    }
  }
}
</script>