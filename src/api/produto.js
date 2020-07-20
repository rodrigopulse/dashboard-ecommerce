import axios from 'axios'

export default class Produto{
  cadastra(data) {
    return new Promise( (resolve, reject) => {
      axios({
        url: `${process.env.VUE_APP_BASE_API}/produto`,
        headers: {
          'x-access-token': localStorage.getItem('token'),
          'id-usuario': localStorage.getItem('id')
        },
        data: data,
        method: "POST"
      })
      .then( res => resolve(res))
      .catch((res) => reject(res));
    })
  }
  atualiza(data) {
    return new Promise( (resolve, reject) => {
      axios({
        url: `${process.env.VUE_APP_BASE_API}/produto`,
        headers: {
          'x-access-token': localStorage.getItem('token'),
          'id-usuario': localStorage.getItem('id')
        },
        data: data,
        method: "PUT"
      })
      .then( res => resolve(res))
      .catch((res) => reject(res));
    })
  }
  deleta(id) {
    return new Promise( (resolve, reject) => {
      axios({
        url: `${process.env.VUE_APP_BASE_API}/produto/${id}`,
        headers: {
          'x-access-token': localStorage.getItem('token'),
          'id-usuario': localStorage.getItem('id')
        },
        method: "DELETE"
      })
      .then( res => resolve(res))
      .catch((res) => reject(res));
    })
  }
  getProduto(id) {
    return new Promise( (resolve, reject) => {
      axios({
        url: `${process.env.VUE_APP_BASE_API}/produto/${id}`,
        method: "GET"
      })
      .then( res => resolve(res))
      .catch((res) => reject(res));
    })
  }
  getProdutos() {
    return new Promise( (resolve, reject) => {
      axios({
        url: `${process.env.VUE_APP_BASE_API}/produto`,
        method: "GET"
      })
      .then( res => resolve(res))
      .catch((res) => reject(res));
    })
  }
}