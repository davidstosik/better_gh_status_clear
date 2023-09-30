// ==UserScript==
// @name        Better GH status clear
// @namespace   https://github.com/davidstosik
// @match       https://github.com/*
// @grant       none
// @version     1.3
// @author      David Stosik
// @description Freely pick when your GitHub status clears!
// @require     https://cdn.jsdelivr.net/npm/@violentmonkey/dom@2
// @require     https://github.com/davidstosik/better_gh_status_clear/raw/main/better-github-status-clear.js
// ==/UserScript==

VM.observe(document.body, () => { BetterGitHubStatusClear.run(); });
