<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">주소 검색</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs8 sm6 md8>
                <v-text-field 
                  v-validate="'required'"
                  v-model="searchText" 
                  :error-messages="errors.collect('searchText')"
                  label="주소검색어"
                  required
                  data-vv-name="searchText"
                  v-on:keyup.enter="searchAddr">
                </v-text-field>
              </v-flex>
              <v-flex xs4 sm6 md4>
                <v-btn outline color="indigo" @click.native="searchAddr">검색</v-btn>
              </v-flex>

              <v-flex xs12 md12 lg12 v-for="address in searchedAddress" :key="address.building_id">
                <v-chip @click.native="selecteChip(address.ko_common + ' ' + address.ko_doro)" color="primary" text-color="white">
                  <v-avatar>
                    <v-icon>location_on</v-icon>
                  </v-avatar>
                  <!-- 제주도 서귀포시 표선면 일주동로 6071 -->
                  {{ address.ko_common }} {{ address.ko_doro }}
                </v-chip>
              </v-flex>
            </v-layout>
          </v-container>
          <!-- <small>*필수 입력 사항입니다</small> -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">닫기</v-btn>
          <!-- <v-btn color="blue darken-1" flat @click.native="save">추가</v-btn> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import {bus} from '../main'
import AddressService from '@/services/AddressService'
export default {
  $_veeValidate: {
    validator: 'new'
  },
  data () {
    return {
      searchedAddress: [],
      searchText: '',
      dialog: false,
      userId: '5af4fa281a1ee4261039149f',
      dictionary: {
        custom: {
          searchText: {
            required: '검색어를 입력해주세요'
          }
        }
      }
    }
  },
  mounted () {
    this.$validator.localize('ko', this.dictionary)
    var vm = this
    bus.$on('dialogForSearchAddress', function (value) {
      // console.log(value)
      vm.dialog = true
    })
  },
  created () {
  },
  methods: {
    async getAddress () {
      const response = await AddressService.fetchAddressData({
        searchText: this.searchText
      })
      // console.log(response.data.results)
      this.searchedAddress = response.data.results
    },
    searchAddr: function () {
      this.getAddress()
    },
    close: function () {
      this.searchText = ''
      this.searchedAddress = []
      this.dialog = false
    },
    selecteChip: function (address) {
      // console.log(address)
      bus.$emit('dialogForSearchAddressReturn', address)
      this.searchText = ''
      this.searchedAddress = []
      this.dialog = false
    }
  }
}
</script>