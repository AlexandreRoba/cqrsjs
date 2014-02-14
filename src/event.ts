
import Guid = require("./guid");

class Event{
    private _id:Guid;
    private _revision:number;

    get id():Guid{
        return this._id;
    }

    get revision():number{
        return this._revision;
    }
}

export = Event;