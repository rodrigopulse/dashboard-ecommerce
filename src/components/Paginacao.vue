<template>
  <div class="container text-right">
    <ul class="paginacao">
      <li class="paginacao__lista" v-for="(pagina, index) in totalPaginas" :key=index>
        <button
          :class="paginaAtiva === index + 1 ? ' paginacao__botao paginacao__botao--ativa' : 'paginacao__botao'"
          @click="selecionaPagina(index + 1)"
        >
          {{index + 1}}
        </button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      paginaAtiva: 1
    }
  },
  props: ['totalPaginas'],
  methods: {
    selecionaPagina(pagina) {
      this.paginaAtiva = pagina
      this.$emit('pagina', pagina)
    }
  }
}
</script>
<style lang="scss" scoped>
.paginacao {
  padding: 0;
  margin: 0;
  &__lista {
    display: inline;
  }
  &__botao {
    background: none;
    border: 0;
    cursor: pointer;
    background: #333;
    margin-right: 3px;
    color: #fff;
    &:active, &:focus {
      outline: none;
    }
    &--ativa {
      background: #007bff;
    }
  }
}
</style>