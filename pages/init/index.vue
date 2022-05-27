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
  </div>
</template>