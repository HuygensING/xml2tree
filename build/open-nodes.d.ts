import SaxTag from "./sax-tag";
declare class OpenNodes {
    private nodes;
    toSimple(): {
        name: string;
        attributes: {
            [key: string]: string;
        };
    }[];
    add(tag: SaxTag): void;
    remove(): SaxTag;
    last(): SaxTag;
}
export default OpenNodes;
