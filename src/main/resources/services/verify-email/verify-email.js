var libs = {
  portal: require('/lib/xp/portal'),
  util: require('/lib/util'),
  rest: require('/lib/rest')
};

// NOTE: This service can be accessed like this 
// http://<host>:<port>/_/service/com.intervest.wapp.web/verify-email
exports.get = function(req) {
      libs.util.log('verify-email [get]');
      libs.util.log(req);

      // set the request params
      // Example parameters
      // userReference=eU8tYUHTj4dDC8XIb5pHSg%3D%3D&code=6Vckz4pmQ8NJRzuTgNoQDc4qVQS1xSPj4HhRvWVBiWI%3D
      var params = {
          userReference: encodeURI(req.params.userReference).replace('+', '%2B'),
          code: encodeURI(req.params.code).replace('+', '%2B'),
          baseUrl: app.config.cms_server
      };

      const response = libs.rest.request('/user/verify-email', 'GET',  params);
      const res = JSON.parse(response.body);
      libs.util.log(res);

      var url = libs.portal.pageUrl({
          path: '/travel-insurance/wapp-web/register-step-3',
          type: 'absolute',
          params: {
              status: res.status,
              message: res.message
          }
  });

  return {
      redirect: url
  }

};