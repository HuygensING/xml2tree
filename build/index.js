"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sax = require("sax");
const open_nodes_1 = require("./open-nodes");
const sax_tag_1 = require("./sax-tag");
exports.SaxTag = sax_tag_1.default;
exports.MinimalNode = sax_tag_1.MinimalNode;
exports.prepareXml = (xml) => xml
    .trim()
    .replace(/\r?\n+\s*/usg, ' ');
function addSiblings(tree) {
    function addSiblings(node) {
        if (typeof node === 'string' || node == null)
            return;
        if (node.hasOwnProperty('children')) {
            for (const child of node.children) {
                if (typeof child === 'string')
                    continue;
                child.siblings = node.children
                    .filter(n => typeof n !== 'string')
                    .map((n) => {
                    if (n.id === child.id)
                        return 'SELF';
                    return ({ name: n.name, attributes: n.attributes });
                });
                if (child.siblings.length === 1)
                    child.siblings = [];
                addSiblings(child);
            }
        }
    }
    addSiblings(tree);
    return tree;
}
class Sax2Tree {
    constructor(xml, options, resolve, reject) {
        this.openTag = (node) => {
            const parent = this.openNodes.last();
            const parents = this.openNodes.toSimple();
            const saxTag = new sax_tag_1.default(Object.assign({}, node, { parents }));
            if (this.options.hasOwnProperty('setCustomValues')) {
                saxTag.custom = this.options.setCustomValues(saxTag);
            }
            this.openNodes.add(saxTag);
            if (!parents.length) {
                this.tree = saxTag;
                return;
            }
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
        this.options = Object.assign({}, defaultOptions, options);
        if (this.options.collapse) {
            xml = exports.prepareXml(xml);
            xml = xml.replace(/> </usg, '><');
        }
        this.openNodes = new open_nodes_1.default();
        const parser = sax.parser(true, {});
        parser.onopentag = this.openTag;
        parser.ontext = this.handleText;
        parser.onclosetag = this.closeTag;
        parser.onerror = reject;
        parser.onend = () => resolve(addSiblings(this.tree));
        parser.write(xml).close();
    }
}
const defaultOptions = {
    collapse: true,
};
exports.default = (xml, options) => new Promise((resolve, reject) => new Sax2Tree(xml, options, resolve, reject));
function treeToList(tree) {
    if (typeof tree === 'string' || tree == null)
        return [];
    let list = [];
    list.push(tree);
    if (Array.isArray(tree.children)) {
        const children = tree.children
            .filter(child => typeof child !== 'string')
            .map(treeToList)
            .reduce((prev, curr) => prev.concat(curr), []);
        list = list.concat(children);
    }
    return list;
}
exports.treeToList = treeToList;
