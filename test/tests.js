'use strict';

var expect = require('chai').expect
    , React = require('react')
    , ReactDOMServer = require('react-dom/server')
    , El = require('../src/if.jsx')
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
        test(<El />, nullElement);
        test(<El if={true} />, nullElement);
        test(<El then='1' />, nullElement);
        test(<El else='1' />, nullElement);
        test(<El Foo='1' />, nullElement);
    });

    it('simple else/then component', function() {
        test(<El if={!!1} then='Foo' />, '<span>Foo</span>');
        test(<El if={!!0} else='Foo'/>, '<span>Foo</span>');
        test(<El if={!!0} then='Foo' />, nullElement);
        test(<El if={!!1} else='Foo'/>, nullElement);
    });

    it('simple both else/then component', function() {
        test(<El if={!!1} then='Foo' else='Bar' />, '<span>Foo</span>');
        test(<El if={!!0} then='Foo' else='Bar'/>, '<span>Bar</span>');
    });

    it('simple expression component', function() {
        test(<El if={!!1} then={1 + 1} />, '<span>2</span>');
        test(<El if={!!1} then={true} />, '<span></span>');
    });

    it('simple function component', function() {
        test(<El if={!!1} then={function() { return 5 + 5; }} />, '<span>10</span>');
        test(<El if={!!1} then={function() { return 3 + 3; }()} />, '<span>6</span>');
        test(<El if={!!1} then={function() { return Bar; }} />, '<b>Bar</b>');
        test(<El if={!!1} then={function() { return Foo; }()} />, '<b>Foo</b>');
    });

    it('simple component with tags', function() {
        test(<El if={!!1} then='<b>Bar</b>' />, '<span>&lt;b&gt;Bar&lt;/b&gt;</span>');
        test(<El if={!!1} then={<b>Bar</b>} />, '<b>Bar</b>');
    });

    it('simple component with component', function() {
        test(<El if={!!1} then={<Bar />} />, '<b>Bar</b>');
        test(<El if={!!1} then={Bar} />, '<b>Bar</b>');
    });

    it('empty component', function() {
        test(<El if={!!1}></El>, nullElement);
        test(<El if={!!0}></El>, nullElement);
        test(<El if={!!1}><El else>Bar</El></El>, nullElement);
        test(<El if={!!0}><El then>Bar</El></El>, nullElement);
    });

    it('text component', function() {
        test(<El if={!!1}>Foo</El>, '<span>Foo</span>');
        test(<El if={!!0}>Foo</El>, nullElement);
    });

    it('component with tags', function() {
        test(<El if={!!1}><b>Bar</b></El>, '<b>Bar</b>');
        test(<El if={!!1}>&lt;b&gt;Bar&lt;/b&gt;</El>, '<span>&lt;b&gt;Bar&lt;/b&gt;</span>');
    });

    it('component with expression', function() {
        test(<El if={!!1}>{3 + 3}</El>, '<span>6</span>');
    });

    it('component with another component', function() {
        test(<El if={!!1}><Bar /></El>, '<b>Bar</b>');
    });

    it('component with then/esle blocks', function() {
        test(
            <El if={!!1}>
                <El then>Bar</El>
            </El>
            , '<span>Bar</span>'
        );
        test(
            <El if={!!0}>
                <El else>Foo</El>
            </El>
            , '<span>Foo</span>'
        );
        test(
            <El if={!!1}>
                <El then>Bar</El>
                <El else>Foo</El>
            </El>
            , '<span>Bar</span>'
        );
        test(
            <El if={!!0}>
                <El then>Bar</El>
                <El else>Foo</El>
            </El>
            , '<span>Foo</span>'
        );
    });

    it('component with other tags', function() {
        test(
            <El if={!!1}>
                <El then><div>Foo</div></El>
            </El>
            , '<div>Foo</div>'
        );
    });

    it('component with other component', function() {
        test(
            <El if={!!1}>
                <El then><Bar /></El>
            </El>
            , '<b>Bar</b>'
        );
    });

    it('component with embedded blocks', function() {
        test(
            <El if={!!1}>
                <El if={!!1} then='Bar' />
            </El>
            , '<span>Bar</span>'
        );
        test(
            <El if={!!1}>
                <El if={!!1}>
                    <El then>Bar</El>
                </El>
            </El>
            , '<span>Bar</span>'
        );
    });

    it('component with multiple embedded blocks', function() {
        test(
            <El if={!!1}>
                <El if={!!1} then='Bar' />
                <El if={!!1} then='Foo' />
            </El>
            , '<div><span>Bar</span><span>Foo</span></div>'
        );
        test(
            <El if={!!1}>
                <El if={!!1}>
                    <El then>Bar</El>
                </El>
                <El if={!!0}>
                    <El else>Foo</El>
                </El>
            </El>
            , '<div><span>Bar</span><span>Foo</span></div>'
        );
        test(
            <El if={!!1}>
                <El if={!!1} then='Bar' else='Foo' />
                <El if={!!0} then={123+4} else={456+7} />
            </El>
            , '<div><span>Bar</span><span>463</span></div>'
        );
    });

    it('custom components', function() {
        test(
            <El if={!!1}>
                Bar
                <Bar />
                <El then>
                    <El if={!!1} then='Bar' else='Foo' />
                    <El if={!!0}>
                        Bar
                        <El else><i>Bar</i></El>
                    </El>
                </El>
                <i>Foo</i>
                <Bar />
                <Foo a={1} b={2} />
            </El>
            , '<div>Bar<b>Bar</b><span>Bar</span><i>Bar</i><i>Foo</i><b>Bar</b><b>Foo</b></div>'
        );
    });
});
