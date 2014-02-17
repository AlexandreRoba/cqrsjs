var Guid = require("./guid");

var EventBase = (function () {
    function EventBase() {
    }
    Object.defineProperty(EventBase.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(EventBase.prototype, "revision", {
        get: function () {
            return this._revision;
        },
        enumerable: true,
        configurable: true
    });
    return EventBase;
})();

module.exports = EventBase;
//# sourceMappingURL=eventBase.js.map
