var Guid = (function () {
    function Guid(input) {
        this.internalValue = Guid.emptyGuidString;
        this.equal = function (value) {
            return value.internalValue === this.internalValue;
        };
        this.toString = function () {
            return this.internalValue;
        };
        if (!Guid.regEx.test(input))
            throw Error("Guid string is badly formatted. It should match 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'");
        this.internalValue = input;
    }
    Guid.newGuid = function () {
        var temporaryGuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        return new Guid(temporaryGuid);
    };
    Guid.regEx = new RegExp("[A-Fa-f0-9]{8}(?:-[A-Fa-f0-9]{4}){3}-[A-Fa-f0-9]{12}", "i");
    Guid.emptyGuidString = "00000000-0000-0000-0000-000000000000";

    Guid.Empty = new Guid(Guid.emptyGuidString);
    return Guid;
})();

module.exports = Guid;
//# sourceMappingURL=guid.js.map
