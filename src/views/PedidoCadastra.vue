<template>
  <div class="container">
    <Alerta :mensagem="alerta.mensagem" :tipo="alerta.tipo" :estado="alerta.show" />
    <div class="row">
      <div class="col-12">
        <h1>Pedido {{codigoPedido}}</h1>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-12">
        <h4>Produtos Comprados</h4>
      </div>
    </div>
    <div class="row">
      <b-table striped hover :items="produtos" :fields="fields">
        <template v-slot:cell(titulo)="data">
          <a :href="`/produto/cadastra?id=${data.item._id}`">{{ data.value }}</a>
        </template>
      </b-table>
    </div>
    <div class="row">
      <div class="col-6">

        <b-form-group label="Status:" id="categoria">
          <b-form-select required v-model="status.selecionado" :options="status.opcoes" value-field="status" text-field="status"></b-form-select>
        </b-form-group>

      </div>
    </div>
    <div class="row mt-4 mb-4">
      <div class="col-4">
        <p>Valor do Pedido: <strong>{{ valorPedido }}</strong></p>
      </div>
      <div class="col-4">
        <p>Valor do Frete: <strong>{{ valorFrete }}</strong></p>
      </div>
      <div class="col-4">
        <p>Total: <strong>{{valorTotal}}</strong></p>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-12">
        <h4>Dados do Usuário</h4>
        <p>
          <strong>Id:</strong> {{usuario._id}} <br />
          <strong>Nome:</strong> {{usuario.nome}} <br />
          <strong>E-mail:</strong> {{usuario.email}} <br />
        </p>
        <h4>Endereço:</h4>
        <p>
          <strong>Logradouro:</strong> {{endereco.logradouro}} <br/>
          <strong>Número:</strong> {{endereco.numero}} <br/>
          <strong>Bairro:</strong> {{endereco.bairro}} <br/>
          <strong>Cidade:</strong> {{endereco.cidade}} <br/>
          <strong>Estado:</strong> {{endereco.estado}} <br/>
          <strong>Cep:</strong> {{endereco.cep}} <br/>
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <b-button size="lg" type="button" @click="atualiza" variant="primary">Salvar</b-button>
      </div>
    </div>
  </div>
</template>
<script>
import Pedido from '../api/pedido'
import Alerta from '../components/Alerta'

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
      usuario: [],
      endereco: [],
      produtos: [],
      valorPedido: '',
      valorFrete: '',
      valorTotal: '',
      codigoPedido: '',
      status: {
        opcoes: [{ status: 'Separação' }, { status: 'Enviado' }, { status: 'Entregue' }, { status: 'Cancelado' }],
        selecionado: ''
      },
      alerta: {
        show: false,
        mensagem: '',
        tipo: ''
      },
      fields: [
        { key: 'titulo', label: 'Produto' },
        { key: 'quantidade', label: 'Quantidade' },
        { key: 'valorUnitario', label: 'Valor Unitário' }
      ],
    }
  },
  components: {
    Alerta
  },
  created() {
    document.title = "E-commerce - Edição de Pedido";
    this.getPedido(this.$route.query.id)
  },
  methods: {
    getPedido(id) {
      pedido.getPedido(id)
      .then( (res) => {
        this.valorPedido = formataPrecoBrasil.format(res.data.valor.toString())
        this.valorFrete = formataPrecoBrasil.format(res.data.frete.toString())
        const valorTotalSoma = res.data.valor + res.data.frete
        this.valorTotal = formataPrecoBrasil.format(valorTotalSoma.toString())
        this.status.selecionado = res.data.status
        this.usuario = res.data.usuario
        this.endereco = res.data.usuario.endereco
        this.codigoPedido = res.data.codigoPedido
        res.data.produtos.forEach((valor) => {
          let valorProduto = formataPrecoBrasil.format(valor.produto.preco.toString())
          this.produtos.push({
            'titulo': valor.produto.titulo,
            '_id': valor.produto._id,
            'valorUnitario': valorProduto,
            'quantidade': valor.quantidade
          })
        });

      })
    },
    atualiza() {
      const data = {
        status: this.status.selecionado
      }
      pedido.atualiza(data, this.$route.query.id)
      .then( () => {
        this.alerta = {
          show: true,
          mensagem: 'Pedido atualizado com sucesso',
          tipo: 'success'
        }
      })
      .catch( () => {
        this.alerta = {
          show: true,
          mensagem: 'Pedido não atualizado',
          tipo: 'danger'
        }
      })
    }
  }
}
</script>