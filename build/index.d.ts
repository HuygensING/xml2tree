import SaxTag, { SaxNode, SaxTagSimple, MinimalNode } from './sax-tag';
export { MinimalNode, SaxTag, SaxTagSimple, SaxNode };
export declare const prepareXml: (xml: string) => string;
export interface XMLToTreeOptions {
    collapse?: boolean;
    setCustomValues?: (node: SaxTag) => {
        [key: string]: any;
    };
}
declare const _default: (xml: string, options?: XMLToTreeOptions) => Promise<SaxTag>;
export default _default;
export declare function treeToList(tree: SaxNode): SaxTag[];
