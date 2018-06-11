"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OpenNodes {
    constructor() {
        this.nodes = [];
    }
    add(tag) {
        this.nodes.push(tag);
    }
    remove() {
        return this.nodes.pop();
    }
    last() {
        return this.nodes[this.nodes.length - 1] || null;
    }
}
exports.default = OpenNodes;
