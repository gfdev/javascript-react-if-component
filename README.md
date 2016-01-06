# [React](http://facebook.github.io/react/) IF component

> React component for conditional rendering of embedded elements or props

## Description
In React component code you can often deal with construction like this:
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
With help of **React IF component** you can replace such construction:
```javascript
var Node = require('react-if-component');

return (
  <nav>
    <Home />
    <Node if={loggedIn} then={LogoutButton} else={LoginButton}>
  </nav>
);
```
## Install
* NPM
```shell
$ npm install --save react-if-component
```
* Bower
```shell
$ bower install --save react-if-component
```

## Usage


## License
**react-if-component** is released under the **MIT** license.
