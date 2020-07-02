var libs = {
    thymeleaf : require('/lib/thymeleaf'),
    util: require('/lib/util'),
    portal: require('/lib/xp/portal'),
    session : require('/lib/session'),
    httpClientLib: require('/lib/http-client'),
    rest: require('/lib/rest')
};

exports.get = function(req){

libs.util.log("forgot password 2")
var view = resolve('travel-wapp-web-forgot-password-2.html');
    var model = {
        value: "found"
    };
    var body = libs.thymeleaf.render(view , model);
    return {body: body};
};




exports.post = function(req){
libs.util.log(req);

    var params = {
            secret1: libs.session.getAttribute("secret1"),
            secret2: libs.session.getAttribute("secret2"),
            loginPassword : req.params.password
     };

      const response = libs.rest.request('/user/password/update', 'PUT',  params);
      const res = JSON.parse(response.body);

 if (res.status == "success") {
// let params = {
//        action: 'password changed, log again',
//         status : "password-reset-success",
//         message : "Thank you, your password has now been updated!"
//    }
        var url = libs.portal.pageUrl({
                 path: '/travel-insurance/wapp-web/signin',
                 type: 'absolute',
                 params: {
                  action: 'password changed, log again',
                  status : "password-reset-success",
                  message : "Thank you, your password has now been updated!"
                 }
             });

    }else{
        var url = libs.portal.pageUrl({
                path: '/travel-insurance/wapp-web/forgot-password',
                type: 'absolute',
                params: {}
            });
    }
    return {
        redirect: url
             }
};