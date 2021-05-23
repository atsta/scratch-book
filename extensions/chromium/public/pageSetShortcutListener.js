/**
 * CURRENTLY NOT USED.
 *
 * This file must be injected to every page. Therefore, it must be declared in "content_scripts" of "manifest.json".
 */

window.addEventListener('keydown', e => {

    if(!e.altKey || (e.key !== 'p' && e.key !== 'P')) {
        return;
    }

    chrome.runtime.sendMessage({
        id: 'TAKE_SNAPSHOT',
    });
});

