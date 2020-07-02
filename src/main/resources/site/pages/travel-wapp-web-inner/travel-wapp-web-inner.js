var libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/thymeleaf'),
    content: require('/lib/xp/content'),
    util: require('/lib/util')
};

var view = resolve('travel-wapp-web-inner.html');

//Handle Get request
exports.get = function (req) {
    var content = libs.portal.getContent();
    var mainRegion = isFragment ? null : content.page.regions.main;
    var site = libs.portal.getSite();
 
    // Fragment handling (single fragments should use this page controller automatically to render itself)
    var isFragment = content.type === 'portal:fragment';
    var model = {
        lang : site.language || "en-us",
        mainRegion: mainRegion,
        isFragment: isFragment
    };
    var body = libs.thymeleaf.render(view, model);
    return {body: body};
};
