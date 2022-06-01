<template>
  <div>
    <!-- ようこそ画面 -->
    <div
      v-if="displayMode == 0"
      id="welcomeView"
      class="form-fields px-2 text-center"
    >
      <h2 class="mt-5 mx-4 display-7 text-outlined">
        ようこそ<br />デジタル町一丁目<br />[ とさジョブ ]
      </h2>
      <div
        style="
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          transform: translate(-50%, -50%);
        "
      >
        <button
          :disabled="btnStart"
          class="btn btn-outline-primary btn-lg bg-white"
          @click="btnAction($event, 'start')"
        >
          はじめる
        </button>
      </div>
    </div>

    <!-- 入力画面 -->
    <div v-if="displayMode == 1" id="" class="form-fields px-2 overflow-hidden">
      <div class="text-center mb-3 py-2">
        <span class="d-block py-2 text-primary liff-top-icon">
          <!-- Bootstrap Icon -->
          <i class="bi bi-info-circle-fill"></i>
        </span>
        <span class="h2 fw-bold" style="text-align: center">新規登録</span>
      </div>

      <div class="form-field mb-3 pb-3 border-bottom">
        <label for="zip_code" class="d-block m-0 py-2 form-label"
          ><span class="field-required badge bg-danger me-2">必須</span
          >郵便番号</label
        >
        <input
          type="tel"
          id="zip_code"
          maxlength="8"
          :class="'form-control field-input '"
          v-model="$v.inputData.$model.zip_code"
          @input="addHyphenToZipcode($event.target.value)"
          @change="$v.inputData.zip_code.$touch()"
          name="zip_code"
          placeholder="例）781-8007"
        />
        <div
          v-if="$v.inputData.zip_code.$error"
          class="invalid-feedback is-invalid d-block"
        >
          郵便番号を入力してください
        </div>
      </div>

      <div class="form-field mb-3 pb-3 border-bottom">
        <label class="d-block m-0 py-2 form-label"
          ><span class="field-required badge bg-danger me-2">必須</span
          >性別</label
        >
        <div class="btn-group w-100 field-input">
          <input
            type="radio"
            class="btn-check"
            name="gender"
            id="gender-2"
            value="男性"
            v-model="inputData.gender"
            autocomplete="off"
          />
          <label class="btn btn-outline-primary" for="gender-2">男性</label>
          <input
            type="radio"
            class="btn-check"
            name="gender"
            id="gender-3"
            value="女性"
            v-model="inputData.gender"
            autocomplete="off"
          />
          <label class="btn btn-outline-primary" for="gender-3">女性</label>
        </div>
      </div>

      <div class="form-field mb-3 pb-3 border-bottom">
        <label class="d-block m-0 py-2 form-label"
          ><span class="field-required badge bg-danger me-2">必須</span
          >生年月日</label
        >
        <div class="input-group mb-1 field-input">
          <select
            class="form-select"
            style="background-color: "
            v-model="$v.inputData.$model.birth_year"
            @change="
              createBirthday($event.target);
              $v.inputData.birth_year.$touch();
            "
            name="birth_year"
          >
            <option value="" selected>- 年 -</option>
            <option v-for="yyyy in 120" :value="mY - yyyy + 1">
              {{ mY - yyyy + 1 }}年
            </option>
          </select>
          <select
            class="form-select"
            style="background-color: "
            v-model="$v.inputData.$model.birth_month"
            @change="
              createBirthday($event.target);
              $v.inputData.birth_month.$touch();
            "
            name="birth_month"
          >
            <option value="" selected>- 月 -</option>
            <option v-for="m in 12" :key="m" :value="m">{{ m }}月</option>
          </select>
          <select
            class="form-select"
            style="background-color: "
            v-model="$v.inputData.$model.birth_date"
            @change="
              createBirthday($event.target);
              $v.inputData.birth_date.$touch();
            "
            name="birth_date"
          >
            <option value="" selected>- 日 -</option>
            <option v-for="d in maxDay" :key="d" :value="d">{{ d }}日</option>
          </select>
        </div>
        <div
          v-if="
            $v.inputData.birth_year.$error ||
            $v.inputData.birth_month.$error ||
            $v.inputData.birth_date.$error
          "
          class="invalid-feedback is-invalid d-block"
        >
          生年月日を正しく入力してください。
        </div>
      </div>
    </div>

    <!-- 確認画面 -->
    <div v-if="displayMode == 2" id="" class="form-fields px-2">
      <p class="lbl-small" style="text-align: center; margin: 12px">
        ※下記の情報で登録します。<br />よろしければ「登録」ボタンを押してください。
      </p>

      <div class="form-field mb-3 pb-3 border-bottom">
        <label class="d-block m-0 py-2 form-label">郵便番号</label>
        <p
          class="form-control field-confirm text-wrap"
          style="background: #eee"
        >
          {{ inputData.zip_code }}
        </p>
      </div>
      <div class="form-field mb-3 pb-3 border-bottom">
        <label class="d-block m-0 py-2 form-label">性別</label>
        <p
          class="form-control field-confirm text-wrap"
          style="background: #eee"
        >
          {{ inputData.gender }}
        </p>
      </div>
      <div class="form-field mb-3 pb-3 border-bottom">
        <label class="d-block m-0 py-2 form-label">生年月日</label>
        <p
          class="form-control field-confirm text-wrap"
          style="background: #eee"
        >
          {{ birthday }}
        </p>
      </div>
    </div>

    <div
      v-if="displayMode > 0"
      id="button-area"
      class="row my-0 mx-auto w-100 px-2 mb-5"
    >
      <div v-if="displayMode == 1" class="row col-12 w-100 m-0 p-0">
        <div class="col-6 p-0 pe-2">
          <button
            type="button"
            @click="btnAction($event, 'cancel')"
            class="btn btn-secondary w-100 btn-action"
          >
            キャンセル
          </button>
        </div>
        <div class="col-6 p-0 ps-2">
          <button
            type="button"
            @click="btnAction($event, 'confirm')"
            class="btn btn-primary w-100 btn-action"
          >
            確認
          </button>
        </div>
      </div>
      <div v-else-if="displayMode == 2" class="row col-12 w-100 m-0 p-0">
        <div class="col-6 p-0 pe-2">
          <button
            type="button"
            @click="btnAction($event, 'back')"
            class="btn btn-secondary w-100 btn-action"
          >
            戻る
          </button>
        </div>
        <div class="col-6 p-0 ps-2">
          <button
            type="button"
            @click="btnAction($event, 'send')"
            class="btn btn-primary w-100 btn-action"
          >
            登録
          </button>
        </div>
      </div>
      <div v-else-if="displayMode == 0"></div>
      <div v-else class="row col-12 w-100 m-0 p-0">
        <button
          type="button"
          @click="btnAction($event, 'close')"
          class="btn btn-primary w-100 btn-action"
        >
          閉じる
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  required,
  minLength,
  minValue,
} from "vuelidate/lib/validators";
// import { validateEmail, validatePassword } from "~/utils/validations";
export default {
  name: "InitIndex",
  props: {
    liffInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  validations: {
    inputData: {
      zip_code: {
        required, // 必須
        minLength: minLength(8), // 8文字未満でエラー
      },
      birth_year: {
        required, // 必須
        minValue: minValue(1900), // 1900未満でエラー
      },
      birth_month: {
        required, // 必須
        minValue: minValue(1), // 1未満でエラー
      },
      birth_date: {
        required, // 必須
        minValue: minValue(1), // 1未満でエラー
      },
    },
  },
  data() {
    return {
      mY      : '2022', // 現在の西暦。誕生年を選択するときに使用している。

      displayMode: 0, // htmlの画面切り替えフラグ
                      // 0: ようこそ画面
                      // 1: 入力画面
                      // 2: 確認画面

      // =======================================================
      // 入力フィールド
      // =======================================================
      inputData: {
        // 入力データ ----------------------------------------
        zip_code   : "",      // 郵便番号
        gender     : "男性",  // 性別
        birth_year : "",      // 誕生年
        birth_month: "",      // 誕生月
        birth_date : "",      // 誕生日

        // クエリパラメータ ----------------------------
        inflow_qr_code: "", // QRコード_URLレコード番号

        // 旧区分
        // inflow_route: '',   // 流入経路
        // inflow_media: '',   // 登録区分

        // LIFF情報 ------------------------------------
        child_info_json   : "[]",   // _子育て_お子様情報テーブル
        family_info_json  : "[]",   // _家族情報テーブル
        certification_date: this.$dayjs().format('YYYY-MM-DD'), // 初回認証日
        line_user_id      : "",     // LINEユーザーID
        os                : "",     // OS
        language          : "",     // 使用言語
        line_version      : "",     // 使用端末

        // MySQL情報 -----------------------------------
        sync: 0, // 同期フラグ
      },

      // =======================================================
      // 一時表示
      // =======================================================
      birthday: "",     // 確認画面で表示する誕生日。入力された誕生年月日によって作られる。yyyy年MM月dd日
      database: {},     // MySQL、kintoneユーザーデータ

      btnStart: false,
      loading : true, // スピナー表示フラグ
                      // true: 表示
                      // false: 非表示

      // 住民情報登録処理
      // true: ユーザー登録画面へ
      // false: 友だち登録へ(default)
      regist: this.$route.query.regist == 1 ? true : false,

      kintoneRecId: null,

      maxDay: 31,
    };
  },
  watch: {
    'liffInfo': function(aft, bef) {
      console.log(bef)
      console.log(aft)
    },
    'inputData.birth_year': function(aft, bef){
      const data = this.inputData
      if(!data.birth_year) return
      // 年月から最大日数を出力
      this.maxDay = outputMaxDayByYm(data.birth_year, data.birth_month);
      if(data.birth_date && data.birth_date > this.maxDay) data.birth_date = this.maxDay;
    },
    'inputData.birth_month': function(aft, bef){
      const data = this.inputData
      if(!data.birth_year) return
      // 年月から最大日数を出力
      this.maxDay = outputMaxDayByYm(data.birth_year, data.birth_month);
      if(data.birth_date && data.birth_date > this.maxDay) data.birth_date = this.maxDay;
    }
  },
  mounted: async function () {
    console.group('mounted')
    const $route    = this.$route
    const liffProf  = this.liffInfo  // LIFF から取得したLINEユーザー情報
    const data      = this.inputData

    console.log(liffProf)

    // アクセスした人がDBに登録されているかどうかを取得する
    const getUserData = await this.$tcMySQL({
      table: 'dt1_user_info',
      action: 'getRecords',
      options: {
        query: {
          line_user_id: { operator: '=', value: liffProf.userId }
        }
      }
    });
    console.log('登録済みユーザー:', getUserData);
    return;

    // 「初回登録パラメータ保持時
    if ($route.query.regist && $route.query.regist == 1) this.regist = true;

    // ユーザー登録済み or 「はじめる」押下後画面クローズ、再実行時
    if (getUserData){
      // MySQLユーザーデータから「友だち状態」を判定
      if(getUserData.follow_type){
        // 値がある場合、
        if(getUserData.follow_type === '友だち'){
          // 友だち登録済みならトークルームへ
          location.href = config.line.add_friend;
        } else {
          // 新規登録フラグ: false
          // kintoneレコード番号を格納
          this.regist       = false;
          this.kintoneRecId = getUserData.rec_id;
        }
      } else {
        // 空の場合、
        // 新規登録フラグ: true
        // kintoneレコード番号を格納
        this.regist       = true;
        this.kintoneRecId = getUserData.rec_id;
      }
    }



    /** *********************************************************
     * "rec_id"パラメータを持つ場合
     * 紹介元のユーザー情報を取得
     ********************************************************* */
    if($route.query.rec_id) {
      const rec_id = Number($route.query.rec_id);
      const introUserInfo = await getUserIdFromMySQL(config.mysql.auth, null, rec_id);
      this.$set(data, 'intro_rec_id',     rec_id)
      this.$set(data, 'intro_user_name',  introUserInfo.line_user_name)
      this.$set(data, 'intro_class',      data.intro_rec_id ? '友だち' : '')
    }

    /** *********************************************************
     * 2022/05/26 追加 by K.N.
     * **********************************************************
     * "corp_id"パラメータを持つ場合
     * 紹介元の事業所情報を取得
     ********************************************************* */
    if($route.query.corp_id) {
      const corp_id = Number($route.query.corp_id);
      this.$set(data, 'intro_corp_id', corp_id)
    }

    /** *********************************************************
     * "code"パラメータを持つ場合
     * QRレコード_URLレコード番号を取得
     ********************************************************* */
    const mediaParam    = Number($route.query.media);
    const modeParam     = Number($route.query.mode);
    const codeParam     = Number($route.query.code);

    // [登録区分] == "ポスター" and [流入経路] == "ジョブコンシェル"
    if (mediaParam == 3 && modeParam == 1) {
      this.$set(data, 'inflow_qr_code', 2)
    // [登録区分] == "パンフレット" and [流入経路] == "健康対策課"
    } else if (mediaParam == 4 && modeParam == 3) {
      this.$set(data, 'inflow_qr_code', 4)
    } else if (codeParam) {
      this.$set(data, 'inflow_qr_code', codeParam)
    }

    if (codeParam == 1) this.regist = true;


    /** *********************************************************
     * Vue data()に格納
     * ******************************************************* */
    this.$set(data, 'os',             liffProf.os)
    this.$set(data, 'language',       liffProf.language)
    this.$set(data, 'line_user_id',   liffProf.userId)
    this.$set(data, 'line_user_name', liffProf.displayName)
    this.$set(data, 'line_version',   liffProf.lineVersion)

    console.log('初期値：', this.inputData)

    this.btnStart = false;
    this.loading  = false;
    console.groupEnd('mounted')
  },
  methods: {

    /** ******************************************************************************************************************
     * アクセスした人がDBに既に登録されているか判定する
     * @param {object} mysqlAuthObj - MySQLログイン情報
     * @param {string} lineUserId - LINEユーザーID
     * @return {Boolean}
     ****************************************************************************************************************** */
    async getUserIdFromMySQL(mysqlAuthObj, lineUserId = null, rec_id = null) {
      const params = {
        db    : { name: mysqlAuthObj.name },
        table : 'dt1_user_info',
        action: 'get',
      }
      if(lineUserId) params.query = `line_user_id ='${lineUserId}'`;
      if(rec_id)     params.query = `rec_id ='${rec_id}'`;

      // MySQL取得
      const recs = await _connectMySQLaxios(params).then(resp => {
        console.log(resp);
        if (resp.length > 0) return resp;
      }).catch(err  => {
        console.error(err)
        return;
      })

      if(recs && recs.length) return recs[0];
    },


    /** ******************************************************************************************************************
     * 送信処理を実行
     * @param {object} config - 各設定値
     * @param {object} inputData - 入力されたデータのオブジェクト
     * @param {number} kintoneRecId - 更新先kintoneレコード番号
     ****************************************************************************************************************** */
    async _sendFunc(config, inputData, kintoneRecId = null) {
      if(inputData.follow_type != '友だち') inputData.follow_type = '未登録';
      inputData.certification_date = lxnYmd;

      // 郵便番号が入力されていれば、住所取得
      if(inputData.zip_code){
        // ----------------------------------------------------------------
        // 【BingMaps】郵便番号から都道府県名、市区町村名取得・格納
        // ----------------------------------------------------------------
        let addressByZipcode = await getAddressByZipcodeFromBmap(inputData.zip_code, config['api_key']['b_map']).then(resp => {
          if (resp) {
            inputData.address01 = resp.address.adminDistrict;   // 都道府県名
            inputData.address02 = resp.address.locality;        // 市名
          }
          return resp;
        });

        // ----------------------------------------------------------------
        // 【GoogleGeocoding】郵便番号から都道府県名、市区町村名取得・格納
        // ----------------------------------------------------------------
        // BingMapsで取得できていなければ、GoogleGeocodingを使用する
        if (!addressByZipcode) {
          await getAddressByZipcodeFromGmap(inputData.zip_code, config['api_key']['g_map']).then(resp => {
            if (resp) {
              inputData.address01 = resp[3].long_name; // 都道府県名
              inputData.address02 = resp[2].long_name; // 市名
            }
          });
        }
      }

      // 生年月日データが入力されていれば算出
      if(inputData.birth_year && inputData.birth_month && inputData.birth_date){
        // ----------------------------------------------------------------
        // 年齢にかかわるデータの算出
        // - 年代、生まれてからの年月日
        // ----------------------------------------------------------------
        let birth_year      = inputData.birth_year
        let birth_month     = inputData.birth_month
        let birth_date      = inputData.birth_date

        let jsDate          = new Date();
        // 今日の日付と入力された生年月日の差分を取得する
        let jsBirth         = new Date(birth_year, birth_month - 1, birth_date);

        // 年代
        inputData.period    = getAgeAndRoundage({ year: birth_year, month: birth_month, date: birth_date })['roundAge'];
        // 年齢（年）
        inputData.age_year  = getAgeAndRoundage({ year: birth_year, month: birth_month, date: birth_date })['age'];
        // 年齢（月）
        inputData.age_month = dateDiff(jsBirth, jsDate, 'YM', false);
        // 年齢（日）
        inputData.age_day   = dateDiff(jsBirth, jsDate, 'MD', false);
        // 日齢
        inputData.days      = Math.floor((jsDate.getTime() - jsBirth.getTime()) / (1000 * 60 * 60 * 24));
      }




      // ----------------------------------------------------------------
      // kintone登録用オブジェクト生成
      // ----------------------------------------------------------------
      console.log(inputData);
      let registerRoute = '';
      // 紹介された場合
      if (inputData.intro_rec_id) {
        registerRoute = '紹介';
      }
      // QRコードから登録した場合
      else if (inputData.inflow_qr_code) {
        registerRoute = 'QRコード';
      }

      let dataObjForkintone = {
        郵便番号:                 { value: inputData.zip_code },
        都道府県名:               { value: inputData.address01 },
        市名:                     { value: inputData.address02 },
        // 登録区分:                 { value: inputData.inflow_media },
        誕生年:                   { value: inputData.birth_year },
        誕生月:                   { value: inputData.birth_month },
        誕生日:                   { value: inputData.birth_date },
        年齢_年_:                 { value: inputData.age_year },
        年齢_月_:                 { value: inputData.age_month },
        年齢_日_:                 { value: inputData.age_day },
        日齢:                     { value: inputData.days },
        年代:                     { value: inputData.period },
        性別:                     { value: inputData.gender },
        LINEユーザーID:           { value: inputData.line_user_id },
        表示名:                   { value: inputData.line_user_name },
        QRコード_URLレコード番号: { value: inputData.inflow_qr_code },
        // 流入経路:                 { value: inputData.inflow_route },
        初回認証日:               { value: inputData.certification_date },
        OS:                       { value: inputData.os },
        使用言語:                 { value: inputData.language },
        使用LINEバージョン:       { value: inputData.line_version },
        友達状態:                 { value: inputData.follow_type },
        初回認証日:               { value: inputData.certification_date },
        紹介元レコード番号:       { value: inputData.intro_rec_id },
        紹介元表示名:             { value: inputData.intro_user_name },
        紹介元区分:               { value: inputData.intro_class },
        紹介元事業所レコード番号: { value: inputData.intro_corp_id || '' },       // 2022/05/26 追加 by K.N.
        登録きっかけ:             { value: registerRoute },
      };

      // ----------------------------------------------------------------
      // kintoneのレコードを更新成功フラグ
      // true: 成功
      // false: 失敗
      // ----------------------------------------------------------------
      let getKintoneData, sendKintoneData;
      let dataObjForMySQL = [];
      if (dataObjForkintone) {
        // kintone APIを実行するクラス
        const kintoneApi = new tcKintoneApi({
          url:    config['kintone']['url'],
          domain: config['path']['project']
        });

        // kintoneレコード番号がある場合（登録画面）
        if(kintoneRecId){
          // kintoneのレコードを更新
          sendKintoneData = await kintoneApi.putRecord({
            appId:  config['kintone']['app']['users'],
            recId:  kintoneRecId,
            record: dataObjForkintone
          }).then(function (result) {
              return result;
          }).catch(err => {
              console.log(err);
          });
          dataObjForMySQL.push({name: "rec_id", value: kintoneRecId});
        } else {
          // kintoneのレコードを登録
          sendKintoneData = await kintoneApi.postRecord({
            appId: config['kintone']['app']['users'],
            record: dataObjForkintone
          }).then(function (result) {
            return result;
          }).catch(err => {
            console.log(err);
          });
          dataObjForMySQL.push({name: "rec_id", value: sendKintoneData['id']});
        }
      }

      // ----------------------------------------------------------------
      // MySQL登録用オブジェクト生成
      // ----------------------------------------------------------------
      // inputDataの値からMySQLに保存す配列を作成する
      for (const key in inputData) {
        if (key == 'zip_code') {
          dataObjForMySQL.push({
            name: key,
            value: cryptoJSencdec(inputData[key], config.pp, 'enc')
          });
        } else {
          dataObjForMySQL.push({
            name: key,
            value: inputData[key]
          });
        }
      }

      console.log(dataObjForMySQL);

      // ----------------------------------------------------------------
      // 登録更新するカラム名を抽出
      // ----------------------------------------------------------------
      // 登録更新するカラム名を抽出対象のカラム名の配列
      let scopesArr = [];
      dataObjForMySQL.forEach(function (el) {
        // LINEユーザーID以外を追加する
        if (el['name'] !== 'line_user_id') {
          scopesArr.push(el['name']);
        }
      });

      // ----------------------------------------------------------------
      // レコード1件登録または更新(MySQL)
      // ----------------------------------------------------------------
      let sendMysqlData;
      if (dataObjForMySQL) {
        // MySQLの認証情報を取得
        const sqlConfig = config['mysql']['auth'];

        // MySQLのレコードを登録更新
        sendMysqlData = await _connectMySQLaxios({
          db: { name: sqlConfig['name'] },
          action   : 'upsert',
          table    : 'dt1_user_info',
          dataArr  : dataObjForMySQL,
          scopesArr: scopesArr,
        }).then(resp => {
            return resp;
        }).catch(err => {
            console.log(err);
        });
      }

      return {
        kintone: sendKintoneData,
        sql: sendMysqlData
      };
    }
  },
};
</script>
