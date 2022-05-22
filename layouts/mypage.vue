<template>
  <div class="d-flex flex-column" style="min-height:100vh;max-height:100vh;">
    <MypageHeader />
    <Nuxt style="max-height:calc(100vh - 40px);" class="overflow-auto" />
  </div>
</template>

<script>
export default {
  name: 'mypage',
  data() {
    return {
    }
  },
  mounted: function() {
  }
}
</script>

<style>
* {
  font-family: 'M PLUS Rounded 1c', sans-serif;
}

label:focus,
input:focus,
select:focus,
textarea:focus,
[type="checkbox"]:focus,
[type="radio"]:focus {
  box-shadow: none !important;
}
</style>