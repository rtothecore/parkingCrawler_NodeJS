import Api from '@/services/Api'

export default {
  fetchSensorData (params) {
    return Api().get('ssData/lastOne', params)
  },

  fetchSensorDataAgg (params) {
    return Api().get('ssData/getAggData/' + params.startDate + '/' + params.endDate, params)
  },

  fetchAllDataOfSensorDataAgg (params) {
    return Api().get('ssData/getAllDataOfAggData/' + params.startDate + '/' + params.endDate, params)
  }
}
