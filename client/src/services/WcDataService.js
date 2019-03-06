import Api from '@/services/Api'

export default {
  fetchWcDataAgg (params) {
    return Api().get('wcData/getAggData/' + params.startDate + '/' + params.endDate, params)
  },

  fetchAllDataOfWcDataAgg (params) {
    return Api().get('wcData/getAllDataOfAggData/' + params.startDate + '/' + params.endDate, params)
  },

  fetchWeatherAggDataByAddr (params) {
    return Api().get('wcData/getWeatherAggDataByAddr/' + params.startDate + '/' + params.endDate + '/' + params.address, params)
  }
}
