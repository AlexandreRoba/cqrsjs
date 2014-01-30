(function(){

    // Initial Setup
    // -------------

    // Save a reference to the global object (`window` in the browser, `exports`
    // on the server).
    var root = this;

    // The top-level namespace. All public cqrsjs classes and modules will
    // be attached to this. Exported for both the browser and the server.
    var Cqrsjs;
    if (typeof exports !== 'undefined') {
        Cqrsjs = exports;
    } else {
        Cqrsjs = root.Cqrsjs = {};
    }

    // Require Underscore, if we're on the server, and it's not already present.
    var _ = root._;
    if (!_ && (typeof require !== 'undefined')) _ = require('underscore');

    // Current version of the library. Keep in sync with `package.json`.
    Cqrsjs.VERSION = '0.0.1';

    var AggregateOld = Cqrsjs.Aggregate = {
        loadFromHistory:function(events){
            var self = this;
            var committedEvents = this._committedEvents || (this._committedEvents = []);
            var uncommittedEvents = this._uncommittedEvents || (this._uncommittedEvents = []);
            _.each(events,function(e){
                e.fromHistory=true;
                apply(self,e);
            });
            return this;
        },
        commitAllEvents : function(){
            var committedEvents = this._committedEvents || (this._committedEvents = []);
            var uncommitedEvents = this._uncommittedEvents || (this._uncommittedEvents = []);
            _.each(uncommitedEvents,function(evt){
                commitedEvents.push(evt);
            });
            uncommittedEvents.length=0;
            return this;
        },
        addEventHandler:function(eventName,applyFunction){
            this._eventHandlers
            this["_apply"+eventName]=applyFunction;
            return this;
        }
    };

    var apply = function(aggregate,evt){
        var applyEvent = aggregate["_apply"+evt.event];
        applyEvent(evt);
        var committedEvents = aggregate._committedEvents || (aggregate._committedEvents = []);
        var uncommittedEvents = aggregate._uncommittedEvents || (aggregate._uncommittedEvents = []);
        if(!evt.fromHistory) {
            uncommittedEvents.push(evt);
        }else{
            delete evt.fromHistory;
            committedEvents.push(evt);
        }
        return this;
    };

    var Aggregate = Cqrsjs.Aggregate = function(attributes, options) {

    };



}).call(this);