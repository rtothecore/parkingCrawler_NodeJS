import Api from '@/services/Api'

export default {
  createItemDetail (params) {
    return Api().post('itemDetail', params)
  },

  fetchItemDetailByItemId (params) {
    return Api().get('itemDetailByItemId/' + params.userId + '/' + params.itemId, params)
  },

  updateItemUsageByItemId (params) {
    return Api().put('itemDetailUpdateItemUsage', params)
  },

  updateJournalUsageByItemId (params) {
    return Api().put('itemDetailUpdateJournalUsage', params)
  },

  updateItemDetailWithParentId (params) {
    return Api().put('updateItemDetailWithParentId/' + params.itemId + '/' + params.parentId, params)
  },

  deleteJournalUsageByItemId (params) {
    return Api().put('itemDetailDeleteJournalUsage', params)
  },

  deleteItemDetailByItemId (itemId) {
    return Api().delete('deleteItemDetailByItemId/' + itemId)
  }
}
