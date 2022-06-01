<template>
  <div class="w-100 d-flex flex-wrap sub-group">
    <div class="w-100 overflow-auto" style="height:calc(100vh - 80px);">
      <div class="list-group list-group-flush border-bottom">
        <NuxtLink
          v-for="(link, i) in menu"
          v-text="link.label"
          :key="i"
          :to="'/mypage' + link.to"
          :class="'list-group-item ' + (link.disabled ? 'disabled' : '')"
          :style="link.disabled ? 'background-color:#efefef;' : ''"
        ></NuxtLink>
      </div>
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
      title: 'トップ',
      menu: [
        { label: 'プロフィール',              to: '/profile', disabled: false },
        { label: '(準備中)掲示板管理',        to: '/bbsSettings',        disabled: false },
        { label: '(準備中)パートナー管理',    to: '/partner',        disabled: false },
        { label: '(準備中)名簿管理',          to: '/',        disabled: true },
        { label: '(準備中)友達設定',          to: '/',        disabled: true },
        { label: '(準備中)受信設定【行政】',  to: '/',        disabled: true },
        { label: '(準備中)受信設定【民間】',  to: '/',        disabled: true },
      ],
    }
  },
  mounted: async function() {
    // console.log(await this.$liff())
  }
}
</script>