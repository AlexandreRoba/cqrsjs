var Guid = require("guid");

var AggregateRoot = (function () {
    function AggregateRoot() {
        this._events = new Array();
    }
    AggregateRoot.prototype.getUncommittedChanges = function () {
        return this._events;
    };

    AggregateRoot.prototype.markChangesAsCommitted = function () {
        this._events.length = 0;
    };
    return AggregateRoot;
})();

module.exports = AggregateRoot;
//# sourceMappingURL=aggregateRoot.js.map
