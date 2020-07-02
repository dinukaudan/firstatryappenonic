var libs = {
    thymeleaf : require('/lib/thymeleaf'),
    util: require('/lib/util'),
    portal : require('/lib/xp/portal'),
    session : require('/lib/session'),
    httpClientLib: require('/lib/http-client'),
    rest: require('/lib/rest')
};

var view = resolve('travel-web-wapp-signin.html');

exports.get = function(req){
    libs.util.log(req);

    if ( req.params && req.params.action == 'register') {
        libs.util.log("re-directing...");
        return {
            redirect: libs.portal.pageUrl().split('/').slice(0,-1).join('/') + '/register-step-1'
        }
    }
    if ( req.params && req.params.action == 'forgot-password') {
        return {
            redirect: libs.portal.pageUrl().split('/').slice(0,-1).join('/') + '/forgot-password'
        }
    }
    libs.util.log(req.params.status);

    var model = {
        status : req.params.status,
        message : req.params.message,

    };

    var body = libs.thymeleaf.render(view , model);
    return {body: body};
};

exports.post = function(req){
    libs.util.log("signin [post]");
    var params = {
        email: req.params.email,
        loginPassword: req.params.loginPassword
    };

    const response = libs.rest.request('/user/signIn', 'POST',  params);
    const res = JSON.parse(response.body);

    let path = '/travel-insurance/wapp-web/signin';
    let firstName = 'user';
    if (res.status == "success") {
        libs.session.setAttribute("userReference", res.result.user.userReference);
        libs.session.setAttribute("mainTreeVersion", res.result.version.mainTreeVersion);
        path = '/travel-insurance/wapp-web/home';
        firstName = res.result.user.firstName;
    }
    const url = libs.portal.pageUrl({
        path,
        type: 'absolute',
        params: {
            status: res.status,
            message: res.message,
            firstName
        }
    });
    return {redirect: url};
}