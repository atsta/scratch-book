import { getJson, postJson } from './util/request';

const apiPrefix = `${process.env.REACT_APP_BACKEND_ORIGIN}/api`;

export function loginUser(formData) {

    return postJson(`${apiPrefix}/user/login`, {
        body: formData,
    });
}

export function fetchBoards() {

    return getJson(`${apiPrefix}/boards/owned`)
        .then(({ owning }) => owning);
}

