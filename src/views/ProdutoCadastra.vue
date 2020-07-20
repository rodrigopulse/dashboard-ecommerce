<template>
  <div class="container">

    <div class="crop-imagem" v-if="mostraCrop">
      <VueCropper
        ref="cropper"
        :aspect-ratio="aspectRatio"
        output-size="600"
        :src="imgSrc"
        alt="Imagem Crop"
      />
      <div class="crop-imagem__botoes">
        <b-button @click="salvaImagem" size="lg" variant="success" class="mr-3">Salvar</b-button>
        <b-button @click="mostraCrop = false" size="lg" variant="danger">Cancelar</b-button>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <h1>{{titulo}}</h1>
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
              required
              v-model="form.descricao"
              placeholder="Descrição do Produto"
              rows="4"
            ></b-form-textarea>
          </b-form-group>

          <div class="row">
            <div class="col-4">

              <b-form-group prepend="R$" id="preco" label="Preço:">
                <b-form-input
                  v-model.lazy="form.preco"
                  required
                  size="lg"
                  v-money="money"
                ></b-form-input>
              </b-form-group>

            </div>
            <div class="col-4">

              <b-form-group id="peso" label="Peso (gramas):">
                <b-form-input
                  v-model="form.peso"
                  required
                  size="lg"
                ></b-form-input>
              </b-form-group>

            </div>
            <div class="col-4">

              <b-form-group label="Estoque:" id="estoque">
                <b-form-input
                  v-model="form.estoque"
                  required
                  size="lg"
                  type="number"
                ></b-form-input>
              </b-form-group>

            </div>
          </div>

          <div class="row">
            <div class="col-6">

              <b-form-group label="Categoria:" id="categoria">
                <b-form-select required v-model="form.categoria" :options="categorias" value-field="_id" text-field="titulo"></b-form-select>
              </b-form-group>

            </div>
            <div class="col-6">
                <b-form-group label="Destaque">
                  <b-form-checkbox
                    id="destaque"
                    v-model="form.destaque"
                    name="destaque"
                    value=true
                    unchecked-value=false
                    size="lg"
                  >
                    Esse produto é um destaque
                  </b-form-checkbox>
                </b-form-group>

            </div>
          </div>
          <div class="row mb-5">
            <div class="col-4">

              <input
                ref="imagem1"
                type="file"
                style="display: none;"
                @change="abreCrop('imagem1', $event)"
              />
              <div class="row mb-2">
                <div class="col-12">
                  <b-button @click="removeCrop('imagem1')" size="sm" type="button" variant="danger">remover</b-button>
                </div>
              </div>

              <div class="campo-imagem" @click="$refs.imagem1.click(); aspectRatio = 1 / 1">
                <img v-if="imagem1Preview" :src="imagem1Preview" alt="Imagem Destaque" />
                <span class="campo-imagem__texto" v-else>Imagem com 600px x 600px</span>
              </div>

            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <b-button size="lg" v-if="edicao" @click=deleta class="mr-3" variant="danger" type="button">Deletar</b-button>
              <b-button size="lg" type="submit" variant="primary">{{this.botao}}</b-button>
            </div>
          </div>

        </b-form>
      </div>
    </div>
  </div>
</template>
<script>
import Categoria from '../api/categoria'
import VueCropper from "vue-cropperjs"
import {VMoney} from 'v-money'

const categoria = new Categoria()

export default {
  data() {
    return {
      form: {
        titulo: '',
        descricao: '',
        preco: '',
        peso: '',
        categoria: '',
        destaque: false
      },
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
      },
      // Crop
      imgSrc: '',
      mostraCrop: false,
      aspectRatio: '',
      //Imagens
      imagem1: '',
      imagem1Preview: '',

      titulo: 'Cadastro de Produto',
      botao: 'Cadastrar',
      edicao: false,
      categorias: [],
      alerta: false,
      alertaMensagem: '',
      alertaTipo: ''
    }
  },
  directives: {money: VMoney},
  created () {
    document.title = "E-commerce - Cadastro de Produto";
    this.getCategoria()
  },
  components: {
    VueCropper
  },
  methods: {
    abreCrop(tipo, imagem) {
      const arquivo = imagem.target.files[0];
      if (typeof FileReader === "function") {
        this.mostraCrop = true;
        const reader = new FileReader();
        reader.onload = event => {
          this.imgSrc = event.target.result;
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result);
        };
        reader.readAsDataURL(arquivo);
      }
      console.log(tipo)
      this.imagemAtiva = tipo
      return true;
    },
    removeCrop(imagem) {
      switch (imagem) {
        case 'imagem1':
          this.imagem1 = ''
          this.imagem1Preview = ''
          break;
        default:
          break;
      }
    },
    salvaImagem: async function() {
      this.$refs.cropper.getCroppedCanvas().toBlob(blob => {
        if (this.imagemAtiva == "imagem1") {
          this.imagem1 = blob;
          this.imagem1Preview = URL.createObjectURL(this.imagem1);
        }
      }, "image/jpeg");
      this.mostraCrop = false;
      this.$refs.cropper.reset();
      this.$refs.imagem1.value = "";
    },
    getCategoria() {
      categoria.getCategorias()
      .then( (res) => {
        this.categorias = res.data
      })
    },
    onSubmit() {
      console.log(this.form)
    }
  }
}
</script>