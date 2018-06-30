import { prepareXml } from '../src/index'

describe('Sax2Tree prepareXml', () => {
	test('empty string', async () => {
		expect(prepareXml('')).toBe('')
	})

	test('flat xml', async () => {
		expect(prepareXml('<div>hi</div>')).toBe('<div>hi</div>')
	})

	test('xml with line break', async () => {
		expect(prepareXml(`<div>hi
		</div>`)).toBe('<div>hi </div>')
	})

	test('xml with line breaks', async () => {
		expect(prepareXml(`<div>
		hi
		</div>`)).toBe('<div> hi </div>')
	})

	test('xml with line breaks before and after xml', async () => {
		expect(prepareXml(`
		<div>
		hi
		</div>
		`)).toBe('<div> hi </div>')
	})

	test('xml with line breaks between text content', async () => {
		expect(prepareXml(`
		<div>hi
		ho</div>
		`)).toBe('<div>hi ho</div>')
	})

	test('xml with line breaks with \r\n and \t', async () => {
		expect(prepareXml('<div>\r\n\t\thi\r\n</div>')).toBe('<div> hi </div>')
	})

	test('newline between tags', () => {
		expect(prepareXml(`<div>
			<span>1</span>
			<span>2</span>
		</div>`)).toBe('<div> <span>1</span> <span>2</span> </div>')
	})
})
