
import Guid = require("./guid");
import Message = require("./message");

class EventBase implements Message{
    private _id:Guid;
    private _revision:number;

    get id():Guid{
        return this._id;
    }

    get revision():number{
        return this._revision;
    }
}

export = EventBase;