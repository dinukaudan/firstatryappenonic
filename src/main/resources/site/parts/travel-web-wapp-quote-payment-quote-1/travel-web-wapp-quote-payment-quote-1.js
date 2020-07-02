var libs = {
    thymeleaf : require('/lib/thymeleaf'),
    util: require('/lib/util'),
    portal: require('/lib/xp/portal'),
    session : require('/lib/session'),
    rest: require('/lib/rest')
};

var view = resolve('travel-web-wapp-quote-payment-quote-1.html');

exports.get = function(req){
    libs.util.log(req);
    var model = {};

    var body = libs.thymeleaf.render(view , model);
    return {body: body};
};

exports.post = function(req){
    libs.util.log('personalised quote 1 [post]');
    libs.util.log(req);

    let path = '/travel-insurance/wapp-web/personalised-quote-2'
    let params = {
        quoteReference: libs.session.getAttribute("quoteReference"),
        userReference: libs.session.getAttribute("userReference"),
        mainTreeVersion: libs.session.getAttribute("mainTreeVersion"),
        acceptDeclarations: "Y",
        covers: [
            {
                name: "TRIP_EXCESS",
                value: 250
            },
            {
                name: "BAGGAGE_COVER",
                value: 0
            },
            {
                name: "GADGET_COVER",
                value: 0
            },
            {
                name: "CANCELLATION_COVER",
                value: 500
            }
        ]
    }

    const response = libs.rest.request('/quote/update', 'PUT',  params);
    const res = JSON.parse(response.body);
    if (res.status == "success") {
        libs.session.setAttribute("mainTreeVersion", res.result.version.mainTreeVersion);
    } else {
        // todo : error handle
        path = '/travel-insurance/wapp-web/personalised-quote-1';
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