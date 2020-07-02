var libs = {
    thymeleaf : require('/lib/thymeleaf'),
    i18nLib : require('/lib/xp/i18n'),
    util: require('/lib/util'),
    portal : require('/lib/xp/portal'),
    session : require('/lib/session'),
    httpClientLib: require('/lib/http-client'),
    rest: require('/lib/rest')
};

var view = resolve('travel-wapp-web-create-3-1.html');

exports.get = function(req){
    var model = {
        status: req.params.status,
        message: req.params.message
    };

    var body = libs.thymeleaf.render(view , model);
    return {body: body};
};

exports.post = function(req){
    libs.util.log("register-step-3-1 [post]");

    var params = {
        address1: req.params.address1,
        address2: req.params.address2,
        city: req.params.city,
        postcode: req.params.postcode,
        ukResidentConfirmation: req.params.ukResidentConfirmation,
        userReference: libs.session.getAttribute("userReference"),
        mainTreeVersion: libs.session.getAttribute("mainTreeVersion")
     };

    const response = libs.rest.request('/user/address/update', 'PUT',  params);
    const res = JSON.parse(response.body);
    let path = '/travel-insurance/wapp-web/register-step-3-1';
    if (res.status == "success") {
        path = '/travel-insurance/wapp-web/register-step-4';
        libs.session.setAttribute("userReference", res.result.user.userReference);
        libs.session.setAttribute("mainTreeVersion", res.result.version.mainTreeVersion);
    }
    var url = libs.portal.pageUrl({
        path,
        type: 'absolute',
        params: {
            status: res.status,
            message: res.message
        }
    }); 

    return {redirect: url};
};