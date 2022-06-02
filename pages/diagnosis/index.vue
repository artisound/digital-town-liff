<template>
  <div class="px-2 py-2">
    <template v-if="displayMode == 0">
      <h4 class="my-4 text-decoration-underline text-center">意外な自分に気づく!?<br>脳タイプ診断</h4>

      <div class="m-3 text-start">
        <p>40問の質問に答えることであなたの脳タイプを診断<br>性格や向いている仕事が分かります。</p>
        <p>深く考えずに直感でお答えください(5分くらいが目安です)</p>
        <p>中断したいときは、{{ numPerPage }}問ごとにある『次へ』ボタンを押したところまでが保存されます。</p>
      </div>

      <template v-if="inputMode">
        <p>以下を登録して<br>ご利用をはじめてください。</p>

        <!-- 郵便番号入力 -->
        <div class="form-field mb-3 pb-3 border-bottom">
          <label for="zip_code" class="d-block m-0 py-2 form-label">
            <span class="field-required badge bg-danger me-2">必須</span>郵便番号
          </label>
          <input type="tel" id="zip_code" maxlength="8" class="form-control field-input" v-model="$v.userInfo.$model.zip_code" @input="addHyphenToZipcode($event.target.value);" @change="$v.userInfo.zip_code.$touch();" name="zip_code" placeholder="例）781-8007">
          <template v-if="$v.userInfo.zip_code.$error">
            <p class="invalid-feedback is-invalid d-block">郵便番号を入力してください</p>
          </template>
        </div>

        <!-- 性別入力 -->
        <div class="form-field mb-3 pb-3 border-botton">
          <label class="d-block m-0 py-2 form-label">
            <span class="field-required badge bg-danger me-2">必須</span>性別
          </label>
          <div class="btn-group w-100 field-input">
            <input type="radio" class="btn-check" name="gender" id="gender-2" value="男性" v-model="userInfo.gender" autocomplete="off">
            <label for="gender-2" class="btn btn-outline-primary">男性</label>
            <input type="radio" class="btn-check" name="gender" id="gender-3" value="女性" v-model="userInfo.gender" autocomplete="off">
            <label for="gender-3" class="btn btn-outline-primary">女性</label>
          </div>
        </div>

        <!-- 生年月日選択 -->
        <div class="form-field mb-3 pb-3 border-botton">
          <label class="d-block m-0 py-2 form-label">
            <span class="field-required badge bg-danger me-2">必須</span>生年月日
          </label>
          <div class="input-group mb-1 field-input">
            <!-- 年選択 -->
            <select name="birth_year" class="form-select" v-model="$v.userInfo.$model.birth_year" @change="$v.userInfo.birth_year.$touch();">
              <option value="0" selected>- 年 -</option>
              <option v-for="yyyy in 120" :key="yyyy" :value="mY - yyyy + 1">{{ mY - yyyy + 1 }}</option>
            </select>

            <!-- 月選択 -->
            <select name="birth_month" class="form-select" v-model="$v.userInfo.$model.birth_month" @change="$v.userInfo.birth_month.$touch();">
              <option value="0" selected>- 月 -</option>
              <option v-for="m of 12" :key="m" :value="m">{{ m }}月</option>
            </select>

            <!-- 日選択 -->
            <select name="birth_date" class="form-select" v-model="$v.userInfo.$model.birth_date" @change="$v.userInfo.birth_date.$touch();">
              <option value="0" selected>- 日 -</option>
              <option v-for="d of outputMaxDayByYm(userInfo.birth_year, userInfo.birth_month)" :key="d" :value="d">{{ d }}日</option>
            </select>
          </div>
          <template v-if="$v.userInfo.birth_year.$error || $v.userInfo.birth_month.$error || $v.userInfo.birth_date.$error">
            <p class="invalid-feedback is-invalid d-block">生年月日を正しく入力してください</p>
          </template>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: 'DiagnosisIndex',
  props: {
    liffInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      displayMode: 0,
      inputMode: true,
      numPerPage: 4,
      userInfo: {}
    }
  },
  mounted: async function() {
  },
  methods: {
  }
}
</script>