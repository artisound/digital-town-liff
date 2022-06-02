<template>
  <Nuxt />
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
    }
  },
  created: async function() {
  },
  mounted: async function() {
  },
}
</script>