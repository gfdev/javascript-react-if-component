'use strict';

var expect = require('chai').expect
    , React = require('react')
    //, ReactDOM = require('react-dom')
    , ReactDOMServer = require('react-dom/server')
    //, TestUtils = require('react-addons-test-utils')
    , El = require('../src/if.jsx')
    , nullElement = '<noscript></noscript>'
    , textTest = 'test'
;

function check(el, eq) {
    return expect(ReactDOMServer.renderToStaticMarkup(el)).equal(eq);
}

describe('React IF component testing:', function() {
    //require('testdom')('<!doctype html><html><body></body></html>');

    //afterEach(function(done) {
        //ReactDOM.unmountComponentAtNode(document.body);

        //document.body.innerHTML = '';

        //setTimeout(done);
    //});

    it('empty component', function() {
        //var Node = TestUtils.renderIntoDocument(<div>123</div>);
        //var Node = TestUtils.renderIntoDocument(<IF if={true} then='ABC' />);
        //ReactDOM.render(<IF if={true} then='ABC' />, document);
        //var string = ReactDOMServer.renderToString(<IF if={true} then='ABC' />);
        //console.log(document.body.innerHTML);

        check(<El />, nullElement);
        check(<El if={true} />, nullElement);
        check(<El then='1' />, nullElement);
        check(<El else='1' />, nullElement);
        check(<El foo='1' />, nullElement);
    });

    it('single else/then component', function() {
        check(<El if={!!1} then='FOO' />, '<span>FOO</span>');
        check(<El if={!!0} else='FOO'/>, '<span>FOO</span>');
        check(<El if={!!0} then='FOO' />, nullElement);
        check(<El if={!!1} else='FOO'/>, nullElement);
    });

    it('single both else/then component', function() {
        check(<El if={!!1} then='FOO' else='BAR' />, '<span>FOO</span>');
        check(<El if={!!0} then='FOO' else='BAR'/>, '<span>BAR</span>');
    });

    it('single text component', function() {
        check(<El if={!!1}>FOO</El>, '<div>FOO</div>');
        check(<El if={!!0}>FOO</El>, nullElement);
    });

    it('single calculated component', function() {
        check(<El if={!!1} then={1 + 1} />, '<span>2</span>');
        check(<El if={!!1} then={true} />, '<span></span>');
        check(<El if={!!1} then={function() { return 5 + 5; }} />, '<span>10</span>');
        check(<El if={!!1} then={function() { return 3 + 3; }()} />, '<span>6</span>');
        check(<El if={!!1} then={function() { return textTest; }} />, '<span>test</span>');
    });
});
