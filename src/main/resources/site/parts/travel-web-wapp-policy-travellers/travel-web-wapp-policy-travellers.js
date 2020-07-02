var libs = {
    thymeleaf : require('/lib/thymeleaf'),
    session : require('/lib/session'),
    portal: require('/lib/xp/portal'),
    util: require('/lib/util'),
    rest: require('/lib/rest')
};

var view = resolve('travel-web-wapp-policy-travellers.html');

exports.get = function(req){
    libs.util.log('policy-travellers [get]');
    libs.util.log(libs.session.getAttribute("travellers"));

    var model = {
        travellers: libs.session.getAttribute("travellers"),
        action: req.params.action
    };

    var body = libs.thymeleaf.render(view , model);
    return {body: body};
};

exports.post = function(req){
    libs.util.log('policy-travellers [post]');
    libs.util.log(req);
    let path = '/travel-insurance/wapp-web/policy-travellers';

    if (req.params.action == 'add-traveller') {
       // TODO: add-traveller?
    } else if (req.params.action == 'personalised-quote') {
        let params = {
            quoteReference: libs.session.getAttribute("quoteReference"),
            userReference: libs.session.getAttribute("userReference"),
            mainTreeVersion: libs.session.getAttribute("mainTreeVersion")
        }
        const response = libs.rest.request('/price/static-tree', 'POST',  params);
        const res = JSON.parse(response.body);
        if (res.status == "success") {
            path = '/travel-insurance/wapp-web/personalised-quote';
        } else {
            // todo : error handle
        }
    }

    var url = libs.portal.pageUrl({
        path,
        type: 'absolute',
        params: {}
    });

    return {
        redirect: url
    }
};