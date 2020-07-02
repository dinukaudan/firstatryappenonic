var libs = {
    thymeleaf : require('/lib/thymeleaf'),
    portal : require('/lib/xp/portal'),
    util: require('/lib/util')
};

var view = resolve('travel-web-wapp-people-on-policy-landing.html');

exports.get = function(req){
    libs.util.log(req);
    var model = {};

    var body = libs.thymeleaf.render(view , model);
    return {body: body};
};

exports.post = function(req) {
    libs.util.log('travel-web-add-people-on-policy-landing [post]');

    let path = '/travel-insurance/wapp-web/policy-travellers';
    let params = {
        action: ''
    }
    if (req.params.action == "JUST_FOR_ME") {
        params.action = 'JUST_FOR_ME';
        // perform "JUST_FOR_ME" action        
    } else if (req.params.action == "ADD_SOMEONE_ELSE") {
        // perform "ADD_SOMEONE_ELSE" action
        params.action = 'ADD_SOMEONE_ELSE';
    } else {
        path = '/travel-insurance/wapp-web/add-people';
    }
    var url = libs.portal.pageUrl({
        path,
        type: 'absolute',
        params
    }); 
    return {
        redirect: url
    }    
}