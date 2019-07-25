import * as sax from "sax"

export class MinimalNode {
	id: string
	children?: (MinimalNode | string)[]
}

export interface SaxTagSimple {
    attributes: { [key: string]: string };
	name: string
}
export type SaxNode = SaxTag | string
export default class SaxTag extends MinimalNode implements sax.Tag {
    attributes: { [key: string]: string } = {}
	children: SaxNode[] = []
	id: string
    isSelfClosing: boolean = false
    name: string = null
	parents: SaxTagSimple[] = []
	siblings: (SaxTagSimple | 'SELF')[] = []
	custom: {
		[k: string]: any
	} = {}

	constructor(node?: Partial<SaxTag>) {
		super()

		for (const prop in node) {
			(this as any)[prop] = (node as any)[prop]
		}	

		this.children = this.children.map(child => {
			if (typeof child === 'string') return child
			return new SaxTag(child)
		})

		this.id = 'TAG_'+Math.floor(Math.random() * 10000000)
	}
}

// export default class Node(tag: Partial<SaxTag>): SaxTag {
// 	// TODO move to xml2tree
// 	// TODO use crypto to create ID

// 	if (tag.hasOwnProperty('children')) {
// 		tag.children = tag.children.map((child: SaxNode) => {
// 			if (typeof child === 'string') return child
// 			return createSaxTag(child)
// 		})
// 	}

// 	return { ...defaultTagNode, ...tag }
// }