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
        <v-toolbar-title>회원가입</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-card style="height:88%">
        <v-container fluid grid-list-lg>
          <v-layout row wrap justify-center>
            <v-text-field
              prepend-icon="fas fa-id-badge"
              v-validate="'required'"
              v-model="id"
              :error-messages="errors.collect('id')"
              label="아이디"
              data-vv-name="id"
              @input="onIdChange"
            ></v-text-field>
            <v-btn block outline color="indigo" @click="chkDuplicatedId()">중복체크</v-btn>        
          </v-layout>
          <v-layout row wrap justify-center>
            <v-text-field
              prepend-icon="fas fa-key"
              v-validate="'required|min:8|verify_password'"
              v-model="pw"
              :error-messages="errors.collect('pw')"
              label="비밀번호(소문자, 대문자, 숫자, 특수기호로 이루어진 8글자)"
              data-vv-name="pw"
              type="password"
            ></v-text-field>            
          </v-layout>
          <v-layout row wrap justify-center>
            <v-text-field
              prepend-icon="fas fa-key"
              v-validate="'required|min:8|verify_password'"
              v-model="pwRe"
              :error-messages="errors.collect('pwRe')"
              label="비밀번호 확인"
              data-vv-name="pwRe"
              type="password"             
            ></v-text-field>            
          </v-layout>
          <v-layout row wrap justify-center>
            <!--
            <v-text-field
              prepend-icon="fas fa-id-badge"
              v-validate="'required'"
              v-model="name"
              :error-messages="errors.collect('name')"
              label="이름"
              data-vv-name="name"             
            ></v-text-field>
            -->
            <v-text-field
              prepend-icon="fab fa-pagelines"
              v-validate="'required'"
              v-model="birthDate"
              :error-messages="errors.collect('birthDate')"
              label="생년월일(ex:19750101)"
              data-vv-name="birthDate"
              type="number"           
            ></v-text-field>            
            <v-select
              v-validate="'required'"
              prepend-icon="fas fa-male"
              v-model="sex"
              :error-messages="errors.collect('sex')"
              :items="sexItems"
              label="성별"
              data-vv-name="sex"
              v-on:change="onChangeSex"                         
            ></v-select>
          </v-layout>
        </v-container>       
        
        <!-- <v-flex xs12 style="height:0px"/> -->

        <v-flex xs12 ma-3>
          <v-btn block color="primary" @click="goToStep4()">회원가입</v-btn>          
        </v-flex>
        
      </v-card>
    </div>  
  </v-layout>
</template>

<script>
import JoinUserService from '@/services/JoinUserService'
import UserService from '@/services/UserService'
const { detect } = require('detect-browser')
const browser = detect()
export default {
  $_veeValidate: {
    validator: 'new'
  },
  data () {
    return {
      mainStyle: 'width: 500px; height: 520px; margin: auto;',
      name: '',
      phoneNo: '',
      id: '',
      isIdDuplicateCheck: false,
      pw: '',
      pwRe: '',
      birthDate: '',
      sex: '',
      sexItems: ['남', '여'],
      dictionary: {
        custom: {
          name: {
            required: '이름을 입력해주세요'
          },
          id: {
            required: '아이디를 입력해주세요'
          },
          pw: {
            required: '비밀번호를 입력해주세요'
          },
          pwRe: {
            required: '비밀번호를 재입력해주세요'
          },
          birthDate: {
            required: '생년월일을 입력해주세요'
          },
          sex: {
            required: '성별을 선택해주세요'
          }
        }
      }
    }
  },
  created () {
    // console.log(this.$route.params.phoneNo)
    this.phoneNo = this.$route.params.phoneNo
  },
  mounted () {
    this.$validator.localize('ko', this.dictionary)

    if (browser) {
      console.log(browser.name)
      console.log(browser.version)
      console.log(browser.os)
      if (browser.name === 'chrome') {
        this.mainStyle = 'width: 500px; height: 520px; margin: auto;'
      } else if (browser.name === 'ie') {
        this.mainStyle = 'width: 500px; height: 520px; margin-bottom: auto;'
      }
    }
  },
  methods: {
    async checkDuplicateUserId () {
      const response = await JoinUserService.checkDuplicateUser({
        id: this.id
      })
      if (response.data.length === 0) {
        this.$swal({
          type: 'success',
          title: '사용가능한 아이디입니다',
          showConfirmButton: false,
          timer: 777
        }).then((result) => {
          this.isIdDuplicateCheck = true
        })
      } else {
        this.$swal({
          type: 'warning',
          title: '이미 등록된 아이디입니다',
          showConfirmButton: false,
          timer: 777
        }).then((result) => {
          this.isIdDuplicateCheck = false
          this.id = ''
        })
      }
    },
    async createNewUser () {
      const response = await UserService.createNewUser({
        id: this.id,
        password: this.pw,
        name: this.name,
        birth_date: this.birthDate,
        sex: this.sex,
        phone_no: this.phoneNo,
        level: '99'
      })
      if (response.data.success) {
        this.$swal({
          type: 'success',
          title: '가입 성공',
          showConfirmButton: false,
          timer: 777
        }).then((result) => {
          this.$session.start()
          this.$session.set('userId', response.data.result.id)
          this.$router.push('/configLand')  // 농장 추가 페이지로 이동
        })
      } else {
        this.$swal({
          type: 'warning',
          title: '가입 실패',
          showConfirmButton: false,
          timer: 777
        }).then((result) => {
        })
      }
    },
    onIdChange () {
      this.isIdDuplicateCheck = false
    },
    goToStep4 () {
      /*
      var strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})')
      if (strongRegex.test(this.pw)) {
        alert('비밀번호는 소문자, 대문자, 특수기호로 이루어져야 합니다')
        return
      }
      */

      this.$validator.validateAll().then((result) => {
        if (!result) {
          return
        }

        // var pattern = /[^a-zA-Z]/gi
        var pattern = /[^a-zA-Z0-9]/gi
        if (pattern.test(this.id)) {
          this.$swal({
            type: 'warning',
            title: '아이디는 영문,숫자만 가능합니다',
            showConfirmButton: false,
            timer: 777
          }).then((result) => {
          })
          this.id = ''
          return
        }

        if (!this.isIdDuplicateCheck) {
          // alert('아이디 중복체크를 해주세요')
          this.$swal({
            type: 'warning',
            title: '아이디 중복체크를 해주세요',
            showConfirmButton: false,
            timer: 777
          }).then((result) => {
          })
          return
        }

        if (this.pw !== this.pwRe) {
          // alert('같은 암호를 입력해주세요')
          this.$swal({
            type: 'warning',
            title: '같은 암호를 입력해주세요',
            showConfirmButton: false,
            timer: 777
          }).then((result) => {
          })
          return
        }

        this.createNewUser()
      }).catch(() => {})
    },
    chkDuplicatedId () {
      this.checkDuplicateUserId()
    },
    onChangeSex: function (event) {
      this.sex = event
    }
  },
  computed: {
  }
}
</script>