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
          <v-icon>fas fa-pen-nib</v-icon>
          <v-toolbar-title>이용약관</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-card style="height:88%">
          <v-container fluid grid-list-lg>
            <v-layout row wrap align-center>
              <v-flex xs6>
                <v-checkbox :label="`서비스 약관`" v-model="checkbox1" @change="onCb1Change"></v-checkbox>
              </v-flex>

              <v-flex xs6>
                <h5><p class="text-lg-right" style="cursor:pointer" @click="showServicePolicy()">상세보기</p></h5>
              </v-flex>

            </v-layout>
            <v-layout row wrap align-center>
              <v-flex xs6>
                <v-checkbox :label="`개인정보 취급방침`" v-model="checkbox2" @change="onCb2Change"></v-checkbox>
              </v-flex>

              <v-flex xs6>
                <h5><p class="text-lg-right" style="cursor:pointer" @click="showPrivatePolicy()">상세보기</p></h5>
              </v-flex>
            </v-layout>
          </v-container> 

          <v-container fluid grid-list-lg>
            <v-layout row wrap align-center>
              <v-flex xs6>
                <v-checkbox :label="`전체동의`" v-model="checkbox3" @change="onCbAllAgreeChange"></v-checkbox>          
              </v-flex>
            </v-layout>
          </v-container> 
          
          <v-flex xs12 style="height:60px"/>

          <v-flex xs12 ma-3>
              <v-btn block color="primary" :disabled="nextButtonDisabled" @click="goToStep2()">다음</v-btn>          
          </v-flex>

        </v-card>
      </div>

    <!-- DIALOG -->
    <div class="text-xs-center">
      <v-dialog
        v-model="dialog"
        width="800"
        height="800"
        scrollable
      >      
        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
          >
            {{ policy_title }}
          </v-card-title>

          <v-card-text style="height: 800px;">
            {{ policy_contents }}
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              flat
              @click="dialog = false"
            >
              닫기
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <!-- DIALOG -->

  </v-layout>
</template>

<script>
const { detect } = require('detect-browser')
const browser = detect()
export default {
  data () {
    return {
      mainStyle: 'width: 500px; height: 520px; margin: auto;',
      nextButtonDisabled: true,
      policy_contents: '',
      policy_title: '',
      dialog: false,
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      password: '',
      id: '',
      dictionary: {
        custom: {
          id: {
            required: () => '아이디를 입력해주세요'
          },
          password: {
            required: () => '비밀번호를 입력해주세요'
          }
        }
      }
    }
  },
  mounted () {
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
    goToStep2 () {
      this.$router.push('/suStep2')
    },
    onCbAllAgreeChange (newValue, oldValue) {
      this.checkbox1 = newValue
      this.checkbox2 = newValue
      if (newValue) {
        this.nextButtonDisabled = false
      } else {
        this.nextButtonDisabled = true
      }
    },
    showServicePolicy () {
      this.dialog = true
      this.policy_title = '서비스 이용약관'
      this.policy_contents = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    showPrivatePolicy () {
      this.dialog = true
      this.policy_title = '개인정보 취급방침'
      this.policy_contents = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    onCb1Change () {
      if (this.checkbox1 && this.checkbox2) {
        this.nextButtonDisabled = false
      } else {
        this.nextButtonDisabled = true
      }
    },
    onCb2Change () {
      if (this.checkbox1 && this.checkbox2) {
        this.nextButtonDisabled = false
      } else {
        this.nextButtonDisabled = true
      }
    }
  },
  computed: {
  }
}
</script>