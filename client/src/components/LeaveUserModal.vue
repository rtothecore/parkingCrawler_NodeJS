<template>
  <v-layout align-center justify-center fill-height>
    <v-dialog v-model="dialog" max-width="600px">
    <div
      id="e3"
      style="width: 600px; margin: auto;"
      class="grey lighten-3"
    >
      <v-toolbar
        color="blue"
        dark
      >
        <v-icon>fas fa-robot</v-icon>
        <v-toolbar-title>회원 탈퇴</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-card>
        <v-container fluid grid-list-lg>
          <!-- Radio button -->
          <v-layout row ma-2 justify-center>
            <v-flex xs4 md1 order-md1 order-xs1>            
            </v-flex>

            <v-flex xs4 md5 order-md2 order-xs2>
              <v-radio-group v-model="radio_row" row>
                <v-radio label="원치않는 앱" value="radio-leave-0" @change='radioChanged' checked></v-radio>
                <v-radio label="앱 속도가 느림" value="radio-leave-1" @change='radioChanged'></v-radio>
                <v-radio label="앱 안정성 부족" value="radio-leave-2" @change='radioChanged'></v-radio>
                <v-radio label="타 앱과의 경쟁력 유무" value="radio-leave-3" @change='radioChanged'></v-radio>
                <v-radio label="사용빈도가 낮음" value="radio-leave-4" @change='radioChanged'></v-radio>
                <v-radio label="기타" value="radio-leave-5" @change='radioChanged'></v-radio>
              </v-radio-group>
            </v-flex>

            <v-flex xs4 md1 order-md3 order-xs3>            
            </v-flex>     
          </v-layout>
          <!-- Radio button -->

          <template v-if='showLeaveDetailTextarea'>
            <v-layout row wrap justify-center>
              <v-flex xs12 sm12 md12>
                <v-textarea
                  v-model="leaveReasonDetail"
                  auto-grow
                  box
                  color="deep-purple"
                  label="기타 입력사항"
                  rows="3"
                ></v-textarea>
              </v-flex>            
            </v-layout>
          </template>
                 
        </v-container>       
        
        <v-card-actions>
          <v-btn block outline color="indigo" @click="close()">창 닫기</v-btn>
          <v-btn block color="primary" @click="leaveUser()">탈퇴완료</v-btn>          
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
  data () {
    return {
      selectedReason: 0,
      leaveReasonDetail: '',
      radio_row: 'radio-leave-0',
      showLeaveDetailTextarea: false,
      dialog: false
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
    bus.$on('dialogForLeaveUser', function (value) {
      vm.dialog = true
      vm.radio_row = 'radio-leave-0'
      vm.showLeaveDetailTextarea = false
    })
  },
  methods: {
    async doLeaveUser () {
      const response = await UserService.leaveUser({
        userId: this.userId,
        reason: this.selectedReason,
        reasonDetail: this.leaveReasonDetail
      })
      if (response.data.success) {
        this.$swal({
          type: 'success',
          title: '탈퇴 완료',
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
          title: '탈퇴 실패',
          showConfirmButton: false,
          timer: 777
        }).then((result) => {
        })
      }
    },
    radioChanged: function (event) {
      switch (event) {
        case 'radio-leave-0' :
          console.log('radio-leave-0')
          this.showLeaveDetailTextarea = false
          this.selectedReason = 0
          break
        case 'radio-leave-1' :
          console.log('radio-leave-1')
          this.showLeaveDetailTextarea = false
          this.selectedReason = 1
          break
        case 'radio-leave-2' :
          console.log('radio-leave-2')
          this.showLeaveDetailTextarea = false
          this.selectedReason = 2
          break
        case 'radio-leave-3' :
          console.log('radio-leave-3')
          this.showLeaveDetailTextarea = false
          this.selectedReason = 3
          break
        case 'radio-leave-4' :
          console.log('radio-leave-4')
          this.showLeaveDetailTextarea = false
          this.selectedReason = 4
          break
        case 'radio-leave-5' :
          console.log('radio-leave-5')
          this.showLeaveDetailTextarea = true
          this.selectedReason = 5
          break
      }
    },
    leaveUser () {
      this.$swal({
        title: '회원 탈퇴 하시겠습니까?',
        text: '탈퇴 후에 되돌릴 수 없습니다',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '네, 탈퇴합니다',
        cancelButtonText: '취소합니다'
      }).then((result) => {
        if (result.value) {
          this.doLeaveUser()
          /*
          this.$swal(
            '삭제했습니다!',
            '일지가 삭제되었습니다',
            'success'
          )
          */
        }
      })
    },
    close () {
      this.dialog = false
    }
  },
  computed: {
  }
}
</script>