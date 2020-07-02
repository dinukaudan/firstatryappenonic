var libs = {
  portal: require('/lib/xp/portal'),
  util: require('/lib/util'),
  session : require('/lib/session'),
  rest: require('/lib/rest')
};

// NOTE: This service can be accessed like this 
// http://<host>:<port>/_/service/com.intervest.wapp.web/medical-screening-response
exports.get = function(req) {
  libs.util.log('medical-screening-response [get]');
  libs.util.log(req);
  let path = "/travel-insurance/wapp-web/health-check-completed";
  let status = 'error';
  let message = '';

  // TODO : check - ruchira
  // wapp health check criteria WAPPCLIENT-119,WAPPCLIENT-40
  if (req.params) {
      var params = {
            hashCode: req.params.hashCode,
            quoteReference: libs.session.getAttribute("quoteReference"),
            travellerReference: libs.session.getAttribute("travellerReference"),
            userReference: libs.session.getAttribute("userReference"),
            mainTreeVersion: libs.session.getAttribute("mainTreeVersion")
      }
      const response = libs.rest.request('/traveller/health/complete', 'POST',  params);
      const res = JSON.parse(response.body);
      status = res.status;
      if (status == 'success') {
          libs.session.setAttribute("mainTreeVersion", res.result.version.mainTreeVersion);
          path = '/travel-insurance/wapp-web/health-check-completed';
      } else {
        // set the response error message
        message = res.message;
      }
  } else {
      message = "There is an error in the medical screening response, please try again.";
  }
  let url = libs.portal.pageUrl({ path, type: 'absolute', params: { status, message }});
  return {
      redirect: url
  }

};