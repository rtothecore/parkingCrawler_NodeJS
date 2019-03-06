import Api from '@/services/Api'

export default {
  fetchItemsByWcode (params) {
    return Api().get('itemsByWcode/' + params.userId + '/' + params.wCode, params)
  },

  createItem (params) {
    return Api().post('item', params)
  },

  fetchItems (params) {
    return Api().get('items/' + params.userId, params)
  },

  fetchItem (params) {
    return Api().get('item/' + params.id, params)
  },

  fetchItemAggByDate (params) {
    return Api().get('item/agg/' + params.userId + '/' + params.startDate + '/' + params.endDate, params)
  },

  fetchItemAggByDateNLandId (params) {
    return Api().get('item/aggByDateNLandId/' + params.userId + '/' + params.startDate + '/' + params.endDate + '/' + params.landId, params)
  },

  fetchItemAggByYMNLandId (params) {
    return Api().get('item/aggByYMNLandId/' + params.userId + '/' + params.ym + '/' + params.landId, params)
  },

  updateItem (params) {
    return Api().put('item/' + params.id, params)
  },

  deleteItem (id) {
    return Api().delete('item/' + id)
  },

  fetchItemsBy3 (params) {
    return Api().get('items/searchBy3/' + params.startDate + '/' + params.endDate + '/' + params.item, params)
  },

  fetchItemsBy4 (params) {
    return Api().get('items/searchBy4/' + params.startDate + '/' + params.endDate + '/' + params.item + '/' + params.landId, params)
  },

  fetchItemsAggBy5 (params) {
    return Api().get('item/agg/searchBy5/' + params.userId + '/' + params.startDate + '/' + params.endDate + '/' + params.itemName + '/' + params.landId, params)
  },

  fetchItemsByDateNUserId (params) {
    return Api().get('items/' + params.startDate + '/' + params.endDate + '/' + params.userId, params)
  },

  fetchJournalsByYMNUserIdAndDetail (params) {
    return Api().get('itemsByYMNUserIdAndDetail/' + params.startDate + '/' + params.endDate + '/' + params.userId, params)
  },

  fetchItemsByDateNUserIdNLandId (params) {
    return Api().get('items/searchBy4_2/' + params.startDate + '/' + params.endDate + '/' + params.userId + '/' + params.landId, params)
  },

  fetchItemsByYMUserId (params) {
    return Api().get('items/searchByYMUserId/' + params.ym + '/' + params.userId, params)
  },

  fetchItemsByYMUserIdLandId (params) {
    return Api().get('items/searchByYMUserIdLandId/' + params.ym + '/' + params.userId + '/' + params.landId, params)
  },

  fetchItemExp (params) {
    return Api().get('itemsGetAggData/' + params.userId + '/' + params.startDate + '/' + params.endDate, params)
  },

  fetchItemByUserLandItemName (params) {
    return Api().get('items/getByUserLandItemName/' + params.userId + '/' + params.landId + '/' + params.item + '/' + params.itemName, params)
  },

  updateItemUsageByJournalUsage (parmas) {
    return Api().put('itemUpdateUsage', parmas)
  },

  fetchItemSearchBy5 (params) {
    return Api().get('items/searchBy5/' + params.startDate + '/' + params.endDate + '/' + params.userId + '/' + params.landId + '/' + params.itemName, params)
  },

  fetchItemLookupBy5 (params) {
    return Api().get('items/lookupBy5/' + params.startDate + '/' + params.endDate + '/' + params.userId + '/' + params.landId + '/' + params.itemName, params)
  },

  fetchItemsLookupByUserId (params) {
    return Api().get('itemsLookupByUserId/' + params.userId, params)
  },

  fetchItemLookupBy4 (params) {
    return Api().get('items/lookupBy4/' + params.startDate + '/' + params.endDate + '/' + params.userId + '/' + params.landId, params)
  },

  fetchItemLookupByYMUserIdLandId (params) {
    return Api().get('itmesLookupByYMUserIdLandId/' + params.userId + '/' + params.ym + '/' + params.landId, params)
  }
}
