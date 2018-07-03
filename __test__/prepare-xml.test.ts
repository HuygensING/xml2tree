import { prepareXml } from '../src/index'

describe('Sax2Tree prepareXml', () => {
	test('empty string', () => {
		expect(prepareXml('')).toBe('')
	})

	test('flat xml', () => {
		expect(prepareXml('<div>hi</div>')).toBe('<div>hi</div>')
	})

	test('xml with line break', () => {
		expect(prepareXml(`<div>hi
		</div>`)).toBe('<div>hi </div>')
	})

	test('xml with line breaks', () => {
		expect(prepareXml(`<div>
		hi
		</div>`)).toBe('<div> hi </div>')
	})

	test('xml with line breaks before and after xml', () => {
		expect(prepareXml(`
		<div>
		hi
		</div>
		`)).toBe('<div> hi </div>')
	})

	test('xml with line breaks between text content', () => {
		expect(prepareXml(`
		<div>hi
		ho</div>
		`)).toBe('<div>hi ho</div>')
	})

	test('xml with line breaks with \r\n and \t', () => {
		expect(prepareXml('<div>\r\n\t\thi\r\n</div>')).toBe('<div> hi </div>')
	})

	test('newline between tags', () => {
		expect(prepareXml(`<div>
			<span>1</span>
			<span>2</span>
		</div>`)).toBe('<div> <span>1</span> <span>2</span> </div>')
	})
})
