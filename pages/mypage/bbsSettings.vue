<template>
  <div class="px-3 py-2">
    <!-- ニックネーム -->
    <div class="form-field mb-3 pb-3">
      <label for="field-nickname" class="d-block m-0 py-2 form-label">
        <span class="field-required badge bg-danger me-2">必須</span>
        ニックネーム
      </label>
      <input
        type="text"
        id="field-nickname"
        class="form-control field-input"
        maxlength="20"
        name="nickname"
        placeholder="高知 太郎"
        v-model="profile.nickname"
      >
    </div>

    <!-- 自己紹介 -->
    <div class="form-field mb-3 pb-3">
      <label
        for="field-self-intro"
        class="form-labeel"
      >自己紹介</label>

      <textarea
        id="field-self-intro"
        rows="10"
        class="form-control"
        v-model="profile.selfIntro"
      ></textarea>
    </div>

    <p class="mx-auto w-75">掲示板を利用する設定をすると<br>コミュニティ機能が<br>利用できるようになります。</p>

    <!-- 掲示板を利用するチェック -->
    <div class="mx-auto mb-5 w-75 text-center">
      <input
        type="checkbox"
        class="form-check-input"
        id="isBbsUse"
        v-model="profile.isBbsUse"
      >
      <label
        for="isBbsUse"
        class="form-check-label"
      >掲示板を利用する</label>
    </div>

    <div class="text-center">
      <button
        type="button"
        class="btn btn-primary"
        @click="onSettings()"
      >設定する</button>
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
      title: '掲示板設定',
      profile: {
        nickname: '',
        selfIntro: '',
        isBbsUse: false
      }
    }
  },
  methods: {
    /** ------------------------------------------------
     * 「設定する」ボタン押下時の処理
    ------------------------------------------------ */
    onSettings() {

    }
  }
}
</script>