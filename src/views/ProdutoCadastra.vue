<template>
  <div class="container">
    <Alerta :mensagem="alerta.mensagem" :tipo="alerta.tipo" :estado="alerta.show" />
    <div class="crop-imagem" v-if="mostraCrop">
      <VueCropper
        ref="cropper"
        :aspect-ratio="aspectRatio"
        :output-size="600"
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
              <b-form-group id="preco" label="Preço:">
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

            <div class="col-3">

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

            <div class="col-3">

              <input
                ref="imagem2"
                type="file"
                style="display: none;"
                @change="abreCrop('imagem2', $event)"
              />
              <div class="row mb-2">
                <div class="col-12">
                  <b-button @click="removeCrop('imagem2')" size="sm" type="button" variant="danger">remover</b-button>
                </div>
              </div>

              <div class="campo-imagem" @click="$refs.imagem2.click(); aspectRatio = 1 / 1">
                <img v-if="imagem2Preview" :src="imagem2Preview" alt="Imagem Destaque" />
                <span class="campo-imagem__texto" v-else>Imagem com 600px x 600px</span>
              </div>

            </div>

            <div class="col-3">

              <input
                ref="imagem3"
                type="file"
                style="display: none;"
                @change="abreCrop('imagem3', $event)"
              />
              <div class="row mb-2">
                <div class="col-12">
                  <b-button @click="removeCrop('imagem3')" size="sm" type="button" variant="danger">remover</b-button>
                </div>
              </div>

              <div class="campo-imagem" @click="$refs.imagem3.click(); aspectRatio = 1 / 1">
                <img v-if="imagem3Preview" :src="imagem3Preview" alt="Imagem Destaque" />
                <span class="campo-imagem__texto" v-else>Imagem com 600px x 600px</span>
              </div>

            </div>

            <div class="col-3">

              <input
                ref="imagem4"
                type="file"
                style="display: none;"
                @change="abreCrop('imagem4', $event)"
              />
              <div class="row mb-2">
                <div class="col-12">
                  <b-button @click="removeCrop('imagem4')" size="sm" type="button" variant="danger">remover</b-button>
                </div>
              </div>

              <div class="campo-imagem" @click="$refs.imagem4.click(); aspectRatio = 1 / 1">
                <img v-if="imagem4Preview" :src="imagem4Preview" alt="Imagem Destaque" />
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
import Produto from '../api/produto'
import VueCropper from 'vue-cropperjs'
import Alerta from '../components/Alerta'
import {VMoney} from 'v-money'

