<template>
  <div class="py-2 px-2">
    <!-- プロフィール未設定時の表示 -->
    <template v-if="!Object.keys(profile).length">
      <p class="my-5 mx-auto w-50">パートナー登録には<br>プロフィールの詳細情報を<br>設定する必要があります</p>

      <div class="text-center">
        <button type="button" class="btn btn-primary">設定する</button>
      </div>
    </template>

    <!-- パートナー情報設定画面 -->
    <template v-else>
      <div class="px-3 py-2">
        <!-- 氏名 -->
        <p>氏名</p>
        <p class="ps-2">{{ profile.name }}</p>

        <!-- 携帯電話番号 -->
        <p>携帯電話番号</p>
        <p class="ps-2">{{ profile.tel }}</p>

        <!-- 振込先情報 -->
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <span class="field-required badge bg-danger me-2">必須</span>
            <label for="field-transfer-account" class="d-block m-0 py-2 form-label">振込先情報</label>
          </div>
          <button type="button" class="btn btn-primary">設定する</button>
        </div>

        <!-- 口座情報 -->
        <div class="m-1 mb-3 p-3 border">
          <div
            class="row w-100"
            v-for="item in partnerInfo.transferAccount"
            :key="item.label"
          >
            <div class="col-4">{{ item.label }}</div>
            <div class="col-6">：{{ item.value }}</div>
          </div>
        </div>

        <!-- 身分証明書 -->
        <span class="field-required badge bg-danger me-2">必須</span>
        <label for="field-ID">身分証明書</label>

        <select
          class="form-select mb-2"
          v-model="partnerInfo.idSelected.selectedOption"
        >
          <option
            v-for="(id, index) in idSelects"
            :key="`id${index}`"
            :value="id"
          >{{ id }}</option>
        </select>

        <input type="file" class="form-control" id="idFile">

        <!-- 自己紹介 -->
        <div class="form-field mt-3 pb-3">
          <label
            for="field-self-intro"
            class="form-labeel"
          >自己紹介</label>

          <textarea
            id="field-self-intro"
            rows="10"
            class="form-control"
            v-model="partnerInfo.selfIntro"
          ></textarea>
        </div>

        <!-- 規約同意チェックボックス -->
        <div class="mx-auto mb-5 w-50">
          <input
            type="checkbox"
            class="form-check-input"
            id="isAgree"
            v-model="partnerInfo.isAgree"
          >
          <label
            for="isAgree"
            class="form-check-label"
          >規約に同意します</label>
        </div>

        <!-- 申請ボタン -->
        <div class="text-center">
          <button type="button" class="btn btn-primary">申請</button>
        </div>
      </div>
    </template>
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
      title: 'パートナー管理',
      profile: {},
      partnerInfo: {
        // 振込先情報
        transferAccount: {
          financial: { label: '金融機関名', value: '' },
          branchName: { label: '支店名', value: '' },
          subject: { label: '科目', value: '' },
          number: { label: '口座番号', value: '' }
        },
        // 身分証明書情報
        idSelected: {
          selectedOption: '',
          file: ''
        },
        // 自己紹介文
        selfIntro: '',
        // 規約同意チェックボックスの値
        isAgree: false
      },
      // 身分証明書選択肢
      idSelects: [
        '運転免許証'
      ]
    }
  },
  mounted: async function() {
    // プロフィール詳細情報を取得する

    // テストする場合は以下の処理をコメントアウト解除
    // this.$set(this.profile, 'name', 'タイム 太郎');
  }
}
</script>