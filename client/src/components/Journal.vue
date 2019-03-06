<template>
<div style="position:absolute height:900px;">    
    <!-- <div id="calendar" v-bind:style="{ height: calendarHeight, width: calendarWidth, float: 'left'}"> -->
      <!-- dummy --> <div style="height:20px"/>

      <div style="width:1200px; margin:0 auto;">
        
        <b-row>
          <b-col md="12">
            <b-card header="날씨 정보" header-tag="header">
              <h3 slot="header" class="mb-0"><strong>날씨 정보</strong></h3>
              <b-row>
                <b-col sm="12" lg="6">
                  <div style="width:1150px; margin:0 auto;">
                    
                    <b-row>
                      <b-col sm="6" lg="2">
                        <b-card no-body>
                          <b-card-body class="pb-0">
                            
                            <!-- <v-container fluid grid-list-lg> -->
                              <v-layout>
                                <div>                    
                                <div class="caption">
                                  <v-select
                                    :items="landItems"
                                    v-model="selectLand"
                                    label="농장명"
                                    item-text="name"
                                    item-value="_id"
                                    v-on:change="onChangeLand"
                                  ></v-select>
                                </div>
                                </div>
                              </v-layout>
                              
                            <!-- </v-container> -->

                          </b-card-body>
                          
                        </b-card>
                      </b-col>

                      <b-col sm="6" lg="2">
                        <b-card no-body>
                          <b-card-body class="pb-0">
                            
                            <!-- <v-container fluid grid-list-lg> -->
                              

                              <v-layout row>
                                <v-flex xs7>
                                  <div>
                                    <div class="subheading">&nbsp;&nbsp;&nbsp;&nbsp;오늘</div>
                                    <div class="title">&nbsp;&nbsp;&nbsp;{{ todayT1h }}</div>
                                  </div>
                                </v-flex>
                                <v-flex xs5>
                                  <v-img
                                    :src="todaySkyImg"
                                    height="65px"
                                    contain
                                  ></v-img>
                                </v-flex>
                              </v-layout>

                              <v-layout>
                                <div>
                                <div class="caption">{{ todayPm10 }}</div>   
                                <div class="caption">&nbsp;</div> 
                                
                                </div>
                              </v-layout>
                            <!-- </v-container> -->

                          </b-card-body>
                          
                        </b-card>
                      </b-col>

                      <b-col sm="6" lg="2">
                        <b-card no-body>
                          <b-card-body class="pb-0">
                            
                            <!-- <v-container fluid grid-list-lg> -->
                              <v-layout row>
                                <v-flex xs7>
                                  <div>
                                    <div class="subheading">&nbsp;&nbsp;&nbsp;&nbsp;내일 오전</div>
                                    <div class="title">&nbsp;&nbsp;&nbsp;{{ tomorrowAmT1h }}</div>
                                  </div>
                                </v-flex>
                                <v-flex xs5>
                                  <v-img
                                    :src="tomAmSkyImg"
                                    height="100px"
                                    contain
                                  ></v-img>
                                </v-flex>
                              </v-layout>
                              
                            <!-- </v-container> -->
                            
                          </b-card-body>
                          
                        </b-card>
                      </b-col>

                      <b-col sm="6" lg="2">
                        <b-card no-body>
                          <b-card-body class="pb-0">
                            
                            <!-- <v-container fluid grid-list-lg> -->
                              <v-layout row>
                                <v-flex xs7>
                                  <div>
                                    <div class="subheading">&nbsp;&nbsp;&nbsp;&nbsp;내일 오후</div>
                                    <div class="title">&nbsp;&nbsp;&nbsp;{{ tomorrowPmT1h }}</div>
                                  </div>
                                </v-flex>
                                <v-flex xs5>
                                  <v-img
                                    :src="tomPmSkyImg"
                                    height="100px"
                                    contain
                                  ></v-img>
                                </v-flex>
                              </v-layout>
                              
                            <!-- </v-container> -->
                            
                          </b-card-body>
                          
                        </b-card>
                      </b-col>

                      <b-col sm="6" lg="2">
                        <b-card no-body>
                          <b-card-body class="pb-0">
                            
                            <!-- <v-container fluid grid-list-lg> -->
                              <v-layout row>
                                <v-flex xs7>
                                  <div>
                                    <div class="subheading">&nbsp;&nbsp;&nbsp;&nbsp;모레 오전</div>
                                    <div class="title">&nbsp;&nbsp;&nbsp;{{ afterTomorrowAmT1h }}</div>
                                  </div>
                                </v-flex>
                                <v-flex xs5>
                                  <v-img
                                    :src="afTomAmSkyImg"
                                    height="100px"
                                    contain
                                  ></v-img>
                                </v-flex>
                              </v-layout>

                            <!-- </v-container> -->
                            
                          </b-card-body>
                          
                        </b-card>
                      </b-col>

                      <b-col sm="6" lg="2">
                        <b-card no-body>
                          <b-card-body class="pb-0">
                            
                            <!-- <v-container fluid grid-list-lg> -->
                              <v-layout row>
                                <v-flex xs7>
                                  <div>
                                    <div class="subheading">&nbsp;&nbsp;&nbsp;&nbsp;모레 오후</div>
                                    <div class="title">&nbsp;&nbsp;&nbsp;{{ afterTomorrowPmT1h }}</div>
                                  </div>
                                </v-flex>
                                <v-flex xs5>
                                  <v-img
                                    :src="afTomPmSkyImg"
                                    height="100px"
                                    contain
                                  ></v-img>
                                </v-flex>
                              </v-layout>

                            <!-- </v-container> -->
                            
                          </b-card-body>
                          
                        </b-card>
                      </b-col>

                    </b-row>

                  </div>
                </b-col>              
              </b-row>              
            </b-card>
          </b-col>
        </b-row>
        
      </div>

      <!-- 영농일지 캘린더 -->
      <div style="width:1200px; margin:0 auto;">
        <b-row>
          <b-col md="12">
            <b-card header="영농일지 캘린더" header-tag="header">
              <h3 slot="header" class="mb-0"><strong>영농일지 캘린더</strong></h3>
              <b-row>
                <b-col sm="12" lg="6">
                  <div style="width:1150px; margin:0 auto;">
                    <!-- https://stackoverflow.com/questions/35988815/fullcalendar-dayclick-not-working-does-nothing -->
                    <full-calendar :config="config" :events="events" @event-selected="eventSelected" style="overflow: auto;"/>
                  </div>
                </b-col>              
              </b-row>              
            </b-card>
          </b-col>
        </b-row>
      </div>
      <!-- 영농일지 캘린더 -->
      
      <!-- <div style="height:100%; margin-bottom:400px; background:red; overflow:auto;"> -->
      <div style="width:1200px; margin:0 auto;">  
        <!-- <br/><br/><br/> -->
        <journalModal></journalModal>
        <journalModalForEdit></journalModalForEdit>
        <addWorkTypeModal></addWorkTypeModal>
        <addCustomItemModal></addCustomItemModal>
        <predictModalForShow></predictModalForShow>
      </div>            
      <!-- </div> -->

    <!-- <div style="float: right; display: inline; width: 50%"> -->
      <div v-if='showMarketPrice' style="width:1200px; margin:0 auto;">
        <!--
        <v-toolbar v-if='showMarketPrice' flat color="white">
          <v-toolbar-title>판매가격 정보</v-toolbar-title>
          <v-divider
            class="mx-2"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>          
        </v-toolbar>
        -->
        <b-row>
          <b-col md="12">
            <b-card header="판매가격 정보" header-tag="header">
              <h3 slot="header" class="mb-0"><strong>판매가격 정보</strong></h3>
              <b-row>
                <b-col sm="12" lg="6">
                  <div style="width:1150px; margin:0 auto;">
                    <v-data-table
                      :headers="headers"
                      :items="crops"
                      :pagination.sync="pagination2"
                      hide-actions
                      class="elevation-1"
                      v-if='showMarketPrice'
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
                        <td :style="{backgroundColor: (props.index % 2 ? '#E0E4FF' : 'transparent')}"><h4>{{ props.item.PRDLST_NM }}</h4></td>
                        <td :style="{backgroundColor: (props.index % 2 ? '#E0E4FF' : 'transparent')}"><h4>{{ props.item.PBLMNG_WHSAL_MRKT_NM }}</h4></td>
                        <td :style="{backgroundColor: (props.index % 2 ? '#E0E4FF' : 'transparent')}"><h4>{{ props.item.GRAD }}</h4></td>
                        <td :style="{backgroundColor: (props.index % 2 ? '#E0E4FF' : 'transparent')}"><h4>{{ props.item.DELNGBUNDLE_QY }}{{ props.item.STNDRD }}</h4></td>
                        <td :style="{backgroundColor: (props.index % 2 ? '#E0E4FF' : 'transparent')}"><h4>{{ props.item.MUMM_AMT }}</h4></td>
                        <td :style="{backgroundColor: (props.index % 2 ? '#E0E4FF' : 'transparent')}"><h4>{{ props.item.AVRG_AMT }}</h4></td>
                        <td :style="{backgroundColor: (props.index % 2 ? '#E0E4FF' : 'transparent')}"><h4>{{ props.item.MXMM_AMT }}</h4></td>
                      </template>
                    </v-data-table>
                    <div class="text-xs-center pt-2">
                      <v-pagination v-model="pagination2.page" :length="pages2"></v-pagination>
                    </div>
                  </div>
                </b-col>              
              </b-row>              
            </b-card>
          </b-col>
        </b-row>

        <!-- <hr/> -->
      </div>

      <div v-if='showPredictTable' style="width:1200px; margin:0 auto;">
        <!--
        <v-toolbar flat color="white" v-if='showPredictTable'>
          <v-toolbar-title>농작업일정 예측</v-toolbar-title>
          <v-divider
            class="mx-2"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>          
        </v-toolbar>
        -->

        <b-row>
          <b-col md="12">
            <b-card header="농작업일정 예측" header-tag="header">
              <h3 slot="header" class="mb-0"><strong>농작업일정 예측</strong></h3>
              <b-row>
                <b-col sm="12" lg="6">
                  <div style="width:1150px; margin:0 auto;">
                    <v-data-table
                      :headers="headersForPredict"
                      :items="journals"
                      :pagination.sync="pagination"
                      hide-actions
                      class="elevation-1"
                      v-if='showPredictTable'
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
                        <td :style="{backgroundColor: (props.index % 2 ? '#E0E4FF' : 'transparent')}" @click="showItem(props.item)"><h4>{{ props.item.landName }}</h4></td>
                        <td :style="{backgroundColor: (props.index % 2 ? '#E0E4FF' : 'transparent')}" @click="showItem(props.item)"><h4>{{ getDateWithKorean(props.item.date) }}</h4></td>
                        <td :style="{backgroundColor: (props.index % 2 ? '#E0E4FF' : 'transparent')}" @click="showItem(props.item)"><h4>{{ props.item.workName }}</h4></td>
                        <td :style="{backgroundColor: (props.index % 2 ? '#E0E4FF' : 'transparent')}" @click="showItem(props.item)"><h4>{{ props.item.sky }}</h4></td>
                        <td :style="{backgroundColor: (props.index % 2 ? '#E0E4FF' : 'transparent')}" @click="showItem(props.item)"><h4>{{ props.item.t1h }}</h4></td>  
                        <!--
                        <td :style="{backgroundColor: (props.index % 2 ? '#F6F7FE' : 'transparent')}" class="justify-center layout px-0">
                          <v-btn icon class="mx-0" @click="showItem(props.item)">
                            <v-icon color="teal">remove_red_eye</v-icon>
                          </v-btn>
                        </td>          
                        -->
                      </template>
                    </v-data-table>
                    <div class="text-xs-center pt-2">
                      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
                    </div>
                  </div>
                </b-col>              
              </b-row>              
            </b-card>
          </b-col>
        </b-row>
        
      </div>
    <!-- </div> -->
