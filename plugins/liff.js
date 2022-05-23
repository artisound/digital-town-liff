export default (context, inject) => {

  /**
   * @param {Object} params - 各種パラメータ
   * @param {Object} params.liffId      - LIFF ID
   * @param {Object} params.redirectUri - ログイン後リダイレクトするURL
   */
  const liffInit = async (params = {}) => {

    return await liff.init({
      liffId: params.liffId || context.$config.liffId_top,
    }).then(async _ => {
      if (liff.isLoggedIn() ) {
        return {
          profile: await liff.getProfile(),
          idToken: liff.getIDToken(),
        }
      } else {
        if ( params.redirectUri ) {
          liff.login({ redirectUri: params.redirectUri })
        } else {
          liff.login();
        }
      }
    }).catch((err) => {
      console.error(err.code, err.message);
    });
  }
  
  inject('liff', liffInit);
  context.$liff = liffInit;
}