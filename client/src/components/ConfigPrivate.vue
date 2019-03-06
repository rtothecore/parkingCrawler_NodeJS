<template>
  
  <div style="width:1200px; margin:0 auto;">
    <!-- dummy --> <div style="height:20px"/>
        <b-row>
          <b-col md="12">
            <b-card header="개인정보 설정" header-tag="header">
              <h3 slot="header" class="mb-0"><strong>개인정보 설정</strong></h3>
              <b-row>
                <b-col sm="12" lg="6">
                  <div style="width:1150px; margin:0 auto;">

    <v-layout row wrap justify-center>      
          
      <v-flex md4 />

      <v-flex xs12 md4 class="text-xs-center" mt-3>
        <v-form ref="form2" v-model="valid2" lazy-validation>
          <!--
          <v-text-field
            v-model="id"                        
            label="아이디"
            disabled           
          ></v-text-field>
          -->
          <h4>
          <b-form-group
            label="아이디"
            label-for="basicInputId"
            :label-cols="4"
            :horizontal="true">
            <b-form-input v-model="id" id="basicInputId" type="text" :disabled="true" placeholder="Disabled"></b-form-input>
          </b-form-group>
          </h4>
          <!--
          <v-text-field
            v-model="name"                        
            label="이름"
            disabled
          ></v-text-field>
          -->
          <!--
          <h4>
          <b-form-group
            label="이름"
            label-for="basicInputName"
            :label-cols="4"
            :horizontal="true">
            <b-form-input v-model="name" id="basicInputName" type="text" :disabled="true" placeholder="Disabled"></b-form-input>
          </b-form-group>
          </h4>
          -->
          <!--
          <v-text-field
            v-model="birthDate"
            :rules="birthDateRules"
            :counter="10"
            label="생년월일"
            required
            type="number"
          ></v-text-field>
          -->
          <h4>
          <b-form-group
            label="생년월일"
            label-for="basicInputBirthDate"
            :label-cols="4"
            :horizontal="true">
            <b-form-input v-model="birthDate" id="basicInputBirthDate" type="number" placeholder="예)19750101"></b-form-input>
          </b-form-group>
          </h4>
          <!--
          <v-select
            v-model="select"
            :items="items"
            :rules="[v => !!v || '성별을 선택하세요']"
            label="성별"
            required
          ></v-select>
          -->
          <h4>
          <b-form-group
            label="성별"
            label-for="basicSelect"
            :label-cols="4"
            :horizontal="true">
            <b-form-select id="basicSelect"
              :plain="true"
              v-model="select"
              :options="items"
              value="남">
            </b-form-select>
          </b-form-group>
          </h4>
          <!--
          <v-text-field
            v-model="phoneNo"            
            :counter="11"
            label="휴대폰번호"
            disabled
            type="number"
          ></v-text-field>
          -->
          <h4>
          <b-form-group
            label="휴대폰번호"
            label-for="basicInputPhoneNo"
            :label-cols="4"
            :horizontal="true">
            <b-form-input v-model="phoneNo" id="basicInputPhoneNo" type="number" :disabled="true" placeholder="예)01012345678"></b-form-input>
          </b-form-group>
          </h4>

          <v-switch
            :label="`작업일지 공유: ${switch1.toString()}`"
            v-model="switch1"
            v-on:change="onChangeShareFlag"
          ></v-switch>
     
          
          <!-- <v-btn @click="clear2">지우기</v-btn> -->
        </v-form>
      </v-flex>

      <v-flex md4 />      
                       
    </v-layout>
    
    <v-layout row wrap pl-4 justify-center>
      <v-flex md4>
        <v-btn block outline color="indigo" @click="goToChangePhonePage">휴대폰번호 변경</v-btn>
        <v-btn block outline color="indigo" @click="goToChangePwPage">비밀번호 변경</v-btn>
        <v-btn block outline color="indigo" @click="goToChangeLeavePage">회원 탈퇴</v-btn>
      </v-flex>
    </v-layout>

    <v-layout row wrap pl-4 justify-center>      
      <v-flex md4>
        <v-btn  
            block          
            color="primary"
            :disabled="!valid2"
            @click="submit2"
          >
            저장
          </v-btn>
      </v-flex>
    </v-layout>
            <changePhoneNoModal></changePhoneNoModal>
            <changePasswordModal></changePasswordModal>
            <leaveUserModal></leaveUserModal>
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
import UserService from '@/services/UserService'
export default {
  data: () => ({
    switch1: true,
    phoneNo: '',
    name: '',
    id: '',
    userId: '',
    user: '',
    valid: true,
    valid2: true,
    birthDate: '',
    birthDateRules: [
      v => !!v || '생년월일을 입력하세요',
      v => (v && v.length <= 8) || '생년월일은 8자여야 합니다'
    ],
    select: null,
    items: [
      '남',
      '여'
    ]
  }),
  computed: {
  },
  watch: {
  },
  mounted () {
    // 임시비밀번호 발급받아 로그인하는 경우 비밀번호 변경 창을 띄운다
    if (this.$route.params.callFrom === 'login') {
      this.goToChangePwPage()
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
    this.getUser()
  },
  methods: {
    async getUser () {
      const response = await UserService.fetchUser(this.userId)
      // console.log(response.data)
      this.id = response.data[0].id
      this.name = response.data[0].name
      this.birthDate = response.data[0].birth_date
      this.select = response.data[0].sex
      this.phoneNo = response.data[0].phone_no
      if (response.data[0].share_flag === '0') {
        this.switch1 = false
      } else {
        this.switch1 = true
      }
    },
    async updateUserAgeSex () {
      const response = await UserService.updateUserBirthDateSex({
        id: this.userId,
        birth_date: this.birthDate,
        sex: this.select
      })
      if (response.data.success) {
        this.$swal({
          type: 'success',
          title: '수정 완료!',
          showConfirmButton: false,
          timer: 777
        }).then((result) => {
        })
      }
    },
    async updateUserShareFlag () {
      if (this.switch1) {
        this.shareFlag = 1
      } else {
        this.shareFlag = 0
      }
      await UserService.updateUserShareFlag({
        id: this.userId,
        share_flag: this.shareFlag
      })
    },
    submit2 () {
      if (this.$refs.form2.validate()) {
        this.updateUserAgeSex()
      }
    },
    clear2 () {
      this.$refs.form2.reset()
    },
    goToChangePhonePage () {
      // this.$router.push('/changePhoneNo')
      bus.$emit('dialogForChangePhoneNo', 'test')
    },
    goToChangePwPage () {
      // this.$router.push('/changePw')
      bus.$emit('dialogForChangePassword', 'test')
    },
    goToChangeLeavePage () {
      bus.$emit('dialogForLeaveUser', 'test')
    },
    onChangeShareFlag () {
      this.updateUserShareFlag()
    }
  }
}
</script>