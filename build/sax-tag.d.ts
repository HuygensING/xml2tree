import * as sax from "sax";
export declare class MinimalNode {
    id: string;
    children?: (MinimalNode | string)[];
}
export interface SaxTagSimple {
    attributes: {
        [key: string]: string;
    };
    name: string;
}
export declare type SaxNode = SaxTag | string;
export default class SaxTag extends MinimalNode implements sax.Tag {
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
