<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="400px">
      <div
        id="e3"
        style="max-width: 400px; margin: auto;"
        class="grey lighten-3"
      >
        <v-toolbar
          color="lime darken-1"
          dark
        >
          <v-icon>fas fa-user-plus</v-icon>
          <v-toolbar-title>회원가입</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-card>
          <v-container
            fluid
            grid-list-lg
          >
            <v-layout row wrap>

              <v-flex xs12>
                
                <form>
                  <v-text-field
                    prepend-icon="fas fa-perm_identity"
                    v-validate="'required'"
                    v-model="email"
                    :error-messages="errors.collect('email')"
                    label="이메일"
                    data-vv-name="email"
                  ></v-text-field>

                  <v-text-field
                    prepend-icon="fas fa-lock"
                    v-validate="'required'"
                    v-model="password"
                    :error-messages="errors.collect('password')"
                    :type="'password'"
                    label="비밀번호"
                    data-vv-name="password"
                    counter
                  ></v-text-field>

                  <v-text-field
                    prepend-icon="fas fa-child"
                    v-validate="'required'"
                    v-model="age"
                    :error-messages="errors.collect('age')"
                    label="연령"
                    data-vv-name="age"
                    type="number"
                    :rules="ageRules"
                    :counter="3"
                  ></v-text-field>

                  <v-select
                    prepend-icon="fas fa-mars"
                    v-validate="'required'"
                    v-model="sex"
                    :items="sexItems"                    
                    :error-messages="errors.collect('sex')"
                    label="성별"
                    data-vv-name="sex"
                  ></v-select>
                  
                  <p class="text-lg-right">
                    <v-btn color="warning" @click.native="dialog = false">닫기</v-btn>
                    <v-btn color="success" @click="register()">가입하기</v-btn>
                  </p>
                </form>

              </v-flex> 

            </v-layout>
          </v-container>
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
      sex: null,
      sexItems: [
        '남',
        '여'
      ],
      age: '',
      ageRules: [
        v => !!v || '연령을 입력하세요',
        v => (v && v.length <= 3) || '연령은 3자 이하여야 합니다'
      ],
      dialog: false,
      password: '',
      email: '',
      dictionary: {
        custom: {
          email: {
            required: () => '이메일주소를 입력해주세요'
          },
          password: {
            required: () => '비밀번호를 입력해주세요'
          },
          age: {
            required: () => '연령을 입력해주세요'
          },
          sex: {
            required: () => '성별을 선택해주세요'
          }
        }
      }
    }
  },
  mounted () {
    this.$validator.localize('ko', this.dictionary)
    var vm = this
    bus.$on('dialogForRegister', function (value) {
      vm.dialog = true
    })
  },
  methods: {
    async createNewUser () {
      // 이메일 중복 검사
      const response = await UserService.fetchUserByEmail({
        email: this.email
      })
      if (response.data.length > 0) {
        this.$swal({
          type: 'warning',
          title: '같은 이메일이 존재합니다',
          showConfirmButton: false,
          timer: 777
        }).then((result) => {
        })
      } else {
        // 새로운 유저 추가
        const response2 = await UserService.createNewUser({
          email: this.email,
          password: this.password,
          age: this.age,
          sex: this.sex
        })
        if (response2.data.success) {
          this.$swal({
            type: 'success',
            title: '가입 성공',
            showConfirmButton: false,
            timer: 777
          }).then((result) => {
            this.dialog = false
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
      }
    },
    register () {
      this.$validator.validateAll().then((result) => {
        if (!result) {
          return
        }
        this.createNewUser()
      }).catch(() => {})
    }
  },
  computed: {
  }
}
</script>