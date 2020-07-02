var libs = {
    thymeleaf : require('/lib/thymeleaf'),
    portal : require('/lib/xp/portal'),
    util: require('/lib/util')
};

var view = resolve('travel-wapp-web-create-3.html');

exports.get = function(req){
    libs.util.log('register-step-3 [get]');

    if ( req.params && req.params.action == 'manual-address-view') {
        return {
            redirect: libs.portal.pageUrl().split('/').slice(0,-1).join('/') + '/register-step-3-1'
        }
    }
    
    var model = {
        status: req.params.status,
        message: req.params.message
    };
    var body = libs.thymeleaf.render(view , model);
    return {body: body};
};