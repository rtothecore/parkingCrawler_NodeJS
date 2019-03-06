<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="1024px" height="768px" fullscreen hide-overlay transition="dialog-bottom-transition">    
          <!-- 자 재 일 지 -->        
          <v-card color="white">

            <div style="width:1200px; margin:0 auto;">
              <!-- dummy --> <div style="height:20px"/>
        <b-row>
          <b-col md="12">
            <b-card header="자재관리" header-tag="header">
              <h3 slot="header" class="mb-0"><strong>자재관리</strong></h3>
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
                      :items="landItems"
                      v-model="selectLand"
                      :error-messages="errors.collect('selectLand')"
                      label="농장명"
                      data-vv-name="selectLand"
                      required
                      v-on:change="onChangeLand"
                      item-text="name"
                      item-value="_id"
                      readonly                     
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
                      readonly                                      
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
                      <!--
                      <v-btn outline color="black" flat @click.native="addItemRow">추가</v-btn>
                      <v-btn outline color="black" flat @click.native="deleteItemRow">삭제</v-btn>
                      -->
                      </h4>
                    </div>
                  </v-flex>
                  
                  <template v-for="(item, index) in itemItems">
                    <v-flex xs4 sm4 md4 :key="'C' + index">
                      <v-text-field
                        label="품목명"                      
                        v-model="item.itemName"
                        readonly
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs4 sm4 md4 :key="'D' + index">
                      <v-text-field
                        label="수량"
                        v-model="item.itemAmount"                        
                        readonly
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs4 sm4 md4 :key="'E' + index">
                      <v-text-field
                        label="가격"
                        v-model="item.itemPrice"
                        v-on:change="onChangeItemPrice"
                        readonly
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
                      readonly
                    ></v-textarea>
                  </v-flex>
                  
                  <v-flex xs4 sm4 md4>                    
                    <!-- https://medium.freecodecamp.org/how-to-build-a-flexible-image-uploader-component-using-vue-js-2-0-5ee7fc77516 -->
                    <image-input v-model="iavatar">
                      <div slot="activator">
                        <v-avatar size="150px" v-ripple v-if="!iavatar" class="grey lighten-3 mb-3">
                          <span>사진 없음</span>
                        </v-avatar>
                        <v-avatar size="150px" v-ripple v-else class="mb-3">
                          <img :src="iavatar.imageURL" alt="avatar">
                        </v-avatar>
                      </div>
                    </image-input>
                    <v-btn outline color="indigo" flat @click.native="showPic(iavatar.imageURL)">크게보기</v-btn>                    
                  </v-flex>

                  <v-flex xs4 sm4 md4>                    
                    <!-- https://medium.freecodecamp.org/how-to-build-a-flexible-image-uploader-component-using-vue-js-2-0-5ee7fc77516 -->
                    <image-input v-model="iavatar2">
                      <div slot="activator">
                        <v-avatar size="150px" v-ripple v-if="!iavatar2" class="grey lighten-3 mb-3">
                          <span>사진 없음</span>
                        </v-avatar>
                        <v-avatar size="150px" v-ripple v-else class="mb-3">
                          <img :src="iavatar2.imageURL" alt="avatar2">
                        </v-avatar>
                      </div>
                    </image-input>
                    <v-btn outline color="indigo" flat @click.native="showPic(iavatar2.imageURL)">크게보기</v-btn>                    
                  </v-flex>

                  <v-flex xs4 sm4 md4>                    
                    <!-- https://medium.freecodecamp.org/how-to-build-a-flexible-image-uploader-component-using-vue-js-2-0-5ee7fc77516 -->
                    <image-input v-model="iavatar3">
                      <div slot="activator">
                        <v-avatar size="150px" v-ripple v-if="!iavatar3" class="grey lighten-3 mb-3">
                          <span>사진 없음</span>
                        </v-avatar>
                        <v-avatar size="150px" v-ripple v-else class="mb-3">
                          <img :src="iavatar3.imageURL" alt="avatar3">
                        </v-avatar>
                      </div>
                    </image-input>
                    <v-btn outline color="indigo" flat @click.native="showPic(iavatar3.imageURL)">크게보기</v-btn>                    
                  </v-flex>
                  
                </v-layout>
              </v-container>
              <!-- <small>*필수 입력 사항입니다</small> -->
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <!-- <v-btn outline color="black" flat @click.native="deleteI">삭제</v-btn> -->
              <v-btn outline color="indigo" flat @click.native="dialog = false">닫기</v-btn>              
              <!-- <v-btn outline color="black" flat @click.native="itemSave">작성</v-btn> -->
            </v-card-actions>

                  </div>
                </b-col>              
              </b-row>              
            </b-card>
          </b-col>
        </b-row>
      </div>

          </v-card>        
        <!-- 자 재 일 지 -->
    </v-dialog>
  </v-layout>
