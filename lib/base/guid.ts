class Guid{
    private static regEx = new RegExp("[A-Fa-f0-9]{8}(?:-[A-Fa-f0-9]{4}){3}-[A-Fa-f0-9]{12}","i");
    private static emptyGuidString = "00000000-0000-0000-0000-000000000000";
    private internalValue:string=Guid.emptyGuidString;

    constructor(input:string){
        if(!Guid.regEx.test(input))
            throw Error("Guid string is badly formatted. It should match 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'");
        this.internalValue = input;
    }

    equal:(value:Guid)=>boolean = function(value:Guid){
        return value.internalValue === this.internalValue;
    }

    toString:()=>string = function(){
        return this.internalValue;
    }

    static Empty:Guid = new Guid(Guid.emptyGuidString);

    static newGuid(){
        var temporaryGuid =  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
        return new Guid(temporaryGuid);
    }
}

export = Guid;