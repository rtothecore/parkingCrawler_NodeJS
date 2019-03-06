<template>
  <v-container fluid>
    <v-layout row wrap justify-center>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1></h1>
      </v-flex>

      <v-flex xs12 class="text-xs-center" mt-1>
        <v-layout row ma-2 justify-center>
          <v-flex xs4 md1 order-md1 order-xs1>
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
                label="시작날짜"
                persistent-hint
                prepend-icon="event"
                readonly
                :error-messages="errors.collect('startDate')"
                required=""
                v-validate="'required'" 
                data-vv-name="startDate"
              ></v-text-field>
              <v-date-picker v-model="sDate" no-title @input="menu1 = false"></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs4 md1 order-md2 order-xs2>
            <v-menu
              :close-on-content-click="false"
              v-model="menu2"
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
                v-model="computedDateFormatted2"
                label="종료날짜"
                persistent-hint
                prepend-icon="event"
                readonly
                :error-messages="errors.collect('endDate')"
                required=""
                v-validate="'required'" 
                data-vv-name="endDate"
              ></v-text-field>
              <v-date-picker v-model="eDate" no-title @input="menu2 = false"></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs4 md1 order-md3 order-xs3>
            <v-btn
              :loading="loading"
              :disabled="loading"
              color="light-blue"
              class="white--text"
              @click.native="searchJournals"
            >
              검색
            </v-btn>
          </v-flex>     
        </v-layout>
      </v-flex>

      <!-- <div id="wcdatasDiv" style="display:block"> -->
        <v-flex xs12 class="text-xs-center" mt-1>
          <!-- <v-toolbar-title>평균 주차 시간({{wcdatasCount}}개) - {{wcdatasTime}}ms</v-toolbar-title> -->
          <v-toolbar-title>평균 주차 시간({{avgParkingTime}}시간) - {{avgParkingTimeRunTime}}ms</v-toolbar-title>
          <v-toolbar-title>주차 효율({{parkingEfficiency}}%) - {{parkingEfficiencyRunTime}}ms</v-toolbar-title>
          <v-toolbar-title>주차 회전율({{parkingTurnover}}대) - {{parkingTurnoverRunTime}}ms</v-toolbar-title>
          <v-toolbar-title>가장 많은 주차이용시간({{parkingMaxUsageTime}}) - {{parkingMaxUsageTimeRunTime}}ms</v-toolbar-title>
          <v-toolbar-title>가장 많은 주차이용요일({{parkingMaxUsageDOW}}) - {{parkingMaxUsageDOWRunTime}}ms</v-toolbar-title>
        </v-flex>
      <!-- </div> -->

      <!-- dummy -->
      <div style="height: 50px; width: 100%;" />      

      <!-- dummy -->
      <div style="height: 50px; width: 100%;" />
    </v-layout>
  </v-container>
</template>

