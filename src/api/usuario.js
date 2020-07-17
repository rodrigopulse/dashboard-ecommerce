import axios from 'axios'

export default class Usuario{
  login(data) {
    return new Promise( (resolve, reject) => {
      axios({
        url: `${process.env.VUE_APP_BASE_API}/usuario/login`,
        data: data,
        method: "POST"
      })
      .then( res => resolve(res))
      .catch((res) => reject(res));
    })
  }
}