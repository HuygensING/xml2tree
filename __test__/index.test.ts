import sax2xml from '../src/index'

export const defNode = {"attributes": {}, "isSelfClosing": false, "name": null, "parents": []}

describe('Sax2Tree', () => {
	test('empty string', async () => {
		const expected = await sax2xml('')
		expect(expected).toBeUndefined()
	})

	test('root only', async () => {
		const expected = await sax2xml('<root />')
		expect(expected).toMatchObject({
			...defNode,
			name: 'root',
			isSelfClosing: true,
		})
	})

	test('root with text', async () => {
		const expected = await sax2xml('<root>content has content</root>')
		expect(expected).toMatchObject({
			...defNode,
			name: 'root',
			children: ['content has content'],
		})
	})

	test('root with child', async () => {
		const expected = await sax2xml('<root><child /></root>')
		expect(expected).toMatchObject({
			...defNode,
			children: [
				{
					...defNode,
					isSelfClosing: true,
					name: 'child',
					parents: [{
						attributes: {},
						name: 'root',
					}],
					siblings: []
				}
			],
			name: 'root',
		})
	})

	test('root with children', async () => {
		const expected = await sax2xml('<root><child key="1" /><child key="2" /></root>')
		expect(expected).toMatchObject({
			...defNode,
			children: [
				{
					...defNode,
					attributes: { key: '1' },
					isSelfClosing: true,
					name: 'child',
					parents: [{
						attributes: {},
						name: 'root',
					}],
					siblings: [
						'SELF',
						{
							name: 'child',
							attributes: { key: '2' }
						}
					]
				},
				{
					...defNode,
					attributes: { key: '2' },
					isSelfClosing: true,
					name: 'child',
					parents: [{
						attributes: {},
						name: 'root',
					}],
					siblings: [
						{
							name: 'child',
							attributes: { key: '1' }
						},
						'SELF'
					]
				}
			],
			name: 'root',
		})
	})

	test('root with child and text', async () => {
		const expected = await sax2xml('<root>content <child>has</child> content</root>')
		expect(expected).toMatchObject({
			...defNode,
			children: [
				"content ",
				{
					...defNode,
					children: ['has'],
					name: 'child',
					parents: [{
						attributes: {},
						name: 'root',
					}],
					siblings: []
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
		expect(expected).toMatchObject({
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
							parents: [{
								attributes: {},
								name: 'root',
							}, {
								attributes: {},
								name: 'child',
							}],
							siblings: []
						},
						's',
					],
					name: 'child',
					parents: [{
						attributes: {},
						name: 'root',
					}],
					siblings: []
				},
				" content ",
			],
			name: 'root',
		})
	})
})
