var React = require('react')
    , $ = require('jquery')
    , _ = require('lodash')
    , Block = require('../if')
;

var { Button, Modal, Grid, Col, Row, Nav, NavItem, NavDropdown, MenuItem, Panel, NavBrand, Navbar, CollapsibleNav, ListGroup, ListGroupItem, PageHeader, Well, Input } = require('react-bootstrap');

require('./index.scss');

var Index = React.createClass({
    render: function() {
        return (
            <div></div>
        );
    }
});

React.render(<Index />, document.getElementById('body'));
