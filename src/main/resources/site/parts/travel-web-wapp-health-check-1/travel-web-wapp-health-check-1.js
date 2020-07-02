var libs = {
    thymeleaf : require('/lib/thymeleaf'),
    util: require('/lib/util'),
    portal: require('/lib/xp/portal'),
    session : require('/lib/session')
};

var view = resolve('travel-web-wapp-health-check-1.html');

exports.get = function(req){
    libs.util.log(req);
    var model = {};

    var body = libs.thymeleaf.render(view , model);
    return {body: body};
};

exports.post = function(req){
    libs.util.log('wapp-health-check-1 [post]');

    // set the session values
    libs.session.setAttribute("hasMedicalCondition", req.params.hasMedicalCondition);

    var url = libs.portal.pageUrl({
        path: '/travel-insurance/wapp-web/health-check-2',
        type: 'absolute',
        params: {}
    });

    return {
        redirect: url
    }
};