<template>
<div style="position:absolute height:900px;">    
    <!-- <div id="calendar" v-bind:style="{ height: calendarHeight, width: calendarWidth, float: 'left'}"> -->
      <!-- dummy --> <div style="height:20px"/>

<!-- 날 씨 정 보 -->
<!--
      <div style="width:1600px; margin:0 auto;">
        
        <b-row>
          <b-col md="12">
            <b-card header="날씨 정보" header-tag="header">
              <h3 slot="header" class="mb-0"><strong>날씨 정보</strong></h3>
              <b-row>
                <b-col sm="12" lg="6">
                  <div style="width:1560px; margin:0 auto;">
                    
                    <b-row>
                      <b-col sm="6" lg="2">
                        <b-card no-body>
                          <b-card-body class="pb-0">
                                                        
                              <v-layout>
                                <div>                    
                                <div class="caption">                                  
                                  <v-text-field                                    
                                    v-model="parkingName"
                                    label="주소"                                    
                                    prepend-icon="event"
                                    readonly                                    
                                  ></v-text-field>
                                </div>
                                </div>
                              </v-layout>                                                          

                          </b-card-body>
                          
                        </b-card>
                      </b-col>

                      <b-col sm="6" lg="2">
                        <b-card no-body>
                          <b-card-body class="pb-0">
                            
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
                            
                          </b-card-body>
                          
                        </b-card>
                      </b-col>

                      <b-col sm="6" lg="2">
                        <b-card no-body>
                          <b-card-body class="pb-0">
                                                      
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
                            
                          </b-card-body>
                          
                        </b-card>
                      </b-col>

                      <b-col sm="6" lg="2">
                        <b-card no-body>
                          <b-card-body class="pb-0">
                            
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
                                                          
                          </b-card-body>
                          
                        </b-card>
                      </b-col>

                      <b-col sm="6" lg="2">
                        <b-card no-body>
                          <b-card-body class="pb-0">
                            
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
                            
                          </b-card-body>
                          
                        </b-card>
                      </b-col>

                      <b-col sm="6" lg="2">
                        <b-card no-body>
                          <b-card-body class="pb-0">
                            
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
-->
<!-- 날 씨 정 보 -->

      <!-- 주차장 현재현황 -->
      <div style="width:1680px; margin:0 auto;">
        <b-row>

<!-- 현재 주차 현황 -->          
          <b-col md="3">
            <b-card header="현재 주차 현황" header-tag="header">
              <h4 slot="header" class="mb-0"><strong>현재 주차 현황</strong></h4>

              <b-row>
                <!-- 어제 주차현황 -->
                <b-col sm="12" lg="6">
                  <b-card no-body>
                    <b-card-body class="pb-0">  
                        <v-layout>
                          <div>       
                            <div style="height: 40px; width: 100%;" />                                              
                            <div id="total" style="position:absolute;left:-50px;top:-165px;height:100%;width:100%;line-height:360px;text-align:center;color:black;font-size:14px;font-weight:bold;">어제 14시</div>
                            <div id="total" style="position:absolute;left:0px;top:-145px;height:100%;width:100%;line-height:360px;text-align:center;color:black;font-size:18px;">67/100대</div>
                          </div>
                        </v-layout>                      
                    </b-card-body>
                  </b-card>
                </b-col>
                <!-- 어제 주차현황 -->

                <!-- 그제 주차현황 -->                        
                <b-col sm="12" lg="6">
                  <b-card no-body>
                    <b-card-body class="pb-0">  
                        <v-layout>
                          <div>       
                            <div style="height: 40px; width: 100%;" />                                              
                            <div id="total" style="position:absolute;left:-50px;top:-165px;height:100%;width:100%;line-height:360px;text-align:center;color:black;font-size:14px;font-weight:bold;">그제 14시</div>
                            <div id="total" style="position:absolute;left:0px;top:-145px;height:100%;width:100%;line-height:360px;text-align:center;color:black;font-size:18px;">50/100대</div>
                          </div>
                        </v-layout>                      
                    </b-card-body>
                  </b-card>
                </b-col>
                <!-- 그제 주차현황 -->
              </b-row>

              <b-row>
              
                <!-- 현재 주차 현황 -->
                <b-col sm="12" lg="12">
                  <b-card no-body>
                    <b-card-body class="pb-0">  
                        <v-layout>
                          <div>                            
                            <div id="chartContainer1" style="height: 180px; width: 100%;" />                            
                            <div id="total" style="position:absolute;left:-120px;top:-160px;height:100%;width:100%;line-height:360px;text-align:center;color:black;font-size:14px;font-weight:bold;">현재 주차 현황</div>
                            <div id="total" style="position:absolute;left:120px;top:-160px;height:100%;width:100%;line-height:360px;text-align:center;color:black;font-size:14px;font-weight:bold;">2019.02.20 14시</div>
                            <div id="total" style="position:absolute;left:5px;top:-90px;height:100%;width:100%;line-height:360px;text-align:center;color:black;font-size:18px;">70대</div>                            
                            <div id="total" style="position:absolute;left:5px;top:-80px;height:100%;width:100%;line-height:360px;text-align:center;color:black;font-size:18px;">-------</div>                            
                            <div id="total" style="position:absolute;left:5px;top:-65px;height:100%;width:100%;line-height:360px;text-align:center;color:black;font-size:18px;">100대</div>                            
                          </div>
                        </v-layout>                      
                    </b-card-body>
                  </b-card>
                </b-col>
                <!-- 현재 주차 현황 -->  

              </b-row>              
            </b-card>
          </b-col>
<!-- 현재 주차 현황 -->

