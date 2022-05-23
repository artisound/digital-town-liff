<template>
  <div>
    <!-- 氏名 -->
    <div class="form-field mb-3 pb-3 border-bottom">
      <label for="field-name" class="d-block m-0 py-2 form-label">氏名</label>
      <input
        type="text"
        id="field-name"
        class="form-control"
        name="name"
        v-model="details.name"
      >
    </div>

    <!-- 住所1 -->
    <div class="form-field mb-3 pb-3 border-bottom">
      <label for="field-address1" class="d-block m-0 py-2 form-label">住所1</label>
      <input
        type="text"
        id="field-address1"
        class="form-control"
        name="address1"
        v-model="details.address1"
      >
    </div>

    <!-- 住所2 -->
    <div class="form-field mb-3 pb-3 border-bottom">
      <label for="field-address2" class="d-block m-0 py-2 form-label">住所2</label>
      <input
        type="text"
        id="field-address2"
        class="form-control"
        name="address2"
        v-model="details.address2"
      >
    </div>

    <div class="form-field mb-3 pb-3 border-bottom">
      <label for="field-phone" class="d-block m-0 py-2 form-label">携帯電話番号</label>
      <input
        type="tel"
        id="field-phone"
        class="form-control"
        name="phone"
        v-model="details.tel"
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    details: { type: Object, default: {} }
  },
}
</script>