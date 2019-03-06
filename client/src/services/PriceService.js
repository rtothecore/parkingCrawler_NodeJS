import Api from '@/services/Api'

export default {
  fetchPriceData (params) {
    return Api().get('getProductPrice/' + params.productName, params)
  }
}
