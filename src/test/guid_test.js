///<reference path='..\..\mocha.d.ts' />
///<reference path='..\..\should.d.ts' />
require('should');
var Guid = require("./../guid");

describe('Guid', function () {
    describe('constructor', function () {
        describe('with a valid guid string', function () {
            it('should initialize the Guid with the string', function () {
                var sut = new Guid("9215C203-DAF0-4AD9-AD21-FAC6BB07E317");
                sut.toString().should.equal("9215C203-DAF0-4AD9-AD21-FAC6BB07E317");
            });
        });
        describe('with an invalid string', function () {
            it('should throw an exception', function () {
                (function () {
                    var sut = new Guid("BadlyFormatted");
                }).should.throw();
            });
        });
    });
    describe('new', function () {
        it('should return a new Guid', function () {
            var newGuid = Guid.newGuid();
            var actual = newGuid.toString();
            var expected = new Guid(actual).toString();
            expected.should.be.equal(actual);
        });
    });
    describe('equal', function () {
        describe('with two identical guids', function () {
            it('should be true', function () {
                var sut1 = Guid.newGuid();
                var sut2 = new Guid(sut1.toString());
                sut1.equal(sut2).should.equal(true);
            });
        });
        describe('with two different Guids', function () {
            it('should not be true', function () {
                var sut1 = Guid.newGuid();
                var sut2 = Guid.newGuid();
                sut1.equal(sut2).should.equal(false);
            });
        });
    });
    describe('Hello', function () {
        it('World', function () {
        });
    });
});
//# sourceMappingURL=guid_test.js.map
