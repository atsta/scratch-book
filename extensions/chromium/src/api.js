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

export function createBoardEntry(boardId, url, html, screenshotBase64) {

    const formData = new FormData();
    formData.set('url', url);
    formData.set('html', html);
    formData.set('screenshotBase64', screenshotBase64);

    return postJson(`${apiPrefix}/urls/${boardId}`, {
        body: formData,
    });
}

