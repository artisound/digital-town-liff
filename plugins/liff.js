export default (context, inject) => {

  const liffInit = async (params = {}) => {

    return await liff.init({
      liffId: params.liffId || context.$config.liffId,
    }).then(_ => {
      if (liff.isLoggedIn() ) {
        return {
          profile: liff.getProfile(),
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