const categoria = new Categoria()
const produto = new Produto()
const formataPrecoBrasil = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  prefix: 'R$ ',
})
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
        precision: 2,
        prefix: 'R$ '
      },
      alerta: {
        show: false,
        mensagem: '',
        tipo: ''
      },
      // Crop
      imgSrc: '',
      mostraCrop: false,
      aspectRatio: '',
      //Imagens
      imagem1: '',
      imagem1Preview: '',
      imagem2: '',
      imagem2Preview: '',
      imagem3: '',
      imagem3Preview: '',
      imagem4: '',
      imagem4Preview: '',

      titulo: 'Cadastro de Produto',
      botao: 'Cadastrar',
      edicao: false,
      categorias: [],
    }
  },
  directives: {money: VMoney},
  created () {
    document.title = "E-commerce - Cadastro de Produto";
    if (this.$route.query.id) {
      this.get(this.$route.query.id)
    }
    this.getCategoria()
  },
  components: {
    VueCropper,
    Alerta
  },
  methods: {
    get(id) {
      produto.getProduto(id)
      .then( (res) => {
        this.titulo = 'Edição de Produto'
        this.botao = 'Salvar'
        this.edicao = true
        this.form = res.data
        this.form.preco = formataPrecoBrasil.format(res.data.preco.toString())
        this.form.categoria = res.data.categoria._id
        if(res.data.imagens[0] != undefined) {
          this.imagem1Preview = `http://localhost:3333/imagens/${res.data.imagens[0].filename}`
          this.getBlob(`http://localhost:3333/imagens/${res.data.imagens[0].filename}`).then((blob) => {
            this.imagem1 = blob
          })
        }
        if(res.data.imagens[1] != undefined) {
          this.imagem2Preview = `http://localhost:3333/imagens/${res.data.imagens[1].filename}`
          this.getBlob(`http://localhost:3333/imagens/${res.data.imagens[1].filename}`).then((blob) => {
            this.imagem2 = blob
          })
        }
        if(res.data.imagens[2] != undefined) {
          this.imagem3Preview = `http://localhost:3333/imagens/${res.data.imagens[2].filename}`
          this.getBlob(`http://localhost:3333/imagens/${res.data.imagens[2].filename}`).then((blob) => {
            this.imagem3 = blob
          })
        }
        if(res.data.imagens[3] != undefined) {
          this.imagem4Preview = `http://localhost:3333/imagens/${res.data.imagens[3].filename}`
          this.getBlob(`http://localhost:3333/imagens/${res.data.imagens[3].filename}`).then((blob) => {
            this.imagem4 = blob
          })
        }
      })
    },
    getBlob(url) {
      return new Promise(function(resolve, reject) {
        try {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.responseType = "blob";
            xhr.onerror = function() {reject("Network error.")};
            xhr.onload = function() {
                if (xhr.status === 200) {resolve(xhr.response)}
                else {reject("Loading error:" + xhr.statusText)}
            };
            xhr.send();
        }
        catch(err) {reject(err.message)}
    });

    },
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
      this.imagemAtiva = tipo
      return true;
    },
    removeCrop(imagem) {
      switch (imagem) {
        case 'imagem1':
          this.imagem1 = ''
          this.imagem1Preview = ''
          break;
        case 'imagem2':
          this.imagem2 = ''
          this.imagem2Preview = ''
          break;
        case 'imagem3':
          this.imagem3 = ''
          this.imagem3Preview = ''
          break;
        case 'imagem4':
          this.imagem4 = ''
          this.imagem4Preview = ''
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
        if (this.imagemAtiva == "imagem2") {
          this.imagem2 = blob;
          this.imagem2Preview = URL.createObjectURL(this.imagem2);
        }
        if (this.imagemAtiva == "imagem3") {
          this.imagem3 = blob;
          this.imagem3Preview = URL.createObjectURL(this.imagem3);
        }
        if (this.imagemAtiva == "imagem4") {
          this.imagem4 = blob;
          this.imagem4Preview = URL.createObjectURL(this.imagem4);
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
    transformaPreco(preco) {
      const precoTiraCifrao = preco.replace('R$ ', '')
      const precoTiraPonto = precoTiraCifrao.replace('.', '')
      const precoTiraVirgula = precoTiraPonto.replace(',', '.')
      const precoNumber = parseFloat(precoTiraVirgula)
      return precoNumber
    },
    deleta() {
      this.$bvModal.msgBoxConfirm('Ao excluir o produto, essa ação não poderá ser desfeita', {
        title: 'Tem certeza que deseja excluir esse produto',
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
          if(valor) {
            produto.deleta(this.$route.query.id)
            .then( () => {
              this.$router.push('/produto/gestao')
            })
          }
        })
        .catch(() => {

        })
    },
    onSubmit() {
      if(this.edicao) {
        const formData = new FormData()
        formData.append('titulo', this.form.titulo)
        formData.append('descricao', this.form.descricao)
        formData.append('peso', this.form.peso)
        formData.append('estoque', this.form.estoque)
        formData.append('categoria', this.form.categoria)
        formData.append('destaque', this.form.destaque)
        formData.append('preco', this.transformaPreco(this.form.preco))
        formData.append('imagens', this.imagem1)
        formData.append('imagens', this.imagem2)
        formData.append('imagens', this.imagem3)
        formData.append('imagens', this.imagem4)
        produto.atualiza(formData, this.$route.query.id)
        .then( () => {
          this.alerta = {
            show: true,
            mensagem: 'Produto atualizado com sucesso',
            tipo: 'success'
          }
          this.get(this.$route.query.id)
        }) .catch( () => {
          this.alerta = {
            show: true,
            mensagem: 'Ocorreu um erro',
            tipo: 'danger'
          }
        })
      } else {
        const formData = new FormData()
        formData.append('titulo', this.form.titulo)
        formData.append('descricao', this.form.descricao)
        formData.append('peso', this.form.peso)
        formData.append('estoque', this.form.estoque)
        formData.append('categoria', this.form.categoria)
        formData.append('destaque', this.form.destaque)
        formData.append('preco', this.transformaPreco(this.form.preco))
        formData.append('imagens', this.imagem1)
        formData.append('imagens', this.imagem2)
        formData.append('imagens', this.imagem3)
        formData.append('imagens', this.imagem4)
        produto.cadastra(formData)
        .then( () => {
          this.alerta = {
            show: true,
            mensagem: 'Produto cadastrado com sucesso',
            tipo: 'success'
          }
        }) .catch( () => {
          this.alerta = {
            show: true,
            mensagem: 'Ocorreu um erro',
            tipo: 'danger'
          }
        })
      }
    }
  }
}
</script>