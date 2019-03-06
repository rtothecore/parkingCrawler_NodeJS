import Api from '@/services/Api'

export default {
  fetchScs (params) {
    return Api().get('sc', params)
  },

  fetchScsByBCodeMCode (params) {
    return Api().get('sc/' + params.bCode + '/' + params.mCode, params)
  },

  fetchCropCode (params) {
    return Api().get('sc/' + params.text, params)
  },

  fetchCropNameByCropCode (params) {
    return Api().get('sc/getCN/' + params.cropCode, params)
  },

  // NEW
  fetchSByM (params) {
    return Api().get('scByMcode/' + params.mCode, params)
  },

  fetchMcsByScode (params) {
    return Api().get('mcByScode/' + params.sCode, params)
  },

  fetchTextBySCode (params) {
    return Api().get('scByScode/' + params.sCode, params)
  }
}
