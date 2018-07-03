import * as sax from "sax";
export declare const prepareXml: (xml: string) => string;
interface SaxTagSimple {
    attributes: {
        [key: string]: string;
    };
    name: string;
}
export declare type SaxNode = SaxTag | string;
export interface SaxTag extends sax.Tag {
    children?: SaxNode[];
    id: string;
    parents: SaxTagSimple[];
    siblings?: (SaxTagSimple | 'SELF')[];
    custom?: {
        [k: string]: any;
    };
}
export interface XMLToTreeOptions {
    collapse?: boolean;
    setCustomValues?: (node: SaxTag) => {
        [key: string]: any;
    };
}
declare const _default: (xml: string, options?: XMLToTreeOptions) => Promise<SaxTag>;
export default _default;
export declare function treeToList(tree: SaxNode): SaxTag[];
