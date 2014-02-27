import Guid = require("./guid");
import Message = require("./message");
declare class EventBase implements Message {
    private _id;
    private _revision;
    public id : Guid;
    public revision : number;
}
export = EventBase;
