var libs = {
    thymeleaf : require('/lib/thymeleaf'),
    util: require('/lib/util'),
    session : require('/lib/session'),
    rest: require('/lib/rest'),
    portal: require('/lib/xp/portal')
};

var view = resolve('travel-web-wapp-quote-payment-personalised-quotation.html');

exports.get = function(req){
    libs.util.log('personalised quote [get]');
    libs.util.log(req);
    var model = {};

    var body = libs.thymeleaf.render(view , model);
    return {body: body};
};

exports.post = function(req){
    libs.util.log('personalised quote [post]');
    libs.util.log(req);

    let action = req.params.action;
    let path = '/travel-insurance/wapp-web/personalised-quote-1'

    // TODO: what is the landing page?
    if ( action == 'do-it-later') {

    } else if ( action == 'personalised-quote' ) {
        let params = {
            quoteReference: libs.session.getAttribute("quoteReference"),
            userReference: libs.session.getAttribute("userReference"),
            mainTreeVersion: libs.session.getAttribute("mainTreeVersion"),
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
        const response = libs.rest.request('/price-matrix/partial', 'POST',  params);
        const res = JSON.parse(response.body);
        if (res.status == "success") {
            // libs.session.setAttribute("mainTreeVersion", res.result.version.mainTreeVersion);
        } else {
            // todo : error handle
            path = '/travel-insurance/wapp-web/personalised-quote';
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