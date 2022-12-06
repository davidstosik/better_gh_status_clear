---
lang: en
layout: default
title: ""
---

## What does this solve?

GitHub only provides a few options to automatically clear one's status in the future:

<img src="{{site.baseurl}}/static/gh-default-status-clear.png" alt="Default GH status clear screenshot" width="458" />

This can be annoying if for example, one wants to set a "busy" status for a couple weeks in a row, or even until a later day in the week.

The bookmarklet provided below replaces the limited option with a date and a time picker, which provide complete flexibility in how to set when that GitHub status will be cleared.

<img src="{{site.baseurl}}/static/better-gh-status-clear.png" alt="Better GH status clear screenshot" width="458" />

Going on a long weekend, and want to be marked away until your return on Tuesday morning, 9am? You can do so now!

## How to use?

### Install

You can install the bookmarklet by adding it to your browser's bookmarks.
The simplest way to do so is to drag'n'drop the button below to your bookmarks bar.

{% capture bookmarklet %}{% include_relative bookmarklet.js %}{% endcapture %}

[**Better GH status clear**](javascript:{{ bookmarklet | strip_newlines | escape | replace: "|", "%7C" }})

⬆️  Drag and drop the button above to your bookmarks!

### Use

After opening the "Set status" modal window on GitHub, click on the bookmarklet in your browser to replace the date/time picker.

You can now select freely the date and time at which to clear your GitHub status!

### Video

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/i_ZYsciQHog" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## What is a bookmarklet?

According to Wikipedia's page on [Bookmarklet](https://en.wikipedia.org/wiki/Bookmarklet):

> A bookmarklet is a bookmark stored in a web browser that contains JavaScript commands that add new features to the browser.

## Source code

The bookmarklet's source code can be checked below, as well as on [GitHub](https://github.com/davidstosik/better_gh_status_clear):

```js
{{ bookmarklet }}
```
