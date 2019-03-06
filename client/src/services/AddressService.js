import Api from '@/services/Api'

export default {
  fetchAddressData (params) {
    return Api().get('getAddress/' + params.searchText, params)
  }
}
