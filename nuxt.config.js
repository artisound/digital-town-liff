import path from 'path'
import fs from 'fs'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: true,
  head: {
    titleTemplate: 'デジ町 | %s',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@500&display=swap' },
      { rel: 'stylesheet', href: '//cdn.jsdelivr.net/npm/bootswatch@5.1.3/dist/zephyr/bootstrap.min.css' },
      { rel: 'stylesheet', href: '//cdn.jsdelivr.net/npm/bootstrap-icons@1.8.2/font/bootstrap-icons.min.css' },
    ],
    script: [
      { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js' },
      { src: 'https://static.line-scdn.net/liff/edge/2/sdk.js', charset: 'utf-8'},
      { src: "https://cdn.jsdelivr.net/npm/crypto-js@4.x/crypto-js.min.js" },
      { src: "https://cdn.jsdelivr.net/npm/axios@0.x/dist/axios.min.js" },
      { src: 'https://timeconcier.jp/forline/tc-digital-town/_src/js/functions.js'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/vuelidate',
    '@/plugins/pageTitle',  // use "$pageTitle"
    '@/plugins/dayjs',      // use "$dayjs"
    '@/plugins/liff',        // use "$liff" Promise
    '@/plugins/mysql'       // use "$tcMySQL" Promise
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  publicRuntimeConfig: {
    liffId: process.env.NODE_ENV == 'development' ? '1655895861-0nxQr85M' : '1655895861-DZnXJ76Y',
    baseURL: process.env.NODE_ENV == 'development' ? 'https://localhost:3000' : 'https://liff.digital-town.jp',

    // kintone
    KINTONE_API_URL: 'https://kintone-rest-api-for-tc-dot-apps-for-tc.dt.r.appspot.com/api',
    TC_CY_DOMAIN  : 'cybozu.com',
    TC_CY_SUBDOM  : 'digital-town',
    TC_CY_USERNAME: 'Administrator',
    TC_CY_PASSWORD: 'acdcity0746a',

    // LINE
    ADD_FRIEND          : 'https://lin.ee/eiWbVtz',
    CHANNEL_SECRET      : '8b5f962c42c64bdca2872863877cd74f',
    CHANNEL_ACCESS_TOKEN: '2tU8I3VaO2Z7rrCzK5HdLRxFafhi65un6RLcpZOaYOkcCV1NJo5HDI6sA8NORyFLr8qDJS1rBAL+AkFfaFC/nKu9uky6qBBgYguFlA8hojKyuMPm0wWEPIVYPDgKeDbQW5ywHD6e4A0UejTwNc194AdB04t89/1O/w1cDnyilFU=',
    RICHMENU_01_NORMAL  : 'richmenu-bd05f9a14432a05b3608033307735e5c',  // メニュー01(通常)(お知らせ無し)
    RICHMENU_01_NORMAL_L: 'richmenu-6824f8b639408e4dc82de8b1ed0a9ee5',  // メニュー01(通常)(お知らせ有り)

    // MySQL
    MYSQL_API_URL: 'https://timeconcier.jp/forline/tccom/v2/tcLibMySQL/',
    DB_HOST: 'mysql8022.xserver.jp',
    DB_NAME: 'tc2_digitown',
    DB_USER: 'tc2_jobcon',
    DB_PASS: 'u6yvf43w',

    // 外部API
    GMAP_API_KEY: 'AIzaSyBChf0zPlcih_TnU9xA502jVqVCJ072mCQ',
    BMAP_API_KEY: 'ArurXeKTR7HWn6a9VtYiPeRkJibOj4PRhHzfyJe7ZYXsaWM0GIvPbnJTf90fTDZN',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  server: {
    port: 3000,
    host: "localhost",
    https: process.env.NODE_ENV != 'development' ? {} : {
      key: fs.readFileSync(path.resolve(__dirname, "localhost-key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "localhost.pem"))
    },
  }
}
