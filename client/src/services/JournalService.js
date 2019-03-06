import Api from '@/services/Api'

export default {
  updateJournal (params) {
    return Api().put('journals/' + params.id, params)
  },

  deleteJournal (id) {
    return Api().delete('journals/' + id)
  },

  deleteJournalByItemId (itemId) {
    return Api().delete('journalsByItemId/' + itemId)
  },

  fetchJournalsWorktime (params) {
    return Api().get('journals/searchWorktime/' + params.userId + '/' + params.startDate + '/' + params.endDate + '/' + params.landId, params)
  },

  fetchJournalsBy3 (params) {
    return Api().get('journals/searchBy3/' + params.startDate + '/' + params.endDate + '/' + params.searchWord, params)
  },

  fetchJournalsBy5LandId (params) {
    return Api().get('journals/searchBy5LandId/' + params.userId + '/' + params.startDate + '/' + params.endDate + '/' + params.searchWord + '/' + params.landId, params)
  },

  fetchJournalsBy4 (params) {
    return Api().get('journals/searchBy4/' + params.startDate + '/' + params.endDate + '/' + params.workType + '/' + params.workContent, params)
  },

  fetchJournalsByYM (params) {
    return Api().get('journals/searchByYM/' + params.ym, params)
  },

  fetchJournalsByYMUserId (params) {
    return Api().get('journals/searchByYMUserId/' + params.ym + '/' + params.userId, params)
  },

  fetchJournalsByYMUserIdLandId (params) {
    return Api().get('journals/searchByYMUserIdLandId/' + params.ym + '/' + params.userId + '/' + params.landId, params)
  },

  fetchJournalsByDate (params) {
    return Api().get('journals/' + params.startDate + '/' + params.endDate, params)
  },

  fetchJournalsByDateNUserId (params) {
    return Api().get('journals/' + params.startDate + '/' + params.endDate + '/' + params.userId, params)
  },

  fetchJournalsByYMNUserId (params) {
    return Api().get('journalsByYMNUserId/' + params.startDate + '/' + params.endDate + '/' + params.userId, params)
  },

  fetchJournalsByYMNUserIdAndCoo (params) {
    return Api().get('journalsByYMNUserIdAndCoo/' + params.startDate + '/' + params.endDate + '/' + params.userId, params)
  },

  fetchJournalsByDateNUserIdNLandId (params) {
    return Api().get('journals/searchBy4_2/' + params.startDate + '/' + params.endDate + '/' + params.userId + '/' + params.landId, params)
  },

  fetchJournals (params) {
    return Api().get('journals/' + params.userId, params)
  },

  fetchJournal (params) {
    return Api().get('journal/' + params.id, params)
  },

  createJournals (params) {
    return Api().post('journals', params)
  },

  // NEW
  createJournal (params) {
    return Api().post('journal', params)
  },

  fetchJournalInc (params) {
    return Api().get('journalsGetAggData/' + params.userId + '/' + params.startDate + '/' + params.endDate, params)
  },

  fetchJournalCOOSum (params) {
    return Api().get('journalsGetCOOAggData/' + params.userId + '/' + params.startDate + '/' + params.endDate, params)
  },

  fetchJournalLookup (params) {
    return Api().get('journalsLookup/' + params.startDate + '/' + params.endDate + '/' + params.userId, params)
  },

  fetchJournalLookupBy4 (params) {
    return Api().get('journalsLookupBy4/' + params.startDate + '/' + params.endDate + '/' + params.userId + '/' + params.landId, params)
  },

  fetchJournalLookupByUserId (params) {
    return Api().get('journalsLookupByUserId/' + params.userId, params)
  },

  fetchJournalLookupByYMUserId (params) {
    return Api().get('journalsLookupByYMUserId/' + params.ym + '/' + params.userId, params)
  },

  fetchJournalLookupByYMUserIdLandId (params) {
    return Api().get('journalsLookupByYMUserIdLandId/' + params.ym + '/' + params.userId + '/' + params.landId, params)
  }
}
