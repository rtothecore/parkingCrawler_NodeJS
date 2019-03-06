<template>
    <div style="width:1200px; margin:0 auto;">
      <!-- dummy --> <div style="height:20px"/>
        <b-row>
          <b-col md="12">
            <b-card header="농작업일정 예측" header-tag="header">
              <h3 slot="header" class="mb-0"><strong>농작업일정 예측</strong></h3>
              <b-row>
                <b-col sm="12" lg="6">
                  <div style="width:1150px; margin:0 auto;">
            
    <v-layout row wrap pl-4>
      
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
          @click.native="searchJournals"
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
          :items="journals"
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
            <td :style="{backgroundColor: (props.index % 2 ? '#F6F7FE' : 'transparent')}"><h4>{{ props.item.cropName }}</h4></td>
            <td :style="{backgroundColor: (props.index % 2 ? '#F6F7FE' : 'transparent')}"><h4>{{ props.item.workType }}</h4></td>
            <td :style="{backgroundColor: (props.index % 2 ? '#F6F7FE' : 'transparent')}"><h4>{{ props.item.workContent }}</h4></td>
            <td :style="{backgroundColor: (props.index % 2 ? '#F6F7FE' : 'transparent')}"><h4>{{ props.item.sky }}</h4></td>
            <td :style="{backgroundColor: (props.index % 2 ? '#F6F7FE' : 'transparent')}"><h4>{{ props.item.t1h }}</h4></td>
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
        <predictModalForShow></predictModalForShow>
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
import JournalService from '@/services/JournalService'
// import ScService from '@/services/ScService'
// import WcService from '@/services/WcService'
import LandService from '@/services/LandService'
// import DcService from '@/services/DcService'
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
        { text: '작물명', sortable: false, value: 'cropName' },
        { text: '작업분류', sortable: false, value: 'workType' },
        { text: '작업내용', sortable: false, value: 'workContent' },
        { text: '날씨', sortable: false, value: 'sky' },
        { text: '온도', sortable: false, value: 't1h' },
        { text: '관리', value: 'name', sortable: false, align: 'left', width: '5%' }
      ],
      journals: [],
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
    this.getJournalsByDate()
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
    async getJournalsByDate () {
      if (!this.startDate) {
        this.startDate = 0
      }
      if (!this.endDate) {
        this.endDate = 0
      }
      if (!this.selectLand) {
        this.selectLand = 0
      }

      const response = await JournalService.fetchJournalLookupBy4({
        startDate: this.startDate,
        endDate: this.endDate,
        userId: this.userId,
        landId: this.selectLand
      })

      if (response.data.length > 0) {
        var tmpJournals = response.data
        for (var i = 0; i < response.data.length; i++) {
          tmpJournals[i].landName = response.data[i].landInfo.name
          tmpJournals[i].cropName = response.data[i].dcsInfo.text
          tmpJournals[i].workType = response.data[i].wcsInfo.text
          tmpJournals[i].sky = tmpJournals[i].weather.sky
          switch (tmpJournals[i].sky) {
            case '0' :
              tmpJournals[i].sky = '맑음'
              break
            case '1' :
              tmpJournals[i].sky = '비'
              break
            case '2' :
              tmpJournals[i].sky = '비/눈'
              break
            case '3' :
              tmpJournals[i].sky = '눈'
              break
          }
          if (tmpJournals[i].sky === 'No data') {
            tmpJournals[i].sky = '-'
          }
          if (!tmpJournals[i].t1h) {
            tmpJournals[i].t1h = '-'
          } else {
            tmpJournals[i].t1h = Math.round(tmpJournals[i].weather.avgT1H) + '℃'
          }
        }
        this.journals = tmpJournals
      } else {  // 작년 10일이내의 데이터가 없는 경우 작년 해당월의 데이터를 보여줌
        const response4 = await JournalService.fetchJournalLookupByYMUserIdLandId({
          ym: this.lastYearYM,
          userId: this.userId,
          landId: this.selectLand
        })
        var tmpJournals2 = response4.data

        for (var j = 0; j < response4.data.length; j++) {
          tmpJournals2[j].landName = response4.data[j].landInfo.name
          tmpJournals2[j].cropName = response4.data[j].dcsInfo.text
          tmpJournals2[j].workType = response4.data[j].wcsInfo.text
          tmpJournals2[j].sky = tmpJournals2[j].weather.sky
          switch (tmpJournals2[j].sky) {
            case '0' :
              tmpJournals2[j].sky = '맑음'
              break
            case '1' :
              tmpJournals2[j].sky = '비'
              break
            case '2' :
              tmpJournals2[j].sky = '비/눈'
              break
            case '3' :
              tmpJournals2[j].sky = '눈'
              break
          }
          if (tmpJournals2[i].sky === 'No data') {
            tmpJournals2[i].sky = '-'
          }
          if (!tmpJournals2[i].t1h) {
            tmpJournals2[i].t1h = '-'
          } else {
            tmpJournals2[i].t1h = Math.round(tmpJournals2[i].weather.avgT1H) + '℃'
          }
        }
        this.journals = tmpJournals2
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

      // this.getJournalsByDate()
    },
    showItem (item) {
      // console.log(item)
      var emitParams = {'journalId': item._id, 'origin': 'fromPredict'}
      bus.$emit('dialogForShow', emitParams)
    },
    searchJournals () {
      this.$validator.validateAll().then((result) => {
        if (!result) {
          return
        }
        this.getJournalsByDate()
      }).catch(() => {})
    },
    searchReset () {
      this.startDate = ''
      this.endDate = ''
      this.sDate = ''
      this.selectLand = '0'
      this.journals = []

      var today = moment().format('YYYY-MM-DD')
      this.sDate = today
      this.onChangeDate(today)
      this.getLands()
      this.getJournalsByDate()
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
    }
  },
  watch: {
    // https://github.com/vuetifyjs/vuetify/issues/4455
    journals () {
      this.$nextTick(() => {
        this.pagination.totalItems = this.journals.length
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