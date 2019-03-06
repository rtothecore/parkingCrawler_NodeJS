import Api from '@/services/Api'

export default {
  fetchBcs (params) {
    return Api().get('bc', params)
  },

  fetchTextByBCode (params) {
    return Api().get('bc/' + params.bCode, params)
  }
}