<!-- 주차장 이용 현황 분석 -->
          <b-col md="9">
            <b-card header="주차장 이용현황 분석" header-tag="header">
              <h4 slot="header" class="mb-0"><strong>주차장 이용현황 분석</strong> <span style="float:right;font-size:16px;">지난 1개월 수집데이터 기준</span></h4>
              <b-row>

                <!-- 주차 효율 & 회전율 -->
                <b-col sm="12" lg="4">
                  <b-card no-body>
                    <b-card-body class="pb-0">  
                        <v-layout>
                          <div>                                                
                            <div id="total" style="position:absolute;left:5px;top:-110px;height:100%;width:100%;line-height:360px;text-align:center;color:black;font-size:26px;">주차 효율</div>
                            <div id="total" style="position:absolute;left:5px;top:-80px;height:100%;width:100%;line-height:360px;text-align:center;color:black;font-size:24px;font-weight:bold;">{{ parkingEfficiency }}%</div>                
                            <div id="total" style="position:absolute;left:5px;top:-55px;height:100%;width:100%;line-height:360px;text-align:center;color:#c8ced3;font-size:24px;">-----------------------------------------------------</div>                
                            <div id="total" style="position:absolute;left:5px;top:-20px;height:100%;width:100%;line-height:360px;text-align:center;color:black;font-size:26px;">주차 회전율</div>
                            <div id="total" style="position:absolute;left:5px;top:10px;height:100%;width:100%;line-height:360px;text-align:center;color:black;font-size:24px;font-weight:bold;">{{ parkingTurnover }}대</div>                
                            <!-- <div id="chartContainer2" style="height: 300px; width: 100%;" /> -->
                            <div style="height: 261px; width: 100%;" />
                          </div>
                        </v-layout>                      
                    </b-card-body>
                  </b-card>
                </b-col>
                <!-- 주차 효율 & 회전율 -->            

                <!-- 가장 많은 주차 이용 시간 -->
                <b-col sm="12" lg="4">                
                    
                    <b-card no-body>
                      <b-card-body class="pb-0"> 

                          <b-row> 
                            <!-- 파이 차트 -->
                            <v-layout>
                              <div>                                                
                                <div id="total" style="position:absolute;left:-115px;top:-160px;height:100%;width:100%;line-height:360px;text-align:center;color:black;font-size:14px;font-weight:bold;z-index:10;">시간별 주차장 이용현황</div>                                
                                <div id="chartContainer3" style="height: 180px; width: 100%;" />
                              </div>
                            </v-layout>
                            <!-- 파이 차트 -->                      
                          </b-row>

                          <b-row>
                            <!-- MAX -->                        
                            <b-col sm="12" lg="6">
                              <b-card no-body>
                                <b-card-body class="pb-0">  
                                    <v-layout>
                                      <div>       
                                        <div style="height: 40px; width: 100%;" />
                                        <div id="total" style="position:absolute;left:-15px;top:-170px;height:100%;width:100%;line-height:360px;text-align:center;color:black;font-size:14px;">가장 많은 이용시간</div>
                                        <div id="total" style="position:absolute;left:0px;top:-150px;height:100%;width:100%;line-height:360px;text-align:center;color:black;font-size:18px;font-weight:bold;">{{ parkingMaxUsageTime }}</div>
                                      </div>
                                    </v-layout>                      
                                </b-card-body>
                              </b-card>
                            </b-col>
                            <!-- MAX -->

                            <!-- MIN -->                        
                            <b-col sm="12" lg="6">
                              <b-card no-body>
                                <b-card-body class="pb-0">  
                                    <v-layout>
                                      <div>       
                                        <div style="height: 40px; width: 100%;" />  
                                        <div id="total" style="position:absolute;left:-15px;top:-170px;height:100%;width:100%;line-height:360px;text-align:center;color:black;font-size:14px;">가장 적은 이용시간</div>                                                                                    
                                        <div id="total" style="position:absolute;left:0px;top:-150px;height:100%;width:100%;line-height:360px;text-align:center;color:black;font-size:18px;font-weight:bold;">{{ parkingMinUsageTime }}</div>
                                      </div>
                                    </v-layout>                      
                                </b-card-body>
                              </b-card>
                            </b-col>
                            <!-- MIN -->
                          </b-row>

                      </b-card-body>
                    </b-card>                  
                </b-col>
                <!-- 가장 많은 주차 이용 시간 -->

                <!-- 가장 붐비는 요일 -->
                <b-col sm="12" lg="4">
                  <b-card no-body>
                    <b-card-body class="pb-0">  

                      <b-row>
                        <!-- 파이 차트 -->
                        <v-layout>
                          <div>                                                
                            <div id="total" style="position:absolute;left:-115px;top:-160px;height:100%;width:100%;line-height:360px;text-align:center;color:black;font-size:14px;font-weight:bold;z-index:10;">요일별 주차장 이용현황</div>
                            <div id="chartContainer4" style="height: 180px; width: 100%;" />
                          </div>
                        </v-layout>       
                        <!-- 파이 차트 -->               
                      </b-row>

                      <b-row>
                        <!-- MAX -->                        
                        <b-col sm="12" lg="6">
                          <b-card no-body>
                            <b-card-body class="pb-0">  
                                <v-layout>
                                  <div>       
                                    <div style="height: 40px; width: 100%;" />  
                                    <div id="total" style="position:absolute;left:-15px;top:-170px;height:100%;width:100%;line-height:360px;text-align:center;color:black;font-size:14px;">가장 많은 이용요일</div>                                                                                    
                                    <div id="total" style="position:absolute;left:0px;top:-150px;height:100%;width:100%;line-height:360px;text-align:center;color:black;font-size:18px;font-weight:bold;">{{ parkingMaxUsageDOW }}</div>
                                  </div>
                                </v-layout>                      
                            </b-card-body>
                          </b-card>
                        </b-col>
                        <!-- MAX -->

                        <!-- MIN -->                        
                        <b-col sm="12" lg="6">
                          <b-card no-body>
                            <b-card-body class="pb-0">  
                                <v-layout>
                                  <div>       
                                    <div style="height: 40px; width: 100%;" />
                                    <div id="total" style="position:absolute;left:-15px;top:-170px;height:100%;width:100%;line-height:360px;text-align:center;color:black;font-size:14px;">가장 적은 이용요일</div>                                                                                      
                                    <div id="total" style="position:absolute;left:0px;top:-150px;height:100%;width:100%;line-height:360px;text-align:center;color:black;font-size:18px;font-weight:bold;">{{ parkingMinUsageDOW }}</div>
                                  </div>
                                </v-layout>                      
                            </b-card-body>
                          </b-card>
                        </b-col>
                        <!-- MIN -->
                      </b-row>

                    </b-card-body>
                  </b-card>
                </b-col>
                <!-- 가장 붐비는 요일 -->

              </b-row>              
            </b-card>
          </b-col>
