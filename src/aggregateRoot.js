///<reference path='..\underscore.d.ts' />
var Guid = require("./guid");
var Event = require("./event");

var AggregateRoot = (function () {
    function AggregateRoot() {
        /*jshint -W009 */
        this._uncommittedEvents = new Array();
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

    AggregateRoot.prototype.getUncommittedChanges = function () {
        return this._uncommittedEvents;
    };

    AggregateRoot.prototype.markChangesAsCommitted = function () {
        this._uncommittedEvents.length = 0;
    };

    AggregateRoot.prototype.loadFromHistory = function (history) {
        var _this = this;
        _this._uncommittedEvents.forEach(function (event) {
            _this.apply(event, true);
        });
    };

    AggregateRoot.prototype.apply = function (event, history) {
        //Find out the method to apply the function to
        if (!history)
            this._uncommittedEvents.push(event);
    };
    return AggregateRoot;
})();

module.exports = AggregateRoot;
//# sourceMappingURL=aggregateRoot.js.map
