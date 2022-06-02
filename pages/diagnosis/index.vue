<template>
  <div class="px-2 py-2">
    <template v-if="displayMode == 0">
      <h4 class="my-4 text-decoration-underline text-center">意外な自分に気づく!?<br>脳タイプ診断</h4>

      <div class="m-3 text-start">
        <p>40問の質問に答えることであなたの脳タイプを診断<br>性格や向いている仕事が分かります。</p>
        <p>深く考えずに直感でお答えください(5分くらいが目安です)</p>
        <p>中断したいときは、{{ numPerPage }}問ごとにある『次へ』ボタンを押したところまでが保存されます。</p>
      </div>
    </template>
  </div>
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
      displayMode: 0,
      numPerPage: 4
    }
  },
  mounted: async function() {
  },
  methods: {
  }
}
</script>