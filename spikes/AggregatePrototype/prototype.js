"use strict";

var Cqrsjs = require('./../../index');

var Order =  Cqrsjs.AggregateRoot.extend({
    //Aggregate Operation
    createOrder: function(orderNumber,orderDate,callback){

        //Validate the parameters


        //Apply the changes
        this.apply(this.toEvent('orderCreated',{
            orderNumber:orderNumber,
            orderDate:orderDate
        }));
    },

    addOrderLine: function(id,quantity,callback){
        //Validate the parameters


        this.apply(this.toEvent('orderLineAdded',{itemId:id,itemQuantity:quantity}))
    },

    //Apply events
    orderCreated:function(data){
        console.log("Order Created.")
        this._set(data);
    },
    orderLineAdded:function(data){
        console.log("Line item added to the order");
        var lines = this.get('lines') || (this._set('lines',[]));
        this.get('lines').push({lineNumber:0,itemId:data.itemId,itemQuantity:data.itemQuantity});
    }
});

var order = new Order(Cqrsjs.uuid());
console.dir(order);
order.createOrder("0001",Date());
console.dir(order);
order.addOrderLine("XSWR",10);
console.dir(order);

