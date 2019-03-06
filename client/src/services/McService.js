import Api from '@/services/Api'

export default {
  fetchMcs (params) {
    return Api().get('mc', params)
  },

  fetchMcsByBCode (params) {
    return Api().get('mc/' + params.bCode, params)
  },

  fetchMcsByBcodeMcode (params) {
    return Api().get('mc/' + params.bCode + '/' + params.mCode, params)
  },

  // NEW
  fetchTextByMCode (params) {
    return Api().get('mcByMcode/' + params.mCode, params)
  },

  fetchBcsByMcode (params) {
    return Api().get('bcByMcode/' + params.mCode, params)
  }
}
