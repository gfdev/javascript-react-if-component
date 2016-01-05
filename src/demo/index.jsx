'use strict';

var Block = require('../if')
;

require('./index.scss');

var Bar = React.createClass({
    render: function() {
        return (
            <div>BAR</div>
        );
    }
});

var Foo = React.createClass({
    render: function() {
        return (
            <div>FOO</div>
        );
    }
});

var Index = React.createClass({
    render: function() {
        return (
            <div>

            </div>
        );
    }
});

ReactDOM.render(<Index />, document.getElementById('body'));
