<template>
  <div style="width:1680px; margin:0 auto;">
    <!-- dummy --> <div style="height:20px"/>
<!-- 주차대수 통계 -->
        <b-row>
          <b-col md="12">
            <b-card header="주차대수 통계" header-tag="header">
              <h4 slot="header" class="mb-0"><strong>주차대수 통계</strong></h4>
              <b-row>
                <b-col sm="12" lg="12">
                  <div style="width:1560px; margin:0 auto;">
            
    <v-layout row wrap justify-center>

      <v-flex xs12 class="text-xs-center" mt-1>
        <v-layout row ma-2 justify-center>
          <v-flex xs4 md2 order-md1 order-xs1>
            <v-menu
              :close-on-content-click="false"
              v-model="menu9"
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
                v-model="computedDateFormatted9"
                label="시작년월일"
                persistent-hint
                prepend-icon="event"
                readonly
                :error-messages="errors.collect('startDate5')"
                required=""
                v-validate="'required'" 
                data-vv-name="startDate5"
              ></v-text-field>
              <v-date-picker v-model="sDate5" no-title @input="menu9 = false" locale='euc-kr'></v-date-picker>
            </v-menu>
          </v-flex>
          
          <v-flex xs4 md2 order-md2 order-xs2>
            <v-menu
              :close-on-content-click="false"
              v-model="menu10"
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
                v-model="computedDateFormatted10"
                label="종료년월일"
                persistent-hint
                prepend-icon="event"
                readonly
                :error-messages="errors.collect('endDate5')"
                required=""
                v-validate="'required'" 
                data-vv-name="endDate5"
              ></v-text-field>
              <v-date-picker v-model="eDate5" no-title @input="menu10 = false" locale='euc-kr'></v-date-picker>
            </v-menu>
          </v-flex>

<!--
          <v-flex xs2 md2 order-md3 order-xs3>            
          </v-flex>

          <v-flex xs2 md2 order-md4 order-xs4>            
          </v-flex>
-->
          <v-flex xs4 md1 order-md5 order-xs5>
            <v-btn              
              color="primary"
              class="white--text"
              @click.native="searchTotalStats"
            >
              검색
            </v-btn>
          </v-flex>     
        </v-layout>
      </v-flex>      

      <div id="chartContainerForStats" style="height: 200px; width: 95%;" />
      
    </v-layout>
          
                  </div>
                </b-col> 

                <!-- 평균 주차 지속 시간 -->
                <b-col sm="12" lg="4">
                  <b-card no-body class="mb-0">
                    <b-card-body class="pb-0">  
                        <v-layout>
                          <div>                    
                            <div id="chartContainer1" style="height: 60px; width: 100%;" />                            
                            <div id="total" style="position:absolute;left:5px;top:-150px;height:100%;width:100%;line-height:360px;text-align:center;color:black;font-size:18px;">평균 주차 지속 시간</div>
                            <div id="total" style="position:absolute;left:5px;top:-120px;height:100%;width:100%;line-height:360px;text-align:center;color:black;font-size:24px;font-weight:bold;">{{ avgParkingTime }}</div>
                          </div>
                        </v-layout>                      
                    </b-card-body>
                  </b-card>
                </b-col>
                <!-- 평균 주차 지속 시간 -->

                <!-- 주차 회전율 -->
                <b-col sm="12" lg="4">
                  <b-card no-body class="mb-0">
                    <b-card-body class="pb-0">  
                        <v-layout>
                          <div>                    
                            <div id="chartContainer1" style="height: 60px; width: 100%;" />
                            <div id="total" style="position:absolute;left:5px;top:-150px;height:100%;width:100%;line-height:360px;text-align:center;color:black;font-size:18px;">주차 회전율</div>
                            <div id="total" style="position:absolute;left:5px;top:-120px;height:100%;width:100%;line-height:360px;text-align:center;color:black;font-size:24px;font-weight:bold;">{{ parkingTurnover }}대</div>
                          </div>
                        </v-layout>                      
                    </b-card-body>
                  </b-card>
                </b-col>
                <!-- 주차 회전율 -->

                <!-- 주차 효율 -->
                <b-col sm="12" lg="4">
                  <b-card no-body class="mb-0">
                    <b-card-body class="pb-0">  
                        <v-layout>
                          <div>                    
                            <div id="chartContainer1" style="height: 60px; width: 100%;" />
                            <div id="total" style="position:absolute;left:5px;top:-150px;height:100%;width:100%;line-height:360px;text-align:center;color:black;font-size:18px;">주차 효율</div>
                            <div id="total" style="position:absolute;left:5px;top:-120px;height:100%;width:100%;line-height:360px;text-align:center;color:black;font-size:24px;font-weight:bold;">{{ parkingEfficiency }}%</div>
                          </div>
                        </v-layout>                      
                    </b-card-body>
                  </b-card>
                </b-col>
                <!-- 주차 효율 -->

              </b-row>              
            </b-card>
          </b-col>
        </b-row>
