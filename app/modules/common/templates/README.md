# <%= name %>

## Installation

- Install [node](http://nodejs.org)
- `npm install`<% if (!!tech.bower) { %>
- `npm install -g bower`
- `bower install`<% } %><% if (structure === 'php') { %>
- Install [composer](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx)<% } %>

## Running
- `npm run build [TARGET] # target may be "dev" or "prod"`
- `npm run start # server is also an accepted script`

## Test

- `npm run test`
