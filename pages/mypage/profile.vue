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
      <advance :details="details"></advance>
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
        year: 0,
        month: 0,
        date: 0,
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