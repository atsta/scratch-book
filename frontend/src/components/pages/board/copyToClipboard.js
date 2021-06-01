
/**
 * Source: https://gist.github.com/Chalarangelo/4ff1e8c0ec03d9294628efbae49216db#file-copytoclipboard-js
 */
export default function copyToClipboard(string) {

    const tempElement = document.createElement('textarea');     // Create a <textarea> element

    tempElement.value = string;                                 // Set its value to the string that you want copied
    tempElement.setAttribute('readonly', '');                   // Make it readonly to be tamper-proof
    tempElement.style.position = 'absolute';
    tempElement.style.left = '-9999px';                         // Move outside the screen to make it invisible
    document.body.appendChild(tempElement);                     // Append the <textarea> element to the HTML document

    const selected = document.getSelection().rangeCount > 0     // Check if there is any content selected previously
        ? document.getSelection().getRangeAt(0)                 // Store selection if found
        : false;                                                // Mark as false to know no selection existed before

    tempElement.select();                                       // Select the <textarea> content
    document.execCommand('copy');                               // Copy - only works as a result of a user action (e.g. click events)
    document.body.removeChild(tempElement);                     // Remove the <textarea> element

    if(selected) {                                              // If a selection existed before copying
        document.getSelection().removeAllRanges();              // Unselect everything on the HTML document
        document.getSelection().addRange(selected);             // Restore the original selection
    }
};

