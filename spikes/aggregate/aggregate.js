"use strict";

var Cqrsjs = require("./../../lib/cqrsjs");

var Order = Cqrsjs.Aggregate.extend({
    create:function(){
        console.dir(this);
        this.apply({name:"OrderCreated",number:"000001",owner:"Alexandre Roba"});
    },
    _applyOrderCreated:function(evt){
        this.number = evt.number;
        this.owner = evt.owner;
    }

});

var order = new Order();

order.create();

console.dir(order);