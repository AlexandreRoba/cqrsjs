require("should");
var Cqrsjs = require("./../lib/cqrsjs");

suite('Aggregate', function(){
    var Mock;
    setup(function(){
        Mock = Cqrsjs.Aggregate.extend({
            _applyActionEvent:function(evt){
                this._applyActionWasCalled = true;
            }
        });
    });

    suite('apply', function(){
        test('When apply event with name "ActionEvent" then _applyActionEvent function should be called', function(){
            var mock = new Mock();
            mock.apply({name:"ActionEvent"});
            mock._applyActionWasCalled.should.equal(true);
        });
    });

    suite('constructor', function(){
        test('When not providing any value the aggregate id should be initialized with a new Id',function(){
            var mock = new Mock();
            mock.id.should.be.instanceOf(String);
            mock.id.length.should.be.greaterThan(5);
        });
        test('When passing value to constructor then the Id should be set to the value',function(){
            var mock = new Mock(5);
            mock.id.should.be.equal(5);
        });
    });

    suite("loadFromHistory",function(){

    });
});