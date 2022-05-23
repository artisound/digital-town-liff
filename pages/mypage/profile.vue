<template>
  <div class="px-2 py-2">
    <!-- タブ -->
    <div class="d-flex">
      <div
        v-for="t in tabs"
        :key="t.key"
        @click="tab = t.key;"
        class="col py-3 border text-center"
        :style="t.key == tab ? '--bs-bg-opacity: .7; background-color: rgba(var(--bs-primary-rgb),var(--bs-bg-opacity)); color: white;' : ''"
      >{{ t.label }}</div>
    </div>

    <!-- 簡易情報 -->
    <div v-if="tab == 'basic'" class="form-fields">
      <basic :mY="mY"></basic>      
    </div>




    <!-- 詳細情報 -->
    <div class="" v-else-if="tab === 'detail'">
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



    <!-- 家族情報 -->
    <div class="" v-else-if="tab === 'family'">
      <div id="" class="card form-fields mx-2 mb-3">
        <div class="card-body p-0">
          <div
            v-for="(family, i) in family_info_json"
            :key="'family' + i"
            class="familyInfo border-bottom px-2"
          >

            <div class="form-field pb-2 d-flex flex-column gap-2">
              <!-- ボタン -->
              <div class="d-flex justify-content-between m-0 py-2">
                <!-- 並び替え -->
                <div class="input-group">
                  <!-- 下へ -->
                  <span
                    v-if="i == 0"
                    class="badge btn btn-secondary d-table-cell disabled"
                    style="background-color:#eee;"
                  ><i class="align-middle bi bi-caret-up-fill"></i></span>
                  <span
                    v-else
                    class="badge btn btn-secondary d-table-cell bg-white"
                    @click="familyJsonReplace('up', i)"
                  ><i class="align-middle bi bi-caret-up-fill"></i></span>

                  <!-- 上へ -->
                  <span
                    v-if="(i + 1) === family_info_json.length"
                    class="badge btn btn-secondary d-table-cell disabled"
                    style="background-color:#eee;"
                  ><i class="align-middle bi bi-caret-down-fill"></i></span>
                  <span
                    v-else
                    class="badge btn btn-secondary d-table-cell bg-white"
                    @click="familyJsonReplace('down', i)"
                  ><i class="align-middle bi bi-caret-down-fill"></i></span>
                </div>

                <!-- 削除 -->
                <span
                  @click="deleteFamily(i)"
                  class="badge btn btn-danger p-1"
                ><i class="bi bi-x fw-bold" style="font-size:20px;"></i></span>
              </div>

              <!-- 家族情報 - 性別 -->
              <div class="btn-group w-100 field-input" style="width:60%">
                <!-- 男性 -->
                <input
                  type="radio"
                  class="btn-check"
                  :id="'family_'+i+'-gender-2'"
                  :name="'family_'+i+'-gender'"
                  value="男性"
                  v-model="family.value._家族情報_性別.value"
                >
                <label
                  class="btn btn-outline-primary btn-sm"
                  :for="'family_'+i+'-gender-2'"
                ><small>男性</small></label>

                <!-- 女性 -->
                <input
                  type="radio"
                  class="btn-check"
                  :id="'family_'+i+'-gender-3'"
                  :name="'family_'+i+'-gender'"
                  value="女性"
                  v-model="family.value._家族情報_性別.value"
                >
                <label
                  class="btn btn-outline-primary btn-sm"
                  :for="'family_'+i+'-gender-3'"
                ><small>女性</small></label>
              </div>

              <!-- 家族情報 - 続柄 -->
              <div style="width:40%">
                <select class="form-select" v-model="family.value._家族情報_続柄.value">
                  <option value="" selected>---</option>
                  <option
                    v-for="(rel, index) in relationship.child[family.value._家族情報_性別.value]"
                    :key="'gender' + index"
                    :value="rel"
                  >{{rel}}</option>
                </select>
              </div>

              <!-- 家族情報 - 生年月日 -->
              <div class="d-flex align-items-end">
                <div class="input-group mb-1 field-input">
                  <select
                    class="form-select"
                    @change="convertBirthday('y', $event.target.value, i)"
                    :value="dateFromMysqlYmd(family.value._家族情報_生年月日.value, 'y')"
                    :name="'family_' + i + '-birth_year'"
                    style="width:40%;"
                  >
                    <option value="" selected>---</option>
                    <option
                      v-for="yyyy in 100"
                      :key="yyyy"
                      :value="mY - yyyy + 2"
                    >{{mY - yyyy + 2}}年</option>
                  </select>
                  <select
                    class="form-select"
                    @change="convertBirthday('m', $event.target.value, i)"
                    :value="dateFromMysqlYmd(family.value._家族情報_生年月日.value, 'm')"
                    :name="'family_' + i + '-birth_month'"
                    style="width:30%;"
                  >
                    <option value="" selected>---</option>
                    <option v-for="m of 12" :key="m" :value="m">{{m}}月</option>
                  </select>
                  <select
                    class="form-select"
                    @change="convertBirthday('d', $event.target.value, i)"
                    :value="dateFromMysqlYmd(family.value._家族情報_生年月日.value, 'd')"
                    :name="'family_' + i + '-birth_date'"
                    style="width:30%;"
                  >
                    <option value="" selected>---</option>
                    <option
                      v-for="d of outputMaxDayByYm(family.value._家族情報_生年月日.value.split('-')[0], family.value._家族情報_生年月日.value.split('-')[1])"
                      :key="d"
                      :value="d"
                    >{{d}}日</option>
                  </select>
                </div>
                <span class="ms-1 py-1">生</span>
              </div>
            </div>
          </div>

          <!-- 家族情報 - 追加ボタン -->
          <div class="py-3 d-flex justify-content-center">
            <button type="button" @click="btnAction('addFamily')" class="btn btn-warning btn-sm"><i class="bi bi-plus mr-2"></i>お子様の情報を追加</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 保存ボタン -->
    <div class="d-flex justify-content-center align-items-center">
      <button
        type="button"
        class="btn btn-primary"
        @click="onSave()"
      >保存</button>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'mypage',
  head() {
    return {
      title: this.title
    }
  },
  data() {
    return {
      title: 'プロフィール',
      tabs: [
        { label: '簡易情報', key: 'basic' },
        { label: '詳細情報', key: 'detail' },
        { label: '家族情報', key: 'family' },
      ],
      tab: 'basic',

      details: {
        name: '',
        address1: '',
        address2: '',
        tel: '',
      },

      mY: 0,
      family_info_json: [],     // 【Myページ】情報
      relationship: {
        '男性': ['父', '祖父', '夫', '兄', '弟', '長男', '次男', '三男', '四男', '五男', '六男', '七男', '八男', '九男', '十男'],
        '女性': ['母', '祖母', '妻', '姉', '妹', '長女', '次女', '三女', '四女', '五女', '六女', '七女', '八女', '九女', '十女'],
        child: {
          '男性': ['長男', '次男', '三男', '四男', '五男', '六男', '七男', '八男', '九男', '十男'],
          '女性': ['長女', '次女', '三女', '四女', '五女', '六女', '七女', '八女', '九女', '十女'],
        }
      },
    }
  },
  created: function() {

  },
  mounted: async function() {
    const day = this.$dayjs(new Date());
    this.mY = Number(day.format('YYYY'));
  },
  methods: {
    async onSave() {
    },
    
    /** *****************************************************
     * ボタンクリック時の動作
     * @param {string} act - アクション名
     * @param {string} table - 登録するMySQLテーブル名（actが'send','undeliver'に使用）
     ***************************************************** */
    btnAction(act, table = null) {
      switch (act) {
        // 【共通】「キャンセル」「閉じる」ボタン
        case 'cancel':
        case 'close':
          liff.closeWindow();
          break;

        // 【共通】「確認」ボタン
        case 'confirm':
          break;

        // 【共通】「戻る」ボタン
        case 'back':
          this.$el.style.marginLeft = swipeSlidePage(this.pageNum--);
          break;

        // 【共通】「送信」「登録」「保存」ボタン
        case 'send':
          this._sendFunc(this, table);
          break;

        // 【受信設定】「解除」ボタン
        case 'undeliver':
          _undeliverFunc(this, table);
          break;

        // 【Myページ】「家族の情報を追加」ボタン
        case 'addFamily':
          const familyNum = this.family_info_json.length;
          this.family_info_json.push({
            value: {
              _家族情報_No      : { value: familyNum + 1 },
              _家族情報_続柄    : { value: '長男' },
              _家族情報_性別    : { value: '男性' },
              _家族情報_生年月日: { value: `0-0-0` }
            }
          });

          break;

        // noop
        default:
          break;
      }
    },
    /** *****************************************************
     * MySQL日付フォーマット"yyyy-mm-dd"から指定の年・月・日を出力
     * @param {string} ymd - 'yyyy-mm-dd'
     * @param {string}} str - 'y':年、'm'：月、'd'：日付
     * @return {number} - 'y':yyyy、'm'：m、'd'：d
     ***************************************************** */
    dateFromMysqlYmd(ymd, str) {
      let ret;
      let ymdArr = ymd.split('-');

      switch (str) {
        case 'y':
          ret = ymdArr[0];
          break;
        case 'm':
          ret = (ymdArr[1].startsWith('0')) ? ymdArr[1].replace('0', '') : ymdArr[1];
          break;
        case 'd':
          ret = (ymdArr[2].startsWith('0')) ? ymdArr[2].replace('0', '') : ymdArr[2];
          break;
      }

      return ret;
    },
    
    /** *****************************************************
     * 家族情報フィールド
     *  - 誕生日配列・ゼロ埋め変換
     * @param {string} ymd - 'y':年、'm'：月、'd'：日付
     * @param {*} data - 入力データ
     * @param {*} i - 第◯子
    ***************************************************** */
    convertBirthday(ymd, data, i) {
      let family = this.family_info_json[i];
      let familyBirthday = family.value['_家族情報_生年月日'].value;
      let familyBirthdayArr = familyBirthday.split('-');
      switch (ymd) {
        case 'y':
          familyBirthdayArr[0] = data;
          break;
        case 'm':
          familyBirthdayArr[1] = data;
          break;
        case 'd':
          familyBirthdayArr[2] = data;
          break;
      }

      // ------------------------
      // ゼロ埋め
      // ------------------------
      let zeroPaddArr = []
      familyBirthdayArr.forEach(el => {
        if (el.length < 2) el = '0' + el;
        zeroPaddArr.push(el);
      });
      let y_m_d = zeroPaddArr.join('-');

      // ------------------------
      // 家族情報データ上書き
      // ------------------------
      this.family_info_json[i].value._家族情報_生年月日.value = y_m_d;
    },
    /** *****************************************************
     * 家族情報JSON並び替え
     * @param {string} method - 'up' | 'down'
     * @param {number} i - index
     ***************************************************** */
    familyJsonReplace(method, i) {
      let familyJson = this.family_info_json;

      if(method == 'up') {
        familyJson.splice(i - 1 , 2, familyJson[i], familyJson[i - 1])
      } else {
        familyJson.splice(i , 2, familyJson[i + 1], familyJson[i])
      }

      for(i = 0; i < familyJson.length; i++){
        familyJson[i].value._家族情報_No.value = i + 1;
      }

      this.family_info_json = familyJson;
    },
    /** **************************************************************************
     * 指定した年月の最大日数を出力
     * @param {number} year - 年
     * @param {number} month - 月
     * @returns その年月の最大日数
     ************************************************************************** */
    outputMaxDayByYm(year, month) {
      year  = Number(year);
      month = Number(month);

      let longMonth = [1, 3, 5, 7, 8, 10, 12];
      let evenMonth = [2, 4, 6, 9, 11];
      if(longMonth.indexOf(month) > -1){
        return 31;
      }

      if(evenMonth.indexOf(month) > -1) {
        if(month == 2 && year % 4 == 0) {
          return 29;
        } else if (month == 2 && year % 4 != 0) {
          return 28;
        } else {
          return 30;
        }
      }
    }
  },
}
</script>