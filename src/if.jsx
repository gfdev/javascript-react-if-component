var React = require('react');

module.exports = React.createClass({
    displayName: 'if',
    propTypes: {
        if: React.PropTypes.bool.isRequired
        //children: React.PropTypes.arrayOf(
        //    React.PropTypes.oneOfType([
        //        React.PropTypes.instanceOf(Then),
        //        React.PropTypes.instanceOf(Else)
        //    ]))
    },
    render: function() {
        React.Children.forEach(this.props.children, child => {

        });

        return (
            <div></div>
        );
    }
});
