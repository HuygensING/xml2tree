"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sax = require("sax");
const open_nodes_1 = require("./open-nodes");
exports.prepareXml = (xml) => xml
    .trim()
    .replace(/\r?\n+\s*/usg, ' ');
class Sax2Tree {
    constructor(xml, collapse, resolve, reject) {
        this.openTag = (node) => {
            const parents = this.openNodes.toSimple();
            const saxTag = Object.assign({}, node, { parents });
            this.openNodes.add(saxTag);
            if (!parents.length) {
                this.tree = saxTag;
                return;
            }
            const parent = this.openNodes.last();
            if (!parent.hasOwnProperty('children'))
                parent.children = [];
            parent.children.push(saxTag);
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
        if (collapse)
            xml = xml.replace(/> </usg, '><');
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
exports.default = (xml, collapse = true) => new Promise((resolve, reject) => new Sax2Tree(xml, collapse, resolve, reject));
