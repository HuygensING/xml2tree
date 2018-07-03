import * as sax from "sax"
import OpenNodes from './open-nodes'

export const prepareXml = (xml: string): string =>
	xml
		.trim()
		.replace(/\r?\n+\s*/usg, ' ')

function addSiblings(tree: SaxTag): SaxTag {
	function addSiblings(node: SaxNode) {
		if (typeof node === 'string' || node == null) return
		if (node.hasOwnProperty('children')) {
			for (const child of node.children) {
				if (typeof child === 'string') continue
				child.siblings = node.children
					.filter(n => typeof n !== 'string')
					.map((n: SaxTag) => {
						if (n.id === child.id) return 'SELF'
						return ({ name: n.name, attributes: n.attributes })
					})
				if (child.siblings.length === 1) child.siblings = []

				addSiblings(child)
			}
		}
	}

	addSiblings(tree)

	return tree
}

interface SaxTagSimple {
    attributes: { [key: string]: string };
	name: string
}
export type SaxNode = SaxTag | string
export interface SaxTag extends sax.Tag {
	children?: SaxNode[]
	id: string
	parents: SaxTagSimple[]
	siblings?: (SaxTagSimple | 'SELF')[]
	custom?: {
		[k: string]: any
	}
}
class Sax2Tree {
	private openNodes: OpenNodes
	private options: XMLToTreeOptions
	private tree: SaxTag

	constructor(xml: string, options: XMLToTreeOptions, resolve: (tree: SaxTag) => void, reject: (err: Error) => void) {
		this.options = { ...defaultOptions, ...options }
		xml = prepareXml(xml)
		if (this.options.collapse) xml = xml.replace(/> </usg, '><')

		this.openNodes = new OpenNodes()
		const parser = sax.parser(true, {})
		parser.onopentag = this.openTag
		parser.ontext = this.handleText
		parser.onclosetag = this.closeTag
		parser.onerror = reject
		parser.onend = () => resolve(addSiblings(this.tree))
		parser.write(xml).close()
	}

	private openTag = (node: sax.Tag) => {
		const parent = this.openNodes.last()
		const parents = this.openNodes.toSimple()
		// TODO use crypto to create ID
		const saxTag: SaxTag = { ...node, parents, id: 'a'+Math.floor(Math.random() * 10000000), custom: {} }
		if (this.options.hasOwnProperty('setCustomValues')) {
			saxTag.custom = this.options.setCustomValues(saxTag)
		}

		this.openNodes.add(saxTag)

		if (!parents.length) {
			this.tree = saxTag
			return
		}

		if (!parent.hasOwnProperty('children')) parent.children = []
		parent.children.push(saxTag)
	}

	private handleText = (text: string) => {
		const parent = this.openNodes.last()
		if (parent == null) return
		if (!parent.hasOwnProperty('children')) parent.children = []
		parent.children.push(text)
	}

	private closeTag = (tagName: string) => {
		this.openNodes.remove()
	}
}

// TODO: create tests for options
export interface XMLToTreeOptions {
	collapse?: boolean
	setCustomValues?: (node: SaxTag) => { [key: string]: any }
}
const defaultOptions: Partial<XMLToTreeOptions> = {
	collapse: true,
}
export default (xml: string, options?: XMLToTreeOptions) => new Promise<SaxTag>((resolve, reject) => new Sax2Tree(xml, options, resolve, reject));

export function treeToList(tree: SaxNode): SaxTag[] {
	if (typeof tree === 'string' || tree == null) return []

	let list = []
	list.push(tree)

	if (Array.isArray(tree.children)) {
		const children = tree.children
			.filter(child => typeof child !== 'string')
			.map(treeToList)
			.reduce((prev, curr) => prev.concat(curr), [])
		list = list.concat(children)
	}

	return list
}