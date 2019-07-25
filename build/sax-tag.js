"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MinimalNode {
}
exports.MinimalNode = MinimalNode;
class SaxTag extends MinimalNode {
    constructor(node) {
        super();
        this.attributes = {};
        this.children = [];
        this.isSelfClosing = false;
        this.name = null;
        this.parents = [];
        this.siblings = [];
        this.custom = {};
        for (const prop in node) {
            this[prop] = node[prop];
        }
        this.children = this.children.map(child => {
            if (typeof child === 'string')
                return child;
            return new SaxTag(child);
        });
        this.id = 'TAG_' + Math.floor(Math.random() * 10000000);
    }
}
exports.default = SaxTag;
