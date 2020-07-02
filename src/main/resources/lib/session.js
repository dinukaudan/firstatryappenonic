exports.setAttribute = function(key, value) {
    const bean = __.newBean('com.enonic.xp.session.SessionBean');
    return bean.setAttribute(key, value);
}

exports.getAttribute = function(key) {
    const bean = __.newBean('com.enonic.xp.session.SessionBean');
    return bean.getAttribute(key);
}

exports.removeAttribute = function (key){
    const bean = __.newBean('com.enonic.xp.session.SessionBean');
    return bean.removeAttribute(key);
}

exports.getAttributeNames = function (key){
    const bean = __.newBean('com.enonic.xp.session.SessionBean');
    return bean.getAttributeNames();
}

exports.getId = function () {
    const bean = __.newBean('com.enonic.xp.session.SessionBean');
    return bean.getId();
}

exports.getCreationTime = function () {
    const bean = __.newBean('com.enonic.xp.session.SessionBean');
    return bean.getCreationTime();
}