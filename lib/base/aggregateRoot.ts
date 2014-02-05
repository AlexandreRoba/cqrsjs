
import Guid = require("guid");

class AggregateRoot{
    private _events = new Array<Event>();
    public id:Guid;
    public version:number;

    getUncommittedChanges(){
        return this._events;
    }

    markChangesAsCommitted(){
        this._events.length=0;
    }
}

export = AggregateRoot;