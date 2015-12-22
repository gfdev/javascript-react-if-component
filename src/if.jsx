var React = require('react'),
    types = ['bool', 'func','node'].map(name => React.PropTypes[name]);

var IF = React.createClass({
    displayName: 'IF',
    propTypes: {
        //'if': React.PropTypes.bool.isRequired,
        'if': React.PropTypes.bool,
        then: React.PropTypes.oneOfType(types),
        'else': React.PropTypes.oneOfType(types)
    },
    render: function() {
        var total = React.Children.count(this.props.children),
            result = null,
            blockThen, blockElse;

        if (total) {
            React.Children.forEach(this.props.children, child => {
                if (child.type === IF) {
                    if (!('if' in child.props)) {
                        if (child.props.then) blockThen = child;
                        if (child.props.else) blockElse = child;
                    }
                }
            });

            if (this.props.if) {
                result = blockThen;
            } else {
                result = blockElse;
            }
        }

        //return null;
        //
        //var result = total && this.props.if
        //            ? this.props.children
        //        : this.props.if
        //            ? this.props.then
        //        : this.props.else
        //            ? this.props.else
        //        : null;

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

module.exports = IF;
