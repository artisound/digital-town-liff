<template>
  <div>
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
            v-for="yyyy of  120"
            :key="yyyy"
            :value="mY - yyyy + 1"
          >{{ mY - yyyy + 1 }}年</option>
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

    <!-- 職業 -->
    <div class="form-field mb-3 pb-3 border-bottom">
      <label class="d-block m-0 py-2 form-label">
        <span>職業</span>

        <select class="form-select">
          <option
            v-for="(job, index) in jobs"
            :key="'job' + index"
            :value="job"
          >{{ job }}</option>
        </select>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mY: { type: Number, default: 0 }
  },
  data() {
    return {
      profile: {
        zip_code: '',
        address: '',
        gender: '',
      },

      birthday: {
        year: '',
        month: '',
        day: '',
      },

      
      // 職業一覧
      jobs: [ '会社員', '公務員', '自営業', '会社役員', '主婦(夫)', 'パート・アルバイト', '無職', 'シルバー世代', 'その他' ]
    }
  }
}
</script>