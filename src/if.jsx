var React = require('react'),
    types = ['bool', 'func','node'].map(name => React.PropTypes[name]);

var IF = React.createClass({
    displayName: 'IF',
    propTypes: {
        if: React.PropTypes.bool,
        then: React.PropTypes.oneOfType(types),
        else: React.PropTypes.oneOfType(types)
    },
    render: function() {
        var total = React.Children.count(this.props.children),
            result = [];

        if (total) {
            React.Children.forEach(this.props.children, child => {
                if (child.type === IF) {
                    if (!('if' in child.props)) {
                        if (this.props.if && child.props.then) result.push(child);
                        if (!this.props.if && child.props.else) result.push(child);
                    } else {
                        result.push(child)
                    }
                } else {
                    if (this.props.if) result.push(child);
                }
            });
        } else {
            if (this.props.if && this.props.then) result.push(this.props.then);
            if (!this.props.if && this.props.else) result.push(this.props.else);
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
