'use strict';

var React = require('react')
    , types = ['bool', 'func', 'node'].map(name => React.PropTypes[name])
;

function _getResult(result) {
    if (/^(?:string|number|boolean)$/i.test(typeof result))
        return React.createElement('span', null, result);

    if (React.isValidElement(result))
        return result;

    if (typeof result === 'function') {
        if (typeof result.prototype.render === 'function')
            return React.createElement(result);

        return _getResult(result());
    }
}

var IF = React.createClass({
    displayName: 'IF',
    propTypes: {
        if: React.PropTypes.bool,
        then: React.PropTypes.oneOfType(types),
        else: React.PropTypes.oneOfType(types)
    },
    render: function() {
        var props = this.props,
            total = React.Children.count(props.children),
            result = [];

        if ((props.if && !total && !props.then) || (!props.if && !total && !props.else))
            return null;

        if (total) {
            React.Children.forEach(props.children, child => {
                if (child.type === IF) {
                    if (!('if' in child.props)) {
                        if (props.if && child.props.then) result.push(child.props.children);
                        if (!props.if && child.props.else) result.push(child.props.children);
                    } else {
                        result.push(child)
                    }
                } else {
                    if (props.if) result.push(child);
                }
            });
        } else {
            if ('if' in props) {
                if (props.if && props.then) result.push(props.then);
                if (!props.if && props.else) result.push(props.else);
            }
        }

        return !result.length ? null
            : result.length === 1 ? _getResult(result.shift())
            : React.createElement('div', null, result);
    }
});

module.exports = IF;
