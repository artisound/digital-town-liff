<template>
  <div class="px-2 py-2">
    <!-- プロフィール詳細情報未入力時 -->
    <template v-if="!Object.keys(profile).length">
      <p class="w-75 my-5 mx-auto px-3">名簿登録申請には<br>プロフィールの詳細情報を<br>設定する必要があります</p>
      <div class="text-center">
        <button type="button" class="btn btn-primary">設定する</button>
      </div>
    </template>

    <!-- 登録・申請情報一覧 -->
    <template v-else>
      <!-- 一覧表示 -->
      <template v-if="!isInputMode">
        <div class="py-5 px-3">
          <!-- 入力画面遷移ボタン -->
          <div class="text-center mb-5">
            <button
              type="button"
              class="btn btn-primary"
              @click="onEdit()"
            >名簿登録の申請情報を入力する</button>
          </div>

          <!-- 登録・申請情報一覧 -->
          <p class="text-primary">登録・申請情報一覧</p>
          <div class="row pb-1 border-bottom">
            <div class="col">団体名</div>
            <div class="col">状態</div>
          </div>
          <div
            class="row py-2"
            v-for="(group, index) in groups"
            :key="`group${index}`"
          >
            <div class="col">{{ group.name }}</div>
            <div class="col">{{ group.status }}</div>
          </div>
        </div>
      </template>

      <!-- 申請画面 -->
      <template v-else>
        <!-- 団体コード -->
        <span class="field-required badge bg-danger me-2">必須</span>
        <label for="field-group-code" class="d-block m-0 py-2 form-label">団体コード</label>
        <input
          type="number"
          id="field-group-code"
          class="form-cntrol field-input"
          name="group-code"
          min="0"
          v-model="registInfo.groupCode"
        >

        <!-- 氏名 -->
        <label class="d-block">氏名</label>
        <p class="ps-2">{{ profile.name }}</p>

        <!-- 会社名 -->
        <label class="d-block">会社名</label>
        <input
          type="text"
          id="field-company"
          class="form-control"
          name="company"
          v-model="registInfo.company"
        >

        <!-- 住所 -->
        <label class="d-block">住所</label>
        <input
          type="text"
          id="field-address"
          class="form-control"
          name="address"
          v-model="registInfo.address"
        >

        <!-- 電話番号 -->
        <label class="d-block">電話番号</label>
        <input type="tel" id="field-tel" class="form-control" name="tel" v-model="registInfo.tel">

        <!--業種 -->
        <label class="d-block">業種</label>
        <input type="text" id="field-industry" class="form-control" name="industry" v-model="registInfo.industry">

        <!--業種 -->
        <label class="d-block">役職</label>
        <input type="text" id="field-position" class="form-control" name="position" v-model="registInfo.position">

        <!--業種 -->
        <label class="d-block">部署</label>
        <input type="text" id="field-department" class="form-control" name="department" v-model="registInfo.department">
      </template>
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
      title: '名簿登録申請',
      profile: {},
      groups: [
        // ダミーデータ
        { name: 'ACグループ', status: '登録済み' },
        { name: '1234', status: '申請中' },
      ],
      isInputMode: false,
      registInfo: {
        groupCode: '',
        company: '',
        address: '',
        tel: '',
        industry: '',
        position: '',
        department: ''
      }
    }
  },
  mounted: async function() {
    // プロフィールの詳細情報を取得

    // テストする場合は以下の処理をコメントアウト解除
    // this.$set(this.profile, 'name', 'タイム 太郎');
  },
  methods: {
    onEdit() {
      this.isInputMode = true;
    }
  }
}
</script>