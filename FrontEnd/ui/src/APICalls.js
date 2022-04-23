import {HTTP_METHOD} from "./enums.ts";
import config from './Config';

export const callSpringAPI = (method, request, content = null, requestMetadata = null) => {
    return callAPI(config.connection.springEndpoint, method, request, content, requestMetadata);
}

export const callFlaskAPI = (method, request, content = null, requestMetadata = null) => {
    return callAPI(config.connection.flaskEndpoint, method, request, content, requestMetadata);
}

const callAPI = (endpoint, method, request, content = null, requestMetadata = null) => {
    return new Promise((resolve, reject) => {
        if (requestMetadata == null) {
            requestMetadata = {};
            switch (method) {
                case HTTP_METHOD.GET: requestMetadata['method'] = "GET"; break;
                case HTTP_METHOD.POST: requestMetadata['method'] = "POST"; break;
                default: requestMetadata['method'] = "GET"; break;
            }
            if (!('headers' in requestMetadata))
                requestMetadata['headers'] = {};
            requestMetadata['headers']['Content-Type'] = "application/json";
        }
        if (content != null)
            requestMetadata['body'] = JSON.stringify(content);
        fetch(endpoint + request, requestMetadata).then(res => res.json().then(res => { resolve(res); }), rej => reject(rej));
    });
}

export default null;