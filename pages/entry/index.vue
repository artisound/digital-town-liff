<template>
  
</template>

<script>
export default {
  name: 'EntryIndex',
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
    console.log('entry', this.liffInfo)
  },
  methods: {
  }
}
</script>