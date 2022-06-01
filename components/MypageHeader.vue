<template>
  <nav class="navbar navbar-dark bg-primary py-0">
    <div class="container-fluid">
      <i
        :class="showPrevBtn ? 'navbar-brand bi bi-chevron-left mx-0 px-2' : ''"
        :style="{
          cursor: 'pointer',
          minWidth: '36px',
        }"
        @click="$router.go(-1)"
      ></i>


      <span class="navbar-brand mx-0">{{title}}</span>

      <div style="width:36px;"></div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      showPrevBtn: false, //  "戻る"ボタン
    }
  },
  watch: {
    '$route': function(to, from) {
      const fullPath  = to.name.split('-')
      if (to.path !== from.path) {

        // "戻る"ボタン表示切替
        this.showPrevBtn = (fullPath.length <= 1) ? false : true
      }
    }
  }     // /watch
}
</script>