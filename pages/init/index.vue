<template>
  <div>
    <!-- ようこそ -->
    <template v-if="displayMode == 0">
      <div
        id="welcomeView"
        class="form-fields px-2 text-center"
      >
        <h2 class="mt-5 mx-4 display-7 text-outline">ようこそ<br>デジタル町一丁目<br>[ とさジョブ ]</h2>
        <div
          class="position-absolute top-50 left-50 w-100"
          style="transform: translate(-50%, -50%);"
        >
          <button
            class="btn btn-outline-primary btn-lg bg-white"
            :disabled="btnStart"
            @click="btnAction($event, 'start')"
          >はじめる</button>
        </div>
      </div>
    </template>
    
    <!-- 入力画面 -->
    <template v-else-if="displayMode == 1">
      <div class="text-center mb-3 py-2">
        <span class="d-block py-2 text-primary liff-top-icon">
          <i class="bi bi-info-circle-fill"></i>
        </span>
        <span class="h2 fw-bold text-center">新規登録</span>
      </div>
    </template>
  </div>
</template>