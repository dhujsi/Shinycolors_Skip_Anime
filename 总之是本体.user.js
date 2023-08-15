// ==UserScript==
// @name         偶像大师闪耀色彩跳过培育动画 [双端适配]
// @namespace    http://tampermonkey.net/
// @version      1.1.6
// @description  跳过培育动画自用，面向gpt编程.jpg
// @author       ER@关注b站EreRe_看折纸纸片人谢谢喵
// @match        https://shinycolors.enza.fun/*
// @run-at       document-end
// @icon         https://shinycolors.enza.fun/icon_192x192.png
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';
    function handleButtonClick() {
        const currentURL = window.location.href;

        if (
            currentURL !== 'https://shinycolors.enza.fun/produce/?a=#' &&
            currentURL !== 'https://shinycolors.enza.fun/produce/?a='
        ) {
            window.location.href = '/produce/?a=';
        } else if (currentURL === 'https://shinycolors.enza.fun/produce/?a=') {
            window.location.href = '/produce/?a=#';
        } else if (currentURL === 'https://shinycolors.enza.fun/produce/?a=#') {
            window.history.back();
        }
    }
    // Function to add buttons
    function addButtons() {
        // Check if buttons already exist on the page
        if (document.querySelector('.custom-button')) {
            return;
        }

        // Create buttons
        const button = document.createElement('button');

        // Add class to buttons for identification
        button.classList.add('custom-button');
        button.style.cssText = `
            position: fixed;
            bottom: 3vw;
            left: 47vw;
            opacity: 0.4;
            background-color: gray;
            border: none;
            padding: 0;
            cursor: pointer;
            width: 6vw;
            height: 6vw;
            z-index: 9999;
        `;

        if (/Mobi|Android/i.test(navigator.userAgent)) {
            button.addEventListener('touchstart', function() {
            handleButtonClick();
        });
        } else {
            button.addEventListener('click', function() {
            handleButtonClick();
        });
        }

        // Add buttons to the page
        document.body.appendChild(button);
    }

    // Function to check and update buttons when URL changes
    function checkAndAddButtons() {
        const currentURL = window.location.href;
        if (currentURL.includes('produce') && !currentURL.includes('produceReady')) {
            addButtons();
        }
    }

    // Observe changes to the URL and add buttons if necessary
    const urlObserver = new MutationObserver(checkAndAddButtons);
    const observerConfig = { childList: true, subtree: true };
    urlObserver.observe(document.documentElement, observerConfig);
})();
