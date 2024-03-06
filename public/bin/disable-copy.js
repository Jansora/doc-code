
// ==UserScript==
// @name         知识星球移除禁止复制
// @namespace    http://tampermonkey.net/
// @version      2024-03-05
// @description  try to take over the world!
// @author       You
// @match        *://zsxq.com/*
// @match        *://*.zsxq.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=zsxq.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
    const elements = document.getElementsByTagName('*');
    for (const element of elements) {
        element.style.userSelect = 'unset';
    }

})();
