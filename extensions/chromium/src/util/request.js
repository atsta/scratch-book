import Promise from 'bluebird';

Promise.config({ cancellation: true });

export function getJson(url, options) {

    return requestJson(url, { method: 'get', ...options });
}

export function postJson(url, options) {

    return requestJson(url, { method: 'post', ...options });
}

function requestJson(url, options) {

    if(options.body instanceof FormData) {
        options = {
            ...options,
            body: JSON.stringify(Object.fromEntries(options.body)),
        }
    }

    return request(url, {
        headers: new Headers({
            'Content-Type': 'application/json; charset=utf-8',
        }),
        ...options,
    });
}

function request(url, options) {

    return new Promise((resolve, reject, onCancel) => {

        const controller = new AbortController();
        const { signal } = controller;

        onCancel(() => { controller.abort(); });

        fetch(url, {
            mode: 'cors',
            signal,
            ...options,
        }).then(async response => {
            if(response.ok) {
                resolve(response.json());
            }
            else {
                const errorMessage = (await response.text()) || response.statusText;
                reject(new Error(errorMessage));
            }
        }).catch(error => {
            if(error.name !== 'AbortError') {
                reject(error);
            }
        });
    });
}
