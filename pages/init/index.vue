<template>
  
</template>

<script>
export default {
  name: 'InitIndex',
  props: {
    liffInfo: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
    }
  },
  mounted: async function() {
    console.log('init', this.liffInfo)
  },
  methods: {
  }
}
</script>