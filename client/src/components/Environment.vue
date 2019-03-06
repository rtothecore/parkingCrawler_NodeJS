<template>
  <div style="width:1200px; margin:0 auto;">
    <!-- dummy --> <div style="height:20px"/>
        <b-row>
          <b-col md="12">
            <b-card header="환경모니터링" header-tag="header">
              <h3 slot="header" class="mb-0"><strong>환경모니터링</strong></h3>
              <b-row>
                <b-col sm="12" lg="6">
                  <div style="width:1150px; margin:0 auto;">
      
    <v-layout row wrap justify-center>
      
      <v-flex xs12 class="text-xs-center" mt-1>
        <v-layout row ma-2 justify-center>
          <v-flex xs4 md2 order-md1 order-xs1>
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
              <v-date-picker v-model="sDate" no-title @input="menu1 = false" locale='euc-kr'></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs4 md2 order-md2 order-xs2>
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
              <v-date-picker v-model="eDate" no-title @input="menu2 = false" locale='euc-kr'></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs4 md1 order-md3 order-xs3>
            <v-btn
              :loading="loading"
              :disabled="loading"
              color="primary"
              class="white--text"
              @click.native="searchJournals"
            >
              검색
            </v-btn>
          </v-flex>     
        </v-layout>
      </v-flex>

      <v-flex xs12 class="text-xs-center" mt-1>
        <v-layout row ma-2 justify-center>
          <v-flex xs8 md3 order-md1 order-xs1>
            <v-radio-group v-model="radioRow" row>
              <v-radio label="온도" value="radio-1" @change='radioChanged' checked></v-radio>
              <v-radio label="습도" value="radio-2" @change='radioChanged'></v-radio>
              <v-radio label="Co2" value="radio-3" @change='radioChanged'></v-radio>
            </v-radio-group>
          </v-flex>
        </v-layout>
      </v-flex>

      <div id="chartContainerForWeather" style="height: 360px; width: 90%;" />
      
      <!-- dummy -->
      <div style="height: 50px; width: 100%;" />

      <div id="chartContainerForSensorData" style="height: 360px; width: 90%;" />

      <!-- dummy -->
      <div style="height: 50px; width: 100%;" />
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
import moment from 'moment'
import WeatherService from '@/services/WeatherService'
import LandService from '@/services/LandService'
import SsService from '@/services/SsService'
import WcDataService from '@/services/WcDataService'
const CanvasJS = require('../../canvasjs.min.js')
export default {
  $_veeValidate: {
    validator: 'new'
  },
  data () {
    return {
      userId: '',
      valid: true,
      name: '',
      nameRules: [
        v => !!v || '수확량 입력필요',
        v => (v && v.length <= 10) || '수확량은 10자 이하여야 합니다'
      ],
      todayT1h: '',
      todayREH: '',
      todaySky: '',
      innerT1h: '',
      innerREH: '',
      innerCo2: '',
      startDate: null,
      endDate: null,
      sDate: null,
      eDate: null,
      menu1: false,
      menu2: false,
      loader: null,
      loading: false,
      radioRow: 'radio-1',
      selectedRadio: 'radio-1',
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
      },
      chartOptions: {
        title: {
          text: '기상 정보'
        },
        data: [
          {
            type: 'column',
            showInLegend: true,
            legendText: '최소값',
            indexLabel: '{y}',
            indexLabelPlacement: 'outside',
            indexLabelOrientation: 'horizontal',
            dataPoints: [
            { x: new Date('2018-01-01'), y: 30 },
            { x: new Date('2018-01-02'), y: 31 },
            { x: new Date('2018-01-03'), y: 32 },
            { x: new Date('2018-01-04'), y: 25 },
            { x: new Date('2018-01-05'), y: 27 },
            { x: new Date('2018-01-06'), y: 31 },
            { x: new Date('2018-01-07'), y: 32 },
            { x: new Date('2018-01-08'), y: 30 },
            { x: new Date('2018-01-09'), y: 29 }
            ]
          },
          {
            type: 'column',
            showInLegend: true,
            legendText: '최대값',
            indexLabel: '{y}',
            indexLabelPlacement: 'outside',
            indexLabelOrientation: 'horizontal',
            dataPoints: [
            { x: new Date('2018-01-01'), y: 32 },
            { x: new Date('2018-01-02'), y: 33 },
            { x: new Date('2018-01-03'), y: 33 },
            { x: new Date('2018-01-04'), y: 35 },
            { x: new Date('2018-01-05'), y: 30 },
            { x: new Date('2018-01-06'), y: 32 },
            { x: new Date('2018-01-07'), y: 33 },
            { x: new Date('2018-01-08'), y: 32 },
            { x: new Date('2018-01-09'), y: 30 }
            ]
          },
          {
            type: 'column',
            showInLegend: true,
            legendText: '평균값',
            indexLabel: '{y}',
            indexLabelPlacement: 'outside',
            indexLabelOrientation: 'horizontal',
            dataPoints: [
            { x: new Date('2018-01-01'), y: 31 },
            { x: new Date('2018-01-02'), y: 32 },
            { x: new Date('2018-01-03'), y: 32 },
            { x: new Date('2018-01-04'), y: 30 },
            { x: new Date('2018-01-05'), y: 30 },
            { x: new Date('2018-01-06'), y: 30 },
            { x: new Date('2018-01-07'), y: 31 },
            { x: new Date('2018-01-08'), y: 30 },
            { x: new Date('2018-01-09'), y: 29 }
            ]
          }
        ],
        axisY: {
          title: '온도(℃)'
        }
      },
      chart: null,
      chartOptions2: {
        title: {
          text: '내부환경 정보'
        },
        data: [
          {
            type: 'column',
            showInLegend: true,
            legendText: '최소값',
            indexLabel: '{y}',
            indexLabelPlacement: 'outside',
            indexLabelOrientation: 'horizontal',
            dataPoints: [
            { x: new Date('2018-01-01'), y: 30 },
            { x: new Date('2018-01-02'), y: 31 },
            { x: new Date('2018-01-03'), y: 32 },
            { x: new Date('2018-01-04'), y: 25 },
            { x: new Date('2018-01-05'), y: 27 },
            { x: new Date('2018-01-06'), y: 31 },
            { x: new Date('2018-01-07'), y: 32 },
            { x: new Date('2018-01-08'), y: 30 },
            { x: new Date('2018-01-09'), y: 29 }
            ]
          },
          {
            type: 'column',
            showInLegend: true,
            legendText: '최대값',
            indexLabel: '{y}',
            indexLabelPlacement: 'outside',
            indexLabelOrientation: 'horizontal',
            dataPoints: [
            { x: new Date('2018-01-01'), y: 32 },
            { x: new Date('2018-01-02'), y: 33 },
            { x: new Date('2018-01-03'), y: 33 },
            { x: new Date('2018-01-04'), y: 35 },
            { x: new Date('2018-01-05'), y: 30 },
            { x: new Date('2018-01-06'), y: 32 },
            { x: new Date('2018-01-07'), y: 33 },
            { x: new Date('2018-01-08'), y: 32 },
            { x: new Date('2018-01-09'), y: 30 }
            ]
          },
          {
            type: 'column',
            showInLegend: true,
            legendText: '평균값',
            indexLabel: '{y}',
            indexLabelPlacement: 'outside',
            indexLabelOrientation: 'horizontal',
            dataPoints: [
            { x: new Date('2018-01-01'), y: 31 },
            { x: new Date('2018-01-02'), y: 32 },
            { x: new Date('2018-01-03'), y: 32 },
            { x: new Date('2018-01-04'), y: 30 },
            { x: new Date('2018-01-05'), y: 30 },
            { x: new Date('2018-01-06'), y: 30 },
            { x: new Date('2018-01-07'), y: 31 },
            { x: new Date('2018-01-08'), y: 30 },
            { x: new Date('2018-01-09'), y: 29 }
            ]
          }
        ],
        axisY: {
          title: '온도(℃)'
        }
      },
      chart2: null
    }
  },
  mounted () {
    this.$validator.localize('ko', this.dictionary)

    this.chart = new CanvasJS.Chart('chartContainerForWeather', this.chartOptions)
    this.chart.render()

    this.chart2 = new CanvasJS.Chart('chartContainerForSensorData', this.chartOptions2)
    this.chart2.render()
  },
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push('/login')
    } else {
    }
  },
  created: function () {
    this.userId = this.$session.get('userId')
    this.sDate = moment().format('YYYY-MM-DD')
    // this.startDate = '2018-08-27'
    this.eDate = moment().format('YYYY-MM-DD')
    this.getWcDataAgg()
    this.getSsDataAgg()
    // this.getLocation()
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
    loader () {
      const l = this.loader
      this[l] = !this[l]
      setTimeout(() => (this[l] = false), 1000)
      this.loader = null
    }
  },
  methods: {
    async fetchTodayWeather (nx, ny) {
      const response = await WeatherService.fetchTodayWeather({
        nx: nx,
        ny: ny
      })
      for (var i = 0; i < response.data.item.length; i++) {
        var sky = 'SKY'
        var t1h = 'T1H'
        var reh = 'REH'
        if (sky === response.data.item[i].category) {
          switch (response.data.item[i].obsrValue) {
            case 1 :
              this.todaySky = '맑음'
              break
            case 2 :
              this.todaySky = '구름조금'
              break
            case 3 :
              this.todaySky = '구름많음'
              break
            case 4 :
              this.todaySky = '흐림'
              break
            default :
              break
          }
        } else if (t1h === response.data.item[i].category) {
          this.todayT1h = '온도 : ' + response.data.item[i].obsrValue + '℃'
        } else if (reh === response.data.item[i].category) {
          this.todayREH = '습도 : ' + response.data.item[i].obsrValue + '%'
        }
      }
    },
    searchJournals () {
      this.loader = 'loading'
      this.$validator.validateAll().then((result) => {
        if (!result) {
          return
        }
        // this.getJournalsBy4()
        this.getWcDataAgg()
        this.getSsDataAgg()
      }).catch(() => {})
    },
    radioChanged: function (event) {
      // console.log(event)
      this.selectedRadio = event
      this.getWeatherCrawlerDataAgg()
      this.getSensorDataAgg()
    },
    getWcDataAgg: function () {
      this.getWeatherCrawlerDataAgg()
    },
    async getWeatherCrawlerDataAgg () {
      const response = await WcDataService.fetchWcDataAgg({
        startDate: this.sDate,
        endDate: this.eDate
      })

      this.chartOptions.data[0].dataPoints = []
      this.chartOptions.data[1].dataPoints = []
      this.chartOptions.data[2].dataPoints = []

      this.weatherData = response.data

      if (this.selectedRadio === 'radio-1') {
        for (var i = 0; i < 3; i++) {
          var tmpDataPoints = []
          for (var j = 0; j < this.weatherData.length; j++) {
            var tmpWeatherData = {}
            tmpWeatherData.x = new Date(this.weatherData[j]._id)
            if (i === 0) {
              tmpWeatherData.y = this.weatherData[j].t1hMin * 1
            } else if (i === 1) {
              tmpWeatherData.y = this.weatherData[j].t1hMax * 1
            } else if (i === 2) {
              tmpWeatherData.y = this.weatherData[j].t1hAvg * 1
            }
            tmpDataPoints.push(tmpWeatherData)
          }
          this.chartOptions.data[i].dataPoints = tmpDataPoints
          this.chartOptions.axisY.title = '온도(℃)'
        }
      } else if (this.selectedRadio === 'radio-2') {
        for (var k = 0; k < 3; k++) {
          tmpDataPoints = []
          for (var l = 0; l < this.weatherData.length; l++) {
            tmpWeatherData = {}
            tmpWeatherData.x = new Date(this.weatherData[l]._id)
            if (k === 0) {
              tmpWeatherData.y = this.weatherData[l].rehMin * 1
            } else if (k === 1) {
              tmpWeatherData.y = this.weatherData[l].rehMax * 1
            } else if (k === 2) {
              tmpWeatherData.y = this.weatherData[l].rehAvg * 1
            }
            tmpDataPoints.push(tmpWeatherData)
          }
          this.chartOptions.data[k].dataPoints = tmpDataPoints
          this.chartOptions.axisY.title = '습도(%)'
        }
      } else if (this.selectedRadio === 'radio-3') {
        this.chartOptions.axisY.title = 'Co2(ppm)'
      }
      this.chart.render()
    },
    getSsDataAgg: function () {
      this.getSensorDataAgg()
    },
    async getSensorDataAgg () {
      const response = await SsService.fetchSensorDataAgg({
        startDate: this.sDate.replace(/-/gi, ''),
        endDate: this.eDate.replace(/-/gi, '')
      })

      this.chartOptions2.data[0].dataPoints = []
      this.chartOptions2.data[1].dataPoints = []
      this.chartOptions2.data[2].dataPoints = []

      // console.log(response.data)
      this.sensorData = response.data

      if (this.selectedRadio === 'radio-1') {
        for (var i = 0; i < 3; i++) {
          var tmpDataPoints = []
          for (var j = 0; j < this.sensorData.length; j++) {
            var tmpSensorData = {}
            tmpSensorData.x = new Date(this.sensorData[j]._id.substring(0, 4) + '-' + this.sensorData[j]._id.substring(4, 6) + '-' + this.sensorData[j]._id.substring(6, 8))
            if (i === 0) {
              tmpSensorData.y = this.sensorData[j].temMin * 1
            } else if (i === 1) {
              tmpSensorData.y = this.sensorData[j].temMax * 1
            } else if (i === 2) {
              tmpSensorData.y = this.sensorData[j].temAvg * 1
            }
            tmpDataPoints.push(tmpSensorData)
          }
          this.chartOptions2.data[i].dataPoints = tmpDataPoints
          this.chartOptions2.axisY.title = '온도(℃)'
        }
      } else if (this.selectedRadio === 'radio-2') {
        for (i = 0; i < 3; i++) {
          tmpDataPoints = []
          for (j = 0; j < this.sensorData.length; j++) {
            tmpSensorData = {}
            tmpSensorData.x = new Date(this.sensorData[j]._id.substring(0, 4) + '-' + this.sensorData[j]._id.substring(4, 6) + '-' + this.sensorData[j]._id.substring(6, 8))
            if (i === 0) {
              tmpSensorData.y = this.sensorData[j].humMin * 1
            } else if (i === 1) {
              tmpSensorData.y = this.sensorData[j].humMax * 1
            } else if (i === 2) {
              tmpSensorData.y = this.sensorData[j].humAvg * 1
            }
            tmpDataPoints.push(tmpSensorData)
          }
          this.chartOptions2.data[i].dataPoints = tmpDataPoints
          this.chartOptions2.axisY.title = '습도(%)'
        }
      } else if (this.selectedRadio === 'radio-3') {
        for (i = 0; i < 3; i++) {
          tmpDataPoints = []
          for (j = 0; j < this.sensorData.length; j++) {
            tmpSensorData = {}
            tmpSensorData.x = new Date(this.sensorData[j]._id.substring(0, 4) + '-' + this.sensorData[j]._id.substring(4, 6) + '-' + this.sensorData[j]._id.substring(6, 8))
            if (i === 0) {
              tmpSensorData.y = this.sensorData[j].co2Min * 1
            } else if (i === 1) {
              tmpSensorData.y = this.sensorData[j].co2Max * 1
            } else if (i === 2) {
              tmpSensorData.y = this.sensorData[j].co2Avg * 1
            }
            tmpDataPoints.push(tmpSensorData)
          }
          this.chartOptions2.data[i].dataPoints = tmpDataPoints
          this.chartOptions2.axisY.title = 'Co2(ppm)'
        }
      }
      this.chart2.render()
    },
    getLocation: function () {
      this.getLandsByUserId()
      this.getSensorData()
    },
    async getSensorData () {
      const response = await SsService.fetchSensorData({
      })
      // console.log(response.data[0])
      this.innerT1h = '온도 : ' + response.data[0].temperature + '℃'
      this.innerREH = '습도 : ' + response.data[0].humidity + '%'
      this.innerCo2 = 'Co2 : ' + response.data[0].co2
    },
    async getLandsByUserId () {
      var vm = this
      const response = await LandService.fetchLands({
        userId: this.userId
      })
      // Do geo coding
      // https://github.com/googlemaps/google-maps-services-js
      var googleMapsClient = require('@google/maps').createClient({
        key: 'AIzaSyAbcu_ORn9DV9mv0GFbxwX3FrYFMyL-nRA'
      })
      googleMapsClient.geocode({
        address: response.data.lands[0].address
      }, function (err, response) {
        if (!err) {
          vm.weatherLoc = response.json.results[0].address_components[0].short_name

          var convertedXY = vm.dfs_xy_conv('toXY', response.json.results[0].geometry.location.lat, response.json.results[0].geometry.location.lng)
          vm.fetchTodayWeather(convertedXY.x, convertedXY.y)
        }
      })
    },
    dfs_xy_conv: function (code, v1, v2) { // http://fronteer.kr/service/kmaxy - 37.579871128849334, 126.98935225645432 => 60, 127
      var RE = 6371.00877 // 지구 반경(km)
      var GRID = 5.0 // 격자 간격(km)
      var SLAT1 = 30.0 // 투영 위도1(degree)
      var SLAT2 = 60.0 // 투영 위도2(degree)
      var OLON = 126.0 // 기준점 경도(degree)
      var OLAT = 38.0 // 기준점 위도(degree)
      var XO = 43 // 기준점 X좌표(GRID)
      var YO = 136 // 기1준점 Y좌표(GRID)

      var DEGRAD = Math.PI / 180.0
      var RADDEG = 180.0 / Math.PI

      var re = RE / GRID
      var slat1 = SLAT1 * DEGRAD
      var slat2 = SLAT2 * DEGRAD
      var olon = OLON * DEGRAD
      var olat = OLAT * DEGRAD

      var sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5)
      sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn)
      var sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5)
      sf = Math.pow(sf, sn) * Math.cos(slat1) / sn
      var ro = Math.tan(Math.PI * 0.25 + olat * 0.5)
      ro = re * sf / Math.pow(ro, sn)
      var rs = {}
      if (code === 'toXY') {
        rs['lat'] = v1
        rs['lng'] = v2
        var ra = Math.tan(Math.PI * 0.25 + (v1) * DEGRAD * 0.5)
        ra = re * sf / Math.pow(ra, sn)
        var theta = v2 * DEGRAD - olon
        if (theta > Math.PI) theta -= 2.0 * Math.PI
        if (theta < -Math.PI) theta += 2.0 * Math.PI
        theta *= sn
        rs['x'] = Math.floor(ra * Math.sin(theta) + XO + 0.5)
        rs['y'] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5)
      } else {
        rs['x'] = v1
        rs['y'] = v2
        var xn = v1 - XO
        var yn = ro - v2 + YO
        ra = Math.sqrt(xn * xn + yn * yn)
        if (sn < 0.0) {
          ra = -ra
        }
        var alat = Math.pow((re * sf / ra), (1.0 / sn))
        alat = 2.0 * Math.atan(alat) - Math.PI * 0.5

        if (Math.abs(xn) <= 0.0) {
          theta = 0.0
        } else {
          if (Math.abs(yn) <= 0.0) {
            theta = Math.PI * 0.5
            if (xn < 0.0) {
              theta = -theta
            }
          } else theta = Math.atan2(xn, yn)
        }
        var alon = theta / sn + olon
        rs['lat'] = alat * RADDEG
        rs['lng'] = alon * RADDEG
      }
      return rs
    },
    submit () {
      if (this.$refs.form.validate()) {
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
