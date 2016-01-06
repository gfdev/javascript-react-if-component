# [React](http://facebook.github.io/react/) IF компонент
[![Build Status](https://travis-ci.org/gfdev/javascript-react-if-component.svg?branch=master)](https://travis-ci.org/gfdev/javascript-react-if-component) [![Dependency Status](https://david-dm.org/gfdev/javascript-react-if-component/status.svg)](https://david-dm.org/gfdev/javascript-react-if-component#info=dependencies) [![devDependency Status](https://david-dm.org/gfdev/javascript-react-if-component/dev-status.svg)](https://david-dm.org/gfdev/javascript-react-if-component#info=devDependencies)

> React компонент для условного отображения вложенных элементов или свойств

## Описание
В коде React компонентов часто встречаются конструкции вида:
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
С помощью этого компонента такие конструкции можно заменить следующим образом:
```javascript
var Node = require('react-if-comp');

return (
  <nav>
    <Home />
    <Node if={loggedIn} then={LogoutButton} else={LoginButton} />
  </nav>
);
```

## Установка
* NPM
```shell
$ npm install --save react-if-comp
```
* Bower
```shell
$ bower install --save react-if-comp
```

## Примеры использования
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

## Лицензия
**react-if-comp** распространяется под лицензией **MIT**.
