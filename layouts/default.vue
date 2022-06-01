<template>
  <Nuxt :liff-info="liffInfo" />
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
    }
  },
  async asyncData() {
    const liffInfo = await this.$liff();
    return {
      liffInfo: liffInfo,
    }
  }
}
</script>