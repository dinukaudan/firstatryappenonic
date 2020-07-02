var libs = {
    thymeleaf : require('/lib/thymeleaf'),
    i18nLib : require('/lib/xp/i18n'),
    util: require('/lib/util'),
    portal : require('/lib/xp/portal'),
    session : require('/lib/session'),
    httpClientLib: require('/lib/http-client')
};

var view = resolve('travel-web-wapp-home.html');

exports.get = function(req){
    libs.util.log(req);

    var model = {
        firstName: req.params.firstName
    };

    var body = libs.thymeleaf.render(view , model);
    return {body: body};
};


