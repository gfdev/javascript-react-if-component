var React = require('react'),
    types = ['func','node'].map(name => React.PropTypes[name]);

module.exports = React.createClass({
    displayName: 'IF',
    propTypes: {
        'if': React.PropTypes.bool.isRequired,
        then: React.PropTypes.oneOfType(types),
        'else': React.PropTypes.oneOfType(types)
    },
    render: function() {
        var result = null,
            total = React.Children.count(this.props.children);

        if (total) {
            if (this.props.if) result = this.props.children;
        } else {
            if (this.props.if) {
                result = this.props.then;
            } else if (this.props.else) {
                result = this.props.else;
            }
        }

        return result
            ? total
                ? React.createElement('div', null, result)
            : React.isValidElement(result)
                ? result
            : typeof result === 'function'
                ? React.createElement(result, null)
            : React.createElement('span', null, result)
            : null;
    }
});
