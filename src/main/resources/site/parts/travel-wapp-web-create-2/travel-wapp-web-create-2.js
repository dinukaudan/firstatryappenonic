var libs = {
    thymeleaf : require('/lib/thymeleaf'),
    util: require('/lib/util'),
    portal: require('/lib/xp/portal'),
    session : require('/lib/session'),
    httpClientLib: require('/lib/http-client'),
    rest: require('/lib/rest')
};

var view = resolve('travel-wapp-web-create-2.html');

exports.get = function(req){
    var model = {
        firstName : libs.session.getAttribute("firstName"),
        email : libs.session.getAttribute("email"),
        status: req.params.status,
        message: req.params.message
    };
    var body = libs.thymeleaf.render(view , model);
    return {body: body};
};

exports.post = function(req){
    libs.util.log('register-step-2 [post]');

    // set the session values
    libs.session.setAttribute("email", req.params.email);
    libs.session.setAttribute("loginPassword", req.params.loginPassword);

    // set the request params
    var params = {
         firstName: libs.session.getAttribute("firstName"),
         lastName: libs.session.getAttribute("lastName"),
         email: libs.session.getAttribute("email"),
         dob: libs.session.getAttribute("dob"),
         loginPassword: libs.session.getAttribute("loginPassword"),
         deviceCode: "",
         countryCode: libs.session.getAttribute("countryCode"),
         phone: libs.session.getAttribute("phone"),
         notificationToken: "1234567890",
         baseUrl: app.config.cms_server+'/_/service/com.intervest.wapp.web/verify-email'
     };

    const response = libs.rest.request('/user/create', 'POST',  params);
    const res = JSON.parse(response.body);

    if (res.status == "success") {
        libs.session.setAttribute("userReference", res.result.user.userReference);
        libs.session.setAttribute("quoteReference", res.result.quotes[0].quoteReference);
        libs.session.setAttribute("travellerReference", res.result.quotes[0].travellers[0].travellerReference);
        libs.session.setAttribute("passengerReference", res.result.quotes[0].travellers[0].passengerReference);
        libs.session.setAttribute("mainTreeVersion", res.result.version.mainTreeVersion);
    }


    libs.util.log(libs.session.getAttribute("email"));
    var url = libs.portal.pageUrl({
        path: '/travel-insurance/wapp-web/register-step-2',
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