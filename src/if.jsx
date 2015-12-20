var React = require('react');

module.exports = React.createClass({
    displayName: 'if',
    propTypes: {
        if: React.PropTypes.bool.isRequired
        //children: React.PropTypes.arrayOf(
        //    React.PropTypes.oneOfType([
        //    ]))
    },
    render: function() {
        if (React.Children.count(this.props.children)) {
            React.Children.forEach(this.props.children, child => {
                console.log(child);
            });
        } else {

        }

        return (
            <div></div>
        );
    }
});
