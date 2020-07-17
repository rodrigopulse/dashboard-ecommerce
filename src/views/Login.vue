<template>
  <div class="login">
    <Alerta :mensagem="alertaMensagem" :tipo="alertaTipo" :estado="alerta" />
    <div class="login__conteudo">
      <div class="row mb-3">
        <div class="col-12">
          <h1 class="text-center">Login</h1>
        </div>
      </div>
      <b-form @submit.prevent="onSubmit">
        <b-form-group>
          <b-form-input
            id="email"
            size="lg"
            v-model="form.email"
            type="email"
            required
            placeholder="e-mail"
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input
            id="senha"
            size="lg"
            v-model="form.senha"
            type="password"
            required
            placeholder="senha"
          ></b-form-input>
        </b-form-group>
        <b-button block type="submit" variant="primary" size="lg">Submit</b-button>
      </b-form>
    </div>
  </div>
</template>
<script>
import Usuario from '../api/usuario'
//components
import Alerta from '../components/Alerta'

const usuario = new Usuario()

export default {
  data() {
    return {
      form: {
        email: '',
        senha: ''
      },
      alerta: false,
      alertaMensagem: '',
      alertaTipo: ''
    }
  },
  components: {
    Alerta
  },
  created () {
    document.title = "E-commerce - Login";
  },
  methods: {
    onSubmit() {
      usuario.login({ email: this.form.email, senha: this.form.senha })
      .then( (res) => {
        console.log(res)
        window.localStorage.setItem("token", res.data.token);
        window.localStorage.setItem("id", res.data._id);
        window.localStorage.setItem("email", res.data.email);
        this.$router.push("/");
      })
      .catch( (err) => {
        if(err.response.status == 401) {
          this.alerta = true
          this.alertaMensagem = 'Usuário e/ou senha incorretos'
          this.alertaTipo = 'danger'
        } else {
          this.alerta = true
          this.alertaMensagem = 'Ocorreu um erro desconhecido'
          this.alertaTipo = 'danger'
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  &__conteudo {
    width: 100%;
    max-width: 520px;
    background: #fff;
    border-radius: 14px;
    padding: 30px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  }
}
</style>