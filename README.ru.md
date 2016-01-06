# [React](http://facebook.github.io/react/) IF компонент

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
var Node = require('react-if-component');

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
$ npm install --save react-if-component
```
* Bower
```shell
$ bower install --save react-if-component
```

## Примеры использования


## Лицензия
**react-if-component** распространяется под лицензией **MIT**.
