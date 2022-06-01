<template>
  <div class="d-flex flex-column" style="min-height:100vh;max-height:100vh;">
    <MypageHeader :title="title" />
    <Nuxt style="max-height:calc(100vh - 40px);" class="overflow-auto" />
  </div>
</template>

<script>
import pages from '~/assets/json/pages.json';
export default {
  name: 'mypage',
  head() {
    return {
      title: this.title,
    }
  },
  data() {
    return {
      title: this.searchPageTitle(pages) || '',
    }
  },
  watch: {
    '$route': function (to, from) {
      if (to.path !== from.path) {
        // ページタイトル取得
        this.title = this.searchPageTitle(pages)
      }
    }
  },
  methods: {
    searchPageTitle(json) {
      const fullPath  = this.$route.name.split('-')

      let hierarchy = JSON.parse(JSON.stringify(json))
      for (let i = 0; i < fullPath.length; i++) {
        const name = fullPath[i]

        if(!hierarchy[name]) break;
        if (hierarchy[name].children) {
          const children = hierarchy[name].children
          if(fullPath[i + 1] && children[fullPath[i + 1]]) {
            hierarchy = hierarchy[name].children
          } else {
            hierarchy = hierarchy[name]
          }
        } else {
          hierarchy = hierarchy[name]
        }
      }

      return hierarchy.title;
    },

  }
}
</script>

<style>
* {
  font-family: 'M PLUS Rounded 1c', sans-serif;
}

label:focus,
input:focus,
select:focus,
textarea:focus,
[type="checkbox"]:focus,
[type="radio"]:focus {
  box-shadow: none !important;
}
</style>