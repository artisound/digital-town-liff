<template>
  <div class="px-2 py-2">
    <div class="popup popup-accept">
      <div class="toast-header">
        <strong class="me-auto text-success">保存完了</strong>
        <!-- <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button> -->
      </div>
    </div>
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
      // トーストを表示する
      this.showToast();
    },
    showToast() {
      const popup_accept = document.querySelector(".popup-accept");
      popup_accept.classList.add("view");
      setTimeout(function() {
        popup_accept.classList.remove("view");
      }, 3000);
    },
  },
}
</script>

<style>
body {
  overflow-x: hidden;
}
.popup-accept {
  border: 1px #777 solid;
  top: 10%;
}

.popup {
  width: 25%;
  border-radius: 8px;
  position: absolute;
  right: -350px;
  overflow-x: hidden;
  transition: 0.5s;
}

.popup .center {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.view {
  right: 3.5rem !important;
  transition: 0.5s;
}

</style>