'use strict';

var expect = require('chai').expect;
var IF = require('../src/if.jsx');
var TestUtils = require('react-addons-test-utils');

describe('Testing my div', function() {
    it('should contain text: Lovely! Here it is - my very first React component!', function() {
        var Node = TestUtils.renderIntoDocument('<IF />');

        console.log(Node);
    });
});
