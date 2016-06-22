'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js deferral-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:

// Classes
var Deferral = function(){
	this.$promise = new $Promise()
};

Deferral.prototype.resolve = function(value){
	if(this.$promise.state !== 'resolved' && this.$promise.state !== 'rejected'){
		this.$promise.value = value;
		this.$promise.state = 'resolved';
	}
};

Deferral.prototype.reject = function (reason){
	if(this.$promise.state !== 'resolved' && this.$promise.state !== 'rejected'){
		this.$promise.state = 'rejected';
		this.$promise.value = reason;
	}
};


var $Promise = function(){
	this.value = null,
	this.state = 'pending',
	this.handlerGroups = []
};

$Promise.prototype.then = function(successCb, errorCb){
	// Helper to check if handler is a func
	function isFunc(value){
		return typeof value === 'function';
	}

	var sCb = (isFunc(successCb) ? successCb : null);
	var eCb = (isFunc(errorCb) ? errorCb : null);
	console.log(sCb, eCb);

	var result = {
		successCb: sCb,
		errorCb: eCb
	};
	this.handlerGroups.push(result);

	console.log("RESULT:", result);
	console.log("HANDLERS ARR:", this.handlerGroups);
	// If promise is resolved, call the handlers
	if(this.state === 'resolved'){
		this.callHandlers();
	}
};

$Promise.prototype.callHandlers = function(){
	var handlersLength = this.handlerGroups.length;
	for(var i = 0; i < handlersLength-1; i++){
		console.log("running loop");
		this.value = this.handlerGroups[i].successCb(this.value);
	}
	this.handlerGroups = [];
};


// Makes a new deferral
var defer = function(){
	return new Deferral();
};






/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = {
  defer: defer,
};

So in a Node-based project we could write things like this:

var pledge = require('pledge');
…
var myDeferral = pledge.defer();
var myPromise1 = myDeferral.$promise;
--------------------------------------------------------*/
