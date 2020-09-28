import axios from 'axios'

export default class Embalagem {

  getEmbalagens() {
    return new Promise( (resolve, reject) => {
      axios({
        url: `${process.env.VUE_APP_BASE_API}/embalagem`,
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