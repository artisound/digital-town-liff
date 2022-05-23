<template>
  <div>top</div>
</template>

<script>
export default {
  name: 'IndexPage',
  mounted: async function() {
    const liff = await this.$liff();
    console.log(liff);
  }
}
</script>
