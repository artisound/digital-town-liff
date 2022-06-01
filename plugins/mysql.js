export default (context, inject) => {

  /**
   * @param {Object} params - 各種パラメータ
   */
  const mySql = async (params = {}) => {

    params.init = {
      host: context.$config.DB_HOST,
      name: context.$config.DB_NAME,
      user: context.$config.DB_USER,
      pass: context.$config.DB_PASS,
    };


    return await context.$axios.post(context.$config.MYSQL_API_URL, params).then(resp => {
      return resp.data;
    }).catch((err) => {
      console.error(err.code, err.message);
    });
  }

  inject('tcMySQL', mySql);
  context.$tcMySQL = mySql;
}