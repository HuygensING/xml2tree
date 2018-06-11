import { SaxTag } from "./index";
declare class OpenNodes {
    private nodes;
    add(tag: SaxTag): void;
    remove(): SaxTag;
    last(): SaxTag;
}
export default OpenNodes;
