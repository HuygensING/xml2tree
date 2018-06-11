import sax2xml from '../src/index'

const defNode = {"attributes": {}, "isSelfClosing": false, "name": null, "parent": null}

describe('Sax2Tree', () => {
	test('empty string', async () => {
		const expected = await sax2xml('')
		expect(expected).toBeUndefined()
	})

	test('root only', async () => {
		const expected = await sax2xml('<root />')
		expect(expected).toEqual({
			...defNode,
			name: 'root',
			isSelfClosing: true,
		})
	})

	test('root with text', async () => {
		const expected = await sax2xml('<root>content has content</root>')
		expect(expected).toEqual({
			...defNode,
			name: 'root',
			children: ['content has content'],
		})
	})

	test('root with child', async () => {
		const expected = await sax2xml('<root><child /></root>')
		expect(expected).toEqual({
			...defNode,
			children: [
				{
					...defNode,
					isSelfClosing: true,
					name: 'child',
					parent: {
						attributes: {},
						name: 'root',
					}
				}
			],
			name: 'root',
		})
	})

	test('root with child and text', async () => {
		const expected = await sax2xml('<root>content <child>has</child> content</root>')
		expect(expected).toEqual({
			...defNode,
			children: [
				"content ",
				{
					...defNode,
					children: ['has'],
					name: 'child',
					parent: {
						attributes: {},
						name: 'root',
					}
				},
				" content"
			],
			name: 'root',
		})
	})

	test('root with child, text and subchild', async () => {
		const expected = await sax2xml(
			`<root>
				content
				<child>ha<subchild />s</child>
				content
			</root>`
		)
		expect(expected).toEqual({
			...defNode,
			children: [
				" content ",
				{
					...defNode,
					children: [
						'ha',
						{
							...defNode,
							isSelfClosing: true,
							name: 'subchild',
							parent: {
								attributes: {},
								name: 'child',
							}
						},
						's',
					],
					name: 'child',
					parent: {
						attributes: {},
						name: 'root',
					}
				},
				" content "
			],
			name: 'root',
		})
	})
})
