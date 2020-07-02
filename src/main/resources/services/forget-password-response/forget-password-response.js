var libs = {
  portal: require('/lib/xp/portal'),
  util: require('/lib/util'),
  rest: require('/lib/rest'),
  session : require('/lib/session'),

};

// NOTE: This service can be accessed like this
// http://<host>:<port>/_/service/com.intervest.wapp.web/forgot-password-response
exports.get = function(req) {

libs.util.log("!!!!!!!!!!!!!@@@@@@@@###$$$$$$$$$$$$$$$$$$$%%%%%%%%%%%%%%^^^^^^^^&&&&&&&&&&*********((((((((");
libs.util.log(req);
  libs.util.log(req.params.secret2);
  libs.util.log(req.params.secret1);

 libs.session.setAttribute("secret1", req.params.secret1);
 libs.session.setAttribute("secret2", req.params.secret2);

  var url  = libs.portal.pageUrl({
          path: '/travel-insurance/wapp-web/forgot-password-2',
          params: {  }
      });
    return {
      redirect: url
  }

};