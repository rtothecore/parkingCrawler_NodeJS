<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="1024px" height="768px" fullscreen hide-overlay transition="dialog-bottom-transition">

       <v-tabs
          v-model="active"
          color="cyan"
          dark
          slider-color="yellow"
       >
          <v-tab            
            :key="1"
            ripple
          >
            작업일지
          </v-tab>

          <v-tab            
            :key="2"
            ripple
          >
            자재일지
          </v-tab>

          <!-- 작 업 일 지 -->
          <v-tab-item            
            :key="1"
          >
          
          <v-card color="white">

            <div style="width:1200px; margin:0 auto;">
              <!-- dummy --> <div style="height:20px"/>
        <b-row>
          <b-col md="12">
            <b-card header="작업일지 작성" header-tag="header">
              <h3 slot="header" class="mb-0"><strong>작업일지 작성</strong></h3>
              <b-row>
                <b-col sm="12" lg="6">
                  <div style="width:1150px; margin:0 auto;">
            <!--
            <v-card-title>
              <span class="headline" style="color:black">{{User_Profile}}</span>               
            </v-card-title>
            -->
              <span class="headline" style="color:black; padding-left:40px; float:left">{{getDateWithKorean(User_Profile)}}</span>               
              <span style="float:right">
                <v-btn outline color="indigo" flat @click.native="dialog = false">닫기</v-btn>
              </span>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs6 sm6 md3>
                    <v-text-field
                      v-model="skyStatusText"
                      label="날씨"
                      placeholder="날씨"
                      hint="자동입력"
                      readonly
                    ></v-text-field>                    
                  </v-flex>
                  <v-flex xs6 sm6 md3>
                    <v-text-field
                      v-model="RN1"
                      label="강수량"
                      placeholder="강수량"
                      hint="자동입력"
                      readonly
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs6 sm6 md6/>

                  <v-flex xs6 sm6 md2>
                    <v-text-field
                      v-model="avgT1HText"
                      label="평균온도"
                      placeholder="평균온도"
                      hint="자동입력"
                      readonly
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs6 sm6 md2>
                    <v-text-field
                      v-model="maxT1HText"
                      label="최대온도"
                      placeholder="최대온도"
                      hint="자동입력"
                      readonly
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs6 sm6 md2>
                    <v-text-field
                      v-model="minT1HText"
                      label="최소온도"
                      placeholder="최소온도"
                      hint="자동입력"
                      readonly
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs6 sm6 md2>
                    <v-text-field
                      v-model="avgREHText"
                      label="평균습도"
                      placeholder="평균습도"
                      hint="자동입력"
                      readonly
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs6 sm6 md2>
                    <v-text-field
                      v-model="maxREHText"
                      label="최대습도"
                      placeholder="최대습도"
                      hint="자동입력"
                      readonly
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs6 sm6 md2>
                    <v-text-field
                      v-model="minREHText"
                      label="최소습도"
                      placeholder="최소습도"
                      hint="자동입력"
                      readonly
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs6 sm6 md3>
                    <v-select
                      v-validate="'required'"
                      :items="landItems"
                      v-model="selectLand"
                      :error-messages="errors.collect('selectLand')"
                      label="농장명"
                      data-vv-name="selectLand"
                      required
                      v-on:change="onChangeLand"
                      item-text="name"
                      item-value="_id"                      
                    ></v-select>
                  </v-flex>
                  <v-flex xs6 sm6 md3>
                    <v-text-field
                      v-model="cropName"
                      label="작물명" 
                      hint="농장명을 선택하면 자동입력됩니다"
                      persistent-hint
                      required                      
                      ></v-text-field>
                  </v-flex>
                  <v-flex xs6 sm6 md2>
                    <v-select
                      v-validate="'required'"
                      :items="workType"
                      v-model="selectWorkType"
                      :error-messages="errors.collect('selectWorkType')"
                      label="작업분류"
                      data-vv-name="selectWorkType"
                      required
                      v-on:change="onChangeWorkType"
                      item-text="text"
                      item-value="wCode"   
                      hint="작물명에 따른 작업분류 선택"
                      persistent-hint                                        
                    ></v-select>
                  </v-flex>
                  

                  <v-flex xs6 sm6 md2>
                    <v-text-field
                      v-model="workTime"
                      label="작업시간"
                      type="number"
                      min="0"
                      hint="1시간 단위"
                      persistent-hint 
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs6 sm6 md2>
                    <v-text-field
                      v-model="workerNumber"
                      label="작업인원"
                      type="number"
                      min="0"
                    ></v-text-field>
                  </v-flex>                  

                  <v-flex xs12>
                    <div slot="label">
                      <h4>발생비용 <small>(optional)</small>
                      <v-btn outline color="indigo" flat @click.native="addCooRow">추가</v-btn>
                      <v-btn outline color="indigo" flat @click.native="deleteCooRow">삭제</v-btn>
                      </h4>
                    </div>
                  </v-flex>
                  
                  <template v-for="(item, index) in cooItems">
                    <v-flex xs1 sm1 md1 :key="'F' + index">
                      <v-checkbox v-model="item.checkBox"></v-checkbox>
                    </v-flex>
                    <v-flex xs6 sm6 md6 :key="'A' + index">
                      <v-text-field
                        label="발생분류"                      
                        v-model="item.category"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs5 sm5 md5 :key="'B' + index">
                      <v-text-field
                        label="발생비용"
                        v-model="item.cost"
                        v-on:change="onChangeItemCost"
                        type="number"
                        min="0"
                      ></v-text-field>
                    </v-flex> 
                  </template>                                                     

                  <v-flex xs6 sm6 md6>                    
                  </v-flex>
                  <v-flex xs6 sm6 md6>
                    <v-text-field
                      v-model="CooTotal"
                      label="총 발생비용"
                      placeholder="총 발생비용"
                      readonly
                    ></v-text-field>
                  </v-flex>    

                  <template v-if='showShipment'>
                    <v-flex xs6 sm6 md6>
                      <v-text-field
                        v-model="shipmentAmount"
                        label="출하량"                        
                        type="number"
                        min="0"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs6 sm6 md6>
                      <v-text-field
                        v-model="shipmentDetail"
                        label="출하량 상세"                        
                      ></v-text-field>
                    </v-flex>
                  </template>

                  <template v-if='showIncome'>
                    <v-flex xs6 sm6 md6>
                      <v-text-field
                        v-model="incomeAmount"
                        label="수입량"
                        type="number"
                        min="0"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs6 sm6 md6>
                      <v-text-field
                        v-model="incomeDetail"
                        label="수입량 상세"                        
                      ></v-text-field>
                    </v-flex>
                  </template>

                  <template v-if='showUsage'>
                    <v-flex xs12>
                      <div slot="label">
                        <h4>사용량 <small>(optional)</small>
                        <v-btn outline color="indigo" flat @click.native="addUsageRow">추가</v-btn>
                        <v-btn outline color="indigo" flat @click.native="deleteUsageRow">삭제</v-btn>
                        </h4>
                      </div>
                    </v-flex>

                    <template v-for="(item, index) in usageItems">
                      <v-flex xs1 sm1 md1 :key="'G' + index">
                        <v-checkbox v-model="item.checkBox"></v-checkbox>
                      </v-flex>
                      <v-flex xs4 sm4 md4 :key="'C' + index">
                        <!--
                        <v-select                      
                          :items="itemNames"
                          v-model="item.itemName"
                          :error-messages="errors.collect('item.itemName')"
                          label="품목명"
                          data-vv-name="item.itemName"
                          required                           
                          hint="품목명 선택"
                          persistent-hint
                          @change="onChangeItemName(item.itemName, index)"
                          @blur="onBlurItemSelect(item.itemName, index)"                         
                          item-text="itemName"
                          item-value="itemId"                                                
                        ></v-select>
                        -->
                        <v-select                      
                          :items="itemNames"
                          v-model="item.itemName"
                          :error-messages="errors.collect('item.itemName')"
                          label="품목명"
                          data-vv-name="item.itemName"
                          required                           
                          hint="품목명 선택"
                          persistent-hint
                          @change="onChangeItemName(item.itemName, index)"                                                  
                          item-text="itemName"
                          item-value="itemId"                                                
                        ></v-select>
                      </v-flex>
                      <v-flex xs3 sm3 md3 :key="'D' + index">
                        <v-text-field
                          label="재고량"
                          v-model="item.stock"
                          type="number"
                          min="0"
                          readonly
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs4 sm4 md4 :key="'E' + index">
                        <v-text-field
                          label="사용량"
                          v-model="item.usage"
                          v-on:change="onChangeJournalUsage(item.usage, index)"
                          type="number"
                          min="0"
                        ></v-text-field>
                      </v-flex>
                    </template>
                  </template>                  

                  <template v-if='showOutput'>
                    <v-flex xs6 sm6 md6>
                      <v-text-field
                        v-model="outputAmount"
                        label="생산량"                        
                        type="number"
                        min="0"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs6 sm6 md6>
                      <v-text-field
                        v-model="outputDetail"
                        label="생산량 상세"                        
                      ></v-text-field>
                    </v-flex>
                  </template>
                  
                  <v-flex xs12 sm12 md12>
                    <v-textarea
                      v-model="workContent"
                      auto-grow
                      box
                      color="deep-purple"
                      label="작업내용"
                      rows="3"
                    ></v-textarea>
                  </v-flex>

                  <v-flex xs12 sm12 md12>
                    <v-textarea
                      v-model="remarks"
                      auto-grow
                      box
                      color="deep-purple"
                      label="특이사항"
                      rows="3"
                    ></v-textarea>
                  </v-flex>

                  <v-flex xs4 sm4 md4>                    
                    <!-- https://medium.freecodecamp.org/how-to-build-a-flexible-image-uploader-component-using-vue-js-2-0-5ee7fc77516 -->
                    <image-input v-model="avatar">
                      <div slot="activator">
                        <v-avatar size="150px" v-ripple v-if="!avatar" class="grey lighten-3 mb-3">
                          <span>사진 추가</span>
                        </v-avatar>
                        <v-avatar size="150px" v-ripple v-else class="mb-3">
                          <img :src="avatar.imageURL" alt="avatar">
                        </v-avatar>
                      </div>
                    </image-input>                    
                  </v-flex>

                  <v-flex xs4 sm4 md4>                    
                    <!-- https://medium.freecodecamp.org/how-to-build-a-flexible-image-uploader-component-using-vue-js-2-0-5ee7fc77516 -->
                    <image-input v-model="avatar2">
                      <div slot="activator">
                        <v-avatar size="150px" v-ripple v-if="!avatar2" class="grey lighten-3 mb-3">
                          <span>사진 추가</span>
                        </v-avatar>
                        <v-avatar size="150px" v-ripple v-else class="mb-3">
                          <img :src="avatar2.imageURL" alt="avatar2">
                        </v-avatar>
                      </div>
                    </image-input>                    
                  </v-flex>

                  <v-flex xs4 sm4 md4>                    
                    <!-- https://medium.freecodecamp.org/how-to-build-a-flexible-image-uploader-component-using-vue-js-2-0-5ee7fc77516 -->
                    <image-input v-model="avatar3">
                      <div slot="activator">
                        <v-avatar size="150px" v-ripple v-if="!avatar3" class="grey lighten-3 mb-3">
                          <span>사진 추가</span>
                        </v-avatar>
                        <v-avatar size="150px" v-ripple v-else class="mb-3">
                          <img :src="avatar3.imageURL" alt="avatar3">
                        </v-avatar>
                      </div>
                    </image-input>                    
                  </v-flex>
                  
                </v-layout>
              </v-container>
              <!-- <small>*필수 입력 사항입니다</small> -->
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn outline color="indigo" flat @click.native="dialog = false">취소</v-btn>
              <!-- <v-btn color="blue darken-1" flat @click.native="dialog = false" :disabled="!valid">작성</v-btn> -->
              <v-btn color="primary" @click.native="save">작성</v-btn>
            </v-card-actions>

            
                  </div>
                </b-col>              
              </b-row>              
            </b-card>
          </b-col>
        </b-row>
      </div>  

          </v-card>
        </v-tab-item>
        <!-- 작 업 일 지 -->

        <!-- 자 재 일 지 -->
        <v-tab-item            
            :key="2"
          >
          <v-card color="white">

            <div style="width:1200px; margin:0 auto;">
              <!-- dummy --> <div style="height:20px"/>
        <b-row>
          <b-col md="12">
            <b-card header="자재관리 작성" header-tag="header">
              <h3 slot="header" class="mb-0"><strong>자재관리 작성</strong></h3>
              <b-row>
                <b-col sm="12" lg="6">
                  <div style="width:1150px; margin:0 auto;">
            
            <!--
            <v-card-title>
              <span class="headline" style="color:black">{{Item_User_Profile}}</span> <v-btn outline color="black" flat @click.native="dialog = false">닫기</v-btn>
            </v-card-title>
            -->
            <span class="headline" style="color:black; padding-left:40px; float:left">{{getDateWithKorean(Item_User_Profile)}}</span>               
            <span style="float:right">
              <v-btn outline color="indigo" flat @click.native="dialog = false">닫기</v-btn>
            </span>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>

                  <v-flex xs6 sm6 md3>
                    <v-select
                      :items="iLandItems"
                      v-model="iSelectLand"
                      :error-messages="errors.collect('iSelectLand')"
                      label="농장명"
                      data-vv-name="iSelectLand"
                      required
                      v-on:change="onChangeILand"
                      item-text="name"
                      item-value="_id"                      
                    ></v-select>
                  </v-flex>                                  

                  <v-flex xs6 sm6 md3>
                    <v-select
                      :items="items"
                      v-model="selectItem"
                      :error-messages="errors.collect('selectItem')"
                      label="구입품목"
                      data-vv-name="selectItem"
                      required
                      v-on:change="onChangeItem"
                      item-text="text"
                      item-value="wCode"   
                      hint="작업분류와 매칭되는 구입품목 선택"
                      persistent-hint                                        
                    ></v-select>
                  </v-flex>
                  <v-flex xs6 sm6 md3>
                    <!-- <v-btn outline color="black" @click.native="addItem">구입품목 추가</v-btn> -->
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    
                  </v-flex> 
                  
                  <v-flex xs12>
                    <div slot="label">
                      <h4>품목상세 <small>(optional)</small>
                      <v-btn outline color="indigo" flat @click.native="addItemRow">추가</v-btn>
                      <v-btn outline color="indigo" flat @click.native="deleteItemRow">삭제</v-btn>
                      </h4>
                    </div>
                  </v-flex>
                  
                  <template v-for="(item, index) in itemItems">
                    <v-flex xs1 sm1 md1 :key="'F' + index">
                      <v-checkbox v-model="item.checkBox"></v-checkbox>
                    </v-flex>
                    <v-flex xs4 sm4 md4 :key="'C' + index">
                      <v-text-field
                        label="품목명"                      
                        v-model="item.itemName"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs3 sm3 md3 :key="'D' + index">
                      <v-text-field
                        label="수량"
                        v-model="item.itemAmount"  
                        type="number"
                        min="0"                      
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs4 sm4 md4 :key="'E' + index">
                      <v-text-field
                        label="가격"
                        v-model="item.itemPrice"
                        v-on:change="onChangeItemPrice"
                        type="number"
                        min="0"
                      ></v-text-field>
                    </v-flex>  
                  </template>                                                     

                  <v-flex xs8 sm8 md8>                    
                  </v-flex>
                  <v-flex xs4 sm4 md4>
                    <v-text-field
                      v-model="itemPriceTotal"
                      label="총 가격"
                      placeholder="Placeholder"
                      readonly
                    ></v-text-field>
                  </v-flex>                      
                  
                  <v-flex xs12 sm12 md12>
                    <v-textarea
                      v-model="purpose"
                      auto-grow
                      box
                      color="deep-purple"
                      label="사용목적"
                      rows="3"
                    ></v-textarea>
                  </v-flex>
                  
                  <v-flex xs4 sm4 md4>                    
                    <!-- https://medium.freecodecamp.org/how-to-build-a-flexible-image-uploader-component-using-vue-js-2-0-5ee7fc77516 -->
                    <image-input v-model="iavatar">
                      <div slot="activator">
                        <v-avatar size="150px" v-ripple v-if="!iavatar" class="grey lighten-3 mb-3">
                          <span>사진 추가</span>
                        </v-avatar>
                        <v-avatar size="150px" v-ripple v-else class="mb-3">
                          <img :src="iavatar.imageURL" alt="avatar">
                        </v-avatar>
                      </div>
                    </image-input>                    
                  </v-flex>

                  <v-flex xs4 sm4 md4>                    
                    <!-- https://medium.freecodecamp.org/how-to-build-a-flexible-image-uploader-component-using-vue-js-2-0-5ee7fc77516 -->
                    <image-input v-model="iavatar2">
                      <div slot="activator">
                        <v-avatar size="150px" v-ripple v-if="!iavatar2" class="grey lighten-3 mb-3">
                          <span>사진 추가</span>
                        </v-avatar>
                        <v-avatar size="150px" v-ripple v-else class="mb-3">
                          <img :src="iavatar2.imageURL" alt="avatar2">
                        </v-avatar>
                      </div>
                    </image-input>                    
                  </v-flex>

                  <v-flex xs4 sm4 md4>                    
                    <!-- https://medium.freecodecamp.org/how-to-build-a-flexible-image-uploader-component-using-vue-js-2-0-5ee7fc77516 -->
                    <image-input v-model="iavatar3">
                      <div slot="activator">
                        <v-avatar size="150px" v-ripple v-if="!iavatar3" class="grey lighten-3 mb-3">
                          <span>사진 추가</span>
                        </v-avatar>
                        <v-avatar size="150px" v-ripple v-else class="mb-3">
                          <img :src="iavatar3.imageURL" alt="avatar3">
                        </v-avatar>
                      </div>
                    </image-input>                    
                  </v-flex>
                  
                </v-layout>
              </v-container>
              <!-- <small>*필수 입력 사항입니다</small> -->
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn outline color="indigo" flat @click.native="dialog = false">취소</v-btn>
              <!-- <v-btn color="blue darken-1" flat @click.native="dialog = false" :disabled="!valid">작성</v-btn> -->
              <v-btn color="primary" @click.native="itemSave">작성</v-btn>
            </v-card-actions>

                  </div>
                </b-col>              
              </b-row>              
            </b-card>
          </b-col>
        </b-row>
      </div>

          </v-card>
        </v-tab-item>
        <!-- 자 재 일 지 -->

      </v-tabs>

    </v-dialog>
  </v-layout>
