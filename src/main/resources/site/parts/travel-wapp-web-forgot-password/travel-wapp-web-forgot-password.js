var libs = {
    thymeleaf : require('/lib/thymeleaf'),
    util: require('/lib/util'),
    portal : require('/lib/xp/portal'),
    session : require('/lib/session'),
    rest: require('/lib/rest')

};

var view = resolve('travel-wapp-web-forgot-password.html');

exports.get = function(req){

libs.util.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
libs.util.log(req);
if(req.params && req.params.status == 'success'){
var model = {
            email:req.params.email,
            status: req.params.status,
            message: req.params.message
    };
         var body = libs.thymeleaf.render(view , model);
         return {body: body};

} else if(req.params && req.params.status == 'error'){
         var model = {
          email:req.params.email,
          status: req.params.status,
          message: req.params.message
         };
         var body = libs.thymeleaf.render(view , model);
         return {body: body};

}else{
         var model = {};
         var body = libs.thymeleaf.render(view , model);
    return {body: body};
    }
};


exports.post = function(req){
    libs.util.log('Reset-password-step-2 [post]');
     // set the session values
      libs.session.setAttribute("email", req.params.email);
      libs.util.log(req.params.email);

    // set the request params
    var params = {
         email: libs.session.getAttribute("email"),
         baseUrl: app.config.cms_server+'/_/service/com.intervest.wapp.web/forget-password-response'
     };

    const response = libs.rest.request('/user/password/reset-link', 'GET',  params);
    const res = JSON.parse(response.body);
    libs.util.log(res);
    libs.util.log(res.result);

//    var view = resolve('travel-wapp-web-forgot-password.html');
//    var model = {
//            email: res.result,
//            status: res.status,
//            message: res.message
//        };
//
//        return {body:  libs.thymeleaf.render(view , model)};

 var url = libs.portal.pageUrl({
        path: '/travel-insurance/wapp-web/forgot-password',
        type: 'absolute',
        params: {
            email:res.result,
            status: res.status,
            message: res.message
        }
    });
  return {
        redirect: url
    }
        };

