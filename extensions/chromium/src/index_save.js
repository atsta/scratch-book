import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import App from './components/App';

ReactDOM.render(
    // <App/>,
    <div>
        <header className="d-flex justify-content-center p-3" style={{ gap: 10 }}>
            <button>1st button</button>
            <button>2nd button</button>
            <button>3d button</button>
        </header>
        <section className="text-center">
            <p className="border">some things in life are good</p>
            <p className="border">some things in life are bad</p>
            <p className="border">ti eipe re file...</p>
        </section>
    </div>,
    document.getElementById('root')
);


// console.log('USE EFFECT');
// let prev = null;
// document.addEventListener('mouseover', e => {
//     if(prev === e.target) { return; }
//     if(prev) { prev.style.outline = ''; }
//     e.target.style.outline = 'solid 5px blue';
//     prev = e.target;
// });
//
// document.addEventListener('wheel', e => {
//     if(e.deltaY < 0) {
//         // up
//     }
//     else {
//
//     }
// });

const layer = document.createElement('div');
Object.assign(layer.style, {
    position: 'absolute',
    display: 'none',
    opacity: '.25',
    backgroundColor: 'blue',
    border: 'solid 5px black',
});
document.body.appendChild(layer);


const THRESHOLD = 0;
let startPos = null;
function mouseDown(e) {
    e.preventDefault(); e.stopPropagation();
    document.addEventListener('mousemove', mouseMove, true);
    document.addEventListener('mouseup', mouseUp, true);
    startPos = { x: e.x, y: e.y };
}
function mouseMove(e) {
    const { x, y } = e;
    Object.assign(layer.style, {
        display: 'block',
        left:    Math.min(x, startPos.x) + 'px',
        top:     Math.min(y, startPos.y) + 'px',
        width:   Math.abs(x - startPos.x) + 'px',
        height:  Math.abs(y - startPos.y) + 'px',
    });
}
function mouseUp(e) {
    document.removeEventListener('mousemove', mouseMove, true);
    document.removeEventListener('mouseup', mouseUp, true);
    collect();
    startPos = null;
    Object.assign(layer.style, {
        display: 'none',
    });
}
document.addEventListener('mousedown', mouseDown, true);

function collect() {

    // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType

    const tagsToIgnore = ['script','style'].reduce((acc, tag) => ({ ...acc, [tag]: true }), {});
    const bbox = layer.getBoundingClientRect();
    console.log(bbox);

    function visit(node) {
        if(node === layer) {
            return null;
        }
        const nodeClone = node.cloneNode();
        // console.log('visit', [node]);
        if(tagsToIgnore.hasOwnProperty(node.nodeName.toLowerCase())) {
            console.warn('tagsToIgnore', node.nodeName, [node]);
            return null;
        }
        const childNodes = node.childNodes;
        let isDescendantInside = false
        for(let i = 0; i < childNodes.length; i++) {
            const childNode = childNodes[i];
            let isInsideF = false;
            if(childNode.nodeName === '#text') {
                const range = document.createRange();
                range.selectNode(childNode);
                if(isInside(range)) {
                    nodeClone.appendChild(childNode.cloneNode());
                    isInsideF = true;
                }
                range.detach();
            }
            else {
                const childNodeClone = visit(childNode);
                // console.log(childNodeClone);
                if(childNodeClone) {
                    nodeClone.appendChild(childNodeClone);
                    isInsideF = true;
                }
            }
            isDescendantInside = isDescendantInside || isInsideF;
        }
        return isInside(node) || isDescendantInside ? nodeClone : null;
    }

    function isInside(node) {
        if(!node.getClientRects) {
            console.warn('has not "getClientRects"', [node]);
            return false;
        }
        const rects = node.getClientRects();
        // console.log(rects);
        for(let i = 0; i < rects.length; i++) {
            if(isContained(rects[i])) {
                // console.log(true, node.nodeName);
                return true;
            }
            // console.log(false, node.nodeName);
        }
        return false;
    }

    function isContained(rect) {
        // console.log(rect);
        if(rect.right < bbox.left || rect.left > bbox.right) { return false; }
        if(rect.bottom < bbox.top || rect.top > bbox.bottom) { return false; }
        return true;
    }

    const bodyClone = visit(document.body);
    console.log(bodyClone);
    console.log(bodyClone?.outerHTML)
}

/*eslint-disable no-undef*/
(function() {
    let btn1 = document.getElementsByTagName("button")[0];

    btn1.addEventListener("click", async () => {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: setPageBackgroundColor,
        });
    });

    // The body of this function will be executed as a content script inside the
    // current page
    function setPageBackgroundColor() {
        document.body.style.backgroundColor = 'red';
    }
})();
/*eslint-enable no-undef*/
