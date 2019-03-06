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
        <v-toolbar-title>비밀번호 변경</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-card>
        <v-container fluid grid-list-lg>
          <v-layout row wrap justify-center>
            <v-text-field
              prepend-icon="fas fa-key"
              v-validate="'required|min:8|verify_password'"
              v-model="oldPw"
              :error-messages="errors.collect('oldPw')"
              label="기존 비밀번호"
              data-vv-name="oldPw"
              type="password"             
            ></v-text-field>            
          </v-layout>
          <v-layout row wrap justify-center>
            <v-text-field
              prepend-icon="fas fa-key"
              v-validate="'required|min:8|verify_password'"
              v-model="newPw"
              :error-messages="errors.collect('newPw')"
              label="비밀번호(소문자, 대문자, 숫자, 특수기호로 이루어진 8글자)"
              data-vv-name="newPw"
              type="password"             
            ></v-text-field>            
          </v-layout>
          <v-layout row wrap justify-center>
            <v-text-field
              prepend-icon="fas fa-key"
              v-validate="'required|min:8|verify_password'"
              v-model="newPwRe"
              :error-messages="errors.collect('newPwRe')"
              label="비밀번호 확인"
              data-vv-name="newPwRe"
              type="password"             
            ></v-text-field>            
          </v-layout>          
        </v-container>       
        
        <v-card-actions>
          <v-btn block outline color="indigo" @click="close()">창 닫기</v-btn>
          <v-btn block color="primary" @click="savePassword()">수정완료</v-btn>          
        </v-card-actions>
      </v-card>
    </div>  
    </v-dialog>
  </v-layout>
</template>

<script>
import {bus} from '../main'
import UserService from '@/services/UserService'
export default {
  $_veeValidate: {
    validator: 'new'
  },
  data () {
    return {
      dialog: false,
      id: '',
      oldPw: '',
      newPw: '',
      newPwRe: '',
      dictionary: {
        custom: {
          oldPw: {
            required: '비밀번호를 입력해주세요'
          },
          newPw: {
            required: '비밀번호를 입력해주세요'
          },
          newPwRe: {
            required: '비밀번호를 재입력해주세요'
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
  },
  mounted () {
    this.$validator.localize('ko', this.dictionary)
    var vm = this
    bus.$on('dialogForChangePassword', function (value) {
      vm.dialog = true
    })
  },
  methods: {
    async savePassword () {
      const response = await UserService.updateUserPassword({
        id: this.userId,
        nowPassword: this.oldPw,
        password: this.newPw
      })
      if (response.data.success) {
        this.$swal({
          type: 'success',
          title: '비밀번호 수정완료',
          showConfirmButton: false,
          timer: 777
        }).then((result) => {
          this.$session.destroy()
          this.btnLogOutSeen = false
          this.isBackImgActive = true
          this.$router.push('/login')
        })
      } else if (response.status === 201) {
        this.$swal({
          type: 'warning',
          title: '기존 비밀번호가 다릅니다',
          showConfirmButton: false,
          timer: 777
        }).then((result) => {
        })
      }
    },
    savePw () {
      this.$validator.validateAll().then((result) => {
        if (!result) {
          return
        }

        if (this.newPw !== this.newPwRe) {
          this.$swal({
            type: 'warning',
            title: '같은 비밀번호를 입력해주세요',
            showConfirmButton: false,
            timer: 777
          }).then((result) => {
          })
          return
        }
        this.savePassword()
      }).catch(() => {})
    },
    close () {
      this.dialog = false
    }
  },
  computed: {
  }
}
</script>