import Vue from 'vue'
import VueRouter from 'vue-router'

// Views
import Login from '../views/Login'
import Content from '../views/Content'
import Home from '../views/Home'
//Produtos
import ProdutoCadastra from '../views/ProdutoCadastra'
import ProdutoGestao from '../views/ProdutoGestao'
//Categorias
import CategoriaCadastra from '../views/CategoriaCadastra'
import CategoriaGestao from '../views/CategoriaGestao'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Content',
    component: Content,
    children: [
      {
        path: "/",
        name: "Home",
        components: {
          default: Content,
          content: Home
        },
        meta: {
          precisaAutenticacao: true,
        }
      },
      {
        path: "/produto/cadastra",
        name: "Cadastro de Produo",
        components: {
          default: Content,
          content: ProdutoCadastra
        },
        meta: {
          precisaAutenticacao: true,
        }
      },
      {
        path: "/produto/gestao",
        name: "Gestão de Produo",
        components: {
          default: Content,
          content: ProdutoGestao
        },
        meta: {
          precisaAutenticacao: true,
        }
      },
      {
        path: "/categoria/cadastra",
        name: "Cadastro de Categoria",
        components: {
          default: Content,
          content: CategoriaCadastra
        },
        meta: {
          precisaAutenticacao: true,
        }
      },
      {
        path: "/categoria/gestao",
        name: "Gestão de Categoria",
        components: {
          default: Content,
          content: CategoriaGestao
        },
        meta: {
          precisaAutenticacao: true,
        }
      }
    ],
},
  {
    path: "/login",
    name: "Login",
    component: Login
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.precisaAutenticacao) {
    const token = window.localStorage.getItem("token")
    if(token != null) {
      next()
    } else {
      return next("/login")
    }
  } else {
    return next()
  }
})

export default router;