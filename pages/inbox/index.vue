<template>
  
</template>

<script>
export default {
  name: 'InboxIndex',
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
    console.log('inbox', this.liffInfo)
  },
  methods: {
  }
}
</script>