<script>
import moment from 'moment'
import ParkingDataService from '@/services/ParkingDataService'
export default {
  $_veeValidate: {
    validator: 'new'
  },
  data () {
    return {
      parkingMaxUsageDOWRunTime: '',
      parkingMaxUsageDOW: '',
      parkingMaxUsageTimeRunTime: '',
      parkingMaxUsageTime: '',
      parkingTurnoverRunTime: '',
      parkingTurnover: '',
      parkingEfficiencyRunTime: '',
      parkingEfficiency: '',
      avgParkingTimeRunTime: '',
      avgParkingTime: '',
      //
      wcdatasCount: '',
      ssdatasCount: '',
      wcdatasTime: '',
      ssdatasTime: '',
      queryStartTime: '',
      queryEndTime: '',
      queryRunTime: '',
      userId: '',
      valid: true,
      name: '',
      nameRules: [
        v => !!v || '수확량 입력필요',
        v => (v && v.length <= 10) || '수확량은 10자 이하여야 합니다'
      ],
      startDate: null,
      endDate: null,
      sDate: null,
      eDate: null,
      menu1: false,
      menu2: false,
      loader: null,
      loading: false,
      weatherData: null,
      sensorData: null,
      dictionary: {
        custom: {
          startDate: {
            required: '시작날짜를 입력해주세요'
          },
          endDate: {
            required: '종료날짜를 입력해주세요'
          }
        }
      }
    }
  },
  mounted () {
    this.$validator.localize('ko', this.dictionary)
  },
  beforeCreate: function () {
    /*
    if (!this.$session.exists()) {
      this.$router.push('/login')
    } else {
    }
    */
  },
  created: function () {
    // this.userId = this.$session.get('userId')
    this.sDate = moment().format('YYYY-MM-DD')
    // this.startDate = '2018-08-27'
    this.eDate = moment().format('YYYY-MM-DD')
    // this.getWcDataAgg()
    // this.getSsDataAgg()
  },
  computed: {
    computedDateFormatted () {
      console.log(this.sDate)
      return this.sDate
    },
    computedDateFormatted2 () {
      console.log(this.eDate)
      return this.eDate
    }
  },
  watch: {
    /*
    loader () {
      const l = this.loader
      this[l] = !this[l]
      setTimeout(() => (this[l] = false), 1000)
      this.loader = null
    }
    */
  },
  methods: {
    searchJournals () {
      // this.loader = 'loading'
      this.$validator.validateAll().then((result) => {
        if (!result) {
          return
        }

        /*
        if (this.selectedRadio === 'radio-1') {
          this.getWcDataAgg()
        } else {
          this.getSsDataAgg()
        }
        */
        this.getAvgParkingTime()
        this.getParkingEfficiency()
        this.getParkingTurnover()
        this.getParkingMaxUsageTime()
        this.getParkingMaxUsageDOW()
      }).catch(() => {})
    },
    checkTime: function () {
      return moment()
    },
    getAvgParkingTime: function () {
      this.getAvgParkingTimeData()
    },
    getParkingEfficiency: function () {
      this.getParkingEffData()
    },
    getParkingTurnover: function () {
      this.getParkingTurnoverData()
    },
    getParkingMaxUsageTime: function () {
      this.getParkingMaxUsageTimeData()
    },
    getParkingMaxUsageDOW: function () {
      this.getParkingMaxUsageDOWData()
    },
    async getParkingMaxUsageDOWData () {
      var queryStartTime = moment()
      console.log(queryStartTime)

      const response = await ParkingDataService.fetchParkingMaxUsageDOW({
        startDate: this.sDate.replace(/-/gi, ''),
        endDate: this.eDate.replace(/-/gi, '')
      })

      console.log(response.data)

      var sunSum = response.data[0].sunSum
      var monSum = response.data[0].monSum
      var tueSum = response.data[0].tueSum
      var wedSum = response.data[0].wedSum
      var thuSum = response.data[0].thuSum
      var friSum = response.data[0].friSum
      var satSum = response.data[0].satSum

      let obj = { sunSum: sunSum, monSum: monSum, tueSum: tueSum, wedSum: wedSum, thuSum: thuSum, friSum: friSum, satSum: satSum }
      let arr = Object.values(obj)
      let min = Math.min(...arr)
      let max = Math.max(...arr)
      console.log('min:' + min)
      console.log('max:' + max)

      this.parkingMaxUsageDOW = this.getKeyByValue(obj, max)

      var queryEndTime = moment()
      console.log(queryEndTime)

      var queryRunTime = queryEndTime - queryStartTime
      console.log('parkingMaxUsageDOW runTime : ' + queryRunTime)
      this.parkingMaxUsageDOWRunTime = queryRunTime
    },
    async getParkingMaxUsageTimeData () {
      var queryStartTime = moment()
      console.log(queryStartTime)

      const response = await ParkingDataService.fetchParkingMaxUsageTime({
        startDate: this.sDate.replace(/-/gi, ''),
        endDate: this.eDate.replace(/-/gi, '')
      })

      console.log(response.data)

      var l30m = response.data[0].l30m
      var g30mN1h = response.data[0].g30mN1h
      var g1hN2h = response.data[0].g1hN2h
      var g2h = response.data[0].g2h
      let obj = { l30m: l30m, g30mN1h: g30mN1h, g1hN2h: g1hN2h, g2h: g2h }
      let arr = Object.values(obj)
      let min = Math.min(...arr)
      let max = Math.max(...arr)
      console.log('min:' + min)
      console.log('max:' + max)

      this.parkingMaxUsageTime = this.getKeyByValue(obj, max)

      var queryEndTime = moment()
      console.log(queryEndTime)

      var queryRunTime = queryEndTime - queryStartTime
      console.log('parkingMaxUsageTime runTime : ' + queryRunTime)
      this.parkingMaxUsageTimeRunTime = queryRunTime
    },
    async getParkingTurnoverData () {
      var queryStartTime = moment()
      console.log(queryStartTime)

      // 주차이용대수
      const response = await ParkingDataService.fetchParkingUsageCount({
        startDate: this.sDate.replace(/-/gi, ''),
        endDate: this.eDate.replace(/-/gi, '')
      })
      var parkingUsageCount = response.data.count

      // 주차장운영시간
      const response3 = await ParkingDataService.fetchParkingOpTime({
        startDate: this.sDate.replace(/-/gi, ''),
        endDate: this.eDate.replace(/-/gi, '')
      })
      var parkingOpTime = response3.data[0].opDateDifferenceHour

      this.parkingTurnover = (parkingUsageCount / parkingOpTime) / 100
      this.parkingTurnover = this.parkingTurnover.toFixed(1)

      var queryEndTime = moment()
      console.log(queryEndTime)

      var queryRunTime = queryEndTime - queryStartTime
      console.log('parkingTurnover runTime : ' + queryRunTime)
      this.parkingTurnoverRunTime = queryRunTime
    },
    async getParkingEffData () {
      var queryStartTime = moment()
      console.log(queryStartTime)

      // 주차이용대수
      const response = await ParkingDataService.fetchParkingUsageCount({
        startDate: this.sDate.replace(/-/gi, ''),
        endDate: this.eDate.replace(/-/gi, '')
      })
      var parkingUsageCount = response.data.count

      // 평균주차시간
      const response2 = await ParkingDataService.fetchAvgParkingTime({
        startDate: this.sDate.replace(/-/gi, ''),
        endDate: this.eDate.replace(/-/gi, '')
      })
      var avgParkingTime = response2.data[0].avgHour

      // 주차장운영시간
      const response3 = await ParkingDataService.fetchParkingOpTime({
        startDate: this.sDate.replace(/-/gi, ''),
        endDate: this.eDate.replace(/-/gi, '')
      })
      var parkingOpTime = response3.data[0].opDateDifferenceHour

      this.parkingEfficiency = (parkingUsageCount * avgParkingTime) / (100 * parkingOpTime)
      this.parkingEfficiency *= 100
      this.parkingEfficiency = this.parkingEfficiency.toFixed(1)

      var queryEndTime = moment()
      console.log(queryEndTime)

      var queryRunTime = queryEndTime - queryStartTime
      console.log('parkingEfficiency runTime : ' + queryRunTime)
      this.parkingEfficiencyRunTime = queryRunTime
    },
    async getAvgParkingTimeData () {
      // this.queryStartTime = moment()
      var queryStartTime = moment()
      console.log(queryStartTime)

      const response = await ParkingDataService.fetchAvgParkingTime({
        startDate: this.sDate.replace(/-/gi, ''),
        endDate: this.eDate.replace(/-/gi, '')
      })

      console.log(response.data)
      this.avgParkingTime = response.data[0].avgHour
      this.avgParkingTime = this.avgParkingTime.toFixed(1)

      // this.queryEndTime = moment()
      var queryEndTime = moment()
      console.log(queryEndTime)

      var queryRunTime = queryEndTime - queryStartTime
      console.log('avgParkingTime runTime : ' + queryRunTime)
      this.avgParkingTimeRunTime = queryRunTime
    },
    getKeyByValue: function (object, value) {
      // https://stackoverflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value
      return Object.keys(object).find(key => object[key] === value)
    }
  }
}
</script>
