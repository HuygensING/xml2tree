"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sax = require("sax");
const open_nodes_1 = require("./open-nodes");
exports.prepareXml = (xml) => xml
    .trim()
    .replace(/\r?\n+\s*/usg, ' ')
    .replace(/> </usg, '><');
class Sax2Tree {
    constructor(xml, resolve, reject) {
        this.openTag = (node) => {
            const parentNode = this.openNodes.last();
            const parent = parentNode != null ? { name: parentNode.name, attributes: parentNode.attributes } : null;
            const tagNode = Object.assign({}, node, { parent });
            this.openNodes.add(tagNode);
            if (parent == null) {
                this.tree = tagNode;
                return;
            }
            if (!parentNode.hasOwnProperty('children'))
                parentNode.children = [];
            parentNode.children.push(tagNode);
        };
        this.handleText = (text) => {
            const parent = this.openNodes.last();
            if (parent == null)
                return;
            if (!parent.hasOwnProperty('children'))
                parent.children = [];
            parent.children.push(text);
        };
        this.closeTag = (tagName) => {
            this.openNodes.remove();
        };
        xml = exports.prepareXml(xml);
        this.openNodes = new open_nodes_1.default();
        const parser = sax.parser(true, {});
        parser.onopentag = this.openTag;
        parser.ontext = this.handleText;
        parser.onclosetag = this.closeTag;
        parser.onerror = reject;
        parser.onend = () => resolve(this.tree);
        parser.write(xml).close();
    }
}
exports.default = (xml) => new Promise((resolve, reject) => new Sax2Tree(xml, resolve, reject));
