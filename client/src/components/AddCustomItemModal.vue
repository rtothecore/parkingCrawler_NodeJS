<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">품목명 입력</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs6 sm6 md6>
                <v-text-field
                  v-model="customItemName"
                  label="품목명"                        
                ></v-text-field>
              </v-flex>
              <!--
              <v-flex xs12 sm6 md3>
                <v-select
                  v-validate="'required'"
                  :items="bcsItems"
                  v-model="bcs"
                  :error-messages="errors.collect('bcs')"
                  label="대분류"
                  data-vv-name="bcs"
                  required
                  v-on:change="onChangeBcs"
                  item-text="text"
                  item-value="bCode"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6 md3>
                <v-select
                  v-validate="'required'"
                  :items="mcsItems"
                  v-model="mcs"
                  :error-messages="errors.collect('mcs')"
                  label="중분류"
                  data-vv-name="mcs"
                  required
                  v-on:change="onChangeMcs"
                  item-text="text"
                  item-value="mCode"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6 md3>
                <v-select
                  v-validate="'required'"
                  :items="scsItems"
                  v-model="scs"
                  :error-messages="errors.collect('scs')"
                  label="소분류"
                  data-vv-name="scs"
                  required
                  v-on:change="onChangeScs"
                  item-text="text"
                  item-value="sCode"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6 md3>
                <v-text-field 
                  v-validate="'required'"
                  v-model="workType" 
                  :error-messages="errors.collect('workType')"
                  label="작업분류"
                  required
                  data-vv-name="workType">
                </v-text-field>
              </v-flex>
              -->
            </v-layout>
          </v-container>
          <!-- <small>*필수 입력 사항입니다</small> -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">취소</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">추가</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import {bus} from '../main'
/*
import BcService from '@/services/BcService'
import McService from '@/services/McService'
import ScService from '@/services/ScService'
import WcService from '@/services/WcService'
import DcService from '@/services/DcService'
*/
export default {
  $_veeValidate: {
    validator: 'new'
  },
  data () {
    return {
      dialog: false,
      from: '',
      selectIdx: 0,
      customItemName: '',
      //
      dictionary: {
        custom: {
          bcs: {
            required: '대분류를 선택해주세요'
          },
          mcs: {
            required: '중분류를 선택해주세요'
          },
          scs: {
            required: '소분류를 선택해주세요'
          },
          workType: {
            required: '작업분류를 입력해주세요'
          }
        }
      }
    }
  },
  mounted () {
    this.$validator.localize('ko', this.dictionary)
    var vm = this
    bus.$on('dialogForAddCustomItem', function (value) {
      // console.log(value)
      vm.dialog = true
      vm.selectIdx = value.selectIdx
      vm.from = value.from
      vm.customItemName = ''
    })
  },
  created () {
    // this.getBCS()
  },
  methods: {
    save () {
      this.$validator.validateAll().then((result) => {
        if (!result) {
          return
        }

        this.$swal({
          type: 'success',
          title: '품목명을 입력하였습니다',
          showConfirmButton: false,
          timer: 777
        }).then((result) => {
          var paramForReturn = {}
          paramForReturn.itemName = this.customItemName
          paramForReturn.selectIdx = this.selectIdx
          if (this.from === 'new') {
            bus.$emit('fromAddCustomItemModalNew', paramForReturn)
          } else if (this.from === 'edit') {
            bus.$emit('fromAddCustomItemModalEdit', paramForReturn)
          }
          this.dialog = false
        })
      }).catch(() => {})
    }
  }
}
</script>