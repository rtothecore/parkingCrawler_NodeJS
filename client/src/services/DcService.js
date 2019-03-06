import Api from '@/services/Api'

export default {
  /*
  fetchScs (params) {
    return Api().get('sc', params)
  },

  fetchScsByBCodeMCode (params) {
    return Api().get('sc/' + params.bCode + '/' + params.mCode, params)
  },

  fetchCropCode (params) {
    return Api().get('sc/' + params.text, params)
  },
  */
  fetchCropNameByCropCode (params) {
    return Api().get('dc/getCN/' + params.cropCode, params)
  },

  fetchDcsByScode (params) {
    return Api().get('dcByScode/' + params.sCode, params)
  },

  fetchScsByDcode (params) {
    return Api().get('scByDcode/' + params.dCode, params)
  }
}
