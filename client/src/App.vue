<template>
  <v-app id="app" class="elevation-1" top-toolbar left-fixed-sidebar sidebar-under-toolbar>

    <v-navigation-drawer :width="195" v-show="btnLogOutSeen" v-model="sidebar" :clipped="true" app>
      <v-list>
        <v-list-tile @click="moveTo0('/', 0)">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-title><h4>홈</h4></v-list-tile-title>
        </v-list-tile>  

        <v-list-tile @click="moveTo0('/analysis', 0)">
          <v-list-tile-action>
            <v-icon>android</v-icon>
          </v-list-tile-action>
          <v-list-tile-title><h4>분석</h4></v-list-tile-title>
        </v-list-tile>              

        <!--
          <v-list-group
            no-action
            sub-group               
            :value="groupSearchOpen"         
          >
            <v-list-tile slot="activator" @click="groupSearchOpen = !groupSearchOpen">
              <v-list-tile-title><h4>검색</h4></v-list-tile-title>
            </v-list-tile>

            <v-list-tile
              v-for="(search, i) in menuSearch"
              :key="i"
              @click="moveTo(search[2], i)"
              :class="{current:i == current}"
            >         
              <v-list-tile-action>
                <v-icon v-text="search[1]"></v-icon>
              </v-list-tile-action>     
              <v-list-tile-title v-text="search[0]"></v-list-tile-title>
            </v-list-tile>
          </v-list-group>

          <v-list-group
            sub-group
            no-action 
            :value="groupPredictOpen"           
          >
            <v-list-tile slot="activator" @click="groupPredictOpen = !groupPredictOpen">
              <v-list-tile-title><h4>예측</h4></v-list-tile-title>
            </v-list-tile>

            <v-list-tile
              v-for="(predict, i) in menuPredict"
              :key="i"
              @click="moveTo2(predict[2], i)"
              :class="{current2:i == current2}"
            >
              <v-list-tile-action>
                <v-icon v-text="predict[1]"></v-icon>
              </v-list-tile-action>
              <v-list-tile-title v-text="predict[0]"></v-list-tile-title>              
            </v-list-tile>
          </v-list-group>

          <v-list-group
            sub-group
            no-action    
            :value="groupStatsOpen"          
          >
            <v-list-tile slot="activator" @click="groupStatsOpen = !groupStatsOpen">
              <v-list-tile-title><h4>통계</h4></v-list-tile-title>
            </v-list-tile>

            <v-list-tile
              v-for="(stat, i) in menuStats"
              :key="i"
              @click="moveTo3(stat[2], i)"
              :class="{current3:i == current3}"
            >
              <v-list-tile-action>
                <v-icon v-text="stat[1]"></v-icon>
              </v-list-tile-action>
              <v-list-tile-title v-text="stat[0]"></v-list-tile-title>            
            </v-list-tile>
          </v-list-group>

          <v-list-group
            sub-group
            no-action  
            :value="groupConfigOpen"           
          >
            <v-list-tile slot="activator" @click="groupConfigOpen = !groupConfigOpen">
              <v-list-tile-title><h4>설정</h4></v-list-tile-title>
            </v-list-tile>

            <v-list-tile
              v-for="(config, i) in menuConfig"
              :key="i"
              @click="moveTo4(config[2], i)"
              :class="{current4:i == current4}"
            >
              <v-list-tile-action>
                <v-icon v-text="config[1]"></v-icon>
              </v-list-tile-action>
              <v-list-tile-title v-text="config[0]"></v-list-tile-title>
            </v-list-tile>
          </v-list-group>
        -->
      </v-list>
    </v-navigation-drawer>

    <!-- https://pt.stackoverflow.com/questions/293349/background-image-com-vuetify -->
    <v-toolbar class="back" app>
      
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
        <div id="total" style="position:absolute;left:-750px;top:-150px;height:100%;width:100%;line-height:360px;text-align:center;color:white;font-size:24px;">{{ appTitle }}</div>        
        </router-link>
      </v-toolbar-title>
      

      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">

