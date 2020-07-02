var libs = {
    thymeleaf : require('/lib/thymeleaf'),
    util: require('/lib/util'),
    rest: require('/lib/rest'),
    portal: require('/lib/xp/portal'),
    session : require('/lib/session')
};

var view = resolve('travel-web-wapp-health-check-2.html');

exports.get = function(req){
    libs.util.log('travel-web-wapp-health-check-2 [get]');
    libs.util.log(req);
    libs.util.log("mainTree Version: "+ libs.session.getAttribute("mainTreeVersion"));
    var model = {
        status: req.params? req.params.status : '',
        message: req.params? req.params.message : ''
    };

    var body = libs.thymeleaf.render(view , model);
    return {body: body};
};

exports.post = function(req) {
    libs.util.log('wapp-health-check-2 [post]');

    // set the session values
    libs.session.setAttribute("hasAwaitingDiagnosis", req.params.hasAwaitingDiagnosis);
    
    // set the request params TODO: set correct return path with a service url
    var params = {      
        returnPath: app.config.cms_server + '/_/service/com.intervest.wapp.web/medical-screening-response',
        quoteReference: libs.session.getAttribute("quoteReference"),
        travellerReference: libs.session.getAttribute("travellerReference"),
        userReference: libs.session.getAttribute("userReference"),
        mainTreeVersion: libs.session.getAttribute("mainTreeVersion"),
        hasMedicalCondition: libs.session.getAttribute("hasMedicalCondition"),
        hasAwaitingDiagnosis: libs.session.getAttribute("hasAwaitingDiagnosis")
    };

    const response = libs.rest.request('/traveller/health/initiate', 'POST',  params);
    const res = JSON.parse(response.body);
    let path = "/travel-insurance/wapp-web/health-check-2"
    let healthCheckURL = '';
    if (res.status == "success") {
        libs.session.setAttribute("mainTreeVersion", res.result.version.mainTreeVersion);
        libs.session.setAttribute("travellers", res.result.quotes[0].travellers);
        if ("Y" == libs.session.getAttribute("hasMedicalCondition")) {
            path = '/travel-insurance/wapp-web/medical-screening';
            healthCheckURL = res.result.healthCheckURL;
        } 
        if ("N" == libs.session.getAttribute("hasMedicalCondition")) {
            path = '/travel-insurance/wapp-web/health-check-completed';
        }
    }
    var url = libs.portal.pageUrl({
        path,
        type: 'absolute',
        params: {
            status: res.status,
            message: res.message,
            healthCheckURL
        }
    }); 

    return {redirect: url};
}