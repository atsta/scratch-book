import { postJson } from './util/request';

const apiPrefix = `${process.env.REACT_APP_BACKEND_ORIGIN}/api`;

export function createUser(formData) {

    return postJson(`${apiPrefix}/user/register`, {
        body: formData,
    });
}