</template>

<script>
import {bus} from '../main'
import LandService from '@/services/LandService'
import WcService from '@/services/WcService'
import DcService from '@/services/DcService'
import JournalService from '@/services/JournalService'
import ItemService from '@/services/ItemService'
import ItemDetailService from '@/services/ItemDetailService'
import ImageInput from './ImageInputForShow.vue'
export default {
  $_veeValidate: {
    validator: 'new'
  },
  data () {
    return {
      imgCommonPreview: {},
      selectedItem: '',
      iavatar3: {},
      iavatar2: {},
      iavatar: {},
      purpose: '',
      itemPriceTotal: 0,
      itemItems: [
        {
          itemName: '',
          itemAmount: '',
          itemPrice: ''
        }
      ],
      selectItem: '',
      items: [],
      Item_User_Profile: '',
      itemId: '',
      //
      origin: '',
      updatedEvent: {},
      outputDetail: '',
      outputAmount: '',
      incomeDetail: '',
      incomeAmount: '',
      shipmentDetail: '',
      shipmentAmount: '',
      CooTotal: '',
      workTime: '',
      workerNumber: '',
      minREH: '',
      maxREH: '',
      avgREH: '',
      minT1H: '',
      maxT1H: '',
      avgT1H: '',
      RN1: '',
      skyStatus: '',
      selectedWorkTypeText: '',
      itemNames: [],
      showOutput: false,
      showUsage: false,
      showIncome: false,
      showShipment: false,
      sCode: '',
      usageItems: [
        {
          itemName: '',
          usage: ''
        }
      ],
      cooItems: [
        {
          category: '',
          cost: ''
        }
      ],
      avatar3: {},
      avatar2: {},
      avatar: {},
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
          e7: {
            required: '작업종료 시간을 입력해주세요'
          },
          e6: {
            required: '작업시작 시간을 입력해주세요'
          },
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
  },
  mounted () {
    this.$validator.localize('ko', this.dictionary)
    var vm = this
    bus.$on('dialogForShowItem', function (value) {
      Object.assign(vm.$data, vm.$options.data.call(vm))  // initialize this data
      // console.log(value)
      vm.journalId = value.journalId
      vm.itemId = value.itemId
      vm.eventIndex = value.eventIndex
      vm.origin = value.origin  // 어디서 호출했는지?
      vm.dialog = true
      vm.userId = this.$session.get('userId')
      if (vm.itemId) {
        // console.log('i am item')
        vm.active = 1
        vm.getLands()
        vm.getItem()
      } else {
        // console.log('i am journal')
        vm.active = 0
        vm.getJournal()
        vm.getLands()
      }
    })
  },
  created () {
    // this.getLands()
  },
  components: {
    ImageInput: ImageInput
  },
  methods: {
    async getItems () {
      const response = await WcService.fetchWorkCodesAsItem()
      this.items = response.data
    },
    async getItem () {
      const response = await ItemService.fetchItem({
        id: this.itemId
      })
      this.Item_User_Profile = response.data[0].date

      // 농장명
      this.selectLand = response.data[0].landId

      // 구입품목
      this.getItems()
      this.selectItem = response.data[0].item

      // 품목상세
      /*
      this.itemItems = response.data[0].itemDetail
      this.onChangeItemPrice()
      */
      var itemDetails = response.data[0].itemDetail
      this.itemItems = []
      for (var i = 0; i < itemDetails.length; i++) {
        const response2 = await ItemDetailService.fetchItemDetailByItemId({
          userId: this.userId,
          itemId: itemDetails[i]
        })
        this.itemItems.push(response2.data[0])
        // 재고량 계산
        this.itemItems[i].itemStock = response2.data[0].itemAmount - response2.data[0].journalUsage - this.itemItems[i].itemUsage
        // 총 사용량 계산
        this.itemItems[i].itemUsage = response2.data[0].journalUsage + response2.data[0].itemUsage

        // 아이템 사용량
        this.itemItems[i].itemRealUsage = response2.data[0].itemUsage

        // parentId
        this.itemItems[i].parentId = this.itemId

        // itemId
        this.itemItems[i].itemId = response2.data[0].itemId
      }
      this.onChangeItemPrice()

      // 사용목적
      this.purpose = response.data[0].purpose

      // 사진
      if (response.data[0].pictureA) {
        this.iavatar.imageURL = 'http://59.8.37.86:8081/getJournalImg/' + this.userId + '/' + response.data[0].pictureA
        this.iavatar.uploadedFilename = response.data[0].pictureA
      } else {
        this.iavatar = null
      }
      if (response.data[0].pictureB) {
        this.iavatar2.imageURL = 'http://59.8.37.86:8081/getJournalImg/' + this.userId + '/' + response.data[0].pictureB
        this.iavatar2.uploadedFilename = response.data[0].pictureB
      } else {
        this.iavatar2 = null
      }
      if (response.data[0].pictureC) {
        this.iavatar3.imageURL = 'http://59.8.37.86:8081/getJournalImg/' + this.userId + '/' + response.data[0].pictureC
        this.iavatar3.uploadedFilename = response.data[0].pictureC
      } else {
        this.iavatar3 = null
      }
    },
    async getJournal () {
      const response = await JournalService.fetchJournal({
        id: this.journalId
      })
      this.User_Profile = '영농일지 - ' + response.data[0].date

      // console.log(response.data)  //
      this.skyStatus = response.data[0].weather.sky
      this.RN1 = response.data[0].weather.avgRN1
      this.minT1H = response.data[0].weather.minT1H + '℃'
      this.maxT1H = response.data[0].weather.maxT1H + '℃'
      this.avgT1H = Math.round(response.data[0].weather.avgT1H) + '℃'
      this.minREH = response.data[0].weather.minREH + '%'
      this.maxREH = response.data[0].weather.maxREH + '%'
      this.avgREH = Math.round(response.data[0].weather.avgREH) + '%'

      this.selectLand = response.data[0].landId
      this.getCropCodeByLandId(this.selectLand)
      this.selectedWorkTypeCode = response.data[0].workCode
      this.selectWorkType = response.data[0].workCode

      this.workTime = response.data[0].workTime
      this.workerNumber = response.data[0].workerNumber

      this.cooItems = response.data[0].COO
      this.onChangeItemCost()

      const response2 = await WcService.fetchOneTextByCcode({
        code: this.selectWorkType
      })
      this.selectedWorkTypeText = response2.data[0].text

      if (this.selectedWorkTypeText === '출하') {
        this.showShipment = true
        this.shipmentAmount = response.data[0].shipment.amount
        this.shipmentDetail = response.data[0].shipment.detail

        this.showIncome = true
        this.incomeAmount = response.data[0].income.amount
        this.incomeDetail = response.data[0].income.detail

        this.showUsage = false
        this.usageItems = []
        this.showOutput = false
      } else if (this.selectedWorkTypeText === '비료' || this.selectedWorkTypeText === '농약' || this.selectedWorkTypeText === '사료') {
        this.showShipment = false
        this.showIncome = false
        this.showUsage = true
        this.usageItems = response.data[0].usage

        this.fetchItemsByWcode(this.selectedWorkTypeCode) //

        this.showOutput = false
      } else if (this.selectedWorkTypeText === '생산') {
        this.showShipment = false
        this.showIncome = false
        this.showUsage = false
        this.usageItems = []
        this.showOutput = true
        this.outputAmount = response.data[0].output.amount
        this.outputDetail = response.data[0].output.detail
      }

      this.workContent = response.data[0].workContent
      this.remarks = response.data[0].remarks

      if (response.data[0].pictureA) {
        this.avatar.imageURL = 'http://59.8.37.86:8081/getJournalImg/' + this.userId + '/' + response.data[0].pictureA
        this.avatar.uploadedFilename = response.data[0].pictureA
      } else {
        this.avatar = null
      }
      if (response.data[0].pictureB) {
        this.avatar2.imageURL = 'http://59.8.37.86:8081/getJournalImg/' + this.userId + '/' + response.data[0].pictureB
        this.avatar2.uploadedFilename = response.data[0].pictureB
      } else {
        this.avatar2 = null
      }
      if (response.data[0].pictureC) {
        this.avatar3.imageURL = 'http://59.8.37.86:8081/getJournalImg/' + this.userId + '/' + response.data[0].pictureC
        this.avatar3.uploadedFilename = response.data[0].pictureC
      } else {
        this.avatar3 = null
      }
    },
    async fetchItemsByWcode (workCode) {
      const response = await ItemService.fetchItemsByWcode({
        userId: this.userId,
        wCode: workCode
      })
      for (var i = 0; i < response.data.length; i++) {
        for (var j = 0; j < response.data[i].itemDetail.length; j++) {
          this.itemNames.push(response.data[i].itemDetail[j].itemName)
        }
      }
    },
    async getLands () {
      const response = await LandService.fetchLands({
        userId: this.userId
      })
      this.landItems = response.data.lands
    },
    async getCropCodeByLandId (landId) {
      const response = await LandService.fetchCropCodeByLandId({
        landId: landId
      })
      this.selectedCropCode = response.data[0].cropCode
      this.getCropNameByCropCode(this.selectedCropCode)
      this.getWorkTypeByWorkTypeCode(this.selectedWorkTypeCode)
    },
    async getCropNameByCropCode (cropCode) {
      const response = await DcService.fetchCropNameByCropCode({
        cropCode: cropCode
      })
      this.cropName = response.data[0].text
    },
    async getWorkTypeByWorkTypeCode (workTypeCode) {
      const response = await WcService.fetchTextByCcode({
        code: workTypeCode
      })
      this.workType = response.data
    },
    async getWorkCodeById (id) {
      const response = await WcService.fetchWorkCodeById({
        id: id
      })
      this.selectedWorkTypeCode = response.data
    },
    async updateItem () {
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

      await ItemService.updateItem({
        id: this.itemId,
        userId: this.userId,
        // date: this.Item_User_Profile.substring(10, 20),
        date: this.Item_User_Profile,
        item: this.selectItem,
        itemDetail: this.itemItems,
        purpose: this.purpose,
        pictureA: pictureAData,
        pictureB: pictureBData,
        pictureC: pictureCData
      })

      // 작업분류명
      var workTypeVal = ''
      const response2 = await WcService.fetchOneTextByCcode({
        code: this.selectItem
      })
      workTypeVal = response2.data[0].text
      this.updatedEvent.title = workTypeVal + ' 구입'
      // this.updatedEvent.start = this.Item_User_Profile.substring(10, 20)
      // this.updatedEvent.end = this.Item_User_Profile.substring(10, 20)
      this.updatedEvent.start = this.Item_User_Profile
      this.updatedEvent.end = this.Item_User_Profile
      this.updatedEvent.itemId = this.itemId
      this.updatedEvent.eventIndex = this.eventIndex
      this.updatedEvent.color = 'orange'
    },
    async updateJournal () {
      var shipment = {'amount': this.shipmentAmount, 'detail': this.shipmentDetail}
      var income = {'amount': this.incomeAmount, 'detail': this.incomeDetail}
      var output = {'amount': this.outputAmount, 'detail': this.outputDetail}

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

      await JournalService.updateJournal({
        id: this.journalId,
        userId: this.userId,
        date: this.User_Profile.substring(10, 20),
        landId: this.selectLand,
        workCode: this.selectedWorkTypeCode,
        workContent: this.workContent,
        workTime: this.workTime,
        workerNumber: this.workerNumber,
        remarks: this.remarks,
        coo: this.cooItems,
        shipment: shipment,
        income: income,
        usage: this.usageItems,
        output: output,
        pictureA: pictureAData,
        pictureB: pictureBData,
        pictureC: pictureCData
      })

      this.fetchNameByLandId(this.selectLand)
      this.fetchCropNameByCropCode(this.selectedCropCode)
      this.fetchTextByCode(this.selectedWorkTypeCode)
      this.updatedEvent.start = this.User_Profile.substring(10, 20)
      this.updatedEvent.end = this.User_Profile.substring(10, 20)
      this.updatedEvent.journalId = this.journalId
      this.updatedEvent.eventIndex = this.eventIndex
    },
    async deleteItem (id) {
      await ItemService.deleteItem(id)
    },
    async deleteJournal (id) {
      await JournalService.deleteJournal(id)
    },
    async fetchNameByLandId (landId) {
      const response = await LandService.fetchNameByLandId({
        landId: landId
      })
      this.updatedEvent.title = response.data[0].name
    },
    async fetchCropNameByCropCode (cropCode) {
      const response = await DcService.fetchCropNameByCropCode({
        cropCode: cropCode
      })
      this.updatedEvent.title += ' - ' + response.data[0].text
    },
    async fetchTextByCode (workCode) {
      const response = await WcService.fetchOneTextByCcode({
        code: workCode
      })
      this.updatedEvent.title += ' - ' + response.data[0].text
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
    onChangeItem: function (event) {
      this.selectedItem = event
      // console.log(event)
    },
    onChangeItemCost: function (event) {
      this.CooTotal = Number('0')
      for (var i = 0; i < this.cooItems.length; i++) {
        this.CooTotal = Number(this.CooTotal)
        this.CooTotal += Number(this.cooItems[i].cost)
      }
    },
    onChangeLand: function (event) {
      this.selectedLandId = event
      this.getCropCodeByLandId(this.selectedLandId)
    },
    onChangeWorkType: function (event) {
      this.getWorkCodeById(event)
    },
    onChangeWSTime: function (event) {
      var tmpStr = event
      this.selectedWSTime = tmpStr.replace(':', '')
      console.log(this.selectedWSTime)
    },
    onChangeWETime: function (event) {
      var tmpStr = event
      this.selectedWETime = tmpStr.replace(':', '')
      console.log(this.selectedWETime)
    },
    itemSave () {
      this.updateItem()
      this.$swal({
        type: 'success',
        title: '자재를 수정하였습니다',
        showConfirmButton: false,
        timer: 777
      }).then((result) => {
        bus.$emit('toJournalForUpdate', this.updatedEvent)
        this.dialog = false
      })
    },
    save () {
      this.$validator.validateAll().then((result) => {
        if (!result) {
          return
        }
        this.updateJournal()
        this.$swal({
          type: 'success',
          title: '일지를 수정하였습니다',
          showConfirmButton: false,
          timer: 777
        }).then((result) => {
          bus.$emit('toJournalForUpdate', this.updatedEvent)
          this.dialog = false
        })
        // bus.$emit('toJournal', 'test')
        // this.dialog = false
      }).catch(() => {})
    },
    deleteI () {
      this.$swal({
        title: '이 자재를 삭제 하시겠습니까?',
        text: '삭제 후에 되돌릴 수 없습니다',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '네, 삭제합니다',
        cancelButtonText: '취소합니다'
      }).then((result) => {
        if (result.value) {
          this.deleteItem(this.itemId)
          this.$swal(
            '삭제했습니다!',
            '자재가 삭제되었습니다',
            'success'
          )
          bus.$emit('toJournalForDel', this.eventIndex)
          this.dialog = false
        }
      })
      // bus.$emit('toJournal', 'test')
      // this.dialog = false
    },
    deleteJ () {
      // confirm('이 일지를 지우시겠습니까?') && this.deleteJournal(this.journalId)
      this.$swal({
        title: '이 일지를 삭제 하시겠습니까?',
        text: '삭제 후에 되돌릴 수 없습니다',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '네, 삭제합니다',
        cancelButtonText: '취소합니다'
      }).then((result) => {
        if (result.value) {
          this.deleteJournal(this.journalId)
          this.$swal(
            '삭제했습니다!',
            '일지가 삭제되었습니다',
            'success'
          )
          bus.$emit('toJournalForDel', this.eventIndex)
          this.dialog = false
        }
      })
      // bus.$emit('toJournal', 'test')
      // this.dialog = false
    },
    addWorkType () {
      bus.$emit('dialogForAddWorkType', 'test')
    },
    addCooRow () {
      this.cooItems.push({
        category: '',
        cost: ''
      })
    },
    deleteCooRow () {
      if (this.cooItems.length > 1) {
        this.cooItems.splice(this.cooItems.length - 1, 1)
        this.onChangeItemCost()
      }
    },
    addUsageRow () {
      this.usageItems.push({
        itemName: '',
        usage: ''
      })
    },
    deleteUsageRow () {
      if (this.usageItems.length > 1) {
        this.usageItems.splice(this.usageItems.length - 1, 1)
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
    },
    showPic (url) {
      // console.log(url)
      if (url === '') {
        alert('등록된 이미지가 없습니다.')
        return
      }
      this.imgCommonPreview.src = url
      setTimeout(this.createPreviewWin(this.imgCommonPreview), 100)
    },
    // http://holybell87.tistory.com/17#.XB2tgFwzaUk
    createPreviewWin (imgCommonPreview) {
      /*
      if (!this.imgCommonPreview.complete) {
        setTimeout(this.createPreviewWin(this.imgCommonPreview), 100)
        return
      }
      */
      var scrollsize = 17
      var swidth = screen.width - 10
      var sheight = screen.height - 90
      var wsize = imgCommonPreview.width
      var hsize = imgCommonPreview.height

      if (wsize < 50) {
        wsize = 50
      }
      if (hsize < 50) {
        hsize = 50
      }
      if (wsize > swidth) {
        wsize = swidth
      }
      if (hsize > sheight) {
        hsize = sheight
      }
      if ((wsize < swidth - scrollsize) && hsize >= sheight) {
        wsize += scrollsize
      }
      if ((hsize < sheight - scrollsize) && wsize >= swidth) {
        hsize += scrollsize
      }
      if ((wsize < swidth - scrollsize) && hsize < sheight && (navigator.userAgent.indexOf('MSIE 6.0') > -1 || navigator.userAgent.indexOf('MSIE 7.0') > -1)) {
        wsize += scrollsize
      }

      var mtWidth = document.body.clientWidth
      var mtHeight = document.body.clientHeight
      var scX = window.screenLeft
      var scY = window.screenTop
      var popX = scX + (mtWidth - wsize) / 2 - 50
      var popY = scY + (mtHeight - hsize) / 2 - 50

      var imageWin = window.open('', '', 'top=' + popY + ',left=' + popX + ',width=' + wsize + ',height=' + hsize + ',scrollbars=yes,resizable=yes,status=no')
      imageWin.document.write('<html><title>Preview</title><body style="margin:0;cursor:pointer;" title="Close" onclick="window.close()">')
      imageWin.document.write('<img src="' + imgCommonPreview.src + '">')
      imageWin.document.write('</body></html>')
    }
  }
}
</script>