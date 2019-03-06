<template>
  <v-container fluid>
    <v-layout row wrap justify-center>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>{{Stats_page}}</h1>
      </v-flex>

      <v-flex xs12 md4>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="name"
            :rules="nameRules"
            :counter="10"
            label="수확량 입력"
            required
          ></v-text-field>
          <v-btn
            :disabled="!valid"
            @click="submit"
          >
            저장
          </v-btn>
          <v-btn @click="clear">지우기</v-btn>
        </v-form>
      </v-flex>

      <v-flex xs10>
        <v-data-table
          :headers="headers"
          :items="stats"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.accWorkTime }}</td>
            <td class="text-xs-right">{{ props.item.skyAverage }}</td>
            <td class="text-xs-right">{{ props.item.sunAverage }}</td>
            <td class="text-xs-right">{{ props.item.havestPredict }}</td>
          </template>
        </v-data-table>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      userId: '',
      Stats_page: moment().format('YYYY년') + ' 1월 1일 ~ ' + moment().format('YYYY년 MM월 DD일'),
      valid: true,
      name: '',
      nameRules: [
        v => !!v || '수확량 입력필요',
        v => (v && v.length <= 10) || '수확량은 10자 이하여야 합니다'
      ],
      headers: [
        {
          text: '누적 작업시간',
          align: 'left',
          sortable: false,
          value: 'accWorkTime'
        },
        { text: '날씨 평균', value: 'skyAverage' },
        { text: '일조량 평균', value: 'sunAverage' },
        { text: '수확량 예측', value: 'havestPredict' }
      ],
      stats: [
        {
          value: false,
          accWorkTime: '660시간',
          skyAverage: '맑음',
          sunAverage: '12시간',
          havestPredict: '384'
        }
      ]
    }
  },
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push('/login')
    } else {
    }
  },
  created: function () {
    this.userId = this.$session.get('userId')
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        /*
        axios.post('/api/submit', {
          name: this.name,
          email: this.email,
          select: this.select,
          checkbox: this.checkbox
        })
        */
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
