import axios from 'axios'

export default class Categoria{
  cadastra(data) {
    return new Promise( (resolve, reject) => {
      axios({
        url: `${process.env.VUE_APP_BASE_API}/categoria/cadastra`,
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
  atualiza(data, id) {
    return new Promise( (resolve, reject) => {
      axios({
        url: `${process.env.VUE_APP_BASE_API}/categoria/atualiza/${id}`,
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
        url: `${process.env.VUE_APP_BASE_API}/categoria/${id}`,
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
  getCategorias() {
    return new Promise( (resolve, reject) => {
      axios({
        url: `${process.env.VUE_APP_BASE_API}/categoria`,
        method: "GET"
      })
      .then( res => resolve(res))
      .catch((res) => reject(res));
    })
  }
  getCategoria(id) {
    return new Promise( (resolve, reject) => {
      axios({
        url: `${process.env.VUE_APP_BASE_API}/categoria/${id}`,
        method: "GET"
      })
      .then( res => resolve(res))
      .catch((res) => reject(res));
    })
  }
}