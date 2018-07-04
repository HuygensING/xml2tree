import { SaxTag } from "../src";

describe('SaxTag', () => {
	test('init', () => {
		expect(new SaxTag()).toMatchObject({
			attributes: {},
			children: [],
			custom: {},
			isSelfClosing: false,
			name: null,
			parents: [],
			siblings: [],
		})
	})

	test('has ID', () => {
		expect(new SaxTag()).toHaveProperty('id')
	})

	test('has children', () => {
		expect(new SaxTag({ name: 'some-tag-name', children: [{ name: 'some-child-tag-name', }]})).toMatchObject({
			attributes: {},
			children: [
				{
					attributes: {},
					children: [],
					custom: {},
					isSelfClosing: false,
					name: 'some-child-tag-name',
					parents: [],
					siblings: [],
				}
			],
			custom: {},
			isSelfClosing: false,
			name: 'some-tag-name',
			parents: [],
			siblings: [],
		})
	})
})