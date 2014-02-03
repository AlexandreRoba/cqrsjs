require("should");

var _ = require("underscore");

var SomethingHappenedEvent = Cqrsjs.Event.extend({name:"SomethingHappenedEvent"});

suite('EventSource', function(){
    suite('applyEvent',function(){
        suite('With null event argument',function(){
            test('should return direclty leaving eventSource untouched',function(){
                var eventSource = _.extend({},Cqrsjs.EventSource);
                eventSource.applyEvent().should.equal(eventSource);
            })
        });
        suite('With no applyEventHandler defined',function(){
            test('should return directly leaving eventSource untouched',function(){
                var eventSource = _.extend({},Cqrsjs.EventSource);
                var somethingHappened = new SomethingHappenedEvent();
                eventSource.applyEvent(somethingHappened).should.equal(eventSource);
            });
        });

    });
    suite('addApplyEvent',function(){


    });
});

//
//    suite('apply', function(){
//        test('with event with property name "ActionEvent" should call function _applyActionEvent', function(){
//            var mock = new Mock();
//            mock.apply({name:"ActionEvent"});
//            mock._applyActionWasCalled.should.equal(true);
//        });
//    });
//
//    suite('new', function(){
//        test('with no id parameter should initialize Aggregate with unique new Id',function(){
//            var sut = new Mock();
//            sut.id.should.be.instanceOf(String);
//            sut.id.length.should.be.greaterThan(5);
//        });
//        test('with given id should initialize Aggregate with this id',function(){
//            var sut = new Mock(5);
//            sut.id.should.be.equal(5);
//        });
//    });
//
//    suite("loadFromHistory",function(){
//        test('with no events list should leave commited and uncommited events untouched ',function(){
//            var sut = new Mock();
//            sut.loadFromHistory();
//            sut.uncommittedEvents.length.should.be.equal(0);
//            sut.committedEvents.length.should.be.equal(0);
//        });
//        test('with list of one event should add this events to the list of commited events',function(){
//            var sut = new Mock();
//            var events = [{name:"ActionEvent"},{name:"ActionEvent"}];
//            sut.loadFromHistory(events);
//            sut.committedEvents.length.should.be.equal(2);
//            sut.uncommittedEvents.length.should.be.equal(0);
//        });
//    });
