# Eclipse Theia Examples
This repository contains examples on how to do different things in Eclipse Theia.

## Getting started

Install [nvm](https://github.com/creationix/nvm#install-script).

    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash

Install npm and node.

    nvm install 8
    nvm use 8

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

Launch `Start Browser Backend` configuration from VS code.

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