"use strict";

var _ = require("underscore"),
    root = this,
    Cqrsjs;

if (typeof exports !== 'undefined') {
    Cqrsjs = exports;
} else {
    Cqrsjs = root.Cqrsjs = {};
}

Cqrsjs.VERSION = '0.0.1';

// ## Aggregate
var Aggregate = Cqrsjs.Aggregate = function(id) {
    if(id){
        this.id = id;
    } else {
        this.id = Cqrsjs.getUniqueId();
    }
    this.committedEvents = [];
    this.uncommittedEvents = [];
};

_.extend(Aggregate.prototype,{
    apply:function(evt){
        var uncommittedEvents = this.uncommittedEvents || (this.uncommittedEvents = []);
        var committedEvents = this.committedEvents || (this.committedEvents = []);
        this["_apply"+evt.name](evt);

        if(!evt.fromHistory) {
            uncommittedEvents.push(evt);
        }else{
            delete evt.fromHistory;
            committedEvents.push(evt);
        }
    },
    loadFromHistory:function(events){
        var self = this;
        _.each(events,function(e){
            e.fromHistory=true;
            apply(self,e);
        });
    },
    commitAllEvents : function(){
        var uncommittedEvents = this.uncommittedEvents || (this.uncommittedEvents = []);
        var committedEvents = this.committedEvents || (this.committedEvents = []);
        _.each(uncommittedEvents,function(evt){
            committedEvents.push(evt);
        });
        uncommittedEvents.length=0;
    }
});

// Helpers
// -------

// Helper function to correctly set up the prototype chain, for subclasses.
// Similar to `goog.inherits`, but uses a hash of prototype properties and
// class properties to be extended.
var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
        child = protoProps.constructor;
    } else {
        child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
};

Cqrsjs.getUniqueId = function(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
};

Aggregate.extend = extend;