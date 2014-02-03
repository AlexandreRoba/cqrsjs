"use strict";

var extend = require('./../utils').extend,
    uuid = require('./../utils').uuid,
    _ = require('lodash');

var AggregateRoot  = function(id){

    this.id = id || (this.id = uuid());
    this.uncommittedEvents = [];
    this.attributes = { id: id, revision: 0, destroyed: false };
};

AggregateRoot.prototype={
    _set: function(data) {
        if (arguments.length === 2) {
            this.attributes[arguments[0]] = arguments[1];
        } else {
            for(var m in data) {
                this.attributes[m] = data[m];
            }
        }
    },

    get: function(attr) {
        return this.attributes[attr];
    },

    toJSON: function() {
        return _.clone(this.attributes);
    },

    toEvent:function(name,data,version){
        var event = {
            event: name,
            payload: data || {}
        };

        if (!event.payload.id) event.payload.id = this.id;

        if (version !== null && version !== undefined) {
            event.head = { version: version };
        }

        return event;
    },

    apply:function(events){
        var self = this;

        if (!_.isArray(events)) {
            events = [events];
        }

        var historyEvents = [];
        var newEvents = [];

        _.each(events, function(evt) {
            if (evt.fromHistory) {
                historyEvents.push(evt);
            } else {
                newEvents.push(evt);
            }
        });

        _.each(historyEvents, function(evt) {
            self.applyEvent(evt);

            if (evt.head && self.attributes.revision < evt.head.revision) {
                self.attributes.revision = evt.head.revision;
            }
        });

        this.previousAttributes = this.toJSON();

        _.each(newEvents, function(evt) {
            self.applyEvent(evt);
            evt.head = evt.head || {};
            evt.head.revision = ++self.attributes.revision;
            self.uncommittedEvents.push(evt);
        });

    },

    applyEvent: function(evt) {
        //Apply the versionned Event
        if (evt.head &&
            evt.head.version !== null &&
            evt.head.version !== undefined &&
            this[evt.event + '_' + evt.head.version]) {
            this[evt.event + '_' + evt.head.version](evt.payload);
        } else {
            this[evt.event](evt.payload);
        }
    },

    loadFromHistory: function(snap, events) {
        if (snap && snap.data && snap.version) {
            this.loadSnapshot(snap.data, snap.version);
        } else if (snap && snap.data) {
            this.loadSnapshot(snap.data);
        }

        if (events) {
            this.apply(_.map(events, function(evt) {
                evt.fromHistory = true;
                return evt;
            }));
        }
    },

    loadSnapshot: function(data, version) {
        this.set(data);
    },

    getSnapshotThreshold: function() {
        if (this.snapshotThreshold) {
            if (_.isFunction(this.snapshotThreshold)) {
                return this.snapshotThreshold();
            } else {
                return this.snapshotThreshold;
            }
        }
        return null;
    }
};

AggregateRoot.extend = extend;

module.exports = AggregateRoot;