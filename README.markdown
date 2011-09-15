# jTools for Google Chrome

- **Version:** *0.1*
- **Author:** *Jon Cairns (jon@joncairns.com)*
- **Website:** *http://joncairns.com*

## Introduction

jTools is an extension for the Google Chrome web browser, which allows for analysis
of web pages using jQuery. You can either get jQuery selectors by clicking on page
elements, or you can execute a selector to see whether anything matches.

This can be used for anything, really, but it was created with web developers in mind:
it can be useful to see how certain pages are built, and there doesn't seem to be
any other extension out there that does it using jQuery selectors.

## How to install

First clone this repository to somewhere on your computer. In Google Chrome, go
to `Menu > Tools > Extensions`, and click *Load unpacked extension...* at the top
of the page (if you don't see this, you may need developer tools enabled). Select
the jTools directory that was created after doing the clone, and it should be enabled!

## How to use

jTools has two modes: page analysis and selector execution.

1. **Page analysis:** On every page you should see a jQuery logo at the bottom
right of the screen. Clicking this puts jTools into analysis mode, and it opens
a panel. Hover your mouse over parts of the page to see the jQuery selector for
that element - the element will be highlighted with a red border. Click on the element
to show a breakdown of all the constituent parts of the selector. You can then
disable and enable parts of the selector by clicking on the buttons at the bottom.
If any other elements match the selector they will also be highlighted.

2. **Selector execution:** At the top right of the Chrome toolbar there is a jQuery
button. Click this to open a text box. If you type a jQuery selector such as `div p`
into this box, the selector will then be executed on the page, and the elements
that match will be highlighted.

## Other stuff

jTools was written by Jon Cairns (jon@joncairns.com). I'm releasing it under the
GNU license, so feel free to contribute and use it for any purpose (preferably
good, not evil).

If you use this software for anything interesting, please let me know!
