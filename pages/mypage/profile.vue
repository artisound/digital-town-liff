<template>
  <div class="px-2 py-2">
    <!-- タブ -->
    <div class="d-flex">
      <div
        v-for="t in tabs"
        :key="t.key"
        @click="tab = t.key;"
        class="col py-3 border text-center"
        :style="t.key == tab ? '--bs-bg-opacity: .7; background-color: rgba(var(--bs-primary-rgb),var(--bs-bg-opacity)); color: white;' : ''"
      >{{ t.label }}</div>
    </div>

    <!-- 簡易情報 -->
    <div v-if="tab == 'basic'" class="form-fields">
      <basic
        :profile="profile"
        :birthday="birthday"
        :mY="mY"

      ></basic>      
    </div>




    <!-- 詳細情報 -->
    <div class="" v-else-if="tab === 'detail'">
      <!-- 氏名 -->
      <div class="form-field mb-3 pb-3 border-bottom">
        <label for="field-name" class="d-block m-0 py-2 form-label">氏名</label>
        <input
          type="text"
          id="field-name"
          class="form-control"
          name="name"
          v-model="details.name"
        >
      </div>

      <!-- 住所1 -->
      <div class="form-field mb-3 pb-3 border-bottom">
        <label for="field-address1" class="d-block m-0 py-2 form-label">住所1</label>
        <input
          type="text"
          id="field-address1"
          class="form-control"
          name="address1"
          v-model="details.address1"
        >
      </div>

      <!-- 住所2 -->
      <div class="form-field mb-3 pb-3 border-bottom">
        <label for="field-address2" class="d-block m-0 py-2 form-label">住所2</label>
        <input
          type="text"
          id="field-address2"
          class="form-control"
          name="address2"
          v-model="details.address2"
        >
      </div>

      <div class="form-field mb-3 pb-3 border-bottom">
        <label for="field-phone" class="d-block m-0 py-2 form-label">携帯電話番号</label>
        <input
          type="tel"
          id="field-phone"
          class="form-control"
          name="phone"
          v-model="details.tel"
        >
      </div>
    </div>



    <!-- 家族情報 -->
    <div class="" v-else-if="tab === 'family'">
      <family
        :family_info_json="family_info_json"
        :mY="mY"
      ></family>
    </div>

    <!-- 保存ボタン -->
    <div class="d-flex justify-content-center align-items-center">
      <button
        type="button"
        class="btn btn-primary"
        @click="onSave()"
      >保存</button>
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
      },
      
      details: {
        name: '',
        address1: '',
        address2: '',
        tel: '',
      },

      mY: 0,
      family_info_json: [],     // 【Myページ】情報
    }
  },
  created: function() {

  },
  mounted: async function() {
    this.mY = Number(this.$dayjs().format('YYYY'));
  },
  methods: {
    async onSave() {
    },
  },
}
</script>