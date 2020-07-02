var libs = {
    thymeleaf : require('/lib/thymeleaf'),
    i18nLib : require('/lib/xp/i18n'),
    util: require('/lib/util'),
    portal: require('/lib/xp/portal'),
    node: require('/lib/xp/node'),
    httpClientLib: require('/lib/http-client'),
    session : require('/lib/session')
};

var repo = libs.node.connect({
    repoId: "wapp-repo",
    branch: "master",
    principals: ["role:system.admin"]
});


var view = resolve('travel-wapp-web-create-1.html');

exports.get = function(req){
    var model = {
        value: "found"
    };

    var body = libs.thymeleaf.render(view , model);
    return {body: body};
};

exports.post = function(req){
    libs.util.log('create-1 - post');
    libs.util.log(req);
    libs.session.setAttribute("firstName", req.params.firstName);
    libs.session.setAttribute("lastName", req.params.lastName);
    libs.session.setAttribute("dob", req.params.dob);
    libs.session.setAttribute("countryCode", req.params.countryCode);
    libs.session.setAttribute("phone", req.params.phone);

    // save in the repository
    // var savedUser = libs.userStore.saveUser(req);

    var url = libs.portal.pageUrl({
        path: '/travel-insurance/wapp-web/register-step-2',
        type: 'absolute',
        params: {}
      });

      return {
          redirect: url
      }
};

// TODO: check filters
exports.filter = function (req, next) {
    var before = new Date().getTime();
    var response = next(req);  // next(req) hands over the request to the engine pipeline and returns the response
    var after = new Date().getTime();
    libs.util.log((after - before) + 'ms');
    return response;
};