<template>
  <div style="width:1200px; margin:0 auto;">
    <!-- dummy --> <div style="height:20px"/>
        <b-row>
          <b-col md="12">
            <b-card header="수입/지출 분석" header-tag="header">
              <h3 slot="header" class="mb-0"><strong>수입/지출 분석</strong></h3>
              <b-row>
                <b-col sm="12" lg="6">
                  <div style="width:1150px; margin:0 auto;">
            
    <v-layout row wrap justify-center>
     
      <v-flex xs12 class="text-xs-center" >
      <v-tabs fixed-tabs>
        <v-tab          
          :key="1"
          @click.native="showTotal"
        >
          <h4>전체</h4>
        </v-tab>
        <v-tab          
          :key="2"
          @click.native="showIncome"
        >
          <h4>수입</h4>
        </v-tab>
        <v-tab          
          :key="3"
          @click.native="showExp"
        >
          <h4>지출</h4>
        </v-tab>
      </v-tabs>
      </v-flex>

      <!-- 전 체 시 작 -->
      <v-flex v-if="showTotalContent" xs12 class="text-xs-center" mt-1>
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
                label="시작년월"
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

          <v-flex xs4 md1 order-md2 order-xs2/>
          
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
                label="종료년월"
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

          <v-flex xs4 md1 order-md2 order-xs2/>

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

      <div v-if="showTotalContent" id="chartContainerForTotal" style="height: 360px; width: 90%;" />
      
      <!-- dummy -->
      <div v-if="showTotalContent" style="height: 10px; width: 100%;" />

      <!-- <h3 v-if="showTotalContent" class="headline mb-0">{{ IncMinusExp }} </h3> -->

      <v-flex v-if="showTotalContent" xs12 class="text-xs-left" mt-1>
        <v-layout row ma-2 justify-center>
          <!-- <v-flex xs2 md2 order-md1 order-xs1/> -->
          <v-flex xs8 md11 order-md2 order-xs2>
            <h4>지출</h4>
            <v-divider :key="`divider-1`"></v-divider>
            <!-- <h3>발생비용 &nbsp;&nbsp;&nbsp; {{ totalCooCost }}</h3> -->
            <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;발생비용 &nbsp;&nbsp;&nbsp; <span style="float:right">{{ getStrWithComma(totalCooCost) }}</span></h4>
            <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;자재구입 &nbsp;&nbsp;&nbsp; <span style="float:right">{{ getStrWithComma(totalItemCost) }}</span></h4>
            <v-divider :key="`divider-2`"></v-divider>
            <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소계 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="float:right">{{ getStrWithComma(totalExpenditure) }}</span></h4>
          </v-flex>
          <!-- <v-flex xs2 md2 order-md3 order-xs3/> -->                                     
        </v-layout>

        <!-- dummy -->
        <div v-if="showTotalContent" style="height: 10px; width: 100%;" />

        <v-layout row ma-2 justify-center>
          <!-- <v-flex xs2 md2 order-md1 order-xs1/> -->
          <v-flex xs8 md11 order-md2 order-xs2>
            <h4>수입</h4>
            <v-divider :key="`divider-1`"></v-divider>
            <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;수입비용 &nbsp;&nbsp;&nbsp; <span style="float:right">{{ getStrWithComma(totalIncomeCost) }}</span></h4>            
            <v-divider :key="`divider-2`"></v-divider>
            <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소계 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="float:right">{{ getStrWithComma(totalIncomeCost) }}</span></h4>
          </v-flex>
          <!-- <v-flex xs2 md2 order-md3 order-xs3/> -->
        </v-layout>

        <!-- dummy -->
        <div v-if="showTotalContent" style="height: 10px; width: 100%;" />

        <v-layout row ma-2 justify-center>
          <!-- <v-flex xs2 md2 order-md1 order-xs1/> -->
          <v-flex xs8 md11 order-md2 order-xs2>
            <h4>수입/지출 분석</h4>
            <v-divider :key="`divider-1`"></v-divider>
            <h4>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;수입-지출 &nbsp;&nbsp;&nbsp; <span style="float:right">{{ getStrWithComma(totalIncMinusExp) }}</span></h4>                        
          </v-flex>
          <!-- <v-flex xs2 md2 order-md3 order-xs3/> -->
        </v-layout>         

      </v-flex>
      
      <!-- 전 체 끝 -->

      <!-- 수 입 시 작 -->
      <v-flex v-if="showIncomeContent" xs12 class="text-xs-center" mt-1>
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
                label="시작년월"
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

          <v-flex xs4 md1 order-md2 order-xs2/>

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
                label="종료년월"
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

          <v-flex xs4 md1 order-md2 order-xs2/>

          <v-flex xs4 md1 order-md3 order-xs3>
            <v-btn
              :loading="loading"
              :disabled="loading"
              color="primary"
              class="white--text"
              @click.native="searchIncomes"
            >
              검색
            </v-btn>
          </v-flex>     
        </v-layout>
      </v-flex>      

      <div v-if="showIncomeContent" id="chartContainerForIncome" style="height: 360px; width: 90%;" />
      
      <!-- dummy -->
      <div v-if="showIncomeContent" style="height: 50px; width: 100%;" />

      <!-- <h3 v-if="showIncomeContent" class="headline mb-0"></h3> -->

      <v-flex v-if="showIncomeContent" xs12 class="text-xs-left" mt-1>
        <v-layout row ma-2 justify-center>
          <!-- <v-flex xs2 md2 order-md1 order-xs1/> -->
          <v-flex xs8 md11 order-md2 order-xs2>
            <h4>출하/생산</h4>
            <v-divider :key="`divider-1`"></v-divider> 

            <v-data-table
              :headers="headersForInc"
              :items="incomeItems"
              class="elevation-1"
              hide-actions
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
                <td :style="{backgroundColor: (props.index % 2 ? '#F6F7FE' : 'transparent')}"><h4>{{ props.item.income.detail }}</h4></td>
                <td :style="{backgroundColor: (props.index % 2 ? '#F6F7FE' : 'transparent')}"><h4>{{ getStrWithComma(props.item.income.amount) }}</h4></td>                                
                <td :style="{backgroundColor: (props.index % 2 ? '#F6F7FE' : 'transparent')}" class="justify-center layout px-0">
                  <v-btn icon class="mx-0" @click="showItem(props.item)">
                    <v-icon color="teal">remove_red_eye</v-icon>
                  </v-btn>                  
                </td>

              </template>
              <template slot="footer">
                <!--
                <td :colspan="headersForInc.length" style="text-align:right;">
                  <strong>소계 : 15000000</strong>
                </td>
                -->
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><h4><strong>소계 : {{ getStrWithComma(incomeTotal) }}</strong></h4></td> 
              </template>
            </v-data-table>

          </v-flex>
          <!-- <v-flex xs2 md2 order-md3 order-xs3/> -->
        </v-layout>              
      </v-flex>

      <!-- 수 입 끝 -->

      <!-- 지 출 시 작 -->
      <v-flex v-if="showExpContent" xs12 class="text-xs-center" mt-1>
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
                label="시작년월"
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

          <v-flex xs4 md1 order-md2 order-xs2/>

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
                label="종료년월"
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

          <v-flex xs4 md1 order-md2 order-xs2/>

          <v-flex xs4 md1 order-md3 order-xs3>
            <v-btn
              :loading="loading"
              :disabled="loading"
              color="primary"
              class="white--text"
              @click.native="searchExpenditure"
            >
              검색
            </v-btn>
          </v-flex>     
        </v-layout>

        <!-- Radio button -->
        <v-layout row ma-2 justify-center>
          <v-flex xs4 md1 order-md1 order-xs1>            
          </v-flex>

          <v-flex xs4 md4 order-md2 order-xs2>
             <v-radio-group v-model="row" row>
              <v-radio label="발생비용" value="radio-coo" @change='radioChanged'></v-radio>
              <v-radio label="자재구입" value="radio-item" @change='radioChanged'></v-radio>
              <v-radio label="전체" value="radio-total" @change='radioChanged' checked></v-radio>
            </v-radio-group>
          </v-flex>

          <v-flex xs4 md1 order-md3 order-xs3>            
          </v-flex>     
        </v-layout>
        <!-- Radio button -->
      </v-flex>      

      <div v-if="showExpContent" id="chartContainerForExp" style="height: 360px; width: 90%;" />
      
      <!-- dummy -->
      <div v-if="showExpContent" style="height: 50px; width: 100%;" />

      <!-- <h3 v-if="showExpContent" class="headline mb-0">{{ IncMinusExp }} </h3> -->

      <v-flex v-if="showExpContent && showExpCOOContent" xs12 class="text-xs-left" mt-1>
        <v-layout row ma-2 justify-center>
          <!-- <v-flex xs2 md2 order-md1 order-xs1/> -->
          <v-flex xs8 md11 order-md2 order-xs2>
            <h4>발생비용</h4>
            <v-divider :key="`divider-1`"></v-divider> 

            <v-data-table
              :headers="headersForCOO"
              :items="cooItems"
              class="elevation-1"
              hide-actions
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
                <td :style="{backgroundColor: (props.index % 2 ? '#F6F7FE' : 'transparent')}"><h4>{{ props.item.category }}</h4></td>
                <td :style="{backgroundColor: (props.index % 2 ? '#F6F7FE' : 'transparent')}"><h4>{{ getStrWithComma(props.item.cost) }}</h4></td>

                <td :style="{backgroundColor: (props.index % 2 ? '#F6F7FE' : 'transparent')}" class="justify-center layout px-0">
                  <v-btn icon class="mx-0" @click="showItem(props.item)">
                    <v-icon color="teal">remove_red_eye</v-icon>
                  </v-btn>                  
                </td>

              </template>
              <template slot="footer">                                
                <td></td>
                <td></td>
                <td></td>
                <td><h4><strong>소계 : {{ getStrWithComma(cooTotal) }}</strong></h4></td> 
              </template>
            </v-data-table>

          </v-flex>
          <!-- <v-flex xs2 md2 order-md3 order-xs3/> -->
        </v-layout>              
      </v-flex>

      <div v-if="showExpContent && showExpItemContent" style="height: 50px; width: 100%;" />

      <v-flex v-if="showExpContent && showExpItemContent" xs12 class="text-xs-left" mt-1>
        <v-layout row ma-2 justify-center>
          <!-- <v-flex xs2 md2 order-md1 order-xs1/> -->
          <v-flex xs8 md11 order-md2 order-xs2>
            <h4>자재구입</h4>
            <v-divider :key="`divider-2`"></v-divider> 

            <v-data-table
              :headers="headersForItem"
              :items="itemItems"
              class="elevation-1"
              hide-actions
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
                <td :style="{backgroundColor: (props.index % 2 ? '#F6F7FE' : 'transparent')}"><h4>{{ props.item.itemName }}</h4></td>
                <td :style="{backgroundColor: (props.index % 2 ? '#F6F7FE' : 'transparent')}"><h4>{{ props.item.amount }}</h4></td>
                <td :style="{backgroundColor: (props.index % 2 ? '#F6F7FE' : 'transparent')}"><h4>{{ getStrWithComma(props.item.cost) }}</h4></td> 

                <td :style="{backgroundColor: (props.index % 2 ? '#F6F7FE' : 'transparent')}" class="justify-center layout px-0">
                  <v-btn icon class="mx-0" @click="showItemForItem(props.item)">
                    <v-icon color="teal">remove_red_eye</v-icon>
                  </v-btn>                  
                </td>

              </template>
              <template slot="footer">                
                <td></td>
                <td></td>
                <td></td>                
                <td><h4><strong>소계 : {{ getStrWithComma(itemTotal) }}</strong></h4></td> 
              </template>
            </v-data-table>

          </v-flex>
          <!-- <v-flex xs2 md2 order-md3 order-xs3/> -->
        </v-layout>              
      </v-flex>

      <!-- 지 출 끝 -->

    </v-layout>

    <predictModalForShow></predictModalForShow>
    <predictItemModalForShow></predictItemModalForShow>
          
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
import Moment from 'moment'
import { extendMoment } from 'moment-range'
import ItemService from '@/services/ItemService'
import JournalService from '@/services/JournalService'
import LandService from '@/services/LandService'
const CanvasJS = require('../../canvasjs.min.js')
const moment = extendMoment(Moment)
export default {
  $_veeValidate: {
    validator: 'new'
  },
  data () {
    return {
      showExpCOOContent: true,
      showExpItemContent: true,
      //
      expTotalDataPoints: [],
      expItemDataPoints: [],
      expCooDataPoints: [],
      //
      itemTotal: 0,
      itemItems: [],
      headersForItem: [
        {
          text: '날짜',
          align: 'left',
          sortable: false,
          value: 'date'
        },
        { text: '품목명', sortable: false, value: 'itemName' },
        { text: '수량', sortable: false, value: 'amount' },
        { text: '금액', sortable: false, value: 'cost' },
        { text: '상세', value: 'name', sortable: false, align: 'left', width: '5%' }
      ],
      //
      cooTotal: 0,
      cooItems: [],
      headersForCOO: [
        {
          text: '날짜',
          align: 'left',
          sortable: false,
          value: 'date'
        },
        { text: '농장명', sortable: false, value: 'landName' },
        { text: '발생품목', sortable: false, value: 'category' },
        { text: '금액', sortable: false, value: 'cost' },
        { text: '상세', value: 'name', sortable: false, align: 'left', width: '5%' }
      ],
      row: 'radio-total',
      //
      incomeTotal: 0,
      incomeItems: [],
      headersForInc: [
        {
          text: '날짜',
          align: 'left',
          sortable: false,
          value: 'date'
        },
        { text: '농장명', sortable: false, value: 'landName' },
        { text: '항목', sortable: false, value: 'cropName' },
        { text: '내역', sortable: false, value: 'income.detail' },
        { text: '금액', sortable: false, value: 'income.amount' },
        { text: '상세', value: 'name', sortable: false, align: 'left', width: '5%' }
      ],
      //
      totalIncMinusExp: 0,
      totalIncomeCost: 0,
      totalExpenditure: 0,
      totalItemCost: 0,
      totalCooCost: 0,
      //
      showExpContent: false,
      showIncomeContent: false,
      showTotalContent: true,
      IncMinusExp: '수입 - 지출 : 115,000원',
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
      weatherData: null,
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
      chartOptionsForTotal: {
        /*
        title: {
          text: '가계 수입, 지출'
        },
        axisX: {
          // title: 'Axis Labels with formatting',
          valueFormatString: ' '
        },
        */
        data: [
          {
            type: 'column',
            showInLegend: true,
            legendText: '지출',
            indexLabel: '{y}',
            indexLabelPlacement: 'outside',
            indexLabelOrientation: 'horizontal',
            dataPoints: [
            /*
            { x: new Date('2018-01'), y: 30000 },
            { x: new Date('2018-02'), y: 31000 },
            { x: new Date('2018-03'), y: 32000 },
            { x: new Date('2018-04'), y: 25000 },
            { x: new Date('2018-05'), y: 27000 },
            { x: new Date('2018-06'), y: 31000 },
            { x: new Date('2018-07'), y: 32000 },
            { x: new Date('2018-08'), y: 30000 },
            { x: new Date('2018-09'), y: 29000 }
            */
            ]
          },
          {
            type: 'column',
            showInLegend: true,
            legendText: '수입',
            indexLabel: '{y}',
            indexLabelPlacement: 'outside',
            indexLabelOrientation: 'horizontal',
            dataPoints: [
            /*
            { x: new Date('2018-01'), y: 32000 },
            { x: new Date('2018-02'), y: 33000 },
            { x: new Date('2018-03'), y: 33000 },
            { x: new Date('2018-04'), y: 35000 },
            { x: new Date('2018-05'), y: 30000 },
            { x: new Date('2018-06'), y: 32000 },
            { x: new Date('2018-07'), y: 33000 },
            { x: new Date('2018-08'), y: 32000 },
            { x: new Date('2018-09'), y: 30000 }
            */
            ]
          }
        ],
        axisY: {
          title: '원'
        }
      },
      chartForTotal: null,
      chartOptionsForIncome: {
        /*
        title: {
          text: '가계 수입, 지출'
        },
        */
        axisX: {
          // title: 'Axis Labels with formatting',
          valueFormatString: 'YYYY-MM'
        },
        data: [
          {
            type: 'line',
            showInLegend: true,
            legendText: '수입',
            indexLabel: '{y}',
            indexLabelPlacement: 'outside',
            indexLabelOrientation: 'horizontal',
            dataPoints: [
            /*
            { x: new Date('2018-01'), y: 30000 },
            { x: new Date('2018-02'), y: 31000 },
            { x: new Date('2018-03'), y: 32000 },
            { x: new Date('2018-04'), y: 25000 },
            { x: new Date('2018-05'), y: 27000 },
            { x: new Date('2018-06'), y: 31000 },
            { x: new Date('2018-07'), y: 32000 },
            { x: new Date('2018-08'), y: 30000 },
            { x: new Date('2018-09'), y: 29000 }
            */
            ]
          }
        ],
        axisY: {
          title: '원'
        }
      },
      chartForIncome: null,
      chartOptionsForExp: {
        /*
        title: {
          text: '가계 수입, 지출'
        },
        */
        axisX: {
          // title: 'Axis Labels with formatting',
          valueFormatString: 'YYYY-MM'
        },
        data: [
          {
            type: 'line',
            showInLegend: true,
            legendText: '지출',
            indexLabel: '{y}',
            indexLabelPlacement: 'outside',
            indexLabelOrientation: 'horizontal',
            dataPoints: [
            /*
            { x: new Date('2018-01'), y: 30000 },
            { x: new Date('2018-02'), y: 31000 },
            { x: new Date('2018-03'), y: 32000 },
            { x: new Date('2018-04'), y: 25000 },
            { x: new Date('2018-05'), y: 27000 }
            */
            ]
          }
        ],
        axisY: {
          title: '원'
        }
      },
      chartForExp: null
    }
  },
  mounted () {
    this.$validator.localize('ko', this.dictionary)

    // 전체
    this.chartForTotal = new CanvasJS.Chart('chartContainerForTotal', this.chartOptionsForTotal)
    this.chartForTotal.render()

    // 수입
    // this.chartForIncome = new CanvasJS.Chart('chartContainerForIncome', this.chartOptionsForIncome)
    // this.chartForIncome.render()

    // 지출
    // this.chartForExp = new CanvasJS.Chart('chartContainerForExp', this.chartOptionsForExp)
    // this.chartForExp.render()
  },
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push('/login')
    } else {
    }
  },
  created: function () {
    this.userId = this.$session.get('userId')
    this.sDate = moment().format('YYYY-MM-DD').substr(0, 7)
    this.eDate = moment().format('YYYY-MM-DD').substr(0, 7)

    // 전체 페이지
    // this.getTotalCalculate()
  },
  computed: {
    computedDateFormatted () {
      this.sDate = this.sDate.substr(0, 7)
      console.log(this.sDate)
      return this.sDate
    },
    computedDateFormatted2 () {
      this.eDate = this.eDate.substr(0, 7)
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
    },
    showTotalContent () {
      this.$nextTick(() => {
        if (this.showTotalContent) {
          console.log('render')
          if (this.chartForIncome) {
            this.chartForIncome.destroy()
          }
          if (this.chartForExp) {
            this.chartForExp.destroy()
          }
          this.chartForTotal = new CanvasJS.Chart('chartContainerForTotal', this.chartOptionsForTotal)
          this.chartForTotal.render()
        }
      })
    },
    showIncomeContent () {
      this.$nextTick(() => {
        if (this.showIncomeContent) {
          if (this.chartForTotal) {
            this.chartForTotal.destroy()
          }
          if (this.chartForExp) {
            this.chartForExp.destroy()
          }
          console.log('render2')
          this.chartForIncome = new CanvasJS.Chart('chartContainerForIncome', this.chartOptionsForIncome)
          this.chartForIncome.render()
        }
      })
    },
    showExpContent () {
      this.$nextTick(() => {
        if (this.showExpContent) {
          if (this.chartForTotal) {
            this.chartForTotal.destroy()
          }
          if (this.chartForIncome) {
            this.chartForIncome.destroy()
          }
          console.log('render3')
          this.chartForExp = new CanvasJS.Chart('chartContainerForExp', this.chartOptionsForExp)
          this.chartForExp.render()
        }
      })
    },
    totalCooCost () {
      this.$nextTick(() => {
        this.totalExpenditure = this.totalCooCost + this.totalItemCost  // 지출 소계
      })
    },
    totalItemCost () {
      this.$nextTick(() => {
        this.totalExpenditure = this.totalCooCost + this.totalItemCost  // 지출 소계
      })
    },
    totalExpenditure () {
      this.$nextTick(() => {
        this.totalIncMinusExp = this.totalIncomeCost - this.totalExpenditure  // 수입 - 지출
      })
    },
    totalIncomeCost () {
      this.$nextTick(() => {
        this.totalIncMinusExp = this.totalIncomeCost - this.totalExpenditure  // 수입 - 지출
      })
    },
    totalIncMinusExp () {
      this.$nextTick(() => {
        this.drawTotalChart()  // 전체 그래프 그리기
      })
    },
    expCooDataPoints () {
      this.$nextTick(() => {
        this.drawExpCooChart()  // 지출-발생비용 그래프 그리기
        this.getExpTotalChartData() // 전체 그래프 데이터 계산
      })
    },
    expItemDataPoints () {
      this.$nextTick(() => {
        this.drawExpItemChart() // 지출-자재구입 그래프 그리기
        this.getExpTotalChartData() // 전체 그래프 데이터 계산
      })
    },
    expTotalDataPoints () {
      this.$nextTick(() => {
        this.drawExpTotalChart()  // 지출-전체 그래프 그리기
      })
    }
  },
  methods: {
    radioChanged: function (event) {
      switch (event) {
        case 'radio-total' :
          console.log('radio-total!')
          this.showExpCOOContent = true
          this.showExpItemContent = true
          this.drawExpTotalChart()
          break
        case 'radio-coo' :
          console.log('radio-coo!')
          this.showExpCOOContent = true
          this.showExpItemContent = false
          this.drawExpCooChart()
          break
        case 'radio-item' :
          console.log('radio-item!')
          this.showExpCOOContent = false
          this.showExpItemContent = true
          this.drawExpItemChart()
          break
      }
    },
    showExp () {
      console.log('showExp')
      this.showExpContent = true
      this.showIncomeContent = false
      this.showTotalContent = false
      this.chartOptionsForExp.data[0].dataPoints = []
      this.cooItems = []
      this.itemItems = []
    },
    showIncome () {
      console.log('showIncome')
      this.showExpContent = false
      this.showIncomeContent = true
      this.showTotalContent = false
      this.chartOptionsForIncome.data[0].dataPoints = []
      this.incomeItems = []
      this.incomeTotal = 0
    },
    showTotal () {
      console.log('showTotal')
      this.showExpContent = false
      this.showIncomeContent = false
      this.showTotalContent = true
      this.chartOptionsForTotal.data[0].dataPoints = []
      this.chartOptionsForTotal.data[1].dataPoints = []
      this.totalIncMinusExp = 0
      this.totalIncomeCost = 0
      this.totalExpenditure = 0
      this.totalItemCost = 0
      this.totalCooCost = 0
    },
    getTotalIncome () {
      this.getTotalIncomeData()
    },
    searchJournals () { // 전체 페이지 검색버튼
      this.loader = 'loading'
      this.$validator.validateAll().then((result) => {
        if (!result) {
          return
        }
        this.getTotalCalculate()
      }).catch(() => {})
    },
    searchIncomes () {  // 수입 페이지 검색버튼
      this.getTotalIncome()
      this.getIncomeData()
    },
    searchExpenditure () {  // 지출 페이지 검색버튼
      console.log('Search expenditure!')
      this.getCooData()
      this.getItemData()
      this.expCooDataPoints = []  // 발생비용 데이터 초기화
      this.getExpCooChartData()
      this.expItemDataPoints = []  // 자재구입 데이터 초기화
      this.getExpItemChartData()
      this.row = 'radio-total'  // 검색버튼 누르는 순간 라디오버튼 '전체'로 설정
      this.showExpCOOContent = true
      this.showExpItemContent = true
    },
    getStrWithComma: function (dataVal) {
      var tmpStr = dataVal + ''
      tmpStr = tmpStr.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      tmpStr = '￦' + tmpStr
      return tmpStr
    },
    getTotalCalculate: function () {
      this.getCOOSum()  // 발생비용 합계
      this.getItemExpSum() // 자재구입 합계

      this.getIncomeSum() // 수입비용 합계
    },
    drawTotalChart: function () {
      var tmpDataPoints = []
      var tmpData = {}
      // tmpData.x = new Date(this.sDate)
      tmpData.label = this.sDate + '~' + this.eDate
      tmpData.y = this.totalExpenditure
      tmpDataPoints.push(tmpData)
      this.chartOptionsForTotal.data[0].dataPoints = tmpDataPoints
      this.chartOptionsForTotal.axisY.title = '원'

      var tmpDataPoints2 = []
      var tmpData2 = {}
      // tmpData2.x = new Date(this.sDate)
      tmpData2.y = this.totalIncomeCost
      tmpDataPoints2.push(tmpData2)
      this.chartOptionsForTotal.data[1].dataPoints = tmpDataPoints2
      this.chartOptionsForTotal.axisY.title = '원'

      this.chartForTotal.render()
    },
    drawExpTotalChart: function () {  // 지출 전체 그래프 그리기
      this.chartOptionsForExp.data[0].dataPoints = this.expTotalDataPoints
      this.chartOptionsForExp.axisY.title = '원'
      this.chartForExp.render()
    },
    drawExpItemChart: function () { // 지출 자재구입 그래프 그리기
      this.chartOptionsForExp.data[0].dataPoints = this.expItemDataPoints
      this.chartOptionsForExp.axisY.title = '원'
      this.chartForExp.render()
    },
    drawExpCooChart: function () {  // 지출 발생비용 그래프 그리기
      this.chartOptionsForExp.data[0].dataPoints = this.expCooDataPoints
      this.chartOptionsForExp.axisY.title = '원'
      this.chartForExp.render()
    },
    findSameLabel: function (targetArray, sourceTime) {
      for (var i = 0; i < targetArray.length; i++) {
        if (targetArray[i].label === sourceTime) {
          return i
        }
      }
      return -999
    },
    // 지출 토탈(발생비용 + 자재구입) 차트 데이터 계산
    async getExpTotalChartData () {
      // 시작날짜와 종료날짜 사이의 월을 이용하여 데이터배열을 만든다
      var tmpDataPointsForAll = this.getBetweenMonthData(this.sDate, this.eDate)

      // 같은 날짜의 발생비용 데이터를 합침
      for (var i = 0; i < this.expCooDataPoints.length; i++) {
        for (var j = 0; j < tmpDataPointsForAll.length; j++) {
          if (this.expCooDataPoints[i].label === tmpDataPointsForAll[j].label) {
            tmpDataPointsForAll[j].y += this.expCooDataPoints[i].y
          }
        }
      }

      // 같은 날짜의 자재구입 데이터를 합침
      for (var k = 0; k < this.expItemDataPoints.length; k++) {
        for (var l = 0; l < tmpDataPointsForAll.length; l++) {
          if (this.expItemDataPoints[k].label === tmpDataPointsForAll[l].label) {
            tmpDataPointsForAll[l].y += this.expItemDataPoints[k].y
          }
        }
      }

      this.expTotalDataPoints = tmpDataPointsForAll
      // console.log(this.expTotalDataPoints)
    },
    // 자재구입 차트 데이터 얻기
    async getExpItemChartData () {
      if (this.expItemDataPoints.length === 0) { // 데이터를 로드하지 않았다면 DB로 부터 데이터를 로드한다
        // 시작날짜와 종료날짜 사이의 월을 이용하여 데이터배열을 만든다
        var tmpDataPoints = this.getBetweenMonthData(this.sDate, this.eDate)

        const response = await ItemService.fetchItemExp({
          userId: this.userId,
          startDate: this.sDate,
          endDate: this.eDate
        })

        for (var i = 0; i < response.data.length; i++) {
          for (var j = 0; j < tmpDataPoints.length; j++) {
            if (response.data[i]._id.date === tmpDataPoints[j].label) {
              tmpDataPoints[j].y = response.data[i].totalExpenditure
            }
          }
        }
        this.expItemDataPoints = tmpDataPoints
      }
    },
    // 발생비용 차트 데이터 얻기
    async getExpCooChartData () {
      if (this.expCooDataPoints.length === 0) { // 데이터를 로드하지 않았다면 DB로 부터 데이터를 로드한다
        // 시작날짜와 종료날짜 사이의 월을 이용하여 데이터배열을 만든다
        var tmpDataPoints = this.getBetweenMonthData(this.sDate, this.eDate)

        const response = await JournalService.fetchJournalCOOSum({
          userId: this.userId,
          startDate: this.sDate,
          endDate: this.eDate
        })

        for (var i = 0; i < response.data.length; i++) {
          for (var j = 0; j < tmpDataPoints.length; j++) {
            if (response.data[i]._id.date === tmpDataPoints[j].label) {
              tmpDataPoints[j].y = response.data[i].totalCooCost
            }
          }
        }
        this.expCooDataPoints = tmpDataPoints
      }
    },
    async getItemData () {
      const response = await ItemService.fetchJournalsByYMNUserIdAndDetail({
        userId: this.userId,
        startDate: this.sDate,
        endDate: this.eDate
      })

      var tmpItemItems = []
      var tmpItemTotal = 0

      for (var i = 0; i < response.data.length; i++) {
        for (var j = 0; j < response.data[i].item_details.length; j++) {
          var tmpItemItem = {}
          // _id
          tmpItemItem._id = response.data[i]._id

          // 날짜
          tmpItemItem.date = response.data[i].date

          // 품목명
          tmpItemItem.itemName = response.data[i].item_details[j].itemName

          // 수량
          tmpItemItem.amount = response.data[i].item_details[j].itemAmount

          // 금액
          tmpItemItem.cost = response.data[i].item_details[j].itemPrice

          // 자재구입 소계
          tmpItemTotal += tmpItemItem.cost
          tmpItemItems.push(tmpItemItem)
        }
      }
      this.itemItems = tmpItemItems
      this.itemTotal = tmpItemTotal
      /*
      const response = await ItemService.fetchJournalsByYMNUserIdAndDetail({
        userId: this.userId,
        startDate: this.sDate,
        endDate: this.eDate
      })
      console.log(response.data)
      var tmpItemItems = []
      var tmpItemTotal = 0

      for (var i = 0; i < response.data.length; i++) {
        for (var j = 0; j < response.data[i].itemDetail.length; j++) {
          var tmpItemItem = {}
          // _id
          tmpItemItem._id = response.data[i]._id

          // 날짜
          tmpItemItem.date = response.data[i].date

          // 품목명
          tmpItemItem.itemName = response.data[i].itemDetail[j].itemName

          // 수량
          tmpItemItem.amount = response.data[i].itemDetail[j].itemAmount

          // 금액
          tmpItemItem.cost = response.data[i].itemDetail[j].itemPrice

          // 자재구입 소계
          tmpItemTotal += tmpItemItem.cost
          tmpItemItems.push(tmpItemItem)
        }
      }
      this.itemItems = tmpItemItems
      this.itemTotal = tmpItemTotal
      */
    },
    async getCooData () {
      const response = await JournalService.fetchJournalsByYMNUserIdAndCoo({
        userId: this.userId,
        startDate: this.sDate,
        endDate: this.eDate
      })

      var tmpCooItems = []
      var tmpCooTotal = 0
      for (var i = 0; i < response.data.length; i++) {
        for (var j = 0; j < response.data[i].COO.length; j++) {
          var tmpCooItem = {}
          // _id
          tmpCooItem._id = response.data[i]._id

          // 날짜
          tmpCooItem.date = response.data[i].date

          // 농장명
          const response2 = await LandService.fetchNameByLandId({
            landId: response.data[i].landId
          })
          tmpCooItem.landName = response2.data[0].name

          // 발생품목
          tmpCooItem.category = response.data[i].COO[j].category

          // 금액
          tmpCooItem.cost = response.data[i].COO[j].cost

          // 발생비용 소계
          tmpCooTotal += tmpCooItem.cost
          tmpCooItems.push(tmpCooItem)
        }
      }
      this.cooItems = tmpCooItems
      this.cooTotal = tmpCooTotal
    },
    async getTotalIncomeData () {
      // 년월, 유저아이디로 income.amount가 '', null이 아닌 작업일지만 가져옴
      const response = await JournalService.fetchJournalsByYMNUserId({
        userId: this.userId,
        startDate: this.sDate,
        endDate: this.eDate
      })
      this.incomeItems = response.data

      var tmpIncomeTotal = 0
      for (var i = 0; i < this.incomeItems.length; i++) {
        // 농장명
        const response2 = await LandService.fetchNameByLandId({
          landId: this.incomeItems[i].landId
        })
        this.incomeItems[i].landName = response2.data[0].name

        // 항목(작물)
        const response3 = await LandService.fetchCropNameByLandId({
          landId: this.incomeItems[i].landId
        })
        this.incomeItems[i].cropName = response3.data[0].text

        // 수입 소계
        tmpIncomeTotal += this.incomeItems[i].income.amount
      }
      this.incomeTotal = tmpIncomeTotal
    },
    async getIncomeData () {
      var tmpDataPoints = this.getBetweenMonthData(this.sDate, this.eDate)

      const response = await JournalService.fetchJournalInc({
        userId: this.userId,
        startDate: this.sDate,
        endDate: this.eDate
      })

      for (var i = 0; i < response.data.length; i++) {
        for (var j = 0; j < tmpDataPoints.length; j++) {
          if (response.data[i]._id.date === tmpDataPoints[j].label) {
            tmpDataPoints[j].y = response.data[i].totalIncome
          }
        }
      }
      this.chartOptionsForIncome.data[0].dataPoints = tmpDataPoints
      this.chartOptionsForIncome.axisY.title = '원'

      this.chartForIncome.render()
      /*
      const response = await JournalService.fetchJournalInc({
        userId: this.userId,
        startDate: this.sDate,
        endDate: this.eDate
      })
      var incomeData = response.data
      console.log(response.data)

      var tmpDataPoints = []
      for (var i = 0; i < incomeData.length; i++) {
        var tmpData = {}
        // tmpData.x = new Date(incomeData[i]._id.date)
        tmpData.label = incomeData[i]._id.date
        tmpData.y = incomeData[i].totalIncome
        tmpDataPoints.push(tmpData)
      }
      this.chartOptionsForIncome.data[0].dataPoints = tmpDataPoints
      this.chartOptionsForIncome.axisY.title = '원'

      this.chartForIncome.render()
      */
    },
    async getIncomeSum () {
      const response = await JournalService.fetchJournalInc({
        userId: this.userId,
        startDate: this.sDate,
        endDate: this.eDate
      })
      var incomeSumData = response.data
      var tmpTotal = 0
      for (var i = 0; i < incomeSumData.length; i++) {
        tmpTotal += incomeSumData[i].totalIncome
      }
      this.totalIncomeCost = tmpTotal
    },
    async getItemExpSum () {
      const response = await ItemService.fetchItemExp({
        userId: this.userId,
        startDate: this.sDate,
        endDate: this.eDate
      })
      var itemExpSumData = response.data
      var tmpTotal = 0
      for (var i = 0; i < itemExpSumData.length; i++) {
        tmpTotal += itemExpSumData[i].totalExpenditure
      }
      this.totalItemCost = tmpTotal

      // 소계
      // this.totalExpenditure = this.totalCooCost + this.totalItemCost
    },
    async getCOOSum () {
      const response = await JournalService.fetchJournalCOOSum({
        userId: this.userId,
        startDate: this.sDate,
        endDate: this.eDate
      })
      var cooSumData = response.data
      var tmpTotal = 0
      for (var i = 0; i < cooSumData.length; i++) {
        tmpTotal += cooSumData[i].totalCooCost
      }
      this.totalCooCost = tmpTotal
    },
    showItem (item) {
      var emitParams = {'journalId': item._id, 'origin': 'fromPredict'}
      bus.$emit('dialogForShow', emitParams)
    },
    showItemForItem (item) {
      var emitParams = {'itemId': item._id, 'origin': 'fromPredict'}
      bus.$emit('dialogForShowItem', emitParams)
    },
    submit () {
      if (this.$refs.form.validate()) {
      }
    },
    clear () {
      this.$refs.form.reset()
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
    getBetweenMonthData: function (startDate, endDate) {
      // https://www.npmjs.com/package/moment-range
      const start = moment(this.sDate, 'YYYY-MM')
      const end = moment(this.eDate, 'YYYY-MM')
      const range = moment.range(start, end)
      var tmpDatas = []
      for (let month of range.by('month')) {
        var tmpData = {}
        tmpData.label = month.format('YYYY-MM')
        // console.log(month.format('YYYY-MM'))
        tmpData.y = 0
        tmpDatas.push(tmpData)
      }
      return tmpDatas
    }
  }
}
</script>
