import Api from '@/services/Api'

export default {
  checkDuplicateUser (params) {
    return Api().get('joinUser/' + params.id)
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
