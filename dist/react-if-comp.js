(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactIf"] = factory(require("react"));
	else
		root["ReactIf"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2)
	    , version = +React.version.substring(0, React.version.lastIndexOf('.'))
	    , types = ['bool', 'func', 'node'].map(name => React.PropTypes[name])
	;

	function _getResult(result) {
	    if (/^(?:string|number|boolean)$/i.test(typeof result))
	        return React.createElement('span', null, result);

	    if (React.isValidElement(result))
	        return result;

	    if (typeof result === 'function') {
	        if (result.displayName)
	            return React.createElement(result);

	        return _getResult(result());
	    }
	}

	var If = React.createClass({
	    displayName: 'If',
	    propTypes: {
	        if: React.PropTypes.bool,
	        then: React.PropTypes.oneOfType(types),
	        else: React.PropTypes.oneOfType(types)
	    },
	    render: function() {
	        var props = this.props,
	            total = React.Children.count(props.children),
	            result = [];

	        if ((props.if && !total && !props.then) || (!props.if && !total && !props.else))
	            return null;

	        if (total) {
	            React.Children.forEach(props.children, child => {
	                if (version <= 0.12 ? child.type === If.type : child.type === If) {
	                    if (child.props && !('if' in child.props)) {
	                        if (props.if && child.props.then) result.push(child.props.children);
	                        if (!props.if && child.props.else) result.push(child.props.children);
	                    } else {
	                        result.push(child)
	                    }
	                } else {
	                    if (props.if) result.push(child);
	                }
	            });
	        } else {
	            if ('if' in props) {
	                if (props.if && props.then) result.push(props.then);
	                if (!props.if && props.else) result.push(props.else);
	            }
	        }

	        return !result.length ? null
	            : result.length === 1 && !(result[0] instanceof Array) ? _getResult(result.shift())
	            : React.createElement('div', null, result);
	    }
	});

	module.exports = If;


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;