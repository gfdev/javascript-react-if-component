var Block = require('../if')
;

require('./index.scss');

var Index = React.createClass({
    render: function() {
        return (
            <div>
                <Block if={true} then='ABC' />

                <Block if={true}>
                    <b>BLOCK</b>
                </Block>

                <Block if={true}>
                    <b>BLOCK1</b>
                    <b>BLOCK1</b>
                    <b>BLOCK1</b>
                </Block>

                <Block if={true}>
                    <div>
                        <Block if={true} then='abc' />
                    </div>
                </Block>
            </div>
        );
    }
});

ReactDOM.render(<Index />, document.getElementById('body'));
