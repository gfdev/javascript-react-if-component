'use strict';

var expect = require('chai').expect
    , React = require('react')
    , ReactDOMServer = require('react-dom/server')
    , Node = require('../src/if.jsx')
    , nullElement = '<noscript></noscript>'
;

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

function test(el, eq) {
    return expect(ReactDOMServer.renderToStaticMarkup(el)).equal(eq);
}

describe('React IF component testing:', function() {
    it('simple empty component', function() {
        test(<Node />, nullElement);
        test(<Node if={true} />, nullElement);
        test(<Node then='1' />, nullElement);
        test(<Node else='1' />, nullElement);
        test(<Node Foo='1' />, nullElement);
    });

    it('simple else/then component', function() {
        test(<Node if={!!1} then='Foo' />, '<span>Foo</span>');
        test(<Node if={!!0} else='Foo'/>, '<span>Foo</span>');
        test(<Node if={!!0} then='Foo' />, nullElement);
        test(<Node if={!!1} else='Foo'/>, nullElement);
    });

    it('simple both else/then component', function() {
        test(<Node if={!!1} then='Foo' else='Bar' />, '<span>Foo</span>');
        test(<Node if={!!0} then='Foo' else='Bar'/>, '<span>Bar</span>');
    });

    it('simple expression component', function() {
        test(<Node if={!!1} then={1 + 1} />, '<span>2</span>');
        test(<Node if={!!1} then={true} />, '<span></span>');
    });

    it('simple function component', function() {
        test(<Node if={!!1} then={function() { return 5 + 5; }} />, '<span>10</span>');
        test(<Node if={!!1} then={function() { return 3 + 3; }()} />, '<span>6</span>');
        test(<Node if={!!1} then={function() { return Bar; }} />, '<b>Bar</b>');
        test(<Node if={!!1} then={function() { return Foo; }()} />, '<b>Foo</b>');
    });

    it('simple component with tags', function() {
        test(<Node if={!!1} then='<b>Bar</b>' />, '<span>&lt;b&gt;Bar&lt;/b&gt;</span>');
        test(<Node if={!!1} then={<b>Bar</b>} />, '<b>Bar</b>');
    });

    it('simple component with component', function() {
        test(<Node if={!!1} then={<Bar />} />, '<b>Bar</b>');
        test(<Node if={!!1} then={Bar} />, '<b>Bar</b>');
    });

    it('empty component', function() {
        test(<Node if={!!1}></Node>, nullElement);
        test(<Node if={!!0}></Node>, nullElement);
        test(<Node if={!!1}><Node else>Bar</Node></Node>, nullElement);
        test(<Node if={!!0}><Node then>Bar</Node></Node>, nullElement);
    });

    it('text component', function() {
        test(<Node if={!!1}>Foo</Node>, '<span>Foo</span>');
        test(<Node if={!!0}>Foo</Node>, nullElement);
    });

    it('component with tags', function() {
        test(<Node if={!!1}><b>Bar</b></Node>, '<b>Bar</b>');
        test(<Node if={!!1}>&lt;b&gt;Bar&lt;/b&gt;</Node>, '<span>&lt;b&gt;Bar&lt;/b&gt;</span>');
    });

    it('component with expression', function() {
        test(<Node if={!!1}>{3 + 3}</Node>, '<span>6</span>');
    });

    it('component with another component', function() {
        test(<Node if={!!1}><Bar /></Node>, '<b>Bar</b>');
    });

    it('component with then/esle blocks', function() {
        test(
            <Node if={!!1}>
                <Node then>Bar</Node>
            </Node>
            , '<span>Bar</span>'
        );
        test(
            <Node if={!!0}>
                <Node else>Foo</Node>
            </Node>
            , '<span>Foo</span>'
        );
        test(
            <Node if={!!1}>
                <Node then>Bar</Node>
                <Node else>Foo</Node>
            </Node>
            , '<span>Bar</span>'
        );
        test(
            <Node if={!!0}>
                <Node then>Bar</Node>
                <Node else>Foo</Node>
            </Node>
            , '<span>Foo</span>'
        );
    });

    it('component with other tags', function() {
        test(
            <Node if={!!1}>
                <Node then><div>Foo</div></Node>
            </Node>
            , '<div>Foo</div>'
        );
    });

    it('component with other component', function() {
        test(
            <Node if={!!1}>
                <Node then><Bar /></Node>
            </Node>
            , '<b>Bar</b>'
        );
    });

    it('component with embedded blocks', function() {
        test(
            <Node if={!!1}>
                <Node if={!!1} then='Bar' />
            </Node>
            , '<span>Bar</span>'
        );
        test(
            <Node if={!!1}>
                <Node if={!!1}>
                    <Node then>Bar</Node>
                </Node>
            </Node>
            , '<span>Bar</span>'
        );
    });

    it('component with multiple embedded blocks', function() {
        test(
            <Node if={!!1}>
                <Node if={!!1} then='Bar' />
                <Node if={!!1} then='Foo' />
            </Node>
            , '<div><span>Bar</span><span>Foo</span></div>'
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
            , '<div><span>Bar</span><span>Foo</span></div>'
        );
        test(
            <Node if={!!1}>
                <Node if={!!1} then='Bar' else='Foo' />
                <Node if={!!0} then={123+4} else={456+7} />
            </Node>
            , '<div><span>Bar</span><span>463</span></div>'
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
            , '<div>Bar<b>Bar</b><span>Bar</span><i>Bar</i><i>Foo</i><b>Bar</b><b>Foo</b></div>'
        );
    });
});
