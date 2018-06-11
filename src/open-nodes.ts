import { SaxTag } from "./index"

// import { compareNodeToSelector } from "../utils"

class OpenNodes {
	private nodes: SaxTag[] = []

	public add(tag: SaxTag) {
		this.nodes.push(tag)
	}

	public remove(): SaxTag {
		return this.nodes.pop();
	}

	// public contains(tagName: string): boolean {
	// 	return this.nodes.find((tag) => tag.data.name === tagName) != null
	// }

	// public containsBy(selector: SaxTagSelector): boolean {
	// 	return this.nodes.find((t) => compareNodeToSelector(t.data)(selector)) != null
	// }

	// public containsOneOf(selectors: SaxTagSelector[]): boolean {
	// 	return selectors.some((selector) => this.containsBy(selector));
	// }

	// public count(): number {
	// 	return this.nodes.length;
	// }

	// public countType(tagName: string): number {
	// 	return this.nodes.filter((tag) => tag.data.name === tagName).length;
	// }

	public last(): SaxTag {
		return this.nodes[this.nodes.length - 1] || null
	}

	// public lastOfType(tagName: string): TagInstance {
	// 	return [...this.nodes].reverse().find((tag) => tag.data.name === tagName);
	// }

	// public log(): string {
	// 	return this.nodes.map((t) => t.data.name).join(', ');
	// }
}

export default OpenNodes;
