var libs = {
    thymeleaf : require('/lib/thymeleaf'),
    util: require('/lib/util'),
    portal : require('/lib/xp/portal')
};

exports.get = function(req){
    libs.util.log("health check landing");
    libs.util.log(req);

    var view = resolve('travel-web-wapp-health-check-landing.html');
    var model = {};
    var body = libs.thymeleaf.render(view , model);
    return {body: body};
};

// just redirect to health-check-1
exports.post = function(req) {
    var url = libs.portal.pageUrl({
        path: '/travel-insurance/wapp-web/health-check-1',
        type: 'absolute',
        params: {}
    });
    return { redirect: url }   
}