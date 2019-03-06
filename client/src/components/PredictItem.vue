<template>
    <div style="width:1200px; margin:0 auto;">
      <!-- dummy --> <div style="height:20px"/>
        <b-row>
          <b-col md="12">
            <b-card header="자재구입일정 예측" header-tag="header">
              <h3 slot="header" class="mb-0"><strong>자재구입일정 예측</strong></h3>
              <b-row>
                <b-col sm="12" lg="6">
                  <div style="width:1150px; margin:0 auto;">
      
    <v-layout row wrap pl-4>
      <!--
      <v-flex xs12 class="text-xs-center" mt-5>      
        <h1>자재구입 일정</h1>        
      </v-flex>      
      -->

      <v-flex xs6 sm6 md2>
        <v-menu
          :close-on-content-click="false"
          v-model="menu1"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="computedDateFormatted"
            :error-messages="errors.collect('sDate')"
            label="기준날짜"
            persistent-hint
            prepend-icon="event"
            readonly
            required=""
            v-validate="'required'"
            data-vv-name="sDate"
          ></v-text-field>
          <v-date-picker v-model="sDate" no-title @input="menu1 = false" v-on:change="onChangeDate" locale='euc-kr'></v-date-picker>
        </v-menu>
      </v-flex>     

       <v-flex md1/>  
      
      <v-flex xs6 sm6 md2>
        <v-select
          :items="landItems"
          v-model="selectLand"
          :error-messages="errors.collect('selectLand')"
          label="농장명"
          class="input-group--focused"
          item-text="name"
          item-value="_id"
          v-on:change="onChangeLand"
          required=""
          v-validate="'required'"
          data-vv-name="selectLand"
        ></v-select>
      </v-flex>

       <v-flex md5/>

      <v-flex xs8 sm8 md1 class="text-xs-left">
        <v-btn
          outline
          color="indigo"
          class="white--text"
          @click.native="searchReset"
        >
          초기화
        </v-btn>
      </v-flex>

      <v-flex xs8 sm8 md1 class="text-xs-left">
        <v-btn          
          color="primary"
          class="white--text"
          @click.native="searchItems"
        >
          검색
        </v-btn>        
      </v-flex>

      </v-layout>
      
      <v-layout row wrap pl-4>
      
        <v-flex xs12 sm12 md12>      
        <div>
        <v-data-table
          :headers="headers"
          :items="items"
          :search="search"
          :pagination.sync="pagination"
          hide-actions
          class="elevation-1"
        >
          <template slot="headerCell" slot-scope="props">
            <v-tooltip bottom>
              <span slot="activator">
                <h4><strong>{{ props.header.text }}</strong></h4>
              </span>
              <span>
                {{ props.header.text }}
              </span>
            </v-tooltip>
          </template>
          <template slot="items" slot-scope="props">
            <td :style="{backgroundColor: (props.index % 2 ? '#F6F7FE' : 'transparent')}"><h4>{{ getDateWithKorean(props.item.date) }}</h4></td>
            <td :style="{backgroundColor: (props.index % 2 ? '#F6F7FE' : 'transparent')}"><h4>{{ props.item.landName }}</h4></td>
            <td :style="{backgroundColor: (props.index % 2 ? '#F6F7FE' : 'transparent')}"><h4>{{ props.item.item }}</h4></td>
            <td :style="{backgroundColor: (props.index % 2 ? '#F6F7FE' : 'transparent')}"><h4>{{ props.item.itemName }}</h4></td>
            <td :style="{backgroundColor: (props.index % 2 ? '#F6F7FE' : 'transparent')}"><h4>{{ props.item.itemAmount }}</h4></td>
            <td :style="{backgroundColor: (props.index % 2 ? '#F6F7FE' : 'transparent')}"><h4>{{ props.item.itemUsage }}</h4></td>
            <td :style="{backgroundColor: (props.index % 2 ? '#F6F7FE' : 'transparent')}"><h4>{{ props.item.itemStock }}</h4></td>
            <td :style="{backgroundColor: (props.index % 2 ? '#F6F7FE' : 'transparent')}"><h4>{{ getStrWithComma(props.item.itemPrice) }}</h4></td>
            <td :style="{backgroundColor: (props.index % 2 ? '#F6F7FE' : 'transparent')}" class="justify-center layout px-0">
              <v-btn icon class="mx-0" @click="showItem(props.item)">
                <v-icon color="teal">remove_red_eye</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
        </div>
        </div>
        </v-flex>
        <predictItemModalForShow></predictItemModalForShow>
       </v-layout>        
            
                  </div>
                </b-col>              
              </b-row>              
            </b-card>
          </b-col>
        </b-row>
      </div>
