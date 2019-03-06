<template>
  <v-layout align-center justify-center fill-height flex-column>
    <div
      id="e3"
      :style=mainStyle
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

      <v-card style="height:88%">
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
              disabled             
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
        
        <v-flex xs12 :style=dummyStyle />

        <v-flex xs12 ma-3>
          <v-btn block color="primary" :disabled="nextButtonDisabled" @click="goToStep3()">다음</v-btn>          
        </v-flex>

      </v-card>
    </div>  
  </v-layout>
</template>

<script>
import moment from 'moment'
import SmsAuthService from '@/services/SmsAuthService'
const { detect } = require('detect-browser')
const browser = detect()
export default {
  data () {
    return {
      dummyStyle: 'height:210px',
      mainStyle: 'width: 500px; height: 520px; margin: auto;',
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
  mounted () {
    if (browser) {
      console.log(browser.name)
      console.log(browser.version)
      console.log(browser.os)
      if (browser.name === 'chrome') {
        this.mainStyle = 'width: 500px; height: 520px; margin: auto;'
        this.dummyStyle = 'height:210px'
      } else if (browser.name === 'ie') {
        this.mainStyle = 'width: 500px; height: 520px; margin-bottom: auto;'
        this.dummyStyle = 'height:110px'
      }
    }
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
          this.dialog = false
          this.after3Min = moment().add(3, 'm')
          this.authTimer = setInterval(this.authCodeTimer, 1000)
        })
      }
    },
    async getAuthCode () {
      const response = await SmsAuthService.getAuthCode({
        phone_no: this.phoneNo
      })
      console.log(response.data[0].auth_code)
      if (this.authCode === response.data[0].auth_code) {
        clearInterval(this.authTimer)
        // https://router.vuejs.org/guide/essentials/navigation.html
        // https://www.thepolyglotdeveloper.com/2017/11/pass-data-between-routes-vuejs-web-application/
        this.$router.push({ name: 'nameSuStep3', params: { phoneNo: this.phoneNo } })
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
    }
  },
  computed: {
  }
}
</script>