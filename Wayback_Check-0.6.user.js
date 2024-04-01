// ==UserScript==
// @name         Archive.org Status Checker
// @namespace    https://www.brainhub24.com
// @version      0.6
// @description  Check if the current website is already present on archive.org, if not you will get a negative status with some instructions.
// @author       Jan Gebser (Brainhub24.com)
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    // Function to check if the current page is archived @archive.org
    function checkArchive(url) {
        // Construct the API URL for checking if the URL is archived
        var apiUrl = 'https://archive.org/wayback/available?url=' + encodeURIComponent(url);

        // Make a GET request to the API
        GM_xmlhttpRequest({
            method: 'GET',
            url: apiUrl,
            onload: function(response) {
                var data = JSON.parse(response.responseText);
                // Check if the URL is archived
                if (data.archived_snapshots && data.archived_snapshots.closest) {
                    // URL is archived
                    displayBanner('This website is present @archive.org 😎', 'rgba(255, 255, 255, 0.7)');
                } else {
                    // URL is not archived
                    displayBanner('This website is not present @archive.org 🧐', 'rgba(255, 255, 255, 0.7)');
                }
            }
        });
    }

    // Function to display the banner
    function displayBanner(text, backgroundColor) {
        var banner = document.createElement('div');
        banner.innerHTML = text;
        banner.style.position = 'fixed';
        banner.style.bottom = '0';
        banner.style.left = '0';
        banner.style.width = '100%';
        banner.style.backgroundColor = backgroundColor;
        banner.style.color = '#000000'; // Text color changed to black
        banner.style.textAlign = 'center';
        banner.style.padding = '10px';
        banner.style.zIndex = '999';
        banner.style.backdropFilter = 'blur(5px)';

        // Close button
        var closeButton = document.createElement('span');
        closeButton.innerHTML = '×';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '5px';
        closeButton.style.right = '10px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.fontSize = '20px';
        closeButton.style.fontWeight = 'bold';
        closeButton.addEventListener('click', function() {
            banner.parentNode.removeChild(banner);
        });
        banner.appendChild(closeButton);

        document.body.appendChild(banner);

        // Create hamburger menu
        var hamburgerMenu = document.createElement('div');
        hamburgerMenu.innerHTML = `
            <div id="hamburger-menu" style="position: fixed; bottom: 10px; left: 10px; width: 30px; height: 30px; cursor: pointer; z-index: 999;">
                <div style="width: 100%; height: 4px; background-color: #000000; margin: 5px 0;"></div>
                <div style="width: 100%; height: 4px; background-color: #000000; margin: 5px 0;"></div>
                <div style="width: 100%; height: 4px; background-color: #000000; margin: 5px 0;"></div>
            </div>
        `;
        document.body.appendChild(hamburgerMenu);

        // Create start menu
        var startMenu = document.createElement('div');
        startMenu.innerHTML = `
            <div id="start-menu" style="display: none; position: fixed; bottom: 50px; left: 10px; width: 200px; background-color: #ffffff; padding: 10px; border: 1px solid #000000; z-index: 998; backdrop-filter: blur(5px); transition: all 0.3s ease;">
                <h3>Webservice</h3>
                <ul>
                    <li><a href="https://seo.webservice.digital/">Create SEO-Reports</a></li>
                    <li><a href="https://github.com/Brainhub24/Web-Archiv-Status">Visit the reporsitory</a></li>
                </ul>
            </div>
        `;
        document.body.appendChild(startMenu);

        // Toggle start menu on hamburger menu click
        var hamburger = document.getElementById('hamburger-menu');
        var startMenuElement = document.getElementById('start-menu');
        hamburger.addEventListener('click', function() {
            if (startMenuElement.style.display === 'none') {
                startMenuElement.style.display = 'block';
            } else {
                startMenuElement.style.display = 'none';
            }
        });
    }

    // Check if the current page is archived
    checkArchive(window.location.href);
})();