</div>
</template>

<script>
    import moment from 'moment'
    import {bus} from '../main'
    import JournalService from '@/services/JournalService'
    // import WcService from '@/services/WcService'
    // import ScService from '@/services/ScService'
    import LandService from '@/services/LandService'
    import WeatherService from '@/services/WeatherService'
    import ItemService from '@/services/ItemService'
    import PriceService from '@/services/PriceService'
    import DcService from '@/services/DcService'
    import proj4 from 'proj4'
    
    export default {
  data () {
        return {
          pagination2: {
            // https://github.com/vuetifyjs/vuetify/issues/442
            descending: true,
            rowsPerPage: 10
          },
          pagination: {
            // https://github.com/vuetifyjs/vuetify/issues/442
            sortBy: 'date',
            descending: true,
            rowsPerPage: 10
          },
          selectLand: '',
          landItems: [],
          showPredictTable: true,
          showMarketPrice: true,
          lastYearYM: '',
          calendarWidth: '',
          calendarHeight: '',
          startDate: '',
          endDate: '',
          journals: [],
          headersForPredict: [
            {
              text: '농장명',
              align: 'left',
              sortable: false,
              value: 'landName'
            },
            { text: '작업일', sortable: false, value: 'date' },
            { text: '작업명', sortable: false, value: 'workName' },
            { text: '날씨', sortable: false, value: 'sky' },
            { text: '온도', sortable: false, value: 't1h' }
            // { text: '관리', value: 'name', sortable: false, align: 'left', width: '5%' }
          ],
          headers: [
            {
              text: '품목명',
              align: 'left',
              sortable: false,
              value: 'PRDLST_NM'
            },
            { text: '도매시장명', sortable: false, value: 'PBLMNG_WHSAL_MRKT_NM' },
            { text: '등급', sortable: false, value: 'GRAD' },
            { text: '거래단량', sortable: false, value: 'DELNGBUNDLE_QY' },
            { text: '최소가', sortable: false, value: 'MUMM_AMT' },
            { text: '평균가', sortable: false, value: 'AVRG_AMT' },
            { text: '최대가', sortable: false, value: 'MXMM_AMT' }
          ],
          crops: [],
          myCrops: [],
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
          userId: '',
          events: [
            /*
            {
              title: 'test',
              allDay: true,
              start: moment(),
              end: moment().add(1, 'd'),
              url: 'http://www.daum.net'
            },
            {
              title: 'another test',
              start: moment().add(2, 'd'),
              end: moment().add(2, 'd').add(2, 'h')
            }
            */
          ],
          config: {
            // height: 500,
            header: { // https://jsfiddle.net/amitavroy/7Lew1zm3/
              left: 'prev,next',
              center: 'title',
              right: 'today'
            },
            aspectRatio: 1.5,
            locale: 'ko',
            defaultView: 'month',
            eventRender: function (event, element) {
              // console.log(event)
            },
            dayClick (date, event, view) {
              // console.log(date.format())
              var todayDate = moment().format('YYYY-MM-DD')
              var clickedDate = date.format()
              if (todayDate < clickedDate) {
              } else {
                bus.$emit('dialog', date.format())
              }
            }
          }
        }
  },
  beforeCreate: function () {
        if (!this.$session.exists()) {
          this.$router.push('/login')
        } else {
        }
  },
  created () {
        this.userId = this.$session.get('userId')
        // this.$refs.calendar.fireMethod('changeView', view)
        this.getJournal()
        this.getItem()
        // this.getLocation()
        this.getMyCrop()
        this.getLastYearJournal()
        this.getLands()
        // media query
        // this.calendarWidth = '900px'
        this.calendarWidth = '49%'
        this.calendarHeight = '900px'
        this.config.aspectRatio = 1.5
  },
  mounted () {
        var vm = this
        bus.$on('toJournalForNew', function (value) {
          // vm.events.push(value)
          vm.events = []
          vm.getJournal()
          vm.getItem()
          vm.getLands()
        })
        bus.$on('toJournalForUpdate', function (value) {
          // vm.events.splice(value.eventIndex, 1)
          // vm.events.push(value)
          vm.events = []
          vm.getJournal()
          vm.getItem()
          vm.getLands()
        })
        bus.$on('toJournalForDel', function (value) {
          for (var i = 0; i < vm.events.length; i++) {
            if (vm.events[i].eventIndex === value) {
              vm.events.splice(i, 1)
            }
          }
        })
  },
  watch: {
        crops () {
          this.$nextTick(() => {
            this.pagination2.totalItems = this.crops.length
          })
        },
        // https://github.com/vuetifyjs/vuetify/issues/4455
        journals () {
          this.$nextTick(() => {
            this.pagination.totalItems = this.journals.length
          })
        }
  },
  computed: {
        pages2 () {
          if (this.pagination2.rowsPerPage == null ||
            this.pagination2.totalItems == null
          ) return 0

          return Math.ceil(this.pagination2.totalItems / this.pagination2.rowsPerPage)
        },
        pages () {
          if (this.pagination.rowsPerPage == null ||
            this.pagination.totalItems == null
          ) return 0

          return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
        }
  },
  methods: {
        onChangeLand: function (event) {
          this.selectLand = event
          this.getWeatherData()
        },
        eventSelected: function (event, jsEvent, view) {
          // console.log(event)
          bus.$emit('dialogForEdit', event)
        },
        async getLands () {
          const response = await LandService.fetchLands({
            userId: this.userId
          })
          this.landItems = response.data.lands
          this.onChangeLand(response.data.lands[0]._id) // 맨처음의 농장을 기본으로 선택
        },
        async getMyCrop () {
          this.myCrops = []
          const response = await LandService.fetchLands({
            userId: this.userId
          })
          for (var i = 0; i < response.data.lands.length; i++) {
            const response2 = await DcService.fetchCropNameByCropCode({
              cropCode: response.data.lands[i].cropCode
            })
            this.myCrops.push(response2.data[0].text)
          }
          // console.log(this.myCrops)
          for (var j = 0; j < this.myCrops.length; j++) {
            const response3 = await PriceService.fetchPriceData({
              productName: this.myCrops[j]
            })
            // console.log(response3.data)
            if (response3.data) {
              // console.log(response3.data.Grid_20150401000000000216_1.row)
              for (var k = 0; k < response3.data.Grid_20150401000000000216_1.row.length; k++) {
                response3.data.Grid_20150401000000000216_1.row[k].MUMM_AMT = '￦' + this.numberWithCommas(response3.data.Grid_20150401000000000216_1.row[k].MUMM_AMT)
                response3.data.Grid_20150401000000000216_1.row[k].AVRG_AMT = '￦' + this.numberWithCommas(response3.data.Grid_20150401000000000216_1.row[k].AVRG_AMT)
                response3.data.Grid_20150401000000000216_1.row[k].MXMM_AMT = '￦' + this.numberWithCommas(response3.data.Grid_20150401000000000216_1.row[k].MXMM_AMT)
                this.crops.push(response3.data.Grid_20150401000000000216_1.row[k])
              }
            }
          }
          if (this.crops.length === 0) {
            this.showMarketPrice = false
          }
        },
        async getJournal () {
          const response = await JournalService.fetchJournalLookupByUserId({
            userId: this.userId
          })
          for (var i = 0; i < response.data.length; i++) {
            var tmpEvent = {}

            tmpEvent.title = response.data[i].landInfo.name + ' - ' + response.data[i].wcsInfo.text

            var tmpTime = response.data[i].date
            tmpEvent.start = tmpTime
            tmpEvent.end = tmpTime
            tmpEvent.journalId = response.data[i]._id
            tmpEvent.textColor = 'white'
            this.events.push(tmpEvent)
            tmpEvent.eventIndex = this.events.indexOf(tmpEvent)
          }
        },
        async getItem () {
          const response = await ItemService.fetchItemsLookupByUserId({
            userId: this.userId
          })

          for (var i = 0; i < response.data.length; i++) {
            var tmpEvent = {}
            tmpEvent.title = response.data[i].wcsInfo.text + ' 구입'
            var tmpTime = response.data[i].date
            tmpEvent.start = tmpTime
            tmpEvent.end = tmpTime
            tmpEvent.itemId = response.data[i]._id
            tmpEvent.color = 'orange'
            tmpEvent.textColor = 'white'
            this.events.push(tmpEvent)
            tmpEvent.eventIndex = this.events.indexOf(tmpEvent)
          }
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
                  this.todaySkyImg = require('../assets/sun.png')
                  break
                case 1 :  // 비
                  this.todaySkyImg = require('../assets/rain.png')
                  break
                case 2 :  // 비,눈
                  this.todaySkyImg = require('../assets/rain.png')
                  break
                case 3 :  // 눈
                  this.todaySkyImg = require('../assets/snow.png')
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
                  // this.tt1Sky = '맑음'
                  console.log('맑음')
                  this.tomAmSkyImg = require('../assets/sun.png')
                  break
                case '2' :
                  // this.tt1Sky = '구름조금'
                  this.tomAmSkyImg = require('../assets/cloud1.png')
                  break
                case '3' :
                  // this.tt1Sky = '구름많음'
                  this.tomAmSkyImg = require('../assets/cloud2.png')
                  break
                case '4' :
                  // this.tt1Sky = '흐림'
                  this.tomAmSkyImg = require('../assets/heu.png')
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
                  this.tomPmSkyImg = require('../assets/sun.png')
                  break
                case '2' :
                  this.tomPmSkyImg = require('../assets/cloud1.png')
                  break
                case '3' :
                  this.tomPmSkyImg = require('../assets/cloud2.png')
                  break
                case '4' :
                  this.tomPmSkyImg = require('../assets/heu.png')
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
                  // this.tt2Sky = '맑음'
                  this.afTomAmSkyImg = require('../assets/sun.png')
                  break
                case '2' :
                  // this.tt2Sky = '구름조금'
                  this.afTomAmSkyImg = require('../assets/cloud1.png')
                  break
                case '3' :
                  // this.tt2Sky = '구름많음'
                  this.afTomAmSkyImg = require('../assets/cloud2.png')
                  break
                case '4' :
                  // this.tt2Sky = '흐림'
                  this.afTomAmSkyImg = require('../assets/heu.png')
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
                  this.afTomPmSkyImg = require('../assets/sun.png')
                  break
                case '2' :
                  this.afTomPmSkyImg = require('../assets/cloud1.png')
                  break
                case '3' :
                  this.afTomPmSkyImg = require('../assets/cloud2.png')
                  break
                case '4' :
                  this.afTomPmSkyImg = require('../assets/heu.png')
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
        async getJournalsByDate () {
          const response = await JournalService.fetchJournalLookup({
            startDate: this.startDate,
            endDate: this.endDate,
            userId: this.userId
          })

          if (response.data.length > 0) {
            var tmpJournals = response.data
            for (var i = 0; i < response.data.length; i++) {
              tmpJournals[i].landName = response.data[i].landInfo.name
              tmpJournals[i].workName = response.data[i].wcsInfo.text
              tmpJournals[i].sky = tmpJournals[i].weather.sky
              if (tmpJournals[i].sky === 'No data') {
                tmpJournals[i].sky = '-'
              }
              tmpJournals[i].t1h = tmpJournals[i].weather.avgT1H
              if (tmpJournals[i].t1h === 'No data') {
                tmpJournals[i].t1h = '-'
              }
            }
            this.journals = tmpJournals
          } else {  // 작년 10일이내의 데이터가 없는 경우 작년 해당월의 데이터를 보여줌
            const response4 = await JournalService.fetchJournalLookupByYMUserId({
              ym: this.lastYearYM,
              userId: this.userId
            })
            var tmpJournals2 = response4.data

            for (var j = 0; j < response4.data.length; j++) {
              tmpJournals2[j].landName = response4.data[j].landInfo.name
              tmpJournals2[j].workName = response4.data[j].wcsInfo.text
              tmpJournals2[j].sky = tmpJournals2[j].weather.sky
              tmpJournals2[j].t1h = tmpJournals2[j].weather.avgT1H
            }
            this.journals = tmpJournals2
          }

          if (this.journals.length === 0) {
            this.showPredictTable = false
          }
        },
        getLastYearJournal: function () {
          var event = moment().format('YYYY-MM-DD')
          var today = moment(event, 'YYYY-MM-DD')
          var lastYear = today.subtract(1, 'year')
          var lastYearBefore10 = lastYear.subtract(10, 'day')
          this.startDate = lastYearBefore10.format('YYYY-MM-DD')
          // console.log(this.startDate)
          var lastYearAfter10 = lastYear.add(20, 'day')
          this.endDate = lastYearAfter10.format('YYYY-MM-DD')
          // console.log(this.endDate)
          this.lastYearYM = moment(event, 'YYYY-MM').subtract(1, 'year').format('YYYY-MM')
          // console.log(this.lastYearYM)

          this.getJournalsByDate()
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
        /*
        getLocation: function () {
          this.getWeatherData()
        },
        */
        async getWeatherData () {
          var vm = this
          // landId로 농장주소 얻기
          const response = await LandService.fetchNameByLandId({
            landId: this.selectLand
          })
          // Do geo coding
          // https://github.com/googlemaps/google-maps-services-js
          var googleMapsClient = require('@google/maps').createClient({
            key: 'AIzaSyAbcu_ORn9DV9mv0GFbxwX3FrYFMyL-nRA'
          })
          googleMapsClient.geocode({
            address: response.data[0].address
          }, function (err, response) {
            if (!err) {
              // vm.weatherLoc = response.json.results[0].address_components[0].short_name

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
        numberWithCommas: function (x) {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
        showItem (item) {
          // console.log(item)
          var emitParams = {'journalId': item._id, 'origin': 'fromPredict'}
          bus.$emit('dialogForShow', emitParams)
        }
  }
}
</script>