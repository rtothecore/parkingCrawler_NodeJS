import Api from '@/services/Api'

export default {
  fetchWeatherData (params) {
    return Api().get('ForecastGrib/' + params.baseDate + '/' + params.baseTime + '/' + params.nx + '/' + params.ny, params)
  },
  fetchTodayWeather (params) {
    return Api().get('ForecastGrib/' + params.nx + '/' + params.ny, params)
  },
  fetchWeatherForecast (params) {
    return Api().get('ForecastSpaceData/' + params.nx + '/' + params.ny, params)
  },
  fetchAirData (params) {
    return Api().get('Airdata/' + params.tmX + '/' + params.tmY, params)
  }
}