<!-- 날 씨 정 보 -->
        <div id="total" style="position:absolute;left:475px;top:-145px;height:100%;width:100%;line-height:360px;text-align:center;color:white;font-size:20px;">오늘({{ todayT1h }})          
        </div>
        <div id="total" style="position:absolute;left:545px;top:20px;height:100%;width:100%;line-height:360px;text-align:center;color:white;font-size:20px;">
          <v-img
            :src="todaySkyImg"
            height="30px"
            contain
          ></v-img>
        </div>   

        <div id="total" style="position:absolute;left:625px;top:-145px;height:100%;width:100%;line-height:360px;text-align:center;color:white;font-size:20px;">내일({{ tomorrowAmT1h }})          
        </div>
        <div id="total" style="position:absolute;left:695px;top:20px;height:100%;width:100%;line-height:360px;text-align:center;color:white;font-size:20px;">
          <v-img
            :src="tomAmSkyImg"
            height="30px"
            contain
          ></v-img>
        </div> 

        <div id="total" style="position:absolute;left:775px;top:-145px;height:100%;width:100%;line-height:360px;text-align:center;color:white;font-size:20px;">모레({{ afterTomorrowAmT1h }})          
        </div>
        <div id="total" style="position:absolute;left:845px;top:20px;height:100%;width:100%;line-height:360px;text-align:center;color:white;font-size:20px;">
          <v-img
            :src="afTomAmSkyImg"
            height="30px"
            contain
          ></v-img>
        </div> 
<!-- 날 씨 정 보 -->

<!--
        <v-btn flat icon color="white" @click="moveTo0('/configPrivate', 0)" v-show="btnLogOutSeen">
          <v-icon>fas fa-user-circle</v-icon>
        </v-btn>

        <v-btn flat icon color="white" @click="moveTo0('/configLand', 0)" v-show="btnLogOutSeen">
          <v-icon>fas fa-hands</v-icon>
        </v-btn>

        <v-btn flat icon color="white" @click="logout()" v-show="btnLogOutSeen">
          <v-icon>fas fa-sign-out-alt</v-icon>
        </v-btn>
-->
      </v-toolbar-items>
    </v-toolbar>
    
    <v-content v-bind:class="{ loginBack: isBackImgActive }">
      <router-view></router-view>
    </v-content>        

    <v-footer
      dark
      height="auto">
      <v-card
        class="flex"
        flat
        tile
      >
        <v-card-actions class="grey darken-3 justify-center">
          (690-833) 제주특별자치도 제주시 고마로88(일도2동 378-19) 향천빌딩 2층<br/>
          TEL.064-753-6677   FAX.064-753-6676   MAIL.eziceo@gmail.com<br/>
          Copyright ⓒ EZ Information technology co.,Ltd. All right Reseved.
        </v-card-actions>
      </v-card>
    </v-footer>
  </v-app>
  