</template>

<script>
import {bus} from '../main'
import moment from 'moment'
// import JournalService from '@/services/JournalService'
import ItemService from '@/services/ItemService'
// import WcService from '@/services/WcService'
import LandService from '@/services/LandService'
export default {
  $_veeValidate: {
    validator: 'new'
  },
  data () {
    return {
      selectLand: '',
      landItems: [],
      // Predict_page: moment().format('YYYY년 MM월 DD일'),
      startDate2: null,
      sDate: null,
      menu1: false,
      userId: '',
      lastYearYM: '',
      date: moment().format('YYYY-MM-DD'),
      startDate: '',
      endDate: '',
      search: '',
      pagination: {
        // https://github.com/vuetifyjs/vuetify/issues/442
        sortBy: 'date',
        descending: true,
        rowsPerPage: 10
      },
      selected: [],
      headers: [
        {
          text: '날짜',
          align: 'left',
          sortable: false,
          value: 'date'
        },
        { text: '농장명', sortable: false, value: 'landName' },
        { text: '구입품목', sortable: false, value: 'item' },
        { text: '품목명', sortable: false, value: 'itemName' },
        { text: '구입량', sortable: false, value: 'itemAmount' },
        { text: '사용량', sortable: false, value: 'itemUsage' },
        { text: '재고량', sortable: false, value: 'itemStock' },
        { text: '구입가격', sortable: false, value: 'itemPrice' },
        { text: '관리', value: 'name', sortable: false, align: 'left', width: '5%' }
      ],
      items: [],
      dictionary: {
        custom: {
          sDate: {
            required: '검색 기준날짜를 입력해주세요'
          },
          selectLand: {
            required: '농장명을 선택해주세요'
          }
        }
      }
    }
  },
  mounted () {
    this.$validator.localize('ko', this.dictionary)
  },
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push('/login')
    } else {
    }
  },
  created: function () {
    this.userId = this.$session.get('userId')
    var today = moment().format('YYYY-MM-DD')
    this.sDate = today
    this.onChangeDate(today)
    this.getLands()
    this.getItemsByDate()
    this.selectLand = '0'
  },
  methods: {
    async getLands () {
      const response = await LandService.fetchLands({
        userId: this.userId
      })
      this.landItems = response.data.lands

      var landItemForAll = {}
      landItemForAll._id = '0'
      landItemForAll.name = '전체'
      this.landItems.push(landItemForAll)
    },
    async getItemsByDate () {
      if (!this.startDate) {
        this.startDate = 0
      }
      if (!this.endDate) {
        this.endDate = 0
      }
      if (!this.selectLand) {
        this.selectLand = 0
      }

      const response = await ItemService.fetchItemLookupBy4({
        userId: this.userId,
        startDate: this.startDate,
        endDate: this.endDate,
        landId: this.selectLand
      })

      if (response.data.length > 0) {
        var tmpItems = []
        for (var k = 0; k < response.data.length; k++) {
          tmpItems.push(response.data[k])
          tmpItems[k].landName = response.data[k].landInfo.name
          tmpItems[k].item = response.data[k].wcsInfo.text
          tmpItems[k].itemName = response.data[k].itemDetailInfo.itemName
          tmpItems[k].itemAmount = response.data[k].itemDetailInfo.itemAmount
          tmpItems[k].itemUsage = response.data[k].itemDetailInfo.journalUsage + response.data[k].itemDetailInfo.itemUsage
          tmpItems[k].itemStock = tmpItems[k].itemAmount - tmpItems[k].itemUsage
          tmpItems[k].itemPrice = response.data[k].itemDetailInfo.itemPrice
        }
        this.items = tmpItems
      } else {  // 작년 10일이내의 데이터가 없는 경우 작년 해당월의 데이터를 보여줌
        const response4 = await ItemService.fetchItemLookupByYMUserIdLandId({
          ym: this.lastYearYM,
          userId: this.userId,
          landId: this.selectLand
        })

        var tmpItems2 = []
        for (var l = 0; l < response4.data.length; l++) {
          tmpItems2.push(response4.data[l])
          tmpItems2[l].landName = response4.data[l].landInfo.name
          tmpItems2[l].item = response4.data[l].wcsInfo.text
          tmpItems2[l].itemName = response4.data[l].itemDetailInfo.itemName
          tmpItems2[l].itemAmount = response4.data[l].itemDetailInfo.itemAmount
          tmpItems2[l].itemUsage = response4.data[l].itemDetailInfo.journalUsage + response4.data[l].itemDetailInfo.itemUsage
          tmpItems2[l].itemStock = tmpItems2[l].itemAmount - tmpItems2[l].itemUsage
          tmpItems2[l].itemPrice = response4.data[l].itemDetailInfo.itemPrice
        }
        this.items = tmpItems2
      }
    },
    onChangeLand: function (event) {
      // console.log(event)
    },
    onChangeDate: function (event) {
      var today = moment(event, 'YYYY-MM-DD')
      var lastYear = today.subtract(1, 'year')
      var lastYearBefore10 = lastYear.subtract(10, 'day')
      this.startDate = lastYearBefore10.format('YYYY-MM-DD')
      console.log(this.startDate)
      var lastYearAfter10 = lastYear.add(20, 'day')
      this.endDate = lastYearAfter10.format('YYYY-MM-DD')
      console.log(this.endDate)
      this.lastYearYM = moment(event, 'YYYY-MM').subtract(1, 'year').format('YYYY-MM')
      console.log(this.lastYearYM)

      // this.getItemsByDate()
    },
    showItem (item) {
      // console.log(item)
      var emitParams = {'itemId': item._id, 'origin': 'fromPredict'}
      bus.$emit('dialogForShowItem', emitParams)
    },
    searchItems () {
      this.$validator.validateAll().then((result) => {
        if (!result) {
          return
        }
        this.getItemsByDate()
      }).catch(() => {})
    },
    searchReset () {
      this.startDate = ''
      this.endDate = ''
      this.sDate = ''
      this.selectLand = '0'
      this.items = []

      var today = moment().format('YYYY-MM-DD')
      this.sDate = today
      this.onChangeDate(today)
      this.getLands()
      this.getItemsByDate()
      this.selectLand = '0'
    },
    replaceAt: function (data, index, replacement) {
      return data.substr(0, index) + replacement + data.substr(index + replacement.length)
    },
    getDateWithKorean: function (dataVal) {
      var tmpStr = this.replaceAt(dataVal, 4, '년')
      tmpStr = this.replaceAt(tmpStr, 7, '월')
      tmpStr += '일'
      return tmpStr
    },
    getStrWithComma: function (dataVal) {
      var tmpStr = dataVal + ''
      tmpStr = tmpStr.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      tmpStr = '￦' + tmpStr
      return tmpStr
    }
  },
  watch: {
    // https://github.com/vuetifyjs/vuetify/issues/4455
    items () {
      this.$nextTick(() => {
        this.pagination.totalItems = this.items.length
      })
    }
  },
  computed: {
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) return 0

      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    },
    computedDateFormatted () {
      // console.log(this.sDate)
      return this.sDate
    }
  }
}
</script>