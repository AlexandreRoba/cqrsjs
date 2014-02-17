///<reference path='..\underscore.d.ts' />

import Guid = require("./guid");
import EventBase = require("./eventBase");

class AggregateRoot{
    private _id:Guid;
    private _version:number;
    private _uncommittedEvents = new Array<EventBase>();

    get Id():Guid{
        return this._id;
    }

    get Version():number{
        return this._version;
    }

    get UncommittedChanges():Array<EventBase>{
        return this._uncommittedEvents;
    }

    markChangesAsCommitted=()=>{
        this._uncommittedEvents.length=0;
    }

    loadFromHistory = (history:Array<EventBase>) => {
        history.forEach(function(event){
            this.applyChange(event,true);
        },this);
    }

    applyChange = (event:any,isHistory?:boolean) => {
        //Find out the method to apply the function to
        var eventName = event.constructor.name;
        var applyEvent = this["Apply"+eventName];
        applyEvent(event);
        if(!isHistory)
            this._uncommittedEvents.push(event);
    }
}

export = AggregateRoot;