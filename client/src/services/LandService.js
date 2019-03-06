import Api from '@/services/Api'

export default {
  fetchNameByLandId (params) {
    return Api().get('lands/getName/' + params.landId, params)
  },

  fetchCropCodeByLandId (params) {
    return Api().get('lands/getCC/' + params.landId, params)
  },

  fetchLands (params) {
    return Api().get('lands/' + params.userId, params)
  },

  createNewLand (params) {
    return Api().post('lands', params)
  },

  updateLand (params) {
    return Api().put('lands/' + params.id, params)
  },

  deleteLand (id) {
    return Api().delete('lands/' + id)
  },

  // NEW
  fetchCropNameByLandId (params) {
    return Api().get('lands/getCropName/' + params.landId, params)
  }
}
