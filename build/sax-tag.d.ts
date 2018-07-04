import * as sax from "sax";
interface SaxTagSimple {
    attributes: {
        [key: string]: string;
    };
    name: string;
}
export declare type SaxNode = SaxTag | string;
export default class SaxTag implements sax.Tag {
    attributes: {
        [key: string]: string;
    };
    children: SaxNode[];
    id: string;
    isSelfClosing: boolean;
    name: string;
    parents: SaxTagSimple[];
    siblings: (SaxTagSimple | 'SELF')[];
    custom: {
        [k: string]: any;
    };
    constructor(node?: Partial<SaxTag>);
}
export {};
