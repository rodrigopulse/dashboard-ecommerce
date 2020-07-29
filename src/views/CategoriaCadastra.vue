<template>
  <div class="container">
    <Alerta :mensagem="alertaMensagem" :tipo="alertaTipo" :estado="alerta" />
    <Carregando v-if="carregando" />
    <div class="row">
      <div class="col-12">
        <h1>{{this.titulo}}</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12 mt-3">
        <b-form @submit.prevent="onSubmit">

          <b-form-group
            id="titulo"
            label="Título:"
          >
            <b-form-input
              v-model="form.titulo"
              required
              size="lg"
              placeholder="Digite o título da categoria"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="descricao"
            label="Descrição:"
          >
            <b-form-textarea
              size="lg"
              v-model="form.descricao"
              placeholder="Descrição da Categoria"
              rows="4"
            ></b-form-textarea>
          </b-form-group>

          <b-button size="lg" v-if="edicao" @click=deleta class="mr-3" variant="danger" type="button">Deletar</b-button>
          <b-button size="lg" type="submit" variant="primary">{{this.botao}}</b-button>

        </b-form>
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
      form: {
        titulo: '',
        descricao: ''
      },
      carregando: false,
      titulo: 'Cadastro de Categoria',
      botao: 'Cadastrar',
      alerta: false,
      alertaMensagem: '',
      alertaTipo: '',
      edicao: false
    }
  },
  components: {
    Alerta,
    Carregando
  },
  created () {
    document.title = `E-commerce - ${this.titulo}`;
    if (this.$route.query.id) {
      this.get(this.$route.query.id)
    }
  },
  methods: {
    get(id) {
      this.carregando = true
      categoria.getCategoria(id)
        .then( (res) => {
          this.carregando = false
          this.edicao = true
          this.form = res.data
          this.titulo = 'Edição de Categoria'
          this.botao = 'Salvar'
        }) .catch( () => {
          this.carregando = false
          this.alerta = true
          this.alertaMensagem = 'Categoria não encontrada'
          this.alertaTipo = 'danger'
        })
    },
    deleta() {
      this.$bvModal.msgBoxConfirm('Ao excluir a categoria, essa ação não poderá ser desfeita', {
        title: 'Tem certeza que deseja excluir essa categoria',
        size: 'sm',
        buttonSize: 'lg',
        okVariant: 'danger',
        okTitle: 'Excluir',
        cancelTitle: 'Cancelar',
        footerClass: 'p-3',
        hideHeaderClose: false,
        centered: true
      })
        .then( (valor) => {
          this.carregando = true
          if(valor) {
            categoria.deleta(this.$route.query.id)
            .then( () => {
              this.carregando = false
              this.$router.push('/categoria/gestao')
            })
          }
        })
        .catch(() => {
          this.carregando = false
        })
    },
    onSubmit() {
      this.carregando = true
      if(this.edicao) {
        categoria.atualiza(this.form, this.$route.query.id)
          .then( () => {
            this.carregando = false
            this.alerta = true
            this.alertaMensagem = 'Categoria atualizada com sucesso'
            this.alertaTipo = 'success'
          }) .catch( () => {
            this.carregando = false
            this.alerta = true
            this.alertaMensagem = 'Ocorreu um erro'
            this.alertaTipo = 'danger'
          })
      } else {
        categoria.cadastra(this.form)
          .then( () => {
            this.carregando = false
            this.alerta = true
            this.alertaMensagem = 'Categoria cadastrada com sucesso'
            this.alertaTipo = 'success'
            this.form.titulo = ''
            this.form.descricao = ''
          }) .catch( () => {
            this.carregando = false
            this.alerta = true
            this.alertaMensagem = 'Ocorreu um erro'
            this.alertaTipo = 'danger'
          })
      }
    }
  }
}
</script>