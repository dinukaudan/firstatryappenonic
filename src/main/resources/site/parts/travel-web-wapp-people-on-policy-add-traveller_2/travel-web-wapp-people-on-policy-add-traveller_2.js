var libs = {
    thymeleaf : require('/lib/thymeleaf'),
    util: require('/lib/util'),
};

var view = resolve('travel-web-wapp-people-on-policy-add-traveller_2.html');

exports.get = function(req){
    libs.util.log(req);
    var model = {};

    var body = libs.thymeleaf.render(view , model);
    return {body: body};
};