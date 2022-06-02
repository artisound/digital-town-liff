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
              <option v-for="yyyy in 120" :key="yyyy" :value="mY - yyyy + 1">{{ mY - yyyy + 1 }}年</option>
            </select>

            <!-- 月選択 -->
            <select name="birth_month" class="form-select" v-model="$v.userInfo.$model.birth_month" @change="$v.userInfo.birth_month.$touch();">
              <option value="0" selected>- 月 -</option>
              <option v-for="m of 12" :key="m" :value="m">{{ m }}月</option>
            </select>

            <!-- 日選択 -->
            <select name="birth_date" class="form-select" v-model="$v.userInfo.$model.birth_date" @change="$v.userInfo.birth_date.$touch();">
              <option value="0" selected>- 日 -</option>
              <option v-for="d of date" :key="d" :value="d">{{ d }}日</option>
            </select>
          </div>
          <template v-if="$v.userInfo.birth_year.$error || $v.userInfo.birth_month.$error || $v.userInfo.birth_date.$error">
            <p class="invalid-feedback is-invalid d-block">生年月日を正しく入力してください</p>
          </template>
        </div>
      </template>

      <div class="mt-5 text-center">
        <button
          class="btn btn-outline-primary btn-lg bg-white"
          style="font-size: 1rem;"
          @click="onStart()"
        >はじめる</button>
      </div>
    </template>

    <!-- 詳細画面 -->
    <template v-else-if="displayMode == 1">
      <!-- 質問表示 -->
      <ol
        class="mt-3 pe-3 fs-4"
        :start="showNumber === 1 ? showNumber : (showNumber - 1) * numPerPage + 1"
      >
        <li
          class="mb-3"
          v-for="(list, index) in showItems"
          :key="`diagnosis${index}`"
          style="font-size: 1rem;"
        >
          <p class="mb-1">{{ list.text }}</p>
          <!-- 選択肢一覧 -->
          <div class="btn-group text-center w-100">
            <!-- はい -->
            <input type="radio" class="btn-check" v-model="list.val" :id="`${list.id}a`" value="2">
            <label :for="`${list.id}a`" class="btn btn-outline-primary" style="line-height: 42px; font-size: 18px;">はい</label>
            <!-- どちらでもない -->
            <input type="radio" class="btn-check" v-model="list.val" :id="`${list.id}b`" value="1">
            <label :for="`${list.id}b`" class="btn btn-outline-primary" style="font-size: 14px;">どちら<br>でもない</label>
            <!-- いいえ -->
            <input type="radio" class="btn-check" v-model="list.val" :id="`${list.id}c`" value="0">
            <label :for="`${list.id}c`" class="btn btn-outline-primary" style="line-height: 42px; font-size: 18px;">いいえ</label>
          </div>
        </li>
      </ol>

      <!-- 前・次ボタン -->
      <div class="mb-4 text-center">
        <!-- 前へボタン -->
        <button
          class="btn btn-outline-primary btn-lg"
          :class="{invisible: showNumber == 1}"
          style="font-size: 1rem;"
          @click="btnAction($event, 'prev')"
        >前へ</button>

        <!-- ページ表示 -->
        <span class="my-0 mx-2">{{ showNumber }}/{{ endNumber }}</span>
        
        <!-- 次へボタン -->
        <button
          class="btn btn-outline-primary btn-lg"
          :class="{invisible: showNumber == endNumber}"
          style="font-size: 1rem;"
          @click="btnAction($event, 'nuxt')"
        >次へ</button>
      </div>

      <!-- 隠し要素 -->
      <div class="d-none">
        <div class="label">LINEユーザーID</div>
        <input type="text" id="form-lineId" v-model="lineUserId">
        <div class="label">レコード番号</div>
        <input type="text" id="form-recId">
        <div class="label">表示中のモード</div>
        <input type="text" id="form-mode">
        <div class="label">現在設定されているモード</div>
        <input type="text" id="form-modeVal">
      </div>

      <!-- キャンセル・保存ボタン -->
      <div class="row mt-0 mb-5 mx-auto px-3 w-100">
        <!-- キャンセルボタン -->
        <div class="col-6 mx-auto p-0 pe-2">
          <button
            class="btn btn-secondary btn-lg w-100"
            id="btn-cancel"
            style="font-size: 1rem;"
            @click="onCancel()"
          >キャンセル</button>
        </div>

        <!-- 保存ボタン -->
        <template v-if="showNumber == endNumber">
          <div class="col-6 p-0 ps-2">
            <button
              class="btn btn-primary btn-lg w-100"
              id="btn-send"
              style="font-size: 1rem;"
              @click="btnAction($event, 'regi')"
            >保存</button>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
import {
  required,
  minLength,
  minValue
} from "vuelidate/lib/validators";

export default {
  layout: 'mypage',
  name: 'DiagnosisIndex',
  validations: {
    userInfo: {
      zip_code: {
        required, // 必須
        minLength: minLength(8), // 8文字未満でエラー
      },
      birth_year: {
        required, // 必須
        minValue: minValue(1900), // 1900未満でエラー
      },
      birth_month:{
        required, // 必須
        minValue: minValue(1), // 1未満でエラー
      },
      birth_date: {
        required, // 必須
        minValue: minValue(1), // 1未満でエラー
      },
    }
  },
  data() {
    return {
      displayMode: 0,
      inputMode: true,
      numPerPage: 4,
      userInfo: {},
      liffInfo: {},
      mY: this.$dayjs().format('YYYY')
    }
  },
  mounted: async function() {
    this.liffInfo = await this.$liff({ redirectUri: this.$config.baseURL + '/diagnosis' });
    console.log(this.liffInfo);
  },
  methods: {
    date() {
      return outputMaxDayByYm(this.userInfo.birth_year, this.userInfo.birth_month);
    },
    async onstart() {

    },
    /** ==========================================================================
      * ボタン処理
      * @param {object} e 選択されたDOM
      * @param {string} act アクション名
      ========================================================================== */
    async btnAction(e, act) {
      switch (act) {
        // 前のページを表示する
        case 'prev':
          break;
        // 次のページを表示する
        case 'next':
          break;
        default:
          break;
      }
    }
  }
}
</script>