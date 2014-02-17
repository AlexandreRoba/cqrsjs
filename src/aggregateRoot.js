///<reference path='..\underscore.d.ts' />
var Guid = require("./guid");
var EventBase = require("./eventBase");

var AggregateRoot = (function () {
    function AggregateRoot() {
        var _this = this;
        this._uncommittedEvents = new Array();
        this.markChangesAsCommitted = function () {
            _this._uncommittedEvents.length = 0;
        };
        this.loadFromHistory = function (history) {
            history.forEach(function (event) {
                this.applyChange(event, true);
            }, _this);
        };
        this.applyChange = function (event, isHistory) {
            //Find out the method to apply the function to
            var eventName = event.constructor.name;
            var applyEvent = _this["Apply" + eventName];
            applyEvent(event);
            if (!isHistory)
                _this._uncommittedEvents.push(event);
        };
    }
    Object.defineProperty(AggregateRoot.prototype, "Id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(AggregateRoot.prototype, "Version", {
        get: function () {
            return this._version;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(AggregateRoot.prototype, "UncommittedChanges", {
        get: function () {
            return this._uncommittedEvents;
        },
        enumerable: true,
        configurable: true
    });
    return AggregateRoot;
})();

module.exports = AggregateRoot;
//# sourceMappingURL=aggregateRoot.js.map
