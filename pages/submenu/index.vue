<template>
  
</template>

<script>
export default {
  name: 'SubmenuIndex',
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
    console.log('submenu', this.liffInfo)
  },
  methods: {
  }
}
</script>