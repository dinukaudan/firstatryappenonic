var libs = {
    thymeleaf : require('/lib/thymeleaf'),
    util: require('/lib/util'),
    session : require('/lib/session'),
    portal: require('/lib/xp/portal')
};

exports.get = function(req){
    libs.util.log("mainTree Version: "+ libs.session.getAttribute("mainTreeVersion"));
    var view = resolve('travel-web-wapp-health-check-completed.html');
    var model = {};
    var body = libs.thymeleaf.render(view , model);
    return {body: body};
};

exports.post = function(req){
    libs.util.log('wapp-health-check-completed [post]');
    var url = libs.portal.pageUrl({
        path: '/travel-insurance/wapp-web/add-people',
        type: 'absolute',
        params: {}
    }); 
    return {
        redirect: url
    }
};