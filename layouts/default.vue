<template>
  <!-- <Nuxt /> -->
  <Nuxt :liff-info="liffInfo" />
</template>

<script>
export default {
  name: 'DefaultLayout',
  head() {
    return {
      title: this.title,
    }
  },
  watch: {
    '$route': function(to, from) {
      console.log(to)
      console.log(from)
      if(to.name !== from.name) {
        this.title = this.$pageTitle()
      }
    }
  },
  data() {
    return {
      title: this.$pageTitle(),
      liffInfo: {}
    }
  },
  mounted: async function() {
    this.liffInfo = this.$liff()
  },
  async fetch ({ store, params }) {
    const liffInfo = await this.$liff();
    store.commit('liffInfo', liffInfo)
  }
}
</script>