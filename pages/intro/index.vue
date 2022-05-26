<template>
  <div class="m-1">
    <!-- QRコード -->
      <div id="content_area">
      <div class="header">
        <h1 class="py-2 text-center border-bottom">
          <p class="h5">QRコードで招待する</p>
          <!-- <qriously :value="url" :size="200" /> -->
        </h1>
      </div><!-- /header -->

      <!-- メッセージ -->
      <div class="header">
        <h1 class="py-2 text-center">
          <p class="h5">メッセージで招待する</p>
        </h1>
      </div><!-- /header -->

      <div id="text-area" class="px-4 pb-3 mb-3 border-bottom" style="font-size:18px;">
        <ol>
          <li>[送信先の選択]をタップすると<br>送信先の選択ができます。</li>
          <li>招待先には下記の文面が送信されます。</li>
        </ol>

        <div class="alert alert-success border-success border-2 p-1 text-dark" style="border-style:dotted;">
          <div>デジタル町一丁目を招待します</div>
          <div><a :href="url">{{ url }}</a></div>
          <div v-html="intro_msg.join('<br>')"></div>
          <a v-if="config.LINE" href="#">{{config.LINE.ADD_FRIEND}}</a>
        </div>
      </div>

      <div class="d-none">
        <!-- <div class=""> -->
        <div class="Form-Item">
          <p class="Form-Item-Label">LINEID</p>
          <input type="text" id="form-lineId" class="Form-Item-Input" :value="liffUser.userId" disabled>
        </div>
        <div class="Form-Item">
          <p class="Form-Item-Label">表示名</p>
          <input type="text" id="form-displayName" class="Form-Item-Input" :value="liffUser.displayName" disabled>
        </div>
        <div class="Form-Item">
          <p class="Form-Item-Label">使用OS</p>
          <input type="text" id="form-useOS" class="Form-Item-Input" :value="liffUser.os" disabled>
        </div>
        <div class="Form-Item">
          <p class="Form-Item-Label">使用言語</p>
          <input type="text" id="form-language" class="Form-Item-Input" :value="liffUser.language" disabled>
        </div>
        <div class="Form-Item">
          <p class="Form-Item-Label">LINEバージョン</p>
          <input type="text" id="form-LineVersion" class="Form-Item-Input" :value="liffUser.lineVersion" disabled>
        </div>
        <div class="Form-Item">
          <p class="Form-Item-Label">認証モード</p>
          <input type="text" id="form-modeId" class="Form-Item-Input" value="" disabled>
        </div>
      </div>

      <div id="button-area" class="row my-0 mx-auto w-100 pb-3 px-2 mb-3">
        <div class="row col-12 w-100 m-0 p-0">
          <div class="col-6 p-0 pe-2"><button type="button" @click="btnAction($event, 'cancel')" class="btn btn-secondary w-100 btn-action">キャンセル</button></div>
          <div class="col-6 p-0 ps-2"><button type="button" @click="btnAction($event, 'send')" class="btn btn-primary px-1 w-100 btn-action">送信先を選択</button></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const init_url = 'https://liff.line.me/';

export default {
  layout: 'mypage',
  data() {
    return {
      url: '',
      config: {},
      intro_msg: [],
      liffUser: {}
    }
  },
  mounted: async function() {
    this.config = await getCryptoJSdefconf('tc-digital-town');
    console.log(this.$dayjs);
    // テスト用
    const user = await this.$liff();
    this.liffUser = user['profile'];

    // 本場尿
    // this.liffUser = await getLiffInfo(this.config['line']['liff']['lf09']);

    // リッチメニューの選択ログを残す
    await sendRichMenuLog(this.config['mysql']['auth']['name'], this.liffUser['userId'], 'intro');

    const user_infon = await this.getTableInfo('dt1_user_info');

    console.log(init_url);
    console.log(this.config['line']['liff']['lf00']);
    this.url = `${init_url}${this.config['line']['liff']['lf00']}?rec_id=${user_infon.rec_id}`;
  },
  methods: {  
    btnAction(e, act) {
      let thisEl = e.target.parentElement;
      switch (act) {
        case 'cancel':
        case 'close':
          liff.closeWindow();
          break;
        case 'send':
          _sendFunc(this.intro_msg, this.url);
          break;
        default:
          break;
      }
    },
    async getTableInfo(table) {
      const getData = new FormData();
      getData.append('db',      JSON.stringify({ name: this.config['mysql']['auth']['name'] }));
      getData.append('action',  'get');
      getData.append('table',   table);
      // console.log(this.liffUser.userId);
      getData.append('query',   `line_user_id= '${this.liffUser.userId}'`);
      const result = await fetch(this.config['mysql']['url'], {
        method: 'POST',
        body: getData
      }).then(response => {
        return response.json();
      }).then(resp => {
        console.log(resp);
        return resp;
      }).catch(err => {
        console.log(err);
      });

      if (result.length) return result[0];
    }
  }
}

async function _sendFunc(msg, url) {
  console.log(msg);
  console.log(url);
  const line_msg = encodeURI(msg.join("\n") + '\n' + url);
  window.open(`https://line.me/R/msg/text/?${line_msg}`);
  return;
}
</script>