import * as sax from "sax";
export declare const prepareXml: (xml: string) => string;
export declare type SaxNode = SaxTag | string;
export interface SaxTag extends sax.Tag {
    children?: SaxNode[];
    parents: {
        name: string;
        attributes: any;
    }[];
}
declare const _default: (xml: string, collapse?: boolean) => Promise<SaxTag>;
export default _default;
