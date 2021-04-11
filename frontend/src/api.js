const Promise = require('bluebird');

Promise.config({ cancellation: true });

const apiPrefix = `${process.env.REACT_APP_BACKEND_ORIGIN}/api`;

const request = (url, options) => fetch(url, {
    method: 'get',
    mode: 'cors',
    ...options,
}).then(async response => {
    if(!response.ok) {
        throw new Error(JSON.stringify({
            status: response.status,
            statusText: response.statusText,
            message: await response.text(),
        }));
    }
    return response.json();
});

const formDataToRequestBody = formData => JSON.stringify(Object.fromEntries(formData));

/**
 *
 */
export const createUser = formData => {

    return request(`${apiPrefix}/user/register`, {
        method: 'post',
        body: formDataToRequestBody(formData),
    });
};
