import { postJson ,getJson, deleteJson, putJson} from './util/request';

const apiPrefix = `${process.env.REACT_APP_BACKEND_ORIGIN}/api`;

export function createUser(formData) {

    return postJson(`${apiPrefix}/user/register`, {
        body: formData,
    });
}

export function loginUser(formData) {

    return postJson(`${apiPrefix}/user/login`, {
        body: formData,
    });
}

export function getBoards(formData) {

    return getJson(`${apiPrefix}/boards/owned`, {
        body: formData,
    });
}

export function getBoard(boardId) {

    return getJson(`${apiPrefix}/boards/get/${boardId}`);
}

export function addBoard(formData) {

    return postJson(`${apiPrefix}/boards/`, {
        body: formData,
    });
}


export function deleteBoard(id,formData) {

    return deleteJson(`${apiPrefix}/boards/`+id, {
        body: formData,
    });
}

export function updateBoard(id, formData) {

    return putJson(`${apiPrefix}/boards/${id}`, {
        body: formData,
    });
}


export function getLinks(id, formData) {

    return getJson(`${apiPrefix}/urls/`+id, {
        body: formData,
    });
}

export function addLink(id,formData) {

    return postJson(`${apiPrefix}/urls/`+id, {
        body: formData,
    });
}

export function updateLinks(id, formData) {

    return putJson(`${apiPrefix}/urls/editUrl/`+id, {
        body: formData,
    });
}

export function deleteLink(id,formData) {

    return putJson(`${apiPrefix}/urls/`+id, {
        body: formData,
    });
}

export function getSearchResults(title) {

    return getJson(`${apiPrefix}/boards/search?title=`+title, {
        // body: formData,
    });
}

export function getFollowedBoards(formData) {

    return getJson(`${apiPrefix}/boards/followed`, {
        body: formData,
    });
}


export function FollowBoard(formData) {

    return postJson(`${apiPrefix}/boards/follow`, {
        body: formData,
    });
}


export function UnfollowBoard(formData) {

    return postJson(`${apiPrefix}/boards/unfollow`, {
        body: formData,
    });
}


export function getRating(id,formData) {

    return getJson(`${apiPrefix}/ratings/total/`+id, {
        body: formData,
    });
}

export function getmyRating(id,formData) {

    return getJson(`${apiPrefix}/ratings/user/`+id, {
        body: formData,
    });
}

export function setmyRating(id,formData) {

    return postJson(`${apiPrefix}/ratings/`+id, {
        body: formData,
    });
}
