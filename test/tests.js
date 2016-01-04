'use strict';

var expect = require('chai').expect;
var IF = require('../src/if.jsx');
var React = require('react');
var TestUtils = require('react-addons-test-utils');

describe('Testing my div', function() {
    it('#1', function() {
        var Node = TestUtils.renderIntoDocument(<IF />);

        console.log(Node);
    });
});
