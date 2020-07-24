import axios from 'axios'

export default class Pedido{
  getPedidos() {
    return new Promise( (resolve, reject) => {
      axios({
        url: `${process.env.VUE_APP_BASE_API}/pedido`,
        headers: {
          'x-access-token': localStorage.getItem('token'),
          'id-usuario': localStorage.getItem('id')
        },
        method: "GET"
      })
      .then( res => resolve(res))
      .catch((res) => reject(res));
    })
  }
  getPedido(id) {
    return new Promise( (resolve, reject) => {
      axios({
        url: `${process.env.VUE_APP_BASE_API}/pedido/${id}`,
        headers: {
          'x-access-token': localStorage.getItem('token'),
          'id-usuario': localStorage.getItem('id')
        },
        method: "GET"
      })
      .then( res => resolve(res))
      .catch((res) => reject(res));
    })
  }
}