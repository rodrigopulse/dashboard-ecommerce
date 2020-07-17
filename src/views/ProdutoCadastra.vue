<template>
  <div class="container">

    <div class="row">
      <div class="col-12">
        <h1>Cadastro de Produto</h1>
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
              placeholder="Digite o título do produto"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="descricao"
            label="Descrição:"
          >
            <b-form-textarea
              size="lg"
              v-model="form.descricao"
              placeholder="Descrição do Produto"
              rows="4"
            ></b-form-textarea>
          </b-form-group>

          <div class="row">
            <div class="col-4">

              <b-input-group size="lg" prepend="R$">
                <b-form-input
                  v-model="form.preco"
                  required
                  size="lg"
                ></b-form-input>
              </b-input-group>

            </div>
          </div>

        </b-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        titulo: '',
        descricao: ''
      },
      alerta: false,
      alertaMensagem: '',
      alertaTipo: ''
    }
  },
  created () {
    document.title = "E-commerce - Cadastro de Produto";
  },
  methods: {
    onsSubmit() {

    }
  }
}
</script>