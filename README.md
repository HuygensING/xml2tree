# XML2TREE

Convert an XML string to a tree. The lib uses sax, and the tree is opinionated based on the sax parser.

## Build
```
$ npm run build
```

## Development
```
$ npm run watch
```

## Test
```
$ npm test
```

## Example
```javascript
import xml2tree from 'xml2tree'

await function main() {
	const xml = '<list><item id="1">Montezuma II</item></list>'
	const tree = await xml2tree(xml)
	console.log(tree)
	/**
	Output:
		{
			"attributes": {},
			"children": [
				{
					"attributes": {
						"id": "1"
					},
					"children": [
						"Montezuma II"
					],
					"isSelfClosing": false,
					"name": "item",
					"parent": {
						"attributes": {},
						"name": "list"
					}
				}
			],
			"isSelfClosing": false,
			"name": "list",
			"parent": null
		}
	*/
}

main()
```
See the `__test__` dir for more (elaborate) examples