</template>
<script>
import LandService from '@/services/LandService'
import WeatherService from '@/services/WeatherService'
import ParkingDataService from '@/services/ParkingDataService'
import proj4 from 'proj4'
export default {
  data () {
    return {
      parkingId: '',
      //
      parkingName: '제주벤처마루',
      selectAddress: '제주시 중앙로 217',
      weatherLoc: '',
      todayPm10: '',
      afTomAmSkyImg: '',
      afTomPmSkyImg: '',
      tomPmSkyImg: '',
      tomAmSkyImg: '',
      todaySkyImg: '',
      afterTomorrowAmT1h: '',
      afterTomorrowPmT1h: '',
      tomorrowPmT1h: '',
      tomorrowAmT1h: '',
      todayT1h: '',
      //
      landItems: [],
      userId: '',
      current4: -1,
      current3: -1,
      current2: -1,
      current: -1,
      groupConfigOpen: false,
      groupStatsOpen: false,
      groupPredictOpen: false,
      groupSearchOpen: false,
      menuSearch: [
        ['작업검색', 'search', '/search'],
        ['자재검색', 'find_in_page', '/searchItem']
      ],
      menuPredict: [
        ['농작업일정', 'work', '/predict'],
        ['자재구입일정', 'shopping_basket', '/predictItem']
      ],
      menuStats: [
        ['수입/지출 분석', 'assessment', '/account'],
        ['작업시간', 'alarm', '/workTime']
        /* ['환경모니터링', 'settings_input_antenna', '/environment'] */
      ],
      menuConfig: [
        ['개인정보', 'face', '/configPrivate'],
        ['농장정보', 'landscape', '/configLand']
      ],
      //
      isBackImgActive: false,
      btnLogOutSeen: true,
      appTitle: '주차관제 시스템',
      sidebar: true,
      menuItems: [
        {title: '영농일지', path: '/', icon: 'assignment_turned_in', class: 'homeImg'}
        /* {title: '일지검색', path: '/search', icon: 'assignment', class: 'searchImg'}, */
        /* {title: '자재검색', path: '/searchItem', icon: 'assignment', class: 'searchImg'} */
        /* {title: '작업예측', path: '/predict', icon: 'assignment_late', class: 'predictImg'} */
        /* {title: '통계', path: '/stats', icon: 'assessment'}, */
        /* {title: '설정', path: '/config', icon: 'build', class: 'setImg'} */
      ],
      searchSubMenuItems: [
        { title: '일지검색', path: '/search' },
        { title: '자재검색', path: '/searchItem' }
      ],
      predictSubMenuItems: [
        { title: '농작업일정', path: '/predict' },
        { title: '자재구입일정', path: '/predictItem' }
      ],
      configSubMenuItems: [
        { title: '개인정보', path: '/configPrivate' },
        { title: '농장정보', path: '/configLand' }
      ],
      statsSubMenuItems: [
        { title: '수입/지출분석', path: '/account' },
        { title: '작업시간', path: '/workTime' }
        /* { title: '환경모니터링', path: '/environment' } */
      ]
    }
  },
  created () {
    /*
    // https://www.npmjs.com/package/vue-mq
    if (this.$mq === 'mobile') {  // 모바일 기기로 접속할 경우 아래 주소로 리다이렉트
      window.location.href = 'http://59.8.37.86:8084'
    }
    */

    // https://stackoverflow.com/questions/35914069/vue-js-query-parameters
    /*
    console.log(this.$route.query.parkingId)
    this.parkingId = this.$route.query.parkingId
    this.getParkingHeader()
    */
    this.getLocation()
  },
  updated () {
    /*
    if (!this.$session.exists()) {
      this.btnLogOutSeen = false
      this.isBackImgActive = true
      // console.log(this.$router.currentRoute.path)
      if (this.$router.currentRoute.path === '/suStep1' ||
          this.$router.currentRoute.path === '/suStep2' ||
          this.$router.currentRoute.path === '/suStep3' ||
          this.$router.currentRoute.path === '/suStep4') {
        // console.log('except!')
      } else {
        this.$router.push('/login')
      }
    } else {
      this.btnLogOutSeen = true
      this.isBackImgActive = false
      // console.log('i am in move')
      this.userId = this.$session.get('userId')
      if (this.$router.currentRoute.path !== '/configLand') {
        this.fetchMyLandData()
      }
      // alert('농장정보가 없습니다')
    }
    */
    var currentPath = this.$router.currentRoute.path
    var searchTerm = 'jejutp'
    var indexOfFirst = currentPath.indexOf(searchTerm)
    if (indexOfFirst !== -1) {
      this.appTitle = '제주 벤처마루 주차관제 시스템'
    } else {
      this.appTitle = '제주대학교 주차관제 시스템'
    }
  },
  methods: {
    getParkingHeader: function () {
      this.getParkingHeaderData()
    },
    async getParkingHeaderData () {
      const response = await ParkingDataService.fetchParkingHeader({
        parkingId: this.parkingId
      })

      console.log(response.data[0].type)
    },
    async fetchTodayWeather (nx, ny) {
      const response = await WeatherService.fetchTodayWeather({
        nx: nx,
        ny: ny
      })
      // console.log(response.data)
      for (var i = 0; i < response.data.item.length; i++) {
        // var sky = 'SKY'
        var t1h = 'T1H'
        var reh = 'REH'
        var pty = 'PTY'
        if (pty === response.data.item[i].category) {
          switch (response.data.item[i].obsrValue) {
            case 0 :  // 없음
              this.todaySkyImg = require('./assets/sun.png')
              break
            case 1 :  // 비
              this.todaySkyImg = require('./assets/rain.png')
              break
            case 2 :  // 비,눈
              this.todaySkyImg = require('./assets/rain.png')
              break
            case 3 :  // 눈
              this.todaySkyImg = require('./assets/snow.png')
              break
            default :
              break
          }
        } else if (t1h === response.data.item[i].category) {
          this.todayT1h = response.data.item[i].obsrValue + '℃'
        } else if (reh === response.data.item[i].category) {
          this.todayREH = response.data.item[i].obsrValue + '%'
        }
      }
    },
    async fetchWeatherForecast (nx, ny) {
      const response = await WeatherService.fetchWeatherForecast({
        nx: nx,
        ny: ny
      })
      // TOMORROW START
      var todayDate = new Date()
      todayDate.setDate(todayDate.getDate() + 1)
      var todayYYYYMMDD = this.leadingZeros(todayDate.getFullYear(), 4) +
                          this.leadingZeros(todayDate.getMonth() + 1, 2) +
                          this.leadingZeros(todayDate.getDate(), 2) + ''
      this.tt1Date = todayYYYYMMDD.substring(4, 6) + '/' + todayYYYYMMDD.substring(6, 8)
      var onlyFcstDate = []
      for (var i = 0; i < response.data.item.length; i++) {
        if (todayYYYYMMDD === response.data.item[i].fcstDate + '') {
          onlyFcstDate.push(response.data.item[i])
        }
      }

      var onlyFcstTime = []
      var fcstTime = '0900'
      for (var j = 0; j < onlyFcstDate.length; j++) {
        if (fcstTime === onlyFcstDate[j].fcstTime) {
          onlyFcstTime.push(onlyFcstDate[j])
        }
      }

      var sky = 'SKY'
      var t3h = 'T3H'
      var reh = 'REH'
      for (var k = 0; k < onlyFcstTime.length; k++) {
        if (sky === onlyFcstTime[k].category) {
          switch (onlyFcstTime[k].fcstValue + '') {
            case '1' :
              this.tomAmSkyImg = require('./assets/sun.png')
              break
            case '2' :
              this.tomAmSkyImg = require('./assets/cloud1.png')
              break
            case '3' :
              this.tomAmSkyImg = require('./assets/cloud2.png')
              break
            case '4' :
              this.tomAmSkyImg = require('./assets/heu.png')
              break
            default :
              break
          }
        } else if (t3h === onlyFcstTime[k].category) {
          this.tomorrowAmT1h = onlyFcstTime[k].fcstValue + '℃'
        } else if (reh === onlyFcstTime[k].category) {
          this.tt1Reh = onlyFcstTime[k].fcstValue + '%'
        }
      }

      onlyFcstTime = []
      fcstTime = '1200'
      for (j = 0; j < onlyFcstDate.length; j++) {
        if (fcstTime === onlyFcstDate[j].fcstTime + '') {
          onlyFcstTime.push(onlyFcstDate[j])
        }
      }

      for (k = 0; k < onlyFcstTime.length; k++) {
        if (sky === onlyFcstTime[k].category) {
          switch (onlyFcstTime[k].fcstValue + '') {
            case '1' :
              this.tomPmSkyImg = require('./assets/sun.png')
              break
            case '2' :
              this.tomPmSkyImg = require('./assets/cloud1.png')
              break
            case '3' :
              this.tomPmSkyImg = require('./assets/cloud2.png')
              break
            case '4' :
              this.tomPmSkyImg = require('./assets/heu.png')
              break
            default :
              break
          }
        } else if (t3h === onlyFcstTime[k].category) {
          this.tomorrowPmT1h = onlyFcstTime[k].fcstValue + '℃'
        } else if (reh === onlyFcstTime[k].category) {
          this.tt1Reh = onlyFcstTime[k].fcstValue + '%'
        }
      }
      // TOMORROW END
      // AFTER TOMORROW START
      todayDate = new Date()
      todayDate.setDate(todayDate.getDate() + 2)
      todayYYYYMMDD = this.leadingZeros(todayDate.getFullYear(), 4) +
                          this.leadingZeros(todayDate.getMonth() + 1, 2) +
                          this.leadingZeros(todayDate.getDate(), 2) + ''
      this.tt2Date = todayYYYYMMDD.substring(4, 6) + '/' + todayYYYYMMDD.substring(6, 8)
      onlyFcstDate = []
      for (i = 0; i < response.data.item.length; i++) {
        if (todayYYYYMMDD === response.data.item[i].fcstDate + '') {
          onlyFcstDate.push(response.data.item[i])
        }
      }

      onlyFcstTime = []
      fcstTime = '0900'
      for (j = 0; j < onlyFcstDate.length; j++) {
        if (fcstTime === onlyFcstDate[j].fcstTime) {
          onlyFcstTime.push(onlyFcstDate[j])
        }
      }

      for (k = 0; k < onlyFcstTime.length; k++) {
        if (sky === onlyFcstTime[k].category) {
          switch (onlyFcstTime[k].fcstValue + '') {
            case '1' :
              this.afTomAmSkyImg = require('./assets/sun.png')
              break
            case '2' :
              this.afTomAmSkyImg = require('./assets/cloud1.png')
              break
            case '3' :
              this.afTomAmSkyImg = require('./assets/cloud2.png')
              break
            case '4' :
              this.afTomAmSkyImg = require('./assets/heu.png')
              break
            default :
              break
          }
        } else if (t3h === onlyFcstTime[k].category) {
          this.afterTomorrowAmT1h = onlyFcstTime[k].fcstValue + '℃'
        } else if (reh === onlyFcstTime[k].category) {
          this.tt2Reh = onlyFcstTime[k].fcstValue + '%'
        }
      }

      onlyFcstTime = []
      fcstTime = '1200'
      for (j = 0; j < onlyFcstDate.length; j++) {
        if (fcstTime === onlyFcstDate[j].fcstTime + '') {
          onlyFcstTime.push(onlyFcstDate[j])
        }
      }

      for (k = 0; k < onlyFcstTime.length; k++) {
        if (sky === onlyFcstTime[k].category) {
          switch (onlyFcstTime[k].fcstValue + '') {
            case '1' :
              this.afTomPmSkyImg = require('./assets/sun.png')
              break
            case '2' :
              this.afTomPmSkyImg = require('./assets/cloud1.png')
              break
            case '3' :
              this.afTomPmSkyImg = require('./assets/cloud2.png')
              break
            case '4' :
              this.afTomPmSkyImg = require('./assets/heu.png')
              break
            default :
              break
          }
        } else if (t3h === onlyFcstTime[k].category) {
          this.afterTomorrowPmT1h = onlyFcstTime[k].fcstValue + '℃'
        } else if (reh === onlyFcstTime[k].category) {
          this.tt2Reh = onlyFcstTime[k].fcstValue + '%'
        }
      }
      // AFTER TOMORROW END
    },
    async fetchAirData (tmX, tmY) {
      const response = await WeatherService.fetchAirData({
        tmX: tmX,
        tmY: tmY
      })
      // console.log(response.data.pm10Grade)
      switch (response.data.pm10Grade) {
        case '1' :
          this.todayPm10 = '미세먼지:좋음'
          break
        case '2' :
          this.todayPm10 = '미세먼지:보통'
          break
        case '3' :
          this.todayPm10 = '미세먼지:나쁨'
          break
        case '4' :
          this.todayPm10 = '미세먼지:매우나쁨'
          break
        default :
          break
      }
    },
    leadingZeros: function (n, digits) {
      var zero = ''
      n = n.toString()

      if (n.length < digits) {
        for (var i = 0; i < digits - n.length; i++) {
          zero += '0'
        }
      }
      return zero + n
    },
    getLocation: function () {
      this.getWeatherData()
    },
    async getWeatherData () {
      var vm = this
      // Do geo coding
      // https://github.com/googlemaps/google-maps-services-js
      var googleMapsClient = require('@google/maps').createClient({
        key: 'AIzaSyAbcu_ORn9DV9mv0GFbxwX3FrYFMyL-nRA'
      })
      googleMapsClient.geocode({
        address: this.selectAddress
      }, function (err, response) {
        if (!err) {
          var convertedXY = vm.dfs_xy_conv('toXY', response.json.results[0].geometry.location.lat, response.json.results[0].geometry.location.lng)
          vm.fetchTodayWeather(convertedXY.x, convertedXY.y)
          vm.fetchWeatherForecast(convertedXY.x, convertedXY.y)

          // https://www.npmjs.com/package/proj4
          // http://www.gisdeveloper.co.kr/?p=1854
          var firstProjection = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs'
          var secondProjection = '+proj=longlat +ellps=bessel +towgs84=-146.43,507.89,681.46 +no_defs'
          var tmXY = proj4(firstProjection, secondProjection, [convertedXY.y, convertedXY.x])
          vm.fetchAirData(tmXY[0], tmXY[1])
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
    async fetchMyLandData () {
      const response = await LandService.fetchLands({
        userId: this.userId
      })
      this.landItems = response.data.lands
      if (this.landItems.length > 0) {
      } else {
        this.$swal({
          title: '농장정보 입력페이지로 이동하시겠습니까?',
          text: '농장정보를 입력해야 정상적인 일지작성이 가능합니다.',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '네, 이동합니다',
          cancelButtonText: '취소합니다'
        }).then((result) => {
          if (result.value) {
            this.$router.push('/configLand')
            /*
            this.deleteJournal(item._id)
            this.journals.splice(index, 1)
            this.$swal(
              '삭제했습니다!',
              '일지가 삭제되었습니다',
              'success'
            )
            */
          }
        })
      }
    },
    logout: function () {
      this.$session.destroy()
      this.btnLogOutSeen = false
      this.isBackImgActive = true
      this.$router.push('/login')
    },
    moveTo0: function (val, idx) {
      /*
      if (val === '/') {
        this.groupConfigOpen = false
        this.groupStatsOpen = false
        this.groupPredictOpen = false
        this.groupSearchOpen = false
      }
      this.current = -1
      this.current2 = -1
      this.current3 = -1
      this.current4 = -1
      this.$router.push(val)
      */
      var currentPath = this.$router.currentRoute.path
      var searchTerm = 'jejutp'
      var indexOfFirst = currentPath.indexOf(searchTerm)
      if (indexOfFirst !== -1) {
        // console.log('/jejutp' + val)
        this.$router.push('/jejutp' + val)
      } else {
        // console.log('/jejunu' + val)
        this.$router.push('/jejunu' + val)
      }
    },
    moveTo: function (val, idx) {
      this.current = idx
      this.current2 = -1
      this.current3 = -1
      this.current4 = -1
      this.$router.push(val)
    },
    moveTo2: function (val, idx) {
      this.current = -1
      this.current2 = idx
      this.current3 = -1
      this.current4 = -1
      this.$router.push(val)
    },
    moveTo3: function (val, idx) {
      this.current = -1
      this.current2 = -1
      this.current3 = idx
      this.current4 = -1
      this.$router.push(val)
    },
    moveTo4: function (val, idx) {
      this.current = -1
      this.current2 = -1
      this.current3 = -1
      this.current4 = idx
      this.$router.push(val)
    }
  }
}
</script>