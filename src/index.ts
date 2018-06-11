import * as sax from "sax"
import OpenNodes from './open-nodes'

export const prepareXml = (xml: string): string => xml
	.trim()
	.replace(/\r?\n+\s*/usg, ' ')
	.replace(/> </usg, '><')

export type SaxNode = SaxTag | string
export interface SaxTag extends sax.Tag {
	children?: SaxNode[]
	parent: {
		name: string,
		attributes: any
	}
}

class Sax2Tree {
	openNodes: OpenNodes
	tree: SaxTag

	constructor(xml: string, resolve: (tree: SaxTag) => void, reject: (err: Error) => void) {
		xml = prepareXml(xml)
		this.openNodes = new OpenNodes()

		const parser = sax.parser(true, {})
		parser.onopentag = this.openTag
		parser.ontext = this.handleText
		parser.onclosetag = this.closeTag
		parser.onerror = reject
		parser.onend = () => resolve(this.tree)
		parser.write(xml).close()
	}

	private openTag = (node: sax.Tag) => {
		const parentNode = this.openNodes.last()
		const parent = parentNode != null ? { name: parentNode.name, attributes: parentNode.attributes } : null
		const tagNode: SaxTag = { ...node, parent }
		this.openNodes.add(tagNode)

		if (parent == null) {
			this.tree = tagNode
			return
		}

		if (!parentNode.hasOwnProperty('children')) parentNode.children = []
		parentNode.children.push(tagNode)
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

export default (xml: string) => new Promise<SaxTag>((resolve, reject) => new Sax2Tree(xml, resolve, reject));