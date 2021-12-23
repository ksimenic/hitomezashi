# Hitomezashi stitch background generator

Hitomezashi is a simple javascript library for generating beautiful "stitch patterns". Initialy built for generating svg backgrounds.


## Usage

#### Basic usage

```html
<script type="text/javascript" src="node_modules/@igloohr/hitomezashi/dist/hitomezashi.min.js"></script>
<script type="text/javascript">
	/*
	new HitomezashiStitch(
		# array of binary numbers used as horizontal hash,
		# array of binary numbers used as vertical hash,
		# background color,
		# line color
	)
	*/
	document.addEventListener("DOMContentLoaded", function(event) {
		var stitch = new HitomezashiStitch(
			[0,1,1,0,1,0],
			[0,1,1,0,1,0],
			"#000000",
			"#ffffff"
		)
		stitch.render()
	});
</script>
```
#### Advanced usage
```html
<script type="text/javascript" src="node_modules/@igloohr/hitomezashi/dist/hitomezashi.min.js"></script>
<script type="text/javascript">
	document.addEventListener("DOMContentLoaded", function(event) {
		// Initial render
		var stitch = new HitomezashiStitch(
			[0,1,1,0,1,0],
			[0,1,1,0,1,0],
			"#000000",
			"#ffffff"
		)
		stitch.render()

		// Advanced usage

		// Setting horizontal hash
		stitch.setHHash([1,1,0,0,0,1])
		// Setting vertical hash (randomly)
		stitch.setVHash(new Array(10).fill(1).map(x => (Math.random() >= .5) ? 1 : 0)) 

		// Set background color
		stitch.setBColor("#000000")
		// Set line color (randomly)
		stitch.setSColor("#"+Math.floor(Math.random()*16777215).toString(16))

		// Set how dense lines will be, defaults to 10
		stitch.setDensity(12)
		// Set how thick lines will be, defaults to 1px
		stitch.setSWidth("2px")
		// Set line opacity, defaults to 100%
		stitch.setSOpacity("150%")

		// Don't forget to call render() at the end to re-render the pattern
		stitch.render()

	});
</script>
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
