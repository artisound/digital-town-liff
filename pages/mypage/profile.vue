<template>
  <div class="px-2 py-2">
    <!-- 簡易情報 -->
    <div v-if="tab == 'basic'" class="form-fields">

      <!-- 郵便番号 -->
      <div class="form-field mb-3 pb-3 border-bottom">
        <label for="field-zipcode" class="d-block m-0 py-2 form-label">
          <span class="field-required badge bg-danger me-2">必須</span>郵便番号
        </label>

        <input
          type="tel"
          id="field-zipcode"
          class="form-control field-input"
          maxlength="8"
          name="zip_code"
          placeholder="例）781-8007"
          v-model="profile.zip_code"
        >
        <!--
          @input="insertHyphen($event.target.value)"
          @change="getAddressByZipcode($event.target.value)"
        -->
        <div>
          <input
            disabled
            type="text"
            v-model="profile.address"
            class="form-control field-input mt-1"
          >
          <!-- <span v-else class="mt-1 text-danger">住所が取得できませんでした</span> -->
        </div>
      </div>

      <!-- 性別 -->
      <div class="form-field mb-3 pb-3 border-bottom">
        <label class="d-block m-0 py-2 form-label">
          <span class="field-required badge bg-danger me-2">必須</span>
          <span>性別</span>
        </label>

        <div class="btn-group w-100 field-input">
          <input
            id="gender-2"
            type="radio"
            name="gender"
            class="btn-check"
            value="男性"
            v-model="profile.gender"
          >
          <label class="btn btn-outline-primary" for="gender-2">男性</label>

          <input
            type="radio"
            class="btn-check"
            name="gender"
            id="gender-3"
            value="女性"
            v-model="profile.gender"
          >
          <label class="btn btn-outline-primary" for="gender-3">女性</label>
        </div>
      </div>

      <!-- 生年月日 -->
      <div class="form-field mb-3 pb-3 border-bottom">
        <label class="d-block m-0 py-2 form-label">
          <span class="field-required badge bg-danger me-2">必須</span>
          <span>生年月日</span>
        </label>

        <div class="input-group mb-1 field-input">
          <select
            class="form-select"
            v-model="birthday.year"
            name="birth_year"
          >
            <option value="0" selected>---</option>
            <option
              v-for="yyyy of $dayjs().format('YYYY') - 100"
              :key="yyyy"
              :value="yyyy"
            >{{ yyyy }}年</option>
          </select>

          <select class="form-select" v-model="birthday.month" name="birth_month">
            <option value="0" selected>---</option>
            <option
              v-for="m of 12"
              :key="m"
              :value="m"
            >{{ m }}月</option>
          </select>

          <select class="form-select" v-model="birthday.date" name="birth_date">
            <option value="0" selected>---</option>
            <option
              v-for="d of Number($dayjs($dayjs('2022/06/22').endOf('m')).format('D'))"
              :key="d"
              :value="d"
            >{{ d }}日</option>
          </select>
        </div>
      </div>
    </div>




    <!-- 詳細情報 -->
    <div class="" v-else-if="tab === 'detail'">

    </div>



    <!-- 家族情報 -->
    <div class="" v-else-if="tab === 'family'">

    </div>
  </div>
</template>

<script>
export default {
  layout: 'mypage',
  head() {
    return {
      title: this.title
    }
  },
  data() {
    return {
      title: 'プロフィール',
      tabs: [
        { label: '簡易情報', key: 'basic' },
        { label: '詳細情報', key: 'detail' },
        { label: '家族情報', key: 'family' },
      ],
      tab: 'basic',

      profile: {
        zip_code: '',
        address: '',
        gender: '',
      },

      birthday: {
        year: '',
        month: '',
        day: '',
      }
    }
  },
  created: function() {

  },
  mounted: async function() {
  },
  methods: {
  },
}
</script>