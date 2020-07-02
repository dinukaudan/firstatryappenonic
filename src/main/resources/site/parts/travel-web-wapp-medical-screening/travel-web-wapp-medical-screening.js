var libs = {
    thymeleaf : require('/lib/thymeleaf'),
    util: require('/lib/util'),
    portal : require('/lib/xp/portal')
};

exports.get = function(req){
    libs.util.log("health check landing");
    libs.util.log(req);

    var view = resolve('travel-web-wapp-medical-screening.html');
    var model = {
        healthCheckURL: req.params.healthCheckURL
    };
    var body = libs.thymeleaf.render(view , model);
    return {body: body};
};

exports.post = function(req) {

}
