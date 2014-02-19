///<reference path='..\..\mocha.d.ts' />
///<reference path='..\..\should.d.ts' />

require('should');
import AggregateRoot = require('./../aggregateRoot');
import EventBase = require('./../eventBase');

class MoqAggregateCreated extends EventBase{

}

class MoqAggregateUpdated extends EventBase{

}

class MoqAggregate extends AggregateRoot{

    public MoqAggregateCreatedApplied:boolean=false;
    public MoqAggregateUpdatedApplied:boolean=false;

    CreateMoq=()=>{
        var evt = new MoqAggregateCreated();
        this.applyChange(evt,false);
    }

    UpdateMoq=()=>{
        var evt = new MoqAggregateUpdated();
        this.applyChange(evt,false);
    }

    private ApplyMoqAggregateCreated = (event:MoqAggregateCreated)=>{
        this.MoqAggregateCreatedApplied = true;
    }

    private ApplyMoqAggregateUpdated = (event:MoqAggregateUpdated)=>{
        this.MoqAggregateUpdatedApplied = true;
    }
}


describe('AggregateRoot',function(){
    describe('applyChange',function(){
        describe('When called with proper command and dedicated applyEvent method defined',function(){
            var sut = new MoqAggregate();
            sut.CreateMoq();
            it('should call the proper dedicated apply method',function(){
                sut.MoqAggregateCreatedApplied.should.be.true;
            });
            it('should have the event in the list of uncommitted changes',function(){
                sut.UncommittedChanges.length.should.equal(1);
            });

        });
    });
    describe('loadFromHistory',function(){
        describe('When called with multiple events',function(){
            var history = [];
            history.push(new MoqAggregateCreated());
            history.push(new MoqAggregateUpdated());
            var sut = new MoqAggregate();
            sut.loadFromHistory(history);
            it('should apply all the events',function(){
                sut.MoqAggregateUpdatedApplied.should.be.true;
                sut.MoqAggregateUpdatedApplied.should.be.true;
            });
            it('should apply all events as history',function(){
                sut.UncommittedChanges.length.should.equal(0);
            });
        });
    });
    describe('markChangesAsCommitted',function(){
        describe('when called with uncommited event in the list',function(){
            var sut = new MoqAggregate();
            sut.CreateMoq();
            sut.UpdateMoq();
            sut.markChangesAsCommitted();
            it('should mak all events as applied',function(){
                sut.UncommittedChanges.length.should.equal(0);
            });
        });
    });
});