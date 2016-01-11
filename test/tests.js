'use strict';

var expect = require('chai').expect
    , React = require('react')
    , version = +React.version.substring(0, React.version.lastIndexOf('.'))
    , Node = require('..')
;

var Empty = React.createClass({
    render: function() {
        return null;
    }
});

var Bar = React.createClass({
    render: function() {
        return (
            <b>Bar</b>
        );
    }
});

var Foo = React.createClass({
    render: function() {
        return (
            <b>Foo</b>
        );
    }
});

var render = (
        version <= 0.13 ? React : require('react-dom/server')
    )[
        version <= 0.11 ? 'renderComponentToStaticMarkup' : 'renderToStaticMarkup'
    ];

function test(el, eq) {
    return expect(render(el)).equal(eq);
}

function createRender(func, props) {
    return render(
        React.createElement(
            React.createClass({
                render: func
            }),
            props
        )
    );
}

describe('React IF component testing:', function() {
    it('simple empty component', function() {
        test(<Node />, render(<Empty />));
        test(<Node if={true} />, render(<Empty />));
        test(<Node then='1' />, render(<Empty />));
        test(<Node else='1' />, render(<Empty />));
        test(<Node Foo='1' />, render(<Empty />));
    });

    it('simple else/then component', function() {
        test(<Node if={!!1} then='Foo' />, render(<span>Foo</span>));
        test(<Node if={!!0} else='Foo'/>, render(<span>Foo</span>));
        test(<Node if={!!0} then='Foo' />, render(<Empty />));
        test(<Node if={!!1} else='Foo'/>, render(<Empty />));
    });

    it('simple both else/then component', function() {
        test(<Node if={!!1} then='Foo' else='Bar' />, render(<span>Foo</span>));
        test(<Node if={!!0} then='Foo' else='Bar'/>, render(<span>Bar</span>));
    });

    it('simple expression component', function() {
        test(<Node if={!!1} then={1 + 1} />, render(<span>{1 + 1}</span>));
        test(<Node if={!!1} then={true} />, render(<span>{true}</span>));
    });

    it('simple function component', function() {
        test(<Node if={!!1} then={function() { return 5 + 5; }} />, render(<span>{(() => 5 + 5)()}</span>));
        test(<Node if={!!1} then={function() { return 3 + 3; }()} />, render(<span>{(() => 3 + 3)()}</span>));
        test(<Node if={!!1} then={function() { return Bar; }} />, render(<Bar />));
        test(<Node if={!!1} then={function() { return Foo; }()} />, render(<Foo />));
    });

    it('simple component with tags', function() {
        test(<Node if={!!1} then='<b>Bar</b>' />, render(<span>&lt;b&gt;Bar&lt;/b&gt;</span>));
        test(<Node if={!!1} then={<b>Bar</b>} />, render(<b>Bar</b>));
    });

    it('simple component with component', function() {
        test(<Node if={!!1} then={<Bar />} />, render(<Bar />));
        test(<Node if={!!1} then={Bar} />, render(<Bar />));
    });

    it('simple multiple components', function() {
        test(<div>
                <Node if={!!1} then='Bar' />
                <Node if={!!1} then='Foo' />
            </div>
            , render(<div><span>Bar</span><span>Foo</span></div>)
        );

        test(
            <Node if={!!1} then={[<span>Bar</span>, 'Foo', <span>Baz</span>]} />
            , render(<div><span>Bar</span>Foo<span>Baz</span></div>)
        );
    });

    it('empty component', function() {
        test(<Node if={!!1}></Node>, render(<Empty />));
        test(<Node if={!!0}></Node>, render(<Empty />));
        test(<Node if={!!1}><Node else>Bar</Node></Node>, render(<Empty />));
        test(<Node if={!!0}><Node then>Bar</Node></Node>, render(<Empty />));
    });

    it('text component', function() {
        test(<Node if={!!1}>Foo</Node>, render(<span>Foo</span>));
        test(<Node if={!!0}>Foo</Node>, render(<Empty />));
    });

    it('component with tags', function() {
        test(<Node if={!!1}><b>Bar</b></Node>, render(<b>Bar</b>));
        test(<Node if={!!1}>&lt;b&gt;Bar&lt;/b&gt;</Node>, render(<span>&lt;b&gt;Bar&lt;/b&gt;</span>));
    });

    it('component with expression', function() {
        test(<Node if={!!1}>{3 + 3}</Node>, render(<span>{3 + 3}</span>));
    });

    it('component with another component', function() {
        test(<Node if={!!1}><Bar /></Node>, render(<Bar />));
    });

    it('component with then/esle blocks', function() {
        test(
            <Node if={!!1}>
                <Node then>Bar</Node>
            </Node>
            , render(<span>Bar</span>)
        );
        test(
            <Node if={!!0}>
                <Node else>Foo</Node>
            </Node>
            , render(<span>Foo</span>)
        );
        test(
            <Node if={!!1}>
                <Node then>Bar</Node>
                <Node else>Foo</Node>
            </Node>
            , render(<span>Bar</span>)
        );
        test(
            <Node if={!!0}>
                <Node then>Bar</Node>
                <Node else>Foo</Node>
            </Node>
            , render(<span>Foo</span>)
        );
    });

    it('component with other tags', function() {
        test(
            <Node if={!!1}>
                <Node then><div>Foo</div></Node>
            </Node>
            , render(<div>Foo</div>)
        );
    });

    it('component with other component', function() {
        test(
            <Node if={!!1}>
                <Node then><Bar /></Node>
            </Node>
            , render(<Bar />)
        );
    });

    it('component with embedded blocks', function() {
        test(
            <Node if={!!1}>
                <Node if={!!1} then='Bar' />
            </Node>
            , render(<span>Bar</span>)
        );
        test(
            <Node if={!!1}>
                <Node if={!!1}>
                    <Node then>Bar</Node>
                </Node>
            </Node>
            , render(<span>Bar</span>)
        );
    });

    it('component with multiple embedded blocks', function() {
        test(
            <Node if={!!1}>
                <Node if={!!1} then='Bar' />
                <Node if={!!1} then='Foo' />
            </Node>
            , render(<div><span>Bar</span><span>Foo</span></div>)
        );
        test(
            <Node if={!!1}>
                <Node if={!!1}>
                    <Node then>Bar</Node>
                </Node>
                <Node if={!!0}>
                    <Node else>Foo</Node>
                </Node>
            </Node>
            , render(<div><span>Bar</span><span>Foo</span></div>)
        );
        test(
            <Node if={!!1}>
                <Node if={!!1} then='Bar' else='Foo' />
                <Node if={!!0} then={123+4} else={456+7} />
            </Node>
            , render(<div><span>Bar</span><span>463</span></div>)
        );
    });

    it('multiple components', function() {
        test(<div>
                <Node if={true} then={[<span>Bar</span>, 'Foo', <span>Baz</span>]} />
                <Node if={true} then={[<span>Bar</span>, 'Foo', <span>Baz</span>]} />
            </div>
            , render(<div><div><span>Bar</span>Foo<span>Baz</span></div><div><span>Bar</span>Foo<span>Baz</span></div></div>)
        );
    });

    it('custom components', function() {
        test(
            <Node if={!!1}>
                Bar
                <Bar />
                <Node then>
                    <Node if={!!1} then='Bar' else='Foo' />
                    <Node if={!!0}>
                        Bar
                        <Node else><i>Bar</i></Node>
                    </Node>
                </Node>
                <i>Foo</i>
                <Bar />
                <Foo a={1} b={2} />
            </Node>
            , render(<div>Bar<b>Bar</b><span>Bar</span><i>Bar</i><i>Foo</i><b>Bar</b><b>Foo</b></div>)
        );
        test(
            <Node if={true}>
                <Node if={!!1} then={[<span>Case 1</span>, 'Case 2', <span>Case 3</span>]} />
                Case 4
            </Node>
            , render(<div><div><span>Case 1</span>Case 2<span>Case 3</span></div>Case 4</div>)
        );

        test(
            <Node if={!!1} then={<div><Bar /></div>} />
            , render(<div>{true && <Bar />}</div>)
        );

        test(
            <Node if={!!1} then={<div><span>Case 1</span></div>} else={<div><span>Case 2</span></div>} />
            , createRender(function() {
                var element,
                    props = this.props;

                return (
                    <div>
                        {(() => {
                            if (!props.myProp) {
                                element = <span>Case 1</span>;
                            } else {
                                element = <span>Case 2</span>;
                            }
                        })()}

                        {element}
                    </div>
                );
            }, { myProp: false })
        );

        test(
            <Node if={!!0} then={[<span>Case 1</span>]} else={[<span>Case 2</span>]} />
            , createRender(function() {
                var element,
                    props = this.props;

                return (
                    <div>
                        {(() => {
                            if (!props.myProp) {
                                element = <span>Case 1</span>;
                            } else {
                                element = <span>Case 2</span>;
                            }
                        })()}

                        {element}
                    </div>
                );
            }, { myProp: true })
        );
    });
});
