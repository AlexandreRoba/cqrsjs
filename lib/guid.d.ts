declare class Guid {
    private static regEx;
    private static emptyGuidString;
    private internalValue;
    constructor(input: string);
    public equal: (value: Guid) => boolean;
    public toString: () => string;
    static Empty: Guid;
    static newGuid(): Guid;
}
export = Guid;
