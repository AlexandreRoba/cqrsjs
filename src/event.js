var Guid = require("./guid");

var Event = (function () {
    function Event() {
    }
    Object.defineProperty(Event.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Event.prototype, "revision", {
        get: function () {
            return this._revision;
        },
        enumerable: true,
        configurable: true
    });
    return Event;
})();

module.exports = Event;
//# sourceMappingURL=event.js.map
