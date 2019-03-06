import Api from '@/services/Api'

export default {
  createNewSMSAuthCode (params) {
    return Api().post('addNewSMSAuth', params)
  },

  getAuthCode (params) {
    return Api().get('getAuthCode/' + params.phone_no)
  },

  deleteAuthcode (params) {
    return Api().delete('deleteSMSAuth/' + params.phone_no)
  }
  /*
  fetchUser (id) {
    return Api().get('user/' + id)
  },

  createNewUser (params) {
    return Api().post('user', params)
  },

  updateUserAgeSex (params) {
    return Api().put('userAgeSex/' + params.id, params)
  },

  updateUserPassword (params) {
    return Api().put('userPassword/' + params.id, params)
  },

  fetchUserByEmail (params) {
    return Api().get('user/byEmail/' + params.email, params)
  },

  fetchUserByIdNPw (params) {
    return Api().get('user/' + params.id + '/' + params.pw, params)
  }
  */
}