<!-- 주차장 이용 현황 분석 -->
        </b-row>
      </div>
      <!-- 주차장 현재현황 -->  

      <!-- 주차장 입,출차 예측 -->
      <div style="width:1680px; margin:0 auto;">
        <b-row>
          <b-col md="12">
            <b-card header="주차장 입,출차 예측" header-tag="header">
              <h4 slot="header" class="mb-0"><strong>주차장 입,출차 예측</strong> <span style="float:right;font-size:16px;">{{ todayDate }} 기준</span></h4>
              <b-row>

                <b-col sm="6" lg="1">
                  <b-card no-body>
                    <b-card-body class="pb-0">  
                        <v-layout>
                          <div>    
                            <div id="total" style="position:absolute;left:-5px;top:-160px;height:100%;width:100%;line-height:360px;text-align:center;color:black;font-size:14px;font-weight:bold;z-index:10;">주차대수 예측</div>
                            <div id="total" style="position:absolute;left:-5px;top:-60px;height:100%;width:100%;line-height:360px;text-align:center;color:black;font-size:18px;font-weight:bold;z-index:10;">1시간후</div>
                            <div id="total" style="position:absolute;left:-5px;top:-45px;height:100%;width:100%;line-height:360px;text-align:center;color:#c8ced3;font-size:18px;font-weight:bold;z-index:10;">----------</div>
                            <div id="total" style="position:absolute;left:-5px;top:-30px;height:100%;width:100%;line-height:360px;text-align:center;color:black;font-size:18px;font-weight:bold;z-index:10;">60대</div>
                            <div id="chartContainerX" style="height: 220px; width: 100%; margin-top: 20px;" />                            
                          </div>
                        </v-layout>                      
                    </b-card-body>
                  </b-card>
                </b-col>
              
                <b-col sm="6" lg="2">
                  <b-card no-body>
                    <b-card-body class="pb-0">  
                        <v-layout>
                          <div>    
                            <div id="total" style="position:absolute;left:-45px;top:-160px;height:100%;width:100%;line-height:360px;text-align:center;color:black;font-size:14px;font-weight:bold;z-index:10;">1시간 후 입,출차 예측</div>                
                            <div id="chartContainer5" style="height: 220px; width: 100%; margin-top: 20px;" />                            
                          </div>
                        </v-layout>                      
                    </b-card-body>
                  </b-card>
                </b-col>

                <b-col sm="6" lg="3">
                  <b-card no-body>
                    <b-card-body class="pb-0">  
                        <v-layout>
                          <div>                    
                            <div id="total" style="position:absolute;left:-105px;top:-160px;height:100%;width:100%;line-height:360px;text-align:center;color:black;font-size:14px;font-weight:bold;z-index:10;">2019.02.21 입,출차 예측</div>                
                            <div id="chartContainer6" style="height: 220px; width: 100%; margin-top: 20px;" />                            
                          </div>
                        </v-layout>                      
                    </b-card-body>
                  </b-card>
                </b-col>

                <b-col sm="6" lg="3">
                  <b-card no-body>
                    <b-card-body class="pb-0">  
                        <v-layout>
                          <div>                    
                            <div id="total" style="position:absolute;left:-105px;top:-160px;height:100%;width:100%;line-height:360px;text-align:center;color:black;font-size:14px;font-weight:bold;z-index:10;">2019.02.22 입,출차 예측</div>                
                            <div id="chartContainer7" style="height: 220px; width: 100%; margin-top: 20px;" />                            
                          </div>
                        </v-layout>                      
                    </b-card-body>
                  </b-card>
                </b-col>

                <b-col sm="6" lg="3">
                  <b-card no-body>
                    <b-card-body class="pb-0">  
                        <v-layout>
                          <div>                    
                            <div id="total" style="position:absolute;left:-125px;top:-160px;height:100%;width:100%;line-height:360px;text-align:center;color:black;font-size:14px;font-weight:bold;z-index:10;">일주일 입,출차 예측</div>                
                            <div id="chartContainer8" style="height: 220px; width: 100%; margin-top: 20px;" />                            
                          </div>
                        </v-layout>                      
                    </b-card-body>
                  </b-card>
                </b-col>
<!--
                <b-col sm="6" lg="6">
                  <b-card no-body>
                    <b-card-body class="pb-0">  
                        <v-layout>
                          <div>                              
                            <div id="chartContainer9" style="height: 160px; width: 100%;" />                            
                          </div>
                        </v-layout>                      
                    </b-card-body>
                  </b-card>
                </b-col>
-->
              </b-row>              
            </b-card>
          </b-col>
        </b-row>
      </div>
      <!-- 주차장 입,출차 예측 -->           
</div>
</template>

