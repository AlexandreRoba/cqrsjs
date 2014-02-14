///<reference path='..\underscore.d.ts' />

import Guid = require("./guid");
import Event = require("./event");

class AggregateRoot{
    private _id:Guid;
    private _version:number;
    /*jshint -W009 */
    private _uncommittedEvents = new Array<Event>();

    get Id():Guid{
        return this._id;
    }

    get Version():number{
        return this._version;
    }

    getUncommittedChanges(){
        return this._uncommittedEvents;
    }

    markChangesAsCommitted(){
        this._uncommittedEvents.length=0;
    }

    loadFromHistory(history:Array<Event>){
        var _this = this;
        _this._uncommittedEvents.forEach(function(event){
            _this.apply(event,true);
        });
    }

    apply(event:Event,history:boolean){
        //Find out the method to apply the function to

        if(!history)
            this._uncommittedEvents.push(event);

    }


}

export = AggregateRoot;