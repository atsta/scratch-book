import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import App from './components/App/App';
// import begin from './injections/selector';

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

/*eslint-disable no-undef*/
(function() {
    let btn1 = document.getElementsByTagName("button")[0];

    btn1.addEventListener("click", async () => {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: foo,
        });
    });

    // The body of this function will be executed as a content script inside the
    // current page
    function setPageBackgroundColor() {
        document.body.style.backgroundColor = 'red';
    }



    function foo() {

        console.log(arguments);
        console.log(document.body);

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        const style = (function() {

            const style = document.createElement('style');

            // style.type = 'text/css';
            style.innerHTML = '* { cursor: crosshair !important; }';

            return style;
        })();

        function enableCrossHairCursor() {

            document.head.appendChild(style);
        }

        function disableCrossHairCursor() {

            document.head.removeChild(style);
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        const selectionRect = (function() {

            const div = document.createElement('div');

            Object.assign(div.style, {
                position:        'absolute',
                opacity:         '.25',
                backgroundColor: 'blue',
                border:          'solid 5px black',
            });

            return div;
        })();

        function enableSelectionRect() {

            Object.assign(selectionRect.style, {
                top:    '0px',
                left:   '0px',
                width:  '0px',
                height: '0px',
            });

            document.body.appendChild(selectionRect);
        }

        function disableSelectionRect() {

            document.body.removeChild(selectionRect);
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        let selectionOrigin = null;

        function mouseDown(e) {

            e.preventDefault(); e.stopPropagation();

            document.addEventListener('mousemove', mouseMove, true);
            document.addEventListener('mouseup', mouseUp, true);

            selectionOrigin = { x: e.x, y: e.y };
        }

        function mouseMove(e) {

            const { x, y } = e;

            Object.assign(selectionRect.style, {
                left:    Math.min(x, selectionOrigin.x) + 'px',
                top:     Math.min(y, selectionOrigin.y) + 'px',
                width:   Math.abs(x - selectionOrigin.x) + 'px',
                height:  Math.abs(y - selectionOrigin.y) + 'px',
            });
        }

        function mouseUp(e) {

            document.removeEventListener('mousemove', mouseMove, true);
            document.removeEventListener('mouseup', mouseUp, true);

            selectionOrigin = null;
            end();
        }

        function enableMouseHandlers() {

            document.addEventListener('mousedown', mouseDown, true);
        }

        function disableMouseHandlers() {

            document.removeEventListener('mousedown', mouseDown, true);
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        function begin() {

            enableCrossHairCursor();
            enableSelectionRect();
            enableMouseHandlers();
        }

        function end() {

            const domSubTree = collect();

            console.log(domSubTree?.outerHTML);

            disableMouseHandlers();
            disableSelectionRect();
            disableCrossHairCursor();
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
        const tagsToIgnore = ['script','style'].reduce((acc, tag) => ({ ...acc, [tag]: true }), {});

        function collect() {

            const bbox = selectionRect.getBoundingClientRect();

            return visit(bbox, document.body);
        }

        function visit(bbox, node) {

            if(node === selectionRect || tagsToIgnore.hasOwnProperty(node.nodeName.toLowerCase())) {
                return null;
            }

            const nodeClone = node.cloneNode();
            const childNodes = node.childNodes;
            let isDescendantContained = false;

            for(let i = 0; i < childNodes.length; i++) {
                const childNode = childNodes[i];
                let isChildContained = false;

                if(childNode.nodeName === '#text') {
                    const range = document.createRange();
                    range.selectNode(childNode);
                    if(contains(bbox, range)) {
                        nodeClone.appendChild(childNode.cloneNode());
                        isChildContained = true;
                    }
                    range.detach();
                }
                else {
                    const childNodeClone = visit(bbox, childNode);
                    if(childNodeClone) {
                        nodeClone.appendChild(childNodeClone);
                        isChildContained = true;
                    }
                }

                isDescendantContained = isDescendantContained || isChildContained;
            }

            return contains(bbox, node) || isDescendantContained ? nodeClone : null;
        }

        function contains(bbox, node) {

            if(!node.getClientRects) {
                return false;
            }

            const rects = node.getClientRects();

            for(let i = 0; i < rects.length; i++) {
                if(containsRect(rects[i])) {
                    return true;
                }
            }

            return false;
        }

        function containsRect(bbox, rect) {

            return !(rect.right < bbox.left || rect.left > bbox.right || rect.bottom < bbox.top || rect.top > bbox.bottom);
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        begin();
    }
})();
/*eslint-enable no-undef*/
