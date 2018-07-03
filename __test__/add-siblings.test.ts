import xmlToTree from '../src/index'
import { defNode } from './index.test';

describe('Sax2Tree', () => {
	test('empty string', async () => {
		const expected = await xmlToTree('<root><first></first><second></second><third></third></root>')
		expect(expected).toMatchObject({
			name: 'root',
			children: [
				{
					name: 'first',
					parents: [{
						name: 'root',
						attributes: {}
					}],
					siblings: [
						'SELF',
						{
							name: 'second',
							attributes: {}
						},
						{
							name: 'third',
							attributes: {}
						}
					]
				},
				{
					name: 'second',
					parents: [{
						name: 'root',
						attributes: {}
					}],
					siblings: [
						{
							name: 'first',
							attributes: {}
						},
						'SELF',
						{
							name: 'third',
							attributes: {}
						}
					]
				},
				{
					name: 'third',
					parents: [{
						name: 'root',
						attributes: {}
					}],
					siblings: [
						{
							name: 'first',
							attributes: {}
						},
						{
							name: 'second',
							attributes: {}
						},
						'SELF'
					]
				}
			]
		})
	})