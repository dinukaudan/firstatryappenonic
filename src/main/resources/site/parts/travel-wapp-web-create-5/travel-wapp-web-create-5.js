var libs = {
    thymeleaf : require('/lib/thymeleaf'),
    i18nLib : require('/lib/xp/i18n'),
    util: require('/lib/util'),
    portal : require('/lib/xp/portal')
};

exports.get = function(req){
    libs.util.log("register-step-5");
    libs.util.log(req);

    if ( req.params && req.params.action == 'health-check') {
        return {
            redirect: libs.portal.pageUrl().split('/').slice(0,-1).join('/') + '/health-check'
        }
    }

    var view = resolve('travel-wapp-web-create-5.html');
    var model = {};
    var body = libs.thymeleaf.render(view , model);
    return {body: body};
};