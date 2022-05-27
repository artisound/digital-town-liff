<template>
  <div>
    <!-- ようこそ -->
    <template v-if="displayMode == 0">
      <div
        id="welcomeView"
        class="form-fields px-2 text-center"
      >
        <h2 class="mt-5 mx-4 display-7 text-outline">ようこそ<br>デジタル町一丁目<br>[ とさジョブ ]</h2>
        <div
          class="position-absolute top-50 left-50 w-100"
          style="transform: translate(-50%, -50%);"
        >
          <button
            class="btn btn-outline-primary btn-lg bg-white"
            :disabled="btnStart"
            @click="btnAction($event, 'start')"
          >はじめる</button>
        </div>
      </div>
    </template>
    
    <!-- 入力画面 -->
    <template v-else-if="displayMode == 1">
      <div class="text-center mb-3 py-2">
        <span class="d-block py-2 text-primary liff-top-icon">
          <i class="bi bi-info-circle-fill"></i>
        </span>
        <span class="h2 fw-bold text-center">新規登録</span>
      </div>
      
      <!-- 郵便番号入力欄 -->
      <div class="form-field mb-3 pb-3 border-bottom">
        <label
          for="zip_code"
          class="d-block m-0 py-2 form-label"
        >
          <span class="field-required badge bg-danger me-2">必須</span>
          郵便番号
        </label>
        <input
          type="tel"
          id="zip_code"
          class="form-control field-input"
          maxlength="8"
          v-model="$v.inputData.$model.zip_code"
          @input="addHyphenToZipcode($event.target.value);"
          @change="$v.inputData.zip_code.$touch();"
          name="zip_code"
          placeholder="例）781-8007"
        >
        <template v-if="$v.inputData.zip_code.$error">
          <p class="invalid-feedback is-invalid d-block">郵便番号を入力してください</p>
        </template>
      </div>

      <!-- 性別入力欄 -->
      <div class="form-field mb-3 pb-3 border-bottom">
        <label class="d-block m-0 py-2 form-label">
          <span class="field-required badge bg-danger me-2">必須</span>
          性別
        </label>
        <div class="btn-group w-100 field-input">
          <input
            type="radio"
            id="gender-2"
            class="btn-check"
            name="gender"
            value="男性"
            v-model="inputData.gender"
            autocomplete="off"
          >
          <label
            for="gender-2"
            class="btn btn-outline-primary"
          >男性</label>
          <input
            type="radio"
            id="gender-3"
            class="btn-check"
            name="gender"
            value="女性"
            v-model="inputData.gender"
            autocomplete="off"
          >
          <label
            for="gender-3"
            class="btn btn-outline-primary"
          >女性</label>
        </div>
      </div>
      
      <!-- 生年月日入力欄 -->
      <div class="form-field mb-3 pb-3 border-bottom">
        <label class="d-block m-0 py-2 form-label">
          <span class="field-required badge bg-danger me-2">必須</span>
          生年月日
        </label>
        <div class="input-group mb-1 field-input">
          <!-- 年 -->
          <select
            name="birth_year"
            class="form-select"
            v-model="$v.inputData.$model.birth_year"
            @change="createBirthday($event.target); $v.inputData.birth_year.$touch();"
          >
            <option value="" selected>- 年 -</option>
            <option v-for="yyyy in 120" :key="yyyy" :value="mY - yyyy + 1">{{ mY - yyyy + 1 }}</option>
          </select>

          <!-- 月 -->
          <select
            name="birth_month"
            class="form-select"
            v-model="$v.inputData.$model.birth_month"
            @change="createBirthday($event.target); $v.inputData.birth_month.$touch();"
          >
            <option value="" selected>- 月 -</option>
            <option v-for="m in 12" :key="m" :value="d">{{ m }}月</option>
          </select>

          <!-- 日 -->
          <select
            name="birth_date"
            class="form-select"
            v-model="$v.inputData.$model.birth_date"
            @change="createBirthday($event.target); $v.inputData.birth_date.$touch();"
          >
            <option value="" selected>- 日 -</option>
            <option v-for="d in maxDay" :key="d" :value="d">{{ d }}日</option>
          </select>
        </div>
        <template v-if="$v.inputData.birth_year.$error || $v.inputData.birth_month.$error || $v.inputData.birth_date.$error">
          <p class="invalid-feedback is-invalid d-block">生年月日を正しく入力してください。</p>
        </template>
      </div>

      <!-- ボタン -->
      <div class="row my-0 mx-auto w-100 mb-5">
        <div class="row col-12 w-100 m-0 p-0">
          <!-- キャンセルボタン領域 -->
          <div class="col-6 p-0 pe-2">
            <button
              type="button"
              class="btn btn-secondary w-100 btn-action"
              @click="btnAction($event, 'cancel')"
            >キャンセル</button>
          </div>

          <!-- 確認ボタン領域 -->
          <div class="col-6 p-0 ps-2">
            <button
              type="button"
              class="btn btn-primary w-100 btn-action"
              @click="btnAction($event, 'confirm')"
            >確認</button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>