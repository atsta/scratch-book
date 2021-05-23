import { postJson } from './util/request';

const apiPrefix = `${process.env.REACT_APP_BACKEND_ORIGIN}/api`;

export function loginUser(formData) {

    return postJson(`${apiPrefix}/user/login`, {
        body: formData,
    });
}
