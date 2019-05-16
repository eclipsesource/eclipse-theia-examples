# Eclipse Theia Examples
[![Build Status](https://travis-ci.org/eclipsesource/eclipse-theia-examples.svg?branch=master)](https://travis-ci.org/eclipsesource/eclipse-theia-examples)

This repository contains code examples for common extension scenarios, e.g. adding a menu contribution, in Eclipse Theia. 

## Getting started

Install [node](https://nodejs.org/en/).

Install yarn.

    npm install -g yarn
## Install dependencies

    yarn

## Running the browser example

    yarn rebuild:browser
    cd browser-app
    yarn start

Open http://localhost:3000 in the browser.

## Running the Electron example

    yarn rebuild:electron
    cd electron-app
    yarn start

## Developing with the browser example

Go to Tasks -> Run Task... and select `Theia Examples: Browser Development` in VS code.

Open http://localhost:3000 in the browser.

## Developing with the Electron example

Start watching of label-contribution-example.

    cd label-contribution-example
    yarn watch

Start watching of editor-example.

    cd editor-example
    yarn watch

Start watching of command-example.

    cd command-example
    yarn watch

Start watching of the electron example.

    yarn rebuild:electron
    cd electron-app
    yarn watch

Launch `Start Electron Backend` configuration from VS code.

 ## License
This project is licensed under the MIT License. See the [LICENSE file](https://github.com/eclipsesource/eclipse-theia-examples/blob/master/LICENSE) for more information.
