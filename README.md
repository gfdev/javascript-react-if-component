# [React](http://facebook.github.io/react/) IF component
[![npm version](https://badge.fury.io/js/react-if-comp.svg)](https://www.npmjs.com/package/react-if-comp) [![Build Status](https://travis-ci.org/gfdev/javascript-react-if-component.svg?branch=master)](https://travis-ci.org/gfdev/javascript-react-if-component) [![Dependency Status](https://david-dm.org/gfdev/javascript-react-if-component/status.svg)](https://david-dm.org/gfdev/javascript-react-if-component#info=dependencies) [![devDependency Status](https://david-dm.org/gfdev/javascript-react-if-component/dev-status.svg)](https://david-dm.org/gfdev/javascript-react-if-component#info=devDependencies)

> React component for conditional rendering.

## Description
In React component code you can often deal with construction like this (example from [here](https://facebook.github.io/react/tips/if-else-in-JSX.html)):
```javascript
var loginButton;
if (loggedIn) {
  loginButton = <LogoutButton />;
} else {
  loginButton = <LoginButton />;
}

return (
  <nav>
    <Home />
    {loginButton}
  </nav>
);
```
With help of **React IF component** you can replace it with:
```javascript
return (
  <nav>
    <Home />
    <Node if={loggedIn}>
      <Node then><LogoutButton /></Node>
      <Node else><LoginButton /></Node>
    </Node>
  </nav>
);
// or
return (
  <nav>
    <Home />
    <Node if={loggedIn} then={LogoutButton} else={LoginButton} />
  </nav>
);
```

## Install
* NPM
```shell
$ npm install --save react-if-comp
```

## Usage
```javascript
var React = require('react')
  , ReactDOM = require('react-dom')
  , Node = require('react-if-comp')
;

var Bar = React.createClass({
    render: function() {
        return (
            <b>Bar</b>
        );
    }
});

var Foo = React.createClass({
    render: function() {
        return (
            <b>Foo</b>
        );
    }
});

var Index = React.createClass({
    render: function() {
        return (
            <div>
              <Node if={true} then='true' />
              <Node if={true} then={1+1} />
              <Node if={true} then={Bar} />
              <Node if={true} then={<Bar prop='test' />} />
              <Node if={true} then={function() { return 'test'; }} />

              <Node if={true} then='true' else='false' />
              <Node if={false} then='true' else='false' />

              <Node if={true} then={1+1} else={0+0} />
              <Node if={false} then={1+1} else={0+0} />

              <Node if={true} then={Bar} else={Foo} />
              <Node if={false} then={Bar} else={Foo} />

              <Node if={true} then={<Bar one='1' two='2' />} else={<Foo one='1' two='2' />} />
              <Node if={false} then={<Bar one='1' two='2' />} else={<Foo one='1' two='2' />} />

              <Node if={true}>
                <b>true</b>
              </Node>

              <Node if={false}>
                <Node else><b>false</b></Node>
              </Node>

              <Node if={true}>
                <Node then><b>true</b></Node>
                <Node else><b>false</b></Node>
              </Node>

              <Node if={true}>
                <i>begin</i>
                <Node then><b>true</b></Node>
                <Node else><b>false</b></Node>
                <i>end</i>
              </Node>

              <Node if={true}>
                <b>true</b>
                <Node if={true} then='true' />
              </Node>
            </div>
        );
    }
});

ReactDOM.render(<Index />, document.getElementById('body'));
```

## License
**react-if-component** is released under the **MIT** license.
