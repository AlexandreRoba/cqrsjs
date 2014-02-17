///<reference path='..\..\mocha.d.ts' />
///<reference path='..\..\should.d.ts' />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
require('should');
var AggregateRoot = require('./../aggregateRoot');
var EventBase = require('./../eventBase');

var MoqAggregateCreated = (function (_super) {
    __extends(MoqAggregateCreated, _super);
    function MoqAggregateCreated() {
        _super.apply(this, arguments);
    }
    return MoqAggregateCreated;
})(EventBase);

var MoqAggregateUpdated = (function (_super) {
    __extends(MoqAggregateUpdated, _super);
    function MoqAggregateUpdated() {
        _super.apply(this, arguments);
    }
    return MoqAggregateUpdated;
})(EventBase);

var MoqAggregate = (function (_super) {
    __extends(MoqAggregate, _super);
    function MoqAggregate() {
        _super.apply(this, arguments);
        var _this = this;
        this.MoqAggregateCreatedApplied = false;
        this.MoqAggregateUpdatedApplied = false;
        this.CreateMoq = function () {
            var evt = new MoqAggregateCreated();
            _this.applyChange(evt, false);
        };
        this.UpdateMoq = function () {
            var evt = new MoqAggregateUpdated();
            _this.applyChange(evt, false);
        };
        this.ApplyMoqAggregateCreated = function (event) {
            _this.MoqAggregateCreatedApplied = true;
        };
        this.ApplyMoqAggregateUpdated = function (event) {
            _this.MoqAggregateUpdatedApplied = true;
        };
    }
    return MoqAggregate;
})(AggregateRoot);

describe('AggregateRoot', function () {
    describe('applyChange', function () {
        describe('When called with proper command and dedicated applyEvent method defined', function () {
            var sut = new MoqAggregate();
            sut.CreateMoq();
            it('should call the proper dedicated apply method', function () {
                sut.MoqAggregateCreatedApplied.should.be.true;
            });
            it('should have the event in the list of uncommitted changes', function () {
                sut.UncommittedChanges.length.should.equal(1);
            });
        });
    });
    describe('loadFromHistory', function () {
        describe('When called with multiple events', function () {
            var history = [];
            history.push(new MoqAggregateCreated());
            history.push(new MoqAggregateUpdated());
            var sut = new MoqAggregate();
            sut.loadFromHistory(history);
            it('should apply all the events', function () {
                sut.MoqAggregateUpdatedApplied.should.be.true;
                sut.MoqAggregateUpdatedApplied.should.be.true;
            });
            it('should apply all events as history', function () {
                sut.UncommittedChanges.length.should.equal(0);
            });
        });
    });
    describe('markChangesAsCommitted', function () {
        describe('when called with uncommited event in the list', function () {
            var sut = new MoqAggregate();
            sut.CreateMoq();
            sut.UpdateMoq();
            sut.markChangesAsCommitted();
            it('should mak all events as applied', function () {
                sut.UncommittedChanges.length.should.equal(0);
            });
        });
    });
});
//# sourceMappingURL=aggregateRoot_test.js.map
