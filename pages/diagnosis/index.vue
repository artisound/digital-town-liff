<template>
  <div></div>
</template>

<script>
export default {
  name: 'DiagnosisIndex',
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
    console.log('diagnosis', this.liffInfo)
    console.log(this.$pageTitle)
  },
  methods: {
  }
}
</script>