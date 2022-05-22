<template>
  <nav class="navbar navbar-dark bg-primary py-0">
    <div class="container-fluid">
      <i
        class="navbar-brand bi bi-chevron-left mx-0 px-2"
        style="cursor:pointer;"
        @click="$router.go(-1)"
      ></i>

      <a class="navbar-brand mx-0" href="#">Navbar</a>

      <div style="width:36px;"></div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    }
  },
  data() {
    return {}
  }
}
</script>