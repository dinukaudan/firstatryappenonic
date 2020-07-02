var libs = {
    util: require('/lib/util'),
    httpClientLib: require('/lib/http-client')
};

exports.request = function(action, http_method, params) {
    libs.util.log('http request'+ http_method + ',' + action);
    libs.util.log('params1');
    libs.util.log(params); 
    
    const now = new Date(); 
    // set common parameters to the params
    params.appVersion  = "1";
    params.quotedMethod = "WEB";
    params.channel = "WEB";
    params.appRequestedTime = now.toISOString();
    params.localTime = now.toISOString();
    params.GMTTime = now.toISOString();
    params.baseUrl = params.baseUrl ? params.baseUrl : app.config.api_server;

    var oauthResponse = libs.httpClientLib.request({
        url: app.config.auth_server + '/oauth/token?grant_type=client_credentials',
        method: 'POST',
        auth: {
            user: 'fuse',
            password: 'january*27'
        }
    });
    const access_token = JSON.parse(oauthResponse.body).access_token;
    if (http_method === "GET") {
        return getRequest(action, http_method, params, access_token);
    } else {
        return postRequest(action, http_method, params, access_token);
    }
}

// separate function to handle GET requests
function getRequest(action, http_method, params, access_token) {
    var response = libs.httpClientLib.request({
        url: app.config.api_server + action,
        method: http_method,
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        params
    });
    libs.util.log(response);
    return response;
}

// separate function to handle POST requests
function postRequest(action, http_method, params, access_token) {
    var response = libs.httpClientLib.request({
        url: app.config.api_server + action,
        method: http_method,
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        body: JSON.stringify(params),
        contentType: 'application/json'
    });
    libs.util.log(response);
    return response;
}