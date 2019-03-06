<template>
  <v-layout align-center justify-center fill-height>
    <v-dialog v-model="dialog" persistent max-width="600px">
    <div
      id="e3"
      style="width: 600px; margin: auto;"
      class="grey lighten-3"
    >
      <v-toolbar
        color="blue"
        dark
      >
        <v-icon>fas fa-mobile-alt</v-icon>
        <v-toolbar-title>휴대폰 인증</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-card>
        <v-container fluid grid-list-lg>
          <v-layout row wrap justify-center>
            <v-text-field
              prepend-icon="fas fa-phone"
              v-validate="'required'"
              v-model="phoneNo"
              :error-messages="errors.collect('phoneNo')"
              label="휴대폰번호"
              data-vv-name="phoneNo"
              type="number"
              @input="onPhoneNoChange"
            ></v-text-field>
            <v-btn block outline color="indigo" :disabled="sendAuthButtonDisabled" @click="sendAuthCode()">인증번호 발송</v-btn>        
          </v-layout>
          <v-layout row wrap justify-center>
            <v-text-field
              prepend-icon="fas fa-clock"
              v-validate="'required'"
              v-model="authTime"
              :error-messages="errors.collect('authTime')"
              label="인증시간"
              data-vv-name="authTime"              
            ></v-text-field>
            <v-text-field
              prepend-icon="fab fa-codepen"
              v-validate="'required'"
              v-model="authCode"
              :error-messages="errors.collect('authCode')"
              label="인증번호"
              data-vv-name="authCode"
              type="number"
              @input="onAuthCodeChange"
            ></v-text-field>                      
          </v-layout>
        </v-container>       
        
        <v-card-actions>
          <v-btn block outline color="indigo"  @click="close()">창 닫기</v-btn>          
          <v-btn block color="primary" :disabled="nextButtonDisabled" @click="goToStep3()">휴대폰번호 변경</v-btn>          
        </v-card-actions>
      </v-card>
    </div>
    </v-dialog>  
  </v-layout>
</template>

<script>
import {bus} from '../main'
import moment from 'moment'
import SmsAuthService from '@/services/SmsAuthService'
import UserService from '@/services/UserService'
export default {
  data () {
    return {
      dialog: false,
      isTimeout: false,
      after3Min: '',
      authTimer: '',
      authCode: '',
      authTime: '',
      sendAuthButtonDisabled: true,
      phoneNo: '',
      nextButtonDisabled: true
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
  },
  mounted () {
    this.$validator.localize('ko', this.dictionary)
    var vm = this
    bus.$on('dialogForChangePhoneNo', function (value) {
      // console.log(value)
      vm.dialog = true
    })
  },
  methods: {
    async createNewAuthCode () {
      const response = await SmsAuthService.createNewSMSAuthCode({
        phone_no: this.phoneNo
      })
      if (response.data.success) {
        this.$swal({
          type: 'success',
          title: '인증번호 발송완료',
          showConfirmButton: false,
          timer: 777
        }).then((result) => {
          // this.dialog = false
          this.after3Min = moment().add(3, 'm')
          this.authTimer = setInterval(this.authCodeTimer, 1000)
        })
      }
    },
    async updateUserPhoneNoData () {
      const response = await UserService.updateUserPhoneNo({
        id: this.userId,
        phone_no: this.phoneNo
      })
      console.log(response.data)

      this.$swal({
        type: 'success',
        title: '휴대폰번호 변경완료',
        showConfirmButton: false,
        timer: 777
      }).then((result) => {
        this.dialog = false
      })
    },
    async getAuthCode () {
      const response = await SmsAuthService.getAuthCode({
        phone_no: this.phoneNo
      })
      // console.log(response.data[0].auth_code)
      if (this.authCode === response.data[0].auth_code) {
        clearInterval(this.authTimer)
        /*
        // https://router.vuejs.org/guide/essentials/navigation.html
        // https://www.thepolyglotdeveloper.com/2017/11/pass-data-between-routes-vuejs-web-application/
        this.$router.push({ name: 'nameSuStep3', params: { phoneNo: this.phoneNo } })
        */
        this.updateUserPhoneNoData()
        // this.$router.push('/configPrivate')
      } else {
        this.$swal({
          type: 'warning',
          title: '인증번호가 다릅니다',
          showConfirmButton: false,
          timer: 777
        }).then((result) => {
        })
      }
    },
    async deleteAuthCode () {
      await SmsAuthService.deleteAuthcode({
        phone_no: this.phoneNo
      })
    },
    goToStep3 () {
      this.getAuthCode()
    },
    sendAuthCode () {
      this.createNewAuthCode()
      this.isTimeout = false
    },
    onPhoneNoChange () {
      if (this.phoneNo.length === 11) {
        this.sendAuthButtonDisabled = false
      } else {
        this.sendAuthButtonDisabled = true
      }
    },
    onAuthCodeChange () {
      if (!this.isTimeout && this.authCode.length === 4) {
        this.nextButtonDisabled = false
      } else {
        this.nextButtonDisabled = true
      }
    },
    authCodeTimer () {
      // https://stackoverflow.com/questions/34247283/how-to-subtract-2-times-with-moment-js-then-subtract-some-minutes/34255728#34255728
      var currentTime = moment()
      var timeDiff = moment.duration(this.after3Min.diff(currentTime))
      this.authTime = moment.utc(+timeDiff).format('mm:ss')
      if (this.authTime === '00:00') {
        clearInterval(this.authTimer)
        this.deleteAuthCode()
        this.isTimeout = true
        // console.log('timeout!')
      }
    },
    close () {
      this.dialog = false
    }
  },
  computed: {
  }
}
</script>