<script>
    // import {bus} from '../main'
    import WeatherService from '@/services/WeatherService'
    import ParkingDataService from '@/services/ParkingDataService'
    import proj4 from 'proj4'
    import Moment from 'moment'
    import { extendMoment } from 'moment-range'
    const moment = extendMoment(Moment)
    const CanvasJS = require('../../canvasjs.min.js')
    export default {
  data () {
        return {
          chart7Options: {
            animationEnabled: true,
            width: 700,
            theme: 'light2',
            title: {
              text: '특정일자의 입,출차 예측'
            },
            axisX: {
              title: '시간',
              interval: 2,
              intervalType: 'hour',
              // valueFormatString: 'DD MMM',
              valueFormatString: 'hh TT',
              crosshair: {
                enabled: true,
                snapToDataPoint: true
              }
            },
            axisY: {
              title: '입차대수',
              crosshair: {
                enabled: true
              }
            },
            toolTip: {
              shared: true
            },
            legend: {
              cursor: 'pointer',
              verticalAlign: 'bottom',
              horizontalAlign: 'left',
              dockInsidePlotArea: true,
              itemclick: this.toogleDataSeries
            },
            data: [
              {
                type: 'line',
                showInLegend: true,
                name: '입차대수',
                markerType: 'square',
                xValueFormatString: 'DD MMM, YYYY',
                color: 'Orange',
                dataPoints: [
                  { x: new Date(2019, 1, 14, 0, 0), y: 75 },
                  { x: new Date(2019, 1, 14, 1, 0), y: 45 },
                  { x: new Date(2019, 1, 14, 2, 0), y: 55 },
                  { x: new Date(2019, 1, 14, 3, 0), y: 65 },
                  { x: new Date(2019, 1, 14, 4, 0), y: 75 },
                  { x: new Date(2019, 1, 14, 5, 0), y: 67 },
                  { x: new Date(2019, 1, 14, 6, 0), y: 75 },
                  { x: new Date(2019, 1, 14, 7, 0), y: 55 },
                  { x: new Date(2019, 1, 14, 8, 0), y: 62 },
                  { x: new Date(2019, 1, 14, 9, 0), y: 66 },
                  { x: new Date(2019, 1, 14, 10, 0), y: 72 },
                  { x: new Date(2019, 1, 14, 11, 0), y: 68 },
                  { x: new Date(2019, 1, 14, 12, 0), y: 65 },
                  { x: new Date(2019, 1, 14, 13, 0), y: 59 },
                  { x: new Date(2019, 1, 14, 14, 0), y: 48 },
                  { x: new Date(2019, 1, 14, 15, 0), y: 45 },
                  { x: new Date(2019, 1, 14, 16, 0), y: 39 },
                  { x: new Date(2019, 1, 14, 17, 0), y: 80 },
                  { x: new Date(2019, 1, 14, 18, 0), y: 82 },
                  { x: new Date(2019, 1, 14, 19, 0), y: 75 },
                  { x: new Date(2019, 1, 14, 20, 0), y: 76 },
                  { x: new Date(2019, 1, 14, 21, 0), y: 75 },
                  { x: new Date(2019, 1, 14, 22, 0), y: 49 },
                  { x: new Date(2019, 1, 14, 23, 0), y: 25 }
                ]
              },
              {
                type: 'line',
                showInLegend: true,
                name: '출차대수',
                markerType: 'square',
                xValueFormatString: 'DD MMM, YYYY',
                color: 'OrangeRed',
                dataPoints: [
                  { x: new Date(2019, 1, 14, 0, 0), y: 65 },
                  { x: new Date(2019, 1, 14, 1, 0), y: 35 },
                  { x: new Date(2019, 1, 14, 2, 0), y: 45 },
                  { x: new Date(2019, 1, 14, 3, 0), y: 55 },
                  { x: new Date(2019, 1, 14, 4, 0), y: 65 },
                  { x: new Date(2019, 1, 14, 5, 0), y: 57 },
                  { x: new Date(2019, 1, 14, 6, 0), y: 65 },
                  { x: new Date(2019, 1, 14, 7, 0), y: 45 },
                  { x: new Date(2019, 1, 14, 8, 0), y: 52 },
                  { x: new Date(2019, 1, 14, 9, 0), y: 56 },
                  { x: new Date(2019, 1, 14, 10, 0), y: 62 },
                  { x: new Date(2019, 1, 14, 11, 0), y: 58 },
                  { x: new Date(2019, 1, 14, 12, 0), y: 55 },
                  { x: new Date(2019, 1, 14, 13, 0), y: 49 },
                  { x: new Date(2019, 1, 14, 14, 0), y: 38 },
                  { x: new Date(2019, 1, 14, 15, 0), y: 35 },
                  { x: new Date(2019, 1, 14, 16, 0), y: 29 },
                  { x: new Date(2019, 1, 14, 17, 0), y: 70 },
                  { x: new Date(2019, 1, 14, 18, 0), y: 72 },
                  { x: new Date(2019, 1, 14, 19, 0), y: 65 },
                  { x: new Date(2019, 1, 14, 20, 0), y: 66 },
                  { x: new Date(2019, 1, 14, 21, 0), y: 65 },
                  { x: new Date(2019, 1, 14, 22, 0), y: 39 },
                  { x: new Date(2019, 1, 14, 23, 0), y: 15 }
                ]
              }
            ]
          },
          chart6Options: {
            animationEnabled: true,
            width: 360,
            theme: 'light2',
            /*
            title: {
              text: '앞으로 일주일의 입,출차 예측'
            },
            */
            axisX: {
              // title: '날짜',
              interval: 1,
              intervalType: 'day',
              valueFormatString: 'DD MMM',
              crosshair: {
                enabled: true,
                snapToDataPoint: true
              }
            },
            axisY: {
              // title: '입출차대수',
              crosshair: {
                enabled: true
              }
            },
            toolTip: {
              shared: true
            },
            legend: {
              cursor: 'pointer',
              verticalAlign: 'bottom',
              horizontalAlign: 'left',
              dockInsidePlotArea: true,
              itemclick: this.toogleDataSeries
            },
            data: [
              {
                type: 'line',
                showInLegend: true,
                name: '입차대수',
                markerType: 'square',
                xValueFormatString: 'DD MMM, YYYY',
                color: 'Orange',
                dataPoints: [
                  { x: new Date(2019, 1, 14), y: 75 },
                  { x: new Date(2019, 1, 15), y: 45 },
                  { x: new Date(2019, 1, 16), y: 55 },
                  { x: new Date(2019, 1, 17), y: 65 },
                  { x: new Date(2019, 1, 18), y: 75 },
                  { x: new Date(2019, 1, 19), y: 67 },
                  { x: new Date(2019, 1, 20), y: 75 }
                ]
              },
              {
                type: 'line',
                showInLegend: true,
                name: '출차대수',
                markerType: 'square',
                xValueFormatString: 'DD MMM, YYYY',
                color: 'OrangeRed',
                dataPoints: [
                  { x: new Date(2019, 1, 14), y: 65 },
                  { x: new Date(2019, 1, 15), y: 35 },
                  { x: new Date(2019, 1, 16), y: 45 },
                  { x: new Date(2019, 1, 17), y: 55 },
                  { x: new Date(2019, 1, 18), y: 65 },
                  { x: new Date(2019, 1, 19), y: 57 },
                  { x: new Date(2019, 1, 20), y: 65 }
                ]
              },
              {
                type: 'line',
                lineDashType: 'dash',
                showInLegend: true,
                name: '주차면수',
                markerType: 'square',
                xValueFormatString: 'DD MMM, YYYY',
                color: 'Indigo',
                dataPoints: [
                  { x: new Date(2019, 1, 14), y: 100 },
                  { x: new Date(2019, 1, 15), y: 100 },
                  { x: new Date(2019, 1, 16), y: 100 },
                  { x: new Date(2019, 1, 17), y: 100 },
                  { x: new Date(2019, 1, 18), y: 100 },
                  { x: new Date(2019, 1, 19), y: 100 },
                  { x: new Date(2019, 1, 20), y: 100 }
                ]
              }
            ]
          },
          chart5Options: {
            width: 340,
            theme: 'light2',
            animationEnabled: true,
            title: {
              text: '600/720시간'
            },
            subtitles: [{
              text: '주차 이용 시간',
              fontSize: 24
            }],
            data: [{
              type: 'pie',
              showInLegend: true,
              indexLabelFontSize: 14,
              radius: 80,
              // indexLabel: '{label} - {y}',
              indexLabel: '{y}',
              // yValueFormatString: '###0.0\'%\'',
              yValueFormatString: '###0.0시간',
              click: this.explodePie,
              dataPoints: [
                { y: 600, label: '주차이용시간', name: '주차이용시간', exploded: true, color: 'Orange' },
                { y: 120, label: '주차공백시간', name: '주차공백시간', color: 'OrangeRed' }
              ]
            }]
          },
          chart8Options: {
            width: 340,
            theme: 'light2',
            animationEnabled: true,
            /*
            title: {
              text: '2시간이내'
            },
            subtitles: [{
              text: '가장 많은 주차이용시간',
              fontSize: 24
            }],
            */
            data: [{
              type: 'pie',
              // showInLegend: true,
              indexLabelFontSize: 12,
              radius: '75%',
              indexLabel: '{label}',
              // indexLabel: '{label} - {y}',
              yValueFormatString: '###0.0\'%\'',
              // yValueFormatString: '###0.0시간',
              click: this.explodePie,
              dataPoints: [
                /*
                { y: 10, label: '30분이내', name: '30분이내', color: '#ffc400' },
                { y: 20, label: '1시간이내', name: '1시간이내', color: '#ffd500' },
                { y: 40, label: '2시간이내', name: '2시간이내', exploded: true, color: 'Orange' },
                { y: 30, label: '2시간초과', name: '2시간초과', color: 'OrangeRed' }
                */
              ]
            }]
          },
          chart9Options: {
            width: 340,
            theme: 'light2',
            animationEnabled: true,
            /*
            title: {
              text: '목요일'
            },
            subtitles: [{
              text: '가장 붐비는 요일',
              fontSize: 24
            }],
            */
            data: [{
              type: 'pie',
              indexLabelFontSize: 14,
              radius: '75%',
              indexLabel: '{label}',
              // indexLabel: '{label} - {y}',
              yValueFormatString: '###0.0\'%\'',
              // yValueFormatString: '###0.0시간',
              click: this.explodePie,
              dataPoints: [
                /*
                { y: 20, label: '일', color: 'OrangeRed' },
                { y: 10, label: '월', color: '#ffc400' },
                { y: 15, label: '화', color: '#ffd500' },
                { y: 10, label: '수', color: '#ffe100' },
                { y: 25, label: '목', exploded: true, color: 'Orange' },
                { y: 10, label: '금', color: '#ffe900' },
                { y: 10, label: '토', color: '#ffee00' }
                */
              ]
            }]
          },
          chart4Options: {
            animationEnabled: true,
            width: 360,
            theme: 'light2',
            /*
            title: {
              text: '모레 입,출차 예측'
            },
            */
            axisX: {
              // title: '시간',
              interval: 2,
              intervalType: 'hour',
              // valueFormatString: 'DD MMM',
              valueFormatString: 'HH시',
              crosshair: {
                enabled: true,
                snapToDataPoint: true
              }
            },
            axisY: {
              // title: '입출차대수',
              crosshair: {
                enabled: true
              }
            },
            toolTip: {
              shared: true
            },
            legend: {
              cursor: 'pointer',
              verticalAlign: 'bottom',
              horizontalAlign: 'left',
              dockInsidePlotArea: true,
              itemclick: this.toogleDataSeries
            },
            data: [
              {
                type: 'line',
                showInLegend: true,
                name: '입차대수',
                markerType: 'square',
                xValueFormatString: 'DD MMM, YYYY',
                color: 'Orange',
                dataPoints: [
                  { x: new Date(2019, 1, 14, 0, 0), y: 75 },
                  { x: new Date(2019, 1, 14, 1, 0), y: 45 },
                  { x: new Date(2019, 1, 14, 2, 0), y: 55 },
                  { x: new Date(2019, 1, 14, 3, 0), y: 65 },
                  { x: new Date(2019, 1, 14, 4, 0), y: 75 },
                  { x: new Date(2019, 1, 14, 5, 0), y: 67 },
                  { x: new Date(2019, 1, 14, 6, 0), y: 75 },
                  { x: new Date(2019, 1, 14, 7, 0), y: 55 },
                  { x: new Date(2019, 1, 14, 8, 0), y: 62 },
                  { x: new Date(2019, 1, 14, 9, 0), y: 66 },
                  { x: new Date(2019, 1, 14, 10, 0), y: 72 },
                  { x: new Date(2019, 1, 14, 11, 0), y: 68 },
                  { x: new Date(2019, 1, 14, 12, 0), y: 65 },
                  { x: new Date(2019, 1, 14, 13, 0), y: 59 },
                  { x: new Date(2019, 1, 14, 14, 0), y: 48 },
                  { x: new Date(2019, 1, 14, 15, 0), y: 45 },
                  { x: new Date(2019, 1, 14, 16, 0), y: 39 },
                  { x: new Date(2019, 1, 14, 17, 0), y: 80 },
                  { x: new Date(2019, 1, 14, 18, 0), y: 82 },
                  { x: new Date(2019, 1, 14, 19, 0), y: 75 },
                  { x: new Date(2019, 1, 14, 20, 0), y: 76 },
                  { x: new Date(2019, 1, 14, 21, 0), y: 75 },
                  { x: new Date(2019, 1, 14, 22, 0), y: 49 },
                  { x: new Date(2019, 1, 14, 23, 0), y: 25 }
                ]
              },
              {
                type: 'line',
                showInLegend: true,
                name: '출차대수',
                markerType: 'square',
                xValueFormatString: 'DD MMM, YYYY',
                color: 'OrangeRed',
                dataPoints: [
                  { x: new Date(2019, 1, 14, 0, 0), y: 65 },
                  { x: new Date(2019, 1, 14, 1, 0), y: 35 },
                  { x: new Date(2019, 1, 14, 2, 0), y: 45 },
                  { x: new Date(2019, 1, 14, 3, 0), y: 55 },
                  { x: new Date(2019, 1, 14, 4, 0), y: 65 },
                  { x: new Date(2019, 1, 14, 5, 0), y: 57 },
                  { x: new Date(2019, 1, 14, 6, 0), y: 65 },
                  { x: new Date(2019, 1, 14, 7, 0), y: 45 },
                  { x: new Date(2019, 1, 14, 8, 0), y: 52 },
                  { x: new Date(2019, 1, 14, 9, 0), y: 56 },
                  { x: new Date(2019, 1, 14, 10, 0), y: 62 },
                  { x: new Date(2019, 1, 14, 11, 0), y: 58 },
                  { x: new Date(2019, 1, 14, 12, 0), y: 55 },
                  { x: new Date(2019, 1, 14, 13, 0), y: 49 },
                  { x: new Date(2019, 1, 14, 14, 0), y: 38 },
                  { x: new Date(2019, 1, 14, 15, 0), y: 35 },
                  { x: new Date(2019, 1, 14, 16, 0), y: 29 },
                  { x: new Date(2019, 1, 14, 17, 0), y: 70 },
                  { x: new Date(2019, 1, 14, 18, 0), y: 72 },
                  { x: new Date(2019, 1, 14, 19, 0), y: 65 },
                  { x: new Date(2019, 1, 14, 20, 0), y: 66 },
                  { x: new Date(2019, 1, 14, 21, 0), y: 65 },
                  { x: new Date(2019, 1, 14, 22, 0), y: 39 },
                  { x: new Date(2019, 1, 14, 23, 0), y: 15 }
                ]
              },
              {
                type: 'line',
                lineDashType: 'dash',
                showInLegend: true,
                name: '주차면수',
                markerType: 'square',
                xValueFormatString: 'DD MMM, YYYY',
                color: 'Indigo',
                dataPoints: [
                  { x: new Date(2019, 1, 14, 0, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 1, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 2, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 3, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 4, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 5, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 6, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 7, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 8, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 9, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 10, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 11, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 12, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 13, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 14, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 15, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 16, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 17, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 18, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 19, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 20, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 21, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 22, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 23, 0), y: 100 }
                ]
              }
            ]
          },
          chart3Options: {
            animationEnabled: true,
            width: 360,
            theme: 'light2',
            /*
            title: {
              text: '내일 입,출차 예측'
            },
            */
            axisX: {
              // title: '시간',
              interval: 2,
              intervalType: 'hour',
              // valueFormatString: 'DD MMM',
              valueFormatString: 'HH시',
              crosshair: {
                enabled: true,
                snapToDataPoint: true
              }
            },
            axisY: {
              // title: '입출차대수',
              crosshair: {
                enabled: true
              }
            },
            toolTip: {
              shared: true
            },
            legend: {
              cursor: 'pointer',
              verticalAlign: 'bottom',
              horizontalAlign: 'left',
              dockInsidePlotArea: true,
              itemclick: this.toogleDataSeries
            },
            data: [
              {
                type: 'line',
                showInLegend: true,
                name: '입차대수',
                markerType: 'square',
                xValueFormatString: 'DD MMM, YYYY',
                color: 'Orange',
                dataPoints: [
                  { x: new Date(2019, 1, 14, 0, 0), y: 75 },
                  { x: new Date(2019, 1, 14, 1, 0), y: 45 },
                  { x: new Date(2019, 1, 14, 2, 0), y: 55 },
                  { x: new Date(2019, 1, 14, 3, 0), y: 65 },
                  { x: new Date(2019, 1, 14, 4, 0), y: 75 },
                  { x: new Date(2019, 1, 14, 5, 0), y: 67 },
                  { x: new Date(2019, 1, 14, 6, 0), y: 75 },
                  { x: new Date(2019, 1, 14, 7, 0), y: 55 },
                  { x: new Date(2019, 1, 14, 8, 0), y: 62 },
                  { x: new Date(2019, 1, 14, 9, 0), y: 66 },
                  { x: new Date(2019, 1, 14, 10, 0), y: 72 },
                  { x: new Date(2019, 1, 14, 11, 0), y: 68 },
                  { x: new Date(2019, 1, 14, 12, 0), y: 65 },
                  { x: new Date(2019, 1, 14, 13, 0), y: 59 },
                  { x: new Date(2019, 1, 14, 14, 0), y: 48 },
                  { x: new Date(2019, 1, 14, 15, 0), y: 45 },
                  { x: new Date(2019, 1, 14, 16, 0), y: 39 },
                  { x: new Date(2019, 1, 14, 17, 0), y: 80 },
                  { x: new Date(2019, 1, 14, 18, 0), y: 82 },
                  { x: new Date(2019, 1, 14, 19, 0), y: 75 },
                  { x: new Date(2019, 1, 14, 20, 0), y: 76 },
                  { x: new Date(2019, 1, 14, 21, 0), y: 75 },
                  { x: new Date(2019, 1, 14, 22, 0), y: 49 },
                  { x: new Date(2019, 1, 14, 23, 0), y: 25 }
                ]
              },
              {
                type: 'line',
                showInLegend: true,
                name: '출차대수',
                markerType: 'square',
                xValueFormatString: 'DD MMM, YYYY',
                // color: '#F08080',
                color: 'OrangeRed',
                dataPoints: [
                  { x: new Date(2019, 1, 14, 0, 0), y: 65 },
                  { x: new Date(2019, 1, 14, 1, 0), y: 35 },
                  { x: new Date(2019, 1, 14, 2, 0), y: 45 },
                  { x: new Date(2019, 1, 14, 3, 0), y: 55 },
                  { x: new Date(2019, 1, 14, 4, 0), y: 65 },
                  { x: new Date(2019, 1, 14, 5, 0), y: 57 },
                  { x: new Date(2019, 1, 14, 6, 0), y: 65 },
                  { x: new Date(2019, 1, 14, 7, 0), y: 45 },
                  { x: new Date(2019, 1, 14, 8, 0), y: 52 },
                  { x: new Date(2019, 1, 14, 9, 0), y: 56 },
                  { x: new Date(2019, 1, 14, 10, 0), y: 62 },
                  { x: new Date(2019, 1, 14, 11, 0), y: 58 },
                  { x: new Date(2019, 1, 14, 12, 0), y: 55 },
                  { x: new Date(2019, 1, 14, 13, 0), y: 49 },
                  { x: new Date(2019, 1, 14, 14, 0), y: 38 },
                  { x: new Date(2019, 1, 14, 15, 0), y: 35 },
                  { x: new Date(2019, 1, 14, 16, 0), y: 29 },
                  { x: new Date(2019, 1, 14, 17, 0), y: 70 },
                  { x: new Date(2019, 1, 14, 18, 0), y: 72 },
                  { x: new Date(2019, 1, 14, 19, 0), y: 65 },
                  { x: new Date(2019, 1, 14, 20, 0), y: 66 },
                  { x: new Date(2019, 1, 14, 21, 0), y: 65 },
                  { x: new Date(2019, 1, 14, 22, 0), y: 39 },
                  { x: new Date(2019, 1, 14, 23, 0), y: 15 }
                ]
              },
              {
                type: 'line',
                lineDashType: 'dash',
                showInLegend: true,
                name: '주차면수',
                markerType: 'square',
                xValueFormatString: 'DD MMM, YYYY',
                color: 'Indigo',
                dataPoints: [
                  { x: new Date(2019, 1, 14, 0, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 1, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 2, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 3, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 4, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 5, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 6, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 7, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 8, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 9, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 10, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 11, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 12, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 13, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 14, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 15, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 16, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 17, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 18, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 19, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 20, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 21, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 22, 0), y: 100 },
                  { x: new Date(2019, 1, 14, 23, 0), y: 100 }
                ]
              }
            ]
          },
          chart2Options: {
            animationEnabled: true,
            width: 190,
            // theme: 'light2',
            /*
            title: {
              text: '1시간 후 입,출차 예측'
            },
            */
            axisX: {
              // title: '시간',
              interval: 1,
              intervalType: 'hour',
              // valueFormatString: 'DD MMM',
              valueFormatString: 'HH시',
              crosshair: {
                enabled: true,
                snapToDataPoint: true
              }
            },
            axisY: {
              // title: '입출차대수',
              crosshair: {
                enabled: true
              }
            },
            toolTip: {
              shared: true
            },
            legend: {
              cursor: 'pointer',
              verticalAlign: 'bottom',
              horizontalAlign: 'left',
              dockInsidePlotArea: true,
              itemclick: this.toogleDataSeries
            },
            data: [{
              type: 'column',
              showInLegend: true,
              name: '입차대수',
              markerType: 'square',
              xValueFormatString: 'DD MMM, YYYY',
              // color: '#F0F080',
              color: 'Orange',
              dataPoints: [
                { x: new Date(2019, 1, 13, 14, 0), y: 35 }
              ]
            },
            {
              type: 'column',
              showInLegend: true,
              name: '출차대수',
              markerType: 'square',
              xValueFormatString: 'DD MMM, YYYY',
              // color: '#F08080',
              color: 'OrangeRed',
              dataPoints: [
                { x: new Date(2019, 1, 13, 14, 0), y: 45 }
              ]
            }
            ]
          },
          chart1Options: {
            width: 340,
            theme: 'light2',
            animationEnabled: true,
            /*
            title: {
              text: '70/100대'
            },
            subtitles: [{
              text: '현재 주차대수',
              fontSize: 24
            }],
            */
            data: [{
              type: 'doughnut',
              showInLegend: true,
              startAngle: 60,
              radius: '80%',
              // innerRadius: 60,
              // indexLabelFontSize: 14,
              // indexLabel: '#percent%',
              // indexLabel: '{label} - #percent%',
              toolTipContent: '<b>{label}:</b> {y} (#percent%)',
              dataPoints: [
                { y: 70, name: '주차대수', exploded: true, color: 'Orange' },
                { y: 30, name: '가용대수', color: 'OrangeRed' }
              ]
            }]
          },
          parkingMaxUsageDOW: '',
          parkingMinUsageDOW: '',
          parkingMaxUsageTime: '',
          parkingMinUsageTime: '',
          parkingTurnover: '',
          parkingEfficiency: '',
          sDate: null,
          eDate: null,
          menu1: false,
          chart1: '',
          chart2: '',
          chart3: '',
          chart4: '',
          chart5: '',
          chart6: '',
          chart7: '',
          chart8: '',
          chart9: '',
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
          todayDate: '',
          userId: 'hyeok',
          parkingId: '',
          queryType: ''
        }
  },
  mounted () {
        CanvasJS.addColorSet('greenShades',
          [
            '#3CB371',
            '#B3E5E5'
          ]
        )

        this.chart1 = new CanvasJS.Chart('chartContainer1', this.chart1Options)
        this.chart1.render()

        // this.chart2 = new CanvasJS.Chart('chartContainer2', this.chart5Options)
        // this.chart2.render()

        this.chart3 = new CanvasJS.Chart('chartContainer3', this.chart8Options)
        this.chart3.render()

        this.chart4 = new CanvasJS.Chart('chartContainer4', this.chart9Options)
        this.chart4.render()

        this.chart5 = new CanvasJS.Chart('chartContainer5', this.chart2Options)
        this.chart5.render()

        this.chart6 = new CanvasJS.Chart('chartContainer6', this.chart3Options)
        this.chart6.render()

        this.chart7 = new CanvasJS.Chart('chartContainer7', this.chart4Options)
        this.chart7.render()

        this.chart8 = new CanvasJS.Chart('chartContainer8', this.chart6Options)
        this.chart8.render()
        /*
        this.chart9 = new CanvasJS.Chart('chartContainer9', this.chart7Options)
        this.chart9.render()
        */
  },
  beforeCreate: function () {
    /*
        if (!this.$session.exists()) {
          this.$router.push('/login')
        } else {
        }
    */
  },
  created () {
        // this.userId = this.$session.get('userId')
        this.userId = 'hyeok'
        this.getLocation()

/*
        console.log(this.$route.params.parkingId)
        this.parkingId = this.$route.params.parkingId
*/
        this.parkingId = '000-0-000000'
        this.queryType = 'A'
        // this.sDate = moment().format('YYYY-MM-DD').substr(0, 10)
        // this.eDate = moment().format('YYYY-MM-DD').substr(0, 10)

        var today = null
        var lastMonthDate = null

        if (this.queryType === 'A') {
          today = moment('2014-06-30', 'YYYY-MM-DD')
          lastMonthDate = today.subtract(1, 'months').format('YYYY-MM-DD')

          this.sDate = lastMonthDate
          console.log(this.sDate)
          this.eDate = moment().format('2014-06-30')
          console.log(this.eDate)

          this.todayDate = moment().format('2014-06-30 14') + '시'
        } else if (this.queryType === 'B') {
          today = moment('2018-12-01', 'YYYY-MM-DD')
          lastMonthDate = today.subtract(1, 'months').format('YYYY-MM-DD')

          this.sDate = lastMonthDate
          console.log(this.sDate)
          this.eDate = moment().format('2018-12-01')
          console.log(this.eDate)

          this.todayDate = moment().format('2018-12-01 14') + '시'
        }

        this.getParkingEfficiency()
        this.getParkingTurnover()
        this.getParkingMaxUsageTime()
        this.getParkingMaxUsageDOW()
  },
  computed: {
        computedDateFormatted () {
          this.sDate = this.sDate.substr(0, 10)
          console.log(this.sDate)
          return this.sDate
        }
  },
  methods: {
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
        getParkingHeader: function () {
          this.getParkingHeaderData()
        },
        async getParkingHeaderData () {
          const response = await ParkingDataService.fetchParkingHeader({
            parkingId: this.parkingId
          })

          console.log(response.data[0].type)
        },
        async getParkingMaxUsageDOWData () {
          const response = await ParkingDataService.fetchParkingMaxUsageDOW({
            parkingId: this.parkingId,
            startDate: this.sDate,
            endDate: this.eDate
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
          // console.log('min:' + min)
          // console.log('max:' + max)

          var tmpDataPoints = []
          var tmpDataPoint = { y: sunSum, label: '일', name: '일', color: 'OrangeRed' }
          tmpDataPoints.push(tmpDataPoint)
          tmpDataPoint = { y: monSum, label: '월', name: '월', color: '#ffc400' }
          tmpDataPoints.push(tmpDataPoint)
          tmpDataPoint = { y: tueSum, label: '화', name: '화', color: '#ffd500' }
          tmpDataPoints.push(tmpDataPoint)
          tmpDataPoint = { y: wedSum, label: '수', name: '수', color: '#ffe100' }
          tmpDataPoints.push(tmpDataPoint)
          tmpDataPoint = { y: thuSum, label: '목', name: '목', color: 'Orange' }
          tmpDataPoints.push(tmpDataPoint)
          tmpDataPoint = { y: friSum, label: '금', name: '금', color: '#ffe900' }
          tmpDataPoints.push(tmpDataPoint)
          tmpDataPoint = { y: satSum, label: '토', name: '토', color: '#ffee00' }
          tmpDataPoints.push(tmpDataPoint)
          this.chart9Options.data[0].dataPoints = tmpDataPoints
          this.chart4.render()

          this.parkingMaxUsageDOW = this.getKeyByValue(obj, max)
          this.parkingMinUsageDOW = this.getKeyByValue(obj, min)
        },
        async getParkingMaxUsageTimeData () {
          const response = await ParkingDataService.fetchParkingMaxUsageTime({
            parkingId: this.parkingId,
            startDate: this.sDate,
            endDate: this.eDate
          })

          // console.log(response.data)

          var l30m = response.data[0].l30m
          var g30mN1h = response.data[0].g30mN1h
          var g1hN2h = response.data[0].g1hN2h
          var g2h = response.data[0].g2h
          let obj = { '30분이내': l30m, '1시간이내': g30mN1h, '2시간이내': g1hN2h, '2시간초과': g2h }
          let arr = Object.values(obj)
          let min = Math.min(...arr)
          let max = Math.max(...arr)
          // console.log('min:' + min)
          // console.log('max:' + max)

          var tmpDataPoints = []
          var tmpDataPoint = { y: l30m, label: '30분이내', name: '30분이내', color: '#ffc400' }
          tmpDataPoints.push(tmpDataPoint)
          tmpDataPoint = { y: g30mN1h, label: '1시간이내', name: '1시간이내', color: '#ffd500' }
          tmpDataPoints.push(tmpDataPoint)
          tmpDataPoint = { y: g1hN2h, label: '2시간이내', name: '2시간이내', color: 'Orange' }
          tmpDataPoints.push(tmpDataPoint)
          tmpDataPoint = { y: g2h, label: '2시간초과', name: '2시간초과', color: 'OrangeRed' }
          tmpDataPoints.push(tmpDataPoint)
          this.chart8Options.data[0].dataPoints = tmpDataPoints
          this.chart3.render()

          this.parkingMaxUsageTime = this.getKeyByValue(obj, max)
          this.parkingMinUsageTime = this.getKeyByValue(obj, min)
        },
        async getParkingTurnoverData () {
          // 주차이용대수
          const response = await ParkingDataService.fetchParkingUsageCount({
            parkingId: this.parkingId,
            startDate: this.sDate,
            endDate: this.eDate
          })
          var parkingUsageCount = response.data[0].parking_data_count

          // 주차장운영시간
          const response3 = await ParkingDataService.fetchParkingOpTime({
            parkingId: this.parkingId,
            startDate: this.sDate,
            endDate: this.eDate
          })
          var parkingOpTime = response3.data[0].opDateDifferenceHour

          this.parkingTurnover = (parkingUsageCount / parkingOpTime) / 100
          this.parkingTurnover = this.parkingTurnover.toFixed(1)
        },
        async getParkingEffData () {
          // 주차이용대수
          const response = await ParkingDataService.fetchParkingUsageCount({
            parkingId: this.parkingId,
            startDate: this.sDate,
            endDate: this.eDate
          })
          var parkingUsageCount = response.data[0].parking_data_count

          // 평균주차시간
          const response2 = await ParkingDataService.fetchAvgParkingTime({
            parkingId: this.parkingId,
            startDate: this.sDate,
            endDate: this.eDate
          })
          var avgParkingTime = response2.data[0].avgHour

          // 주차장운영시간
          const response3 = await ParkingDataService.fetchParkingOpTime({
            parkingId: this.parkingId,
            startDate: this.sDate,
            endDate: this.eDate
          })
          var parkingOpTime = response3.data[0].opDateDifferenceHour

          this.parkingEfficiency = (parkingUsageCount * avgParkingTime) / (100 * parkingOpTime)
          this.parkingEfficiency *= 100
          this.parkingEfficiency = this.parkingEfficiency.toFixed(1)
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
                  this.tomAmSkyImg = require('../assets/sun.png')
                  break
                case '2' :
                  this.tomAmSkyImg = require('../assets/cloud1.png')
                  break
                case '3' :
                  this.tomAmSkyImg = require('../assets/cloud2.png')
                  break
                case '4' :
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
                  this.afTomAmSkyImg = require('../assets/sun.png')
                  break
                case '2' :
                  this.afTomAmSkyImg = require('../assets/cloud1.png')
                  break
                case '3' :
                  this.afTomAmSkyImg = require('../assets/cloud2.png')
                  break
                case '4' :
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
        toogleDataSeries: function (e) {
          if (typeof (e.dataSeries.visible) === 'undefined' || e.dataSeries.visible) {
            e.dataSeries.visible = false
          } else {
            e.dataSeries.visible = true
          }
          this.chart6.render()
        },
        toogleDataSeries2: function (e) {
          if (typeof (e.dataSeries.visible) === 'undefined' || e.dataSeries.visible) {
            e.dataSeries.visible = false
          } else {
            e.dataSeries.visible = true
          }
          this.chart7.render()
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
        getKeyByValue: function (object, value) {
          // https://stackoverflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value
          return Object.keys(object).find(key => object[key] === value)
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
        numberWithCommas: function (x) {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        },
        explodePie: function (e) {
          for (var i = 0; i < e.dataSeries.dataPoints.length; i++) {
            if (i !== e.dataPointIndex) {
              e.dataSeries.dataPoints[i].exploded = false
            }
          }
        }
  }
}
</script>