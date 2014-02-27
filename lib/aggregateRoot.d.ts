/// <reference path="../underscore.d.ts" />
import Guid = require("./guid");
import EventBase = require("./eventBase");
declare class AggregateRoot {
    private _id;
    private _version;
    private _uncommittedEvents;
    public Id : Guid;
    public Version : number;
    public UncommittedChanges : EventBase[];
    public markChangesAsCommitted: () => void;
    public loadFromHistory: (history: EventBase[]) => void;
    public applyChange: (event: any, isHistory?: boolean) => void;
}
export = AggregateRoot;
