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
                <Block if={true}>
                    <Block then>

                    </Block>
                    <Block else>

                    </Block>
                </Block>

                <Block if={true}
                       then='ABC'
                       else='DEF' />
                <Block if={false} then='ABC' else='DEF' />
                <Block if={true} then={+123+1} else={456} />
                <Block if={false} then={+123+1} else={456+1} />
                <Block if={true} then='<div>DIV</div>' else='<div>DIV</div>' />
                <Block if={true} then={<div>DIV</div>} else={<div>DIV</div>} />

                <Block if={true} then={<Bar />} else={<Foo />} />
                <Block if={true} then={Bar} else={Foo} />

                <Block if={true}>
                    <div><b>BLOCK</b></div>
                </Block>

                <Block if={true}>
                    <b>BLOCK1</b>
                    <b>BLOCK1</b>
                    <div><b>BLOCK5</b></div>
                    <div><b>BLOCK5</b></div>
                </Block>

                <Block if={true}>
                    <div>DEF</div>
                    <div>
                        <Block if={true} then='abc' else={123} />
                        <Block if={false} then='abc' else={123} />
                    </div>
                </Block>

                <Block if={true} />

                {/**/}
            </div>
        );
    }
});

ReactDOM.render(<Index />, document.getElementById('body'));
