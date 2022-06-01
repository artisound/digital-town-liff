<template>
  
</template>

<script>
export default {
  name: 'EnqueteIndex',
  props: {
    liffInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
    }
  },
  mounted: async function() {
    console.log('enquete', this.liffInfo)
  },
  methods: {
  }
}
</script>