</template>

<script>
import {bus} from '../main'
import LandService from '@/services/LandService'
import DcService from '@/services/DcService'
// import ScService from '@/services/ScService'
import WcService from '@/services/WcService'
import JournalService from '@/services/JournalService'
import WeatherService from '@/services/WeatherService'
import ItemService from '@/services/ItemService'
import WcDataService from '@/services/WcDataService'
import ItemDetailService from '@/services/ItemDetailService'
import ImageInput from './ImageInput.vue'
// var async = require('async')  // https://caolan.github.io/async/
export default {
  $_veeValidate: {
    validator: 'new'
  },
  data () {
    return {
      usedItemNames: [],
      iSelectLand: '',
      iLandItems: [],
      //
      selectedItem: '',
      iavatar3: null,
      iavatar2: null,
      iavatar: null,
      purpose: '',
      itemPriceTotal: 0,
      itemItems: [],
      selectItem: '',
      items: [],
      //
      outputDetail: '',
      outputAmount: '',
      incomeDetail: '',
      incomeAmount: '',
      shipmentDetail: '',
      shipmentAmount: '',
      CooTotal: 0,
      workTime: '',
      workerNumber: '',
      //
      minREHText: '',
      maxREHText: '',
      avgREHText: '',
      minT1HText: '',
      maxT1HText: '',
      avgT1HText: '',
      //
      minREH: '',
      maxREH: '',
      avgREH: '',
      minT1H: '',
      maxT1H: '',
      avgT1H: '',
      RN1: '',
      skyStatusText: '',
      skyStatus: '',
      selectedWorkTypeText: '',
      itemNames: [],
      showOutput: false,
      showUsage: false,
      showIncome: false,
      showShipment: false,
      sCode: '',
      usageItems: [],
      cooItems: [],
      avatar3: null,
      avatar2: null,
      avatar: null,
      saving: false,
      saved: false,
      active: null,
      weatherData: [],
      convertedXY: {},
      newEvent: {},
      journalId: '',
      remarks: '',
      workContent: '',
      selectedWSTime: '',
      selectedWETime: '',
      selectedWorkTypeCode: '',
      selectedLandId: '',
      selectedCropCode: '',
      dialog: false,
      Item_User_Profile: '',
      User_Profile: '',
      menu2: false,
      menu3: false,
      e6: null,
      e7: null,
      landItems: [],
      userId: '',
      cropName: '',
      workType: [],
      selectLand: null,
      selectWorkType: null,
      dictionary: {
        custom: {
          selectLand: {
            required: '농장명을 선택해주세요'
          },
          selectWorkType: {
            required: '작업분류를 선택해주세요'
          }
        }
      }
    }
  },
  watch: {
    avatar: {
      handler: function () {
        this.saved = false
        // console.log(this.avatar.uploadedFilename)
      },
      deep: true
    }
    /*
    cooItems: {
      handler: function (val, oldVal) {
        console.log(val)
        for (var i = 0; i < val.length; i++) {
          val[i].cost = val[i].cost.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        }
      },
      deep: true
    }
    */
  },
  mounted () {
    this.$validator.localize('ko', this.dictionary)
    var vm = this
    bus.$on('dialog', function (value) {
      Object.assign(vm.$data, vm.$options.data.call(vm))  // initialize this data
      // console.log(value)
      vm.User_Profile = value
      vm.Item_User_Profile = value
      // vm.eventIndex = value.eventIndex
      vm.selectLand = ''
      vm.cropName = ''
      vm.selectWorkType = ''
      vm.workContent = ''
      vm.e6 = null
      vm.e7 = null
      vm.remarks = ''
      vm.dialog = true
      vm.userId = this.$session.get('userId')
      // vm.getLocation()
      vm.getLands()
      // vm.getWeatherCrawlerDataAggByAddress(value, value, '제주특별자치도 제주시 이도이동')
      vm.getItems()
    })
    bus.$on('fromAddWorkTypeModal', function (value) {
      if (value.compType === 'new') {
        if (value.from === 'work') {
          vm.onChangeLand(vm.selectedLandId)
          vm.selectWorkType = value.addedWTC
        } else {
          vm.onChangeILand(vm.selectedLandId)
          vm.selectItem = value.addedWTC
        }
      }
    })
    bus.$on('fromAddCustomItemModalNew', function (value) {
      vm.itemNames.push(value.itemName)
      vm.usageItems[value.selectIdx].itemName = value.itemName
    })
  },
  created () {
    this.userId = this.$session.get('userId')
    // this.getLocation()
    this.getLands()
  },
  components: {
    ImageInput: ImageInput
  },
  methods: {
    async getItems () {
      const response = await WcService.fetchWorkCodesAsItem()
      this.items = response.data
    },
    async getWeatherCrawlerDataAggByAddress (sDate, eDate, address) {
      const response = await WcDataService.fetchWeatherAggDataByAddr({
        startDate: sDate,
        endDate: eDate,
        address: address
      })
      // console.log(response.data)

      if (response.data.length >= 1) {
        this.skyStatus = response.data[0].pty
        switch (this.skyStatus) {
          case 0 :
            this.skyStatusText = '맑음'
            break
          case 1 :
            this.skyStatusText = '비'
            break
          case 2 :
            this.skyStatusText = '비/눈'
            break
          case 3 :
            this.skyStatusText = '눈'
            break
        }

        this.RN1 = response.data[0].rn1
        this.avgT1H = response.data[0].t1hAvg
        this.avgT1HText = Math.round(this.avgT1H) + '℃'
        this.maxT1H = response.data[0].t1hMax
        this.maxT1HText = this.maxT1H + '℃'
        this.minT1H = response.data[0].t1hMin
        this.minT1HText = this.minT1H + '℃'
        this.avgREH = response.data[0].rehAvg
        this.avgREHText = Math.round(this.avgREH) + '%'
        this.maxREH = response.data[0].rehMax
        this.maxREHText = this.maxREH + '%'
        this.minREH = response.data[0].rehMin
        this.minREHText = this.minREH + '%'
      } else {
        this.skyStatusText = '-'
        this.RN1 = '-'
        this.avgT1HText = '-'
        this.maxT1HText = '-'
        this.minT1HText = '-'
        this.avgREHText = '-'
        this.maxREHText = '-'
        this.minREHText = '-'
      }
    },
    async getLands () {
      const response = await LandService.fetchLands({
        userId: this.userId
      })
      this.landItems = response.data.lands
      this.iLandItems = response.data.lands
    },
    async getCropCodeByLandId (landId) {
      const response = await LandService.fetchCropCodeByLandId({
        landId: landId
      })
      this.selectedCropCode = response.data[0].cropCode
      this.getCropNameByCropCode(this.selectedCropCode)
      this.getWorkTypeByCropCode(this.selectedCropCode)

      // 주소 얻어서 날씨 통계 데이터 가져오기
      var addressSplit = response.data[0].address.split(' ')
      var tmpAddress = addressSplit[0] + ' ' + addressSplit[1] + ' ' + addressSplit[2]
      this.getWeatherCrawlerDataAggByAddress(this.User_Profile, this.User_Profile, tmpAddress)
    },
    async getCropCodeByILandId (landId) {
      const response = await LandService.fetchCropCodeByLandId({
        landId: landId
      })
      this.selectedCropCode = response.data[0].cropCode
      this.getIWorkTypeByCropCode(this.selectedCropCode)
    },
    async getCropNameByCropCode (cropCode) {
      const response = await DcService.fetchCropNameByCropCode({
        cropCode: cropCode
      })
      this.cropName = response.data[0].text
      this.sCode = response.data[0].sCode
    },
    async getWorkTypeByCropCode (cropCode) {
      const response = await WcService.fetchTextByCropCode({
        cropCode: cropCode
      })
      this.workType = response.data
      this.workType.push({text: '새 작업추가'})
    },
    async getIWorkTypeByCropCode (cropCode) {
      const response = await WcService.fetchTextByCropCodeAsItem({
        cropCode: cropCode
      })
      this.items = response.data
      this.items.push({text: '새 작업추가'})
    },
    async fetchNameByLandId (landId) {
      const response = await LandService.fetchNameByLandId({
        landId: landId
      })
      this.newEvent.title = response.data[0].name
    },
    async fetchCropNameByCropCode (cropCode) {
      const response = await DcService.fetchCropNameByCropCode({
        cropCode: cropCode
      })
      this.newEvent.title += ' - ' + response.data[0].text
    },
    async fetchTextByCode (workCode) {
      const response = await WcService.fetchOneTextByCcode({
        code: workCode
      })
      this.newEvent.title += ' - ' + response.data[0].text
    },
    async fetchTextByCcode (workCode) {
      const response = await WcService.fetchOneTextByCcode({
        code: workCode
      })
      this.selectedWorkTypeText = response.data[0].text
      if (this.selectedWorkTypeText === '출하') {
        this.showShipment = true
        this.showIncome = true
        this.showUsage = false
        this.usageItems = []
        this.showOutput = false
      } else if (this.selectedWorkTypeText === '비료' || this.selectedWorkTypeText === '농약' || this.selectedWorkTypeText === '사료') {
        this.showShipment = false
        this.showIncome = false
        this.showUsage = true
        this.showOutput = false
      } else if (this.selectedWorkTypeText === '생산') {
        this.showShipment = false
        this.showIncome = false
        this.showUsage = false
        this.usageItems = []
        this.showOutput = true
      } else {
        this.showShipment = false
        this.showIncome = false
        this.showUsage = false
        this.showOutput = false
      }
    },
    async fetchItemsByWcode (workCode) {
      const response = await ItemService.fetchItemsByWcode({
        userId: this.userId,
        wCode: workCode
      })
      this.itemNames = []
      //
      var tmpItemName = {}
      tmpItemName.itemId = '0'
      tmpItemName.itemName = '품목명을 선택하세요'
      this.itemNames.push(tmpItemName)
      // this.itemNames.push('품목명을 선택하세요')
      //
      for (var i = 0; i < response.data.length; i++) {
        for (var j = 0; j < response.data[i].itemDetail.length; j++) {
          const response2 = await ItemDetailService.fetchItemDetailByItemId({
            userId: this.userId,
            itemId: response.data[i].itemDetail[j]
          })
          this.itemNames.push(response2.data[0])
        }
      }
      //
      var tmpItemName2 = {}
      tmpItemName2.itemId = '777'
      tmpItemName2.itemName = '직접입력'
      this.itemNames.push(tmpItemName2)
      // this.itemNames.push('직접입력')
      //
    },
    async fetchWeatherData (baseDate, baseTime, callback, weatherDataSize) {
      const response = await WeatherService.fetchWeatherData({
        baseDate: baseDate,
        baseTime: baseTime,
        nx: this.convertedXY.x,
        ny: this.convertedXY.y
      })
      var tmpObj = {}
      tmpObj.baseTime = baseTime
      var normalCode = '0000'
      var abnormalCode = '99'
      if (normalCode === await response.data.response.header.resultCode) {
        var sky = 'SKY'
        var t1h = 'T1H'
        var reh = 'REH'
        var rn1 = 'RN1'
        for (var i = 0; i < await response.data.response.body.items.item.length; i++) {
          if (sky === await response.data.response.body.items.item[i].category) {
            tmpObj.sky = await response.data.response.body.items.item[i].obsrValue + ''
          } else if (t1h === await response.data.response.body.items.item[i].category) {
            tmpObj.t1h = await response.data.response.body.items.item[i].obsrValue + ''
          } else if (reh === await response.data.response.body.items.item[i].category) {
            tmpObj.reh = await response.data.response.body.items.item[i].obsrValue + ''
          } else if (rn1 === await response.data.response.body.items.item[i].category) {
            tmpObj.rn1 = await response.data.response.body.items.item[i].obsrValue + ''
          }
        }
      } else if (abnormalCode === await response.data.response.header.resultCode) {
        tmpObj.sky = '-1'
        tmpObj.t1h = '-1'
        tmpObj.reh = '-1'
        tmpObj.rn1 = '-1'
      }
      this.weatherData.push(tmpObj)
      if (this.weatherData.length === weatherDataSize) {
        callback(null, 'result1')
      }
    },
    async createNewItem () {
      // 데이터 입력되지 않은 것들 필터링
      // https://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript
      this.itemItems = this.itemItems.filter(function (el) {
        return el.itemName !== '' && el.itemAmount !== ''
      })

      // itemdetails 콜렉션 생성
      var insertedItemIds = []
      for (var i = 0; i < this.itemItems.length; i++) {
        this.itemItems[i].userId = this.userId
        this.itemItems[i].journalUsage = 0
        this.itemItems[i].itemUsage = 0
        this.itemItems[i].createDate = this.User_Profile.replace(/-/gi, '')

        const response3 = await ItemDetailService.createItemDetail({
          itemDetail: this.itemItems[i]
        })
        insertedItemIds.push(response3.data.result.itemId)
      }

      // items 콜렉션 생성
      var pictureAData = ''
      var pictureBData = ''
      var pictureCData = ''

      if (this.iavatar) {
        pictureAData = this.iavatar.uploadedFilename
      }

      if (this.iavatar2) {
        pictureBData = this.iavatar2.uploadedFilename
      }

      if (this.iavatar3) {
        pictureCData = this.iavatar3.uploadedFilename
      }

      const response = await ItemService.createItem({
        userId: this.userId,
        date: this.User_Profile,
        landId: this.iSelectLand,
        item: this.selectedItem,
        itemDetail: insertedItemIds,
        purpose: this.purpose,
        pictureA: pictureAData,
        pictureB: pictureBData,
        pictureC: pictureCData
      })

      // itemdetails 콜렉션의 parentId를 업데이트
      for (var j = 0; j < insertedItemIds.length; j++) {
        await ItemDetailService.updateItemDetailWithParentId({
          itemId: insertedItemIds[j],
          parentId: response.data.result._id
        })
      }

      this.newEvent.itemId = response.data.result._id
      var workTypeVal = ''
      const response2 = await WcService.fetchOneTextByCcode({
        code: response.data.result.item
      })
      workTypeVal = response2.data[0].text
      this.newEvent.title = workTypeVal + ' 구입'
      this.newEvent.start = this.User_Profile
      this.newEvent.end = this.User_Profile
      this.newEvent.color = 'orange'
    },
    async createNewJournal () {
      /*
      async.series([this.task1, this.task2], function (err, results) {
        if (err) {
          console.log('error : ' + err)
        } else {
          console.log('task finish')
          console.log(results)
        }
      })
      */
      // 날씨 데이터
      var weatherData = {'minT1H': this.minT1H, 'maxT1H': this.maxT1H, 'avgT1H': this.avgT1H, 'minREH': this.minREH, 'maxREH': this.maxREH, 'avgREH': this.avgREH, 'avgRN1': this.RN1, 'sky': this.skyStatus}

      // 발생비용 입력되지 않은 것들 필터링
      // https://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript
      this.cooItems = this.cooItems.filter(function (el) {
        return el.category !== ''
      })

      // 발생비용 데이터
      var cooDatas = []
      for (var i = 0; i < this.cooItems.length; i++) {
        var tempCooData = {}
        tempCooData.category = this.cooItems[i].category
        tempCooData.cost = this.cooItems[i].cost
        cooDatas.push(tempCooData)
      }

      // 출하량 데이터
      var shipmentData = {'amount': this.shipmentAmount, 'detail': this.shipmentDetail}

      // 수입 데이터
      var incomeData = {'amount': this.incomeAmount, 'detail': this.incomeDetail}

      // 사용량 데이터
      var itemDetailDatas = []

      // 데이터 입력되지 않은 것들 필터링
      // https://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript
      this.usageItems = this.usageItems.filter(function (el) {
        return el.itemName !== '' && el.stock !== '' && el.usage !== ''
      })

      for (var j = 0; j < this.usageItems.length; j++) {
        var tempUsageData = {}
        tempUsageData.itemId = this.usageItems[j].itemName
        tempUsageData.usage = this.usageItems[j].usage
        itemDetailDatas.push(tempUsageData)

        // itemDetail 컬렉션의 해당 아이템 일지 사용량을 업데이트
        var tempItemDetail = {}
        tempItemDetail.userId = this.userId
        tempItemDetail.itemId = this.usageItems[j].itemName
        tempItemDetail.journalUsage = this.usageItems[j].usage
        tempItemDetail.originalJournalUsage = 0
        await ItemDetailService.updateJournalUsageByItemId({
          itemDetail: tempItemDetail
        })
      }

      // 생산량 데이터
      var outputData = {'amount': this.outputAmount, 'detail': this.outputDetail}

      // 사진 데이터
      var pictureAData = ''
      var pictureBData = ''
      var pictureCData = ''

      if (this.avatar) {
        pictureAData = this.avatar.uploadedFilename
      }

      if (this.avatar2) {
        pictureBData = this.avatar2.uploadedFilename
      }

      if (this.avatar3) {
        pictureCData = this.avatar3.uploadedFilename
      }

      const response = await JournalService.createJournal({
        userId: this.userId,
        // date: this.User_Profile.substring(10, 20),
        date: this.User_Profile,
        landId: this.selectedLandId,
        workCode: this.selectedWorkTypeCode,
        workContent: this.workContent,
        workTime: this.workTime,
        workerNumber: this.workerNumber,
        weather: weatherData,
        remarks: this.remarks,
        coo: cooDatas,
        shipment: shipmentData,
        income: incomeData,
        itemDetail: itemDetailDatas,
        output: outputData,
        pictureA: pictureAData,
        pictureB: pictureBData,
        pictureC: pictureCData
      })
      // console.log(response.data)

      this.newEvent.journalId = response.data.result._id
      this.fetchNameByLandId(this.selectedLandId)
      // this.fetchCropNameByCropCode(this.selectedCropCode)
      this.fetchTextByCode(this.selectedWorkTypeCode)
      // this.newEvent.start = this.User_Profile.substring(10, 20)
      // this.newEvent.end = this.User_Profile.substring(10, 20)
      this.newEvent.start = this.User_Profile
      this.newEvent.end = this.User_Profile
      // this.newEvent.eventIndex = this.eventIndex
    },
    async updateItemUsage (userId, landId, item, itemName, usage) {
      await ItemService.updateItemUsageByJournalUsage({
        userId: userId,
        landId: landId,
        item: item,
        itemName: itemName,
        usage: usage
      })
    },
    async fetchItemDetail (idxVal, itemIdVal) {
      const response = await ItemDetailService.fetchItemDetailByItemId({
        userId: this.userId,
        itemId: itemIdVal
      })
      this.usageItems[idxVal].stock = response.data[0].itemAmount - response.data[0].journalUsage - response.data[0].itemUsage
      this.usageItems[idxVal].itemUsage = response.data[0].itemUsage
      this.usageItems[idxVal].journalRealUsage = response.data[0].journalUsage
      this.usageItems[idxVal].itemAmount = response.data[0].itemAmount
    },
    /*
    task1: function (callback) {
      this.getWeatherData(this.User_Profile.substring(10, 20).replace(/-/gi, ''),
                          this.selectedWSTime.substring(0, 2).replace(/(^0+)/, ''),
                          this.selectedWETime.substring(0, 2).replace(/(^0+)/, ''),
                          callback)
    },
    task2: function (callback) {
      this.task21()
      // callback(null, 'result2')
    },
    async task21 () {
      const response = await JournalService.createJournals({
        userId: this.userId,
        date: this.User_Profile.substring(10, 20),
        landId: this.selectedLandId,
        workCode: this.selectedWorkTypeCode,
        workContent: this.workContent,
        workSTime: this.selectedWSTime,
        workETime: this.selectedWETime,
        // weather: [{'baseTime': '1400', 'sky': '00', 't1h': '17', 'reh': '01', 'rn1': '02'}],
        weather: this.weatherData,
        remarks: this.remarks
      })
      this.newEvent.journalId = response.data.result._id
      this.fetchNameByLandId(this.selectedLandId)
      this.fetchCropNameByCropCode(this.selectedWorkTypeCode.substring(0, 11))
      this.fetchTextByCode(this.selectedWorkTypeCode)
    },
    */
    getWeatherData: function (baseDate, baseSTime, baseETime, callback) {
      for (var i = baseSTime * 1; i < baseETime * 1; i++) {
        var baseTime = this.leadingZeros(i, 2) + '00'
        var weatherDataSize = baseETime - baseSTime
        this.fetchWeatherData(baseDate, baseTime, callback, weatherDataSize)
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
      this.getLandsByUserId()
    },
    async getLandsByUserId () {
      /*
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
          vm.convertedXY = vm.dfs_xy_conv('toXY', response.json.results[0].geometry.location.lat, response.json.results[0].geometry.location.lng)
        }
      })
      */
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
    onChangeItemPrice: function (event) {
      this.itemPriceTotal = Number('0')
      for (var i = 0; i < this.itemItems.length; i++) {
        this.itemPriceTotal = Number(this.itemPriceTotal)
        this.itemPriceTotal += Number(this.itemItems[i].itemPrice)
      }
      this.itemPriceTotal += ''
      this.itemPriceTotal = this.itemPriceTotal.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      this.itemPriceTotal = '￦' + this.itemPriceTotal
    },
    onChangeItemCost: function (event) {
      this.CooTotal = Number('0')
      for (var i = 0; i < this.cooItems.length; i++) {
        this.CooTotal = Number(this.CooTotal)
        this.CooTotal += Number(this.cooItems[i].cost)
      }
      this.CooTotal += ''
      this.CooTotal = this.CooTotal.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      this.CooTotal = '￦' + this.CooTotal
    },
    onChangeILand: function (event) {
      this.getCropCodeByILandId(this.iSelectLand)
    },
    onChangeLand: function (event) {
      this.selectedLandId = event
      this.getCropCodeByLandId(this.selectedLandId)
    },
    onChangeItem: function (event) {
      this.selectedItem = event
      if (event === '새 작업추가') {
        this.addWorkType(1)
      } else {
      }
    },
    onChangeWorkType: function (event) {
      this.selectedWorkTypeCode = event
      if (event === '새 작업추가') {
        this.addWorkType(0)
      } else {
        this.fetchTextByCcode(this.selectedWorkTypeCode)
        this.fetchItemsByWcode(this.selectedWorkTypeCode)
      }
    },
    onBlurItemSelect: function (event, idx) {
      // console.log(e)
      console.log('selected')
      this.usageItems[idx].itemName = this.itemNames[1]
    },
    onChangeItemName: function (event, idx) {
      if (event === '777') {
        this.addCustomItem(idx)
      } else {
        // 모든 옵션의 disabled 속성을 해제 시킨다
        for (var k = 0; k < this.itemNames.length; k++) {
          this.itemNames[k].disabled = false
        }

        // 모든 행에 대해서 이미 선택된 옵션만 disabled 속성을 적용한다
        for (var i = 0; i < this.usageItems.length; i++) {
          for (var j = 0; j < this.itemNames.length; j++) {
            if (this.itemNames[j].itemId === this.usageItems[i].itemName) {
              this.itemNames[j].disabled = true
            }
          }
        }
        this.fetchItemDetail(idx, event)
      }
    },
    onChangeJournalUsage: function (usage, index) {
      // this.usageItems[index].stock = this.usageItems[index].itemAmount - this.usageItems[index].itemUsage - (usage * 1)
      if ((usage * 1) > this.usageItems[index].stock) {
        this.usageItems[index].usage = 0
        this.usageItems[index].stock = this.usageItems[index].itemAmount - this.usageItems[index].journalRealUsage
      } else {
        this.usageItems[index].stock = this.usageItems[index].itemAmount - this.usageItems[index].itemUsage - this.usageItems[index].journalRealUsage - (usage * 1)
      }
    },
    onChangeWSTime: function (event) {
      this.newEvent.start = this.User_Profile.substring(10, 20) + ' ' + event
      var tmpStr = event
      this.selectedWSTime = tmpStr.replace(':', '')
      console.log(this.selectedWSTime)
    },
    onChangeWETime: function (event) {
      this.newEvent.end = this.User_Profile.substring(10, 20) + ' ' + event
      var tmpStr = event
      this.selectedWETime = tmpStr.replace(':', '')
      console.log(this.selectedWETime)
    },
    save () {
      this.$validator.validateAll().then((result) => {
        if (!result) {
          console.log(result)
          return
        }
        this.createNewJournal()
        this.$swal({
          type: 'success',
          title: '일지를 작성하였습니다',
          showConfirmButton: false,
          timer: 777
        }).then((result) => {
          bus.$emit('toJournalForNew', this.newEvent)
          this.dialog = false
        })
        // bus.$emit('toJournal', 'test')
        // this.dialog = false
      }).catch(() => {})
    },
    itemSave () {
      // console.log('item saved!')
      this.createNewItem()
      this.$swal({
        type: 'success',
        title: '자재를 등록하였습니다',
        showConfirmButton: false,
        timer: 777
      }).then((result) => {
        bus.$emit('toJournalForNew', this.newEvent)
        this.dialog = false
      })
    },
    addWorkType (workOrItem) {
      var paramForAWT = {}
      if (workOrItem === 0) {
        paramForAWT.from = 'work' // 작업일지 작성시
      } else {
        paramForAWT.from = 'item' // 자재관리 작성시
      }
      paramForAWT.compType = 'new'
      paramForAWT.cropCode = this.selectedCropCode
      bus.$emit('dialogForAddWorkType', paramForAWT)
    },
    addCustomItem (idx) {
      var paramForACI = {}
      paramForACI.selectIdx = idx
      paramForACI.from = 'new'
      bus.$emit('dialogForAddCustomItem', paramForACI)
    },
    addCooRow () {
      this.cooItems.push({
        category: '',
        cost: ''
      })
    },
    deleteCooRow () {
      /*
      if (this.cooItems.length > 0) {
        for (var i = 0; i < this.cooItems.length; i++) {
          if (this.cooItems[i].checkBox) {
            this.cooItems.splice(i, 1)
            this.onChangeItemCost()
          }
        }
      }
      */
      if (this.cooItems.length > 0) {
        for (var i = 0; i < this.cooItems.length; i++) {
          if (this.cooItems[i].checkBox) {
            this.cooItems[i].deleteId = '777'
          }
        }
        this.cooItems = this.cooItems.filter(function (el) {
          return el.deleteId !== '777'
        })
        this.onChangeItemCost()
      }
    },
    addUsageRow () {
      this.usageItems.push({
        itemName: '품목명을 선택하세요',
        stock: '',
        usage: ''
      })
    },
    deleteUsageRow () {
      if (this.usageItems.length > 0) {
        for (var i = 0; i < this.usageItems.length; i++) {
          if (this.usageItems[i].checkBox) {
            this.usageItems[i].deleteId = '777'
          }
        }
        this.usageItems = this.usageItems.filter(function (el) {
          return el.deleteId !== '777'
        })
      }
    },
    addItem () {
      bus.$emit('dialogForAddWorkType', 'test')
    },
    addItemRow () {
      this.itemItems.push({
        itemName: '',
        itemAmount: '',
        itemPrice: ''
      })
    },
    deleteItemRow () {
      if (this.itemItems.length > 0) {
        for (var i = 0; i < this.itemItems.length; i++) {
          if (this.itemItems[i].checkBox) {
            /*
            if (this.itemItems[i].itemId) {
              this.deletedItemIds.push(this.itemItems[i].itemId)
            }
            */
            this.itemItems[i].itemId = '777'
          }
        }
        this.itemItems = this.itemItems.filter(function (el) {
          return el.itemId !== '777'
        })

        this.onChangeItemPrice()
      }
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
  }
}
</script>