<!-- 주차대수 통계 -->

<!-- 주차 이용시간 통계 -->
        <b-row>
          <b-col md="6">
            <b-card header="주차 이용시간 통계" header-tag="header">
              <h4 slot="header" class="mb-0"><strong>주차 이용시간 통계</strong></h4>
              <b-row>
                <b-col sm="12" lg="6">
                  <div style="width:1150px; margin:0 auto;">
            
    <v-layout row wrap justify-center>

      <v-flex xs12 class="text-xs-center" mt-1>
        <v-layout row ma-2 justify-left>

          <v-flex xs1 md1 order-md1 order-xs1>            
          </v-flex>

          <v-flex xs4 md2 order-md1 order-xs1>
            <v-menu
              :close-on-content-click="false"
              v-model="menu5"
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
                v-model="computedDateFormatted5"
                label="시작년월일"
                persistent-hint
                prepend-icon="event"
                readonly
                :error-messages="errors.collect('startDate3')"
                required=""
                v-validate="'required'" 
                data-vv-name="startDate3"
              ></v-text-field>
              <v-date-picker v-model="sDate3" no-title @input="menu5 = false" locale='euc-kr'></v-date-picker>
            </v-menu>
          </v-flex>
          
          <v-flex xs4 md2 order-md2 order-xs2>
            <v-menu
              :close-on-content-click="false"
              v-model="menu6"
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
                v-model="computedDateFormatted6"
                label="종료년월일"
                persistent-hint
                prepend-icon="event"
                readonly
                :error-messages="errors.collect('endDate3')"
                required=""
                v-validate="'required'" 
                data-vv-name="endDate3"
              ></v-text-field>
              <v-date-picker v-model="eDate3" no-title @input="menu6 = false" locale='euc-kr'></v-date-picker>
            </v-menu>
          </v-flex>

          <v-flex xs1 md1 order-md3 order-xs3>            
          </v-flex>

          <v-flex xs4 md1 order-md5 order-xs5>
            <v-btn
              :loading="loading"
              :disabled="loading"
              color="primary"
              class="white--text"
              @click.native="searchUsageTimeStats"
            >
              검색
            </v-btn>
          </v-flex>     
        </v-layout>
      </v-flex>      

      <div id="chartContainerForUsage" style="height: 160px; width: 90%;" />      
      
    </v-layout>
          
                  </div>
                </b-col>              
              </b-row>              
            </b-card>
          </b-col>
<!-- 주차 이용시간 통계 -->

<!-- 주차 이용요일 통계 -->
          <b-col md="6">
            <b-card header="주차 이용요일 통계" header-tag="header">
              <h4 slot="header" class="mb-0"><strong>주차 이용요일 통계</strong></h4>
              <b-row>
                <b-col sm="12" lg="6">
                  <div style="width:1150px; margin:0 auto;">
            
    <v-layout row wrap justify-center>

      <v-flex xs12 class="text-xs-center" mt-1>
        <v-layout row ma-2 justify-left>

          <v-flex xs1 md1 order-md1 order-xs1>            
          </v-flex>

          <v-flex xs4 md2 order-md1 order-xs1>
            <v-menu
              :close-on-content-click="false"
              v-model="menu7"
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
                v-model="computedDateFormatted7"
                label="시작년월일"
                persistent-hint
                prepend-icon="event"
                readonly
                :error-messages="errors.collect('startDate4')"
                required=""
                v-validate="'required'" 
                data-vv-name="startDate4"
              ></v-text-field>
              <v-date-picker v-model="sDate4" no-title @input="menu7 = false" locale='euc-kr'></v-date-picker>
            </v-menu>
          </v-flex>
          
          <v-flex xs4 md2 order-md2 order-xs2>
            <v-menu
              :close-on-content-click="false"
              v-model="menu8"
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
                v-model="computedDateFormatted8"
                label="종료년월일"
                persistent-hint
                prepend-icon="event"
                readonly
                :error-messages="errors.collect('endDate4')"
                required=""
                v-validate="'required'" 
                data-vv-name="endDate4"
              ></v-text-field>
              <v-date-picker v-model="eDate4" no-title @input="menu8 = false" locale='euc-kr'></v-date-picker>
            </v-menu>
          </v-flex>

          <v-flex xs1 md1 order-md3 order-xs3>            
          </v-flex>

          <v-flex xs4 md1 order-md5 order-xs5>
            <v-btn
              :loading="loading"
              :disabled="loading"
              color="primary"
              class="white--text"
              @click.native="searchUsageDOWStats"
            >
              검색
            </v-btn>
          </v-flex>     
        </v-layout>
      </v-flex>      

      <div id="chartContainerForDOW" style="height: 160px; width: 90%;" />      
      
    </v-layout>
          
                  </div>
                </b-col>              
              </b-row>              
            </b-card>
          </b-col>        
<!-- 주차 이용요일 통계 -->
        </b-row>
      </div>
</template>

<script>
// import {bus} from '../main'
import ParkingDataService from '@/services/ParkingDataService'
import Moment from 'moment'
import { extendMoment } from 'moment-range'
const moment = extendMoment(Moment)
const CanvasJS = require('../../canvasjs.min.js')
export default {
  $_veeValidate: {
    validator: 'new'
  },
  data () {
    return {
      timeItems: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
      chartForUsage: '',
      chartForStats: '',
      chartForDOW: '',
      chart4Options: {
        animationEnabled: true,
        /*
        title:{
          text: "Composition of Internet Traffic in North America"
        },
        */
        axisX: {
          /*
          interval: 1,
          intervalType: "year",
          valueFormatString: "YYYY"
          */
          title: '일자',
          interval: 1,
          /*
          intervalType: 'day',
          valueFormatString: 'DD'
          */
          intervalType: 'day',
          valueFormatString: 'MM월 DD일'
        },
        axisY: {
          title: '주차대수'
          // suffix: '%'
        },
        toolTip: {
          shared: true
        },
        legend: {
          reversed: true,
          verticalAlign: 'center',
          horizontalAlign: 'right'
        },
        data: [{
          type: 'line',
          name: '입차대수',
          showInLegend: true,
          xValueFormatString: 'YYYY-MMMM-DD TT hh:mm',
          yValueFormatString: '#,##0\'대\'',
          color: 'Orange',
          dataPoints: [
            /*
            { x: new Date(2019, 0, 1, 0, 0), y: 65 },
            { x: new Date(2019, 0, 1, 0, 30), y: 35 },
            { x: new Date(2019, 0, 1, 1, 0), y: 45 },
            { x: new Date(2019, 0, 1, 1, 30), y: 25 },
            { x: new Date(2019, 0, 1, 2, 0), y: 15 },
            { x: new Date(2019, 0, 1, 2, 30), y: 35 },
            { x: new Date(2019, 0, 1, 3, 0), y: 45 },
            { x: new Date(2019, 0, 1, 3, 30), y: 35 },
            { x: new Date(2019, 0, 1, 4, 0), y: 75 },
            { x: new Date(2019, 0, 1, 4, 30), y: 35 },
            { x: new Date(2019, 0, 1, 5, 0), y: 45 },
            { x: new Date(2019, 0, 1, 5, 30), y: 15 },
            { x: new Date(2019, 0, 1, 6, 0), y: 65 },
            { x: new Date(2019, 0, 1, 6, 30), y: 35 },
            { x: new Date(2019, 0, 1, 7, 0), y: 45 },
            { x: new Date(2019, 0, 1, 7, 30), y: 25 },
            { x: new Date(2019, 0, 1, 8, 0), y: 15 },
            { x: new Date(2019, 0, 1, 8, 30), y: 35 },
            { x: new Date(2019, 0, 1, 9, 0), y: 45 },
            { x: new Date(2019, 0, 1, 9, 30), y: 35 },
            { x: new Date(2019, 0, 1, 10, 0), y: 75 },
            { x: new Date(2019, 0, 1, 10, 30), y: 35 },
            { x: new Date(2019, 0, 1, 11, 0), y: 45 },
            { x: new Date(2019, 0, 1, 11, 30), y: 15 },
            { x: new Date(2019, 0, 1, 12, 0), y: 65 },
            { x: new Date(2019, 0, 1, 12, 30), y: 35 },
            { x: new Date(2019, 0, 1, 13, 0), y: 45 },
            { x: new Date(2019, 0, 1, 13, 30), y: 25 },
            { x: new Date(2019, 0, 1, 14, 0), y: 15 },
            { x: new Date(2019, 0, 1, 14, 30), y: 35 },
            { x: new Date(2019, 0, 1, 15, 0), y: 45 },
            { x: new Date(2019, 0, 1, 15, 30), y: 35 },
            { x: new Date(2019, 0, 1, 16, 0), y: 75 },
            { x: new Date(2019, 0, 1, 16, 30), y: 35 },
            { x: new Date(2019, 0, 1, 17, 0), y: 45 },
            { x: new Date(2019, 0, 1, 17, 30), y: 15 },
            { x: new Date(2019, 0, 1, 18, 0), y: 65 },
            { x: new Date(2019, 0, 1, 18, 30), y: 35 },
            { x: new Date(2019, 0, 1, 19, 0), y: 45 },
            { x: new Date(2019, 0, 1, 19, 30), y: 25 },
            { x: new Date(2019, 0, 1, 20, 0), y: 15 },
            { x: new Date(2019, 0, 1, 20, 30), y: 35 },
            { x: new Date(2019, 0, 1, 21, 0), y: 45 },
            { x: new Date(2019, 0, 1, 21, 30), y: 35 },
            { x: new Date(2019, 0, 1, 22, 0), y: 75 },
            { x: new Date(2019, 0, 1, 22, 30), y: 35 },
            { x: new Date(2019, 0, 1, 23, 0), y: 45 },
            { x: new Date(2019, 0, 1, 23, 30), y: 15 },
            { x: new Date(2019, 0, 2, 0, 0), y: 25 },
            { x: new Date(2019, 0, 2, 0, 30), y: 45 },
            { x: new Date(2019, 0, 2, 1, 0), y: 15 },
            { x: new Date(2019, 0, 2, 1, 30), y: 25 },
            { x: new Date(2019, 0, 2, 2, 0), y: 35 },
            { x: new Date(2019, 0, 2, 2, 30), y: 45 },
            { x: new Date(2019, 0, 2, 3, 0), y: 55 },
            { x: new Date(2019, 0, 2, 3, 30), y: 65 },
            { x: new Date(2019, 0, 2, 4, 0), y: 45 },
            { x: new Date(2019, 0, 2, 4, 30), y: 35 }
            */
          ]
        },
        {
          type: 'line',
          name: '출차대수',
          showInLegend: true,
          xValueFormatString: 'YYYY-MMMM-DD TT hh:mm',
          yValueFormatString: '#,##0\'대\'',
          color: 'Blue',
          dataPoints: [
            /*
            { x: new Date(2019, 0, 1, 0, 0), y: 65 },
            { x: new Date(2019, 0, 1, 0, 30), y: 35 },
            { x: new Date(2019, 0, 1, 1, 0), y: 45 },
            { x: new Date(2019, 0, 1, 1, 30), y: 25 },
            { x: new Date(2019, 0, 1, 2, 0), y: 15 },
            { x: new Date(2019, 0, 1, 2, 30), y: 35 },
            { x: new Date(2019, 0, 1, 3, 0), y: 45 },
            { x: new Date(2019, 0, 1, 3, 30), y: 35 },
            { x: new Date(2019, 0, 1, 4, 0), y: 75 },
            { x: new Date(2019, 0, 1, 4, 30), y: 35 },
            { x: new Date(2019, 0, 1, 5, 0), y: 45 },
            { x: new Date(2019, 0, 1, 5, 30), y: 15 },
            { x: new Date(2019, 0, 1, 6, 0), y: 65 },
            { x: new Date(2019, 0, 1, 6, 30), y: 35 },
            { x: new Date(2019, 0, 1, 7, 0), y: 45 },
            { x: new Date(2019, 0, 1, 7, 30), y: 25 },
            { x: new Date(2019, 0, 1, 8, 0), y: 15 },
            { x: new Date(2019, 0, 1, 8, 30), y: 35 },
            { x: new Date(2019, 0, 1, 9, 0), y: 45 },
            { x: new Date(2019, 0, 1, 9, 30), y: 35 },
            { x: new Date(2019, 0, 1, 10, 0), y: 75 },
            { x: new Date(2019, 0, 1, 10, 30), y: 35 },
            { x: new Date(2019, 0, 1, 11, 0), y: 45 },
            { x: new Date(2019, 0, 1, 11, 30), y: 15 },
            { x: new Date(2019, 0, 1, 12, 0), y: 65 },
            { x: new Date(2019, 0, 1, 12, 30), y: 35 },
            { x: new Date(2019, 0, 1, 13, 0), y: 45 },
            { x: new Date(2019, 0, 1, 13, 30), y: 25 },
            { x: new Date(2019, 0, 1, 14, 0), y: 15 },
            { x: new Date(2019, 0, 1, 14, 30), y: 35 },
            { x: new Date(2019, 0, 1, 15, 0), y: 45 },
            { x: new Date(2019, 0, 1, 15, 30), y: 35 },
            { x: new Date(2019, 0, 1, 16, 0), y: 75 },
            { x: new Date(2019, 0, 1, 16, 30), y: 35 },
            { x: new Date(2019, 0, 1, 17, 0), y: 45 },
            { x: new Date(2019, 0, 1, 17, 30), y: 15 },
            { x: new Date(2019, 0, 1, 18, 0), y: 65 },
            { x: new Date(2019, 0, 1, 18, 30), y: 35 },
            { x: new Date(2019, 0, 1, 19, 0), y: 45 },
            { x: new Date(2019, 0, 1, 19, 30), y: 25 },
            { x: new Date(2019, 0, 1, 20, 0), y: 15 },
            { x: new Date(2019, 0, 1, 20, 30), y: 35 },
            { x: new Date(2019, 0, 1, 21, 0), y: 45 },
            { x: new Date(2019, 0, 1, 21, 30), y: 35 },
            { x: new Date(2019, 0, 1, 22, 0), y: 75 },
            { x: new Date(2019, 0, 1, 22, 30), y: 35 },
            { x: new Date(2019, 0, 1, 23, 0), y: 45 },
            { x: new Date(2019, 0, 1, 23, 30), y: 15 },
            { x: new Date(2019, 0, 2, 0, 0), y: 25 },
            { x: new Date(2019, 0, 2, 0, 30), y: 45 },
            { x: new Date(2019, 0, 2, 1, 0), y: 15 },
            { x: new Date(2019, 0, 2, 1, 30), y: 25 },
            { x: new Date(2019, 0, 2, 2, 0), y: 35 },
            { x: new Date(2019, 0, 2, 2, 30), y: 45 },
            { x: new Date(2019, 0, 2, 3, 0), y: 55 },
            { x: new Date(2019, 0, 2, 3, 30), y: 65 },
            { x: new Date(2019, 0, 2, 4, 0), y: 45 },
            { x: new Date(2019, 0, 2, 4, 30), y: 35 }
            */
          ]
        }
        ]
      },
      chart5Options: {
        width: 640,
        animationEnabled: true,
        dataPointWidth: 20,
        // theme: 'light2', // "light1", "light2", "dark1", "dark2"
        /*
        title:{
          text: "Top Oil Reserves"
        },
        */
        axisY: {
          title: '주차대수'
        },
        data: [{
          // color: 'silver',
          type: 'column',
          // showInLegend: true,
          // legendMarkerColor: "grey",
          // legendText: "MMbbl = one million barrels",
          dataPoints: [
            /*
            { y: 15, label: '30분이내', color: 'OrangeRed' },
            { y: 25, label: '1시간이내', color: 'Orange' },
            { y: 35, label: '2시간이내', color: 'OrangeRed' },
            { y: 30, label: '2시간초과', color: 'Orange' }
            */
          ]
        }]
      },
      chart6Options: {
        width: 640,
        animationEnabled: true,
        dataPointWidth: 20,
        // theme: 'light2', // "light1", "light2", "dark1", "dark2"
        /*
        title:{
          text: "Top Oil Reserves"
        },
        */
        axisY: {
          title: '주차대수'
        },
        data: [{
          // color: 'silver',
          type: 'column',
          // showInLegend: true,
          // legendMarkerColor: "grey",
          // legendText: "MMbbl = one million barrels",
          dataPoints: [
            /*
            { y: 14, label: '일', color: 'Orange' },
            { y: 28, label: '월', color: 'Orange' },
            { y: 16, label: '화', color: 'Orange' },
            { y: 15, label: '수', color: 'Orange' },
            { y: 30, label: '목', color: 'OrangeRed' },
            { y: 10, label: '금', color: 'Orange' },
            { y: 9, label: '토', color: 'OrangeRed' }
            */
          ]
        }]
      },
      userId: 'hyeok',
      valid: true,
      name: '',
      startDate5: null,
      endDate5: null,
      sDate5: null,
      eDate5: null,
      startDate3: null,
      endDate3: null,
      sDate3: null,
      eDate3: null,
      startDate4: null,
      endDate4: null,
      sDate4: null,
      eDate4: null,
      menu5: false,
      menu6: false,
      menu7: false,
      menu8: false,
      menu9: false,
      menu10: false,
      loader: null,
      loading: false,
      weatherData: null,
      dictionary: {
        custom: {
          startDate3: {
            required: '시작날짜를 입력해주세요'
          },
          endDate3: {
            required: '종료날짜를 입력해주세요'
          },
          startDate5: {
            required: '시작날짜를 입력해주세요'
          },
          endDate5: {
            required: '종료날짜를 입력해주세요'
          }
        }
      },
      avgParkingTime: '',
      parkingTurnover: '',
      parkingEfficiency: ''
    }
  },
  mounted () {
    this.$validator.localize('ko', this.dictionary)

    this.chartForStats = new CanvasJS.Chart('chartContainerForStats', this.chart4Options)
    this.chartForStats.render()

    this.chartForUsage = new CanvasJS.Chart('chartContainerForUsage', this.chart5Options)
    this.chartForUsage.render()

    this.chartForDOW = new CanvasJS.Chart('chartContainerForDOW', this.chart6Options)
    this.chartForDOW.render()
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
    this.userId = 'hyeok'

    // console.log(this.$route.params.parkingId)
    // console.log(this.$route.params.queryType)

    this.parkingId = '000-0-000001'
    this.queryType = 'B'

    if (this.queryType === 'A') {
      this.sDate3 = moment().format('2014-05-30').substr(0, 10)
      this.eDate3 = moment().format('2014-06-30').substr(0, 10)
      this.sDate4 = moment().format('2014-05-30').substr(0, 10)
      this.eDate4 = moment().format('2014-06-30').substr(0, 10)
      this.sDate5 = moment().format('2014-05-30').substr(0, 10)
      this.eDate5 = moment().format('2014-06-30').substr(0, 10)
    } else if (this.queryType === 'B') {
      this.sDate3 = moment().format('2018-11-01').substr(0, 10)
      this.eDate3 = moment().format('2018-11-30').substr(0, 10)
      this.sDate4 = moment().format('2018-11-01').substr(0, 10)
      this.eDate4 = moment().format('2018-11-30').substr(0, 10)
      this.sDate5 = moment().format('2018-11-01').substr(0, 10)
      this.eDate5 = moment().format('2018-11-30').substr(0, 10)
    }
  },
  computed: {
    computedDateFormatted5 () {
      this.sDate3 = this.sDate3.substr(0, 10)
      // console.log(this.sDate3)
      return this.sDate3
    },
    computedDateFormatted6 () {
      this.eDate3 = this.eDate3.substr(0, 10)
      // console.log(this.eDate3)
      return this.eDate3
    },
    computedDateFormatted7 () {
      this.sDate4 = this.sDate4.substr(0, 10)
      // console.log(this.sDate4)
      return this.sDate4
    },
    computedDateFormatted8 () {
      this.eDate4 = this.eDate4.substr(0, 10)
      // console.log(this.eDate4)
      return this.eDate4
    },
    computedDateFormatted9 () {
      this.sDate5 = this.sDate5.substr(0, 10)
      // console.log(this.sDate5)
      return this.sDate5
    },
    computedDateFormatted10 () {
      this.eDate5 = this.eDate5.substr(0, 10)
      // console.log(this.eDate5)
      return this.eDate5
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
    async getAvgParkingTimeData () {
      const response = await ParkingDataService.fetchAvgParkingTime({
        parkingId: this.parkingId,
        queryType: this.queryType,
        startDate: this.sDate5,
        endDate: this.eDate5
      })

      // console.log(response.data)
      if (response.data.length > 0) {
        this.avgParkingTime = response.data[0].avgHour
        this.avgParkingTime = this.avgParkingTime.toFixed(1)

        this.avgParkingTime *= 60
        // console.log(this.avgParkingTime + '분')

        this.avgParkingTime = this.convertMinsToHrsMins(this.avgParkingTime)
        this.avgParkingTime += '분'
        // console.log(result)
      } else {
        this.avgParkingTime = '0분'
      }
    },
    async getParkingMaxUsageDOWData () {
      const response = await ParkingDataService.fetchParkingMaxUsageDOW({
        parkingId: this.parkingId,
        queryType: this.queryType,
        startDate: this.sDate4,
        endDate: this.eDate4
      })

      // console.log(response.data)

      var sunSum = response.data[0].sunSum
      var monSum = response.data[0].monSum
      var tueSum = response.data[0].tueSum
      var wedSum = response.data[0].wedSum
      var thuSum = response.data[0].thuSum
      var friSum = response.data[0].friSum
      var satSum = response.data[0].satSum

      let obj = { '일요일': sunSum, '월요일': monSum, '화요일': tueSum, '수요일': wedSum, '목요일': thuSum, '금요일': friSum, '토요일': satSum }
      let arr = Object.values(obj)
      let min = Math.min(...arr)
      let max = Math.max(...arr)
      console.log('DOW min:' + min)
      console.log('DOW max:' + max)

      var tmpDataPoints = []
      var tmpDataPoint = { y: sunSum, label: '일', color: 'Orange' }
      if (tmpDataPoint.y === min || tmpDataPoint.y === max) {
        tmpDataPoint.color = 'OrangeRed'
      }
      tmpDataPoints.push(tmpDataPoint)

      tmpDataPoint = { y: monSum, label: '월', color: 'Orange' }
      if (tmpDataPoint.y === min || tmpDataPoint.y === max) {
        tmpDataPoint.color = 'OrangeRed'
      }
      tmpDataPoints.push(tmpDataPoint)

      tmpDataPoint = { y: tueSum, label: '화', color: 'Orange' }
      if (tmpDataPoint.y === min || tmpDataPoint.y === max) {
        tmpDataPoint.color = 'OrangeRed'
      }
      tmpDataPoints.push(tmpDataPoint)

      tmpDataPoint = { y: wedSum, label: '수', color: 'Orange' }
      if (tmpDataPoint.y === min || tmpDataPoint.y === max) {
        tmpDataPoint.color = 'OrangeRed'
      }
      tmpDataPoints.push(tmpDataPoint)

      tmpDataPoint = { y: thuSum, label: '목', color: 'Orange' }
      if (tmpDataPoint.y === min || tmpDataPoint.y === max) {
        tmpDataPoint.color = 'OrangeRed'
      }
      tmpDataPoints.push(tmpDataPoint)

      tmpDataPoint = { y: friSum, label: '금', color: 'Orange' }
      if (tmpDataPoint.y === min || tmpDataPoint.y === max) {
        tmpDataPoint.color = 'OrangeRed'
      }
      tmpDataPoints.push(tmpDataPoint)

      tmpDataPoint = { y: satSum, label: '토', color: 'Orange' }
      if (tmpDataPoint.y === min || tmpDataPoint.y === max) {
        tmpDataPoint.color = 'OrangeRed'
      }
      tmpDataPoints.push(tmpDataPoint)

      this.chart6Options.data[0].dataPoints = tmpDataPoints
      this.chartForDOW.render()

      // this.parkingMaxUsageDOW = this.getKeyByValue(obj, max)
      // this.parkingMinUsageDOW = this.getKeyByValue(obj, min)
    },
    async getParkingMaxUsageTimeData () {
      const response = await ParkingDataService.fetchParkingMaxUsageTime({
        parkingId: this.parkingId,
        queryType: this.queryType,
        startDate: this.sDate3,
        endDate: this.eDate3
      })

      // console.log(response.data)
      if (response.data.length > 0) {
        var l30m = response.data[0].l30m
        var g30mN1h = response.data[0].g30mN1h
        var g1hN2h = response.data[0].g1hN2h
        var g2h = response.data[0].g2h
        let obj = { '30분이내': l30m, '1시간이내': g30mN1h, '2시간이내': g1hN2h, '2시간초과': g2h }
        let arr = Object.values(obj)
        let min = Math.min(...arr)
        let max = Math.max(...arr)
        console.log('min:' + min)
        console.log('max:' + max)

        var tmpDataPoints = []
        var tmpDataPoint = { y: l30m, label: '30분이내', name: '30분이내', color: 'Orange' }
        if (tmpDataPoint.y === min || tmpDataPoint.y === max) {
          tmpDataPoint.color = 'OrangeRed'
        }
        tmpDataPoints.push(tmpDataPoint)

        tmpDataPoint = { y: g30mN1h, label: '1시간이내', name: '1시간이내', color: 'Orange' }
        if (tmpDataPoint.y === min || tmpDataPoint.y === max) {
          tmpDataPoint.color = 'OrangeRed'
        }
        tmpDataPoints.push(tmpDataPoint)

        tmpDataPoint = { y: g1hN2h, label: '2시간이내', name: '2시간이내', color: 'Orange' }
        if (tmpDataPoint.y === min || tmpDataPoint.y === max) {
          tmpDataPoint.color = 'OrangeRed'
        }
        tmpDataPoints.push(tmpDataPoint)

        tmpDataPoint = { y: g2h, label: '2시간초과', name: '2시간초과', color: 'Orange' }
        if (tmpDataPoint.y === min || tmpDataPoint.y === max) {
          tmpDataPoint.color = 'OrangeRed'
        }
        tmpDataPoints.push(tmpDataPoint)

        this.chart5Options.data[0].dataPoints = tmpDataPoints
        this.chartForUsage.render()

        // this.parkingMaxUsageTime = this.getKeyByValue(obj, max)
        // this.parkingMinUsageTime = this.getKeyByValue(obj, min)
      } else {
        var tmpDataPoints2 = []
        tmpDataPoint = { y: 0, label: '0', name: '0', color: 'Orange' }
        tmpDataPoint.color = 'OrangeRed'
        tmpDataPoints2.push(tmpDataPoint)

        this.chart5Options.data[0].dataPoints = tmpDataPoints2
        this.chartForUsage.render()
      }
    },
    async getParkingTurnoverData () {
      // 주차이용대수
      const response = await ParkingDataService.fetchParkingUsageCount({
        parkingId: this.parkingId,
        queryType: this.queryType,
        startDate: this.sDate5,
        endDate: this.eDate5
      })
      var parkingUsageCount = response.data[0].parking_data_count

      // 주차장운영시간
      const response3 = await ParkingDataService.fetchParkingOpTime({
        parkingId: this.parkingId,
        queryType: this.queryType,
        startDate: this.sDate5,
        endDate: this.eDate5
      })
      var parkingOpTime = response3.data[0].opDateDifferenceHour

      this.parkingTurnover = (parkingUsageCount / parkingOpTime) / 100
      this.parkingTurnover = this.parkingTurnover.toFixed(1)
    },
    async getParkingEffData () {
      // 주차이용대수
      const response = await ParkingDataService.fetchParkingUsageCount({
        parkingId: this.parkingId,
        queryType: this.queryType,
        startDate: this.sDate5,
        endDate: this.eDate5
      })
      if (response.data.length === 0) {
        this.parkingEfficiency = 0
        return
      }
      var parkingUsageCount = response.data[0].parking_data_count

      // 평균주차시간
      const response2 = await ParkingDataService.fetchAvgParkingTime({
        parkingId: this.parkingId,
        queryType: this.queryType,
        startDate: this.sDate5,
        endDate: this.eDate5
      })
      if (response2.data.length === 0) {
        this.parkingEfficiency = 0
        return
      }
      var avgParkingTime = response2.data[0].avgHour

      // 주차장운영시간
      const response3 = await ParkingDataService.fetchParkingOpTime({
        parkingId: this.parkingId,
        queryType: this.queryType,
        startDate: this.sDate5,
        endDate: this.eDate5
      })
      if (response3.data.length === 0) {
        this.parkingEfficiency = 0
        return
      }
      var parkingOpTime = response3.data[0].opDateDifferenceHour

      this.parkingEfficiency = (parkingUsageCount * avgParkingTime) / (100 * parkingOpTime)
      this.parkingEfficiency *= 100
      this.parkingEfficiency = this.parkingEfficiency.toFixed(1)
    },
    async getInOutStatsData () {
      // 입차
      const response = await ParkingDataService.fetchJejuUnivParkingIn({
        parkingId: this.parkingId,
        startDate: this.sDate5,
        endDate: this.eDate5
      })
      console.log(response.data)

      var InDataPoints = []
      for (var i = 0; i < response.data.length; i++) {
        var tmpDataPoint = { x: new Date(response.data[i]._id), y: response.data[i].count }
        InDataPoints.push(tmpDataPoint)
      }

      // 출차
      const response2 = await ParkingDataService.fetchJejuUnivParkingOut({
        parkingId: this.parkingId,
        startDate: this.sDate5,
        endDate: this.eDate5
      })
      console.log(response2.data)

      var OutDataPoints = []
      for (var j = 0; j < response2.data.length; j++) {
        var tmpDataPoint2 = { x: new Date(response2.data[j]._id), y: response2.data[j].count }
        OutDataPoints.push(tmpDataPoint2)
      }

      this.chart4Options.data[0].dataPoints = InDataPoints
      this.chart4Options.data[1].dataPoints = OutDataPoints
      this.chartForStats.render()
    },
    searchUsageDOWStats: function () {
      this.getParkingMaxUsageDOW()
    },
    searchUsageTimeStats: function () {
      this.getParkingMaxUsageTime()
    },
    searchTotalStats: function () {
      this.getStatsData()
      this.getAvgParkingTime()
      this.getParkingEfficiency()
      this.getParkingTurnover()
    },
    getKeyByValue: function (object, value) {
      // https://stackoverflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value
      return Object.keys(object).find(key => object[key] === value)
    },
    getStatsData: function () {
      this.getInOutStatsData()
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
    convertMinsToHrsMins: function (mins) {
      let h = Math.floor(mins / 60)
      let m = mins % 60
      h = h < 10 ? '0' + h : h
      m = m < 10 ? '0' + m : m
      return `${h}시간${m}`
    },
    addSymbols: function (e) {
      var suffixes = ['', 'K', 'M', 'B']
      var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0)

      if (order > suffixes.length - 1) {
        order = suffixes.length - 1
      }

      var suffix = suffixes[order]
      return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix
    },
    toggleDataSeries: function (e) {
      if (typeof (e.dataSeries.visible) === 'undefined' || e.dataSeries.visible) {
        e.dataSeries.visible = false
      } else {
        e.dataSeries.visible = true
      }
      e.chart.render()
    }
  }
}
</script>
