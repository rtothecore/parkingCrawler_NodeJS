import Api from '@/services/Api'

export default {
  fetchUser (id) {
    return Api().get('user/' + id)
  },

  updateUserBirthDateSex (params) {
    return Api().put('userBirthDateSex/' + params.id, params)
  },

  updateUserPhoneNo (params) {
    return Api().put('userPhoneNo/' + params.id, params)
  },

  updateUserShareFlag (params) {
    return Api().put('userShareFlag/' + params.id, params)
  },

  fetchUserByEmail (params) {
    return Api().get('user/byEmail/' + params.email, params)
  },

  createNewUser (params) {
    return Api().post('addNewUser', params)
  },

  login (params) {
    return Api().put('login', params)
  },

  findPassword (params) {
    return Api().get('findPassword/' + params.id, params)
  },

  checkPasswordExpired (params) {
    return Api().get('checkPasswordExpired/' + params.id, params)
  },

  updateUserPassword (params) {
    return Api().put('updateUserPassword', params)
  },

  leaveUser (params) {
    return Api().put('leaveUser/' + params.userId, params)
  }
}
