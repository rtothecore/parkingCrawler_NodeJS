import Api from '@/services/Api'

export default {
  fetchAvgParkingTime (params) {
    return Api().get('getAvgParkingTime/' + params.parkingId + '/' + params.startDate + '/' + params.endDate, params)
  },

  fetchParkingUsageCount (params) {
    return Api().get('getParkingUsageCount/' + params.parkingId + '/' + params.startDate + '/' + params.endDate, params)
  },

  fetchParkingOpTime (params) {
    return Api().get('getParkingOpTime/' + params.parkingId + '/' + params.startDate + '/' + params.endDate, params)
  },

  fetchParkingMaxUsageTime (params) {
    return Api().get('getParkingMaxUsageTimeData/' + params.parkingId + '/' + params.startDate + '/' + params.endDate, params)
  },

  fetchParkingMaxUsageDOW (params) {
    return Api().get('getParkingMaxUsageDOWData/' + params.parkingId + '/' + params.startDate + '/' + params.endDate, params)
  },

  fetchParkingHeader (params) {
    return Api().get('getHeaderData/' + params.parkingId, params)
  },

  fetchJejuUnivParkingIn (params) {
    return Api().get('getJejuUnivIn/' + params.parkingId + '/' + params.startDate + '/' + params.endDate, params)
  },

  fetchJejuUnivParkingOut (params) {
    return Api().get('getJejuUnivOut/' + params.parkingId + '/' + params.startDate + '/' + params.endDate, params)
  },

  fetchBucheonParkingIn (params) {
    return Api().get('getBucheonIn/' + params.parkingId + '/' + params.startDate + '/' + params.endDate, params)
  },

  fetchBucheonParkingOut (params) {
    return Api().get('getBucheonOut/' + params.parkingId + '/' + params.startDate + '/' + params.endDate, params)
  }
}
