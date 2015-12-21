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
        var total = React.Children.count(this.props.children),
            result = total && this.props.if
                    ? this.props.children
                : this.props.if
                    ? this.props.then
                : this.props.else
                    ? this.props.else
                : null;

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
