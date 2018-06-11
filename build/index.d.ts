import * as sax from "sax";
export declare const prepareXml: (xml: string) => string;
export declare type SaxNode = SaxTag | string;
export interface SaxTag extends sax.Tag {
    children?: SaxNode[];
    parent: {
        name: string;
        attributes: any;
    };
}
declare const _default: (xml: string) => Promise<SaxTag>;
export default _default;
