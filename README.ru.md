# [React](http://facebook.github.io/react/) IF компонент

> React компонент для условного отображения вложенных элементов или свойств

## Использование

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
с помощью этого компонента такие конструкции можно заменить следующим образом:

```javascript
var Node = require('react-if-component');

return (
  <nav>
    <Home />
    <Node if={loggedIn} then={LogoutButton} else={LoginButton}>
  </nav>
);
```
