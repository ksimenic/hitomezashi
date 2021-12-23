class HitomezashiStitch {

	hHash = []
	vHash = []
	bColor = "#ffffff"
	SColor = "#ffffff"
	density = 10
	sWidth = "1px"
	sOpacity = "100%"

	#cHeight = 0
	#cWidth = 0

	#svgAttrs = {"width":"100%","height":"100%"}
	#rectAttrs = {"x":0,"y":0,"width":"100%","height":"100%"}
	#patternAttrs = null

	#HORIZONTAL = "h"
	#VERTICAL = "v"
	#holderID = Math.random().toString(36).substr(2, 10)

	#holder = null
	#svg = null
	#horiRect = null
	#vertRect = null
	#horiPattern = null
	#vertPattern = null

	constructor (
		hHash = [],
		vHash = [],
		bColor = "#ffffff",
		SColor = "#ffffff"
	) {
		this.hHash = hHash
		this.vHash = vHash
		this.bColor = bColor
		this.SColor = SColor
	}

	setHHash(hHash) {
		this.hHash = hHash
	}

	setVHash(vHash) {
		this.vHash = vHash
	}

	setBColor(bColor) {
		this.bColor = bColor
	}

	setSColor(SColor) {
		this.SColor = SColor
	}

	setDensity(density) {
		this.density = density
	}

	setSWidth(sWidth) {
		this.sWidth = sWidth
	}

	setSOpacity(sOpacity) {
		this.sOpacity = sOpacity
	}

	// Public methods

	render() {

		// Cleanup + Init
		this.#init()

		// Generate horizontal and vertical lines and append to horizontal pattern
		this.#stitch()

		// Append horizontal and vertical patterns to svg
		this.#svg.appendChild(this.#horiPattern)
		this.#svg.appendChild(this.#vertPattern)

		// Append horizontal and vertical rect holders to svg
		this.#svg.appendChild(this.#horiRect)
		this.#svg.appendChild(this.#vertRect)

		// Append svg to holder
		this.#holder.appendChild(this.#svg)

		// Append holder to body
		document.body.prepend(this.#holder)
	}

	// Private helpers

	#init() {
		var elem = document.getElementById(this.#holderID)
		if (elem !== null) {
			elem.parentNode.removeChild(elem)
		}

		this.#padHashes();

		this.#cHeight = this.density * this.hHash.length;
		this.#cWidth = this.density * this.vHash.length;
		this.#patternAttrs = {"x":-1,"y":-1,"width":this.#cWidth,"height":this.#cHeight,"patternUnits":"userSpaceOnUse"}

		this.#holder = this.#genHolder()
		this.#svg = this.#svgElWithAttrs("svg", this.#svgAttrs)
		this.#horiRect = this.#svgElWithAttrs("rect", this.#rectAttrs, {"fill": "url(#pattern-horizontal)"})
		this.#vertRect = this.#svgElWithAttrs("rect", this.#rectAttrs, {"fill": "url(#pattern-vertical)"})
		this.#horiPattern = this.#svgElWithAttrs("pattern", this.#patternAttrs, {"id": "pattern-horizontal"})
		this.#vertPattern = this.#svgElWithAttrs("pattern", this.#patternAttrs, {"id": "pattern-vertical"})
	}

	#padHashes() {
		// Hashes always must have even number of elements so we pad with random one if odd
		if ((this.hHash.length % 2) !== 0) {
			this.hHash.push(Math.round(Math.random()))
		}

		if ((this.vHash.length % 2) !== 0) {
			this.vHash.push(Math.round(Math.random()))
		}
	}

	#stitch() {
		[this.#HORIZONTAL, this.#VERTICAL].forEach(direction => {

			var hash = (direction === this.#HORIZONTAL)
				? this.hHash
				: this.vHash

			var pattern = (direction === this.#HORIZONTAL)
				? this.#horiPattern
				: this.#vertPattern

			// First element is "half" of the last one so we append it first
			pattern.appendChild(this.#genPath(hash[hash.length-1], 0, direction))

			// Now add the rest of them
			for (var position in hash) {
				pattern.appendChild(this.#genPath(hash[position], (+position+1)*this.density, direction))
			}

		})
	}

	#genPath(digit, offset, direction) {
		// Figure out d based on direction
		let d = (direction == this.#HORIZONTAL)
			? "M" + (digit == 0 ? this.density : 0) + " " + offset + " L" + this.#cWidth + " " + offset
			: "M" + offset + " " + (digit == 0 ? this.density : 0) + " V " + this.density + " " + this.#cHeight;

		// Create path
		let path = this.#svgElWithAttrs(
			"path",
			{
				"stroke-dasharray": this.density + "," + this.density,
				"d":d,
				"stroke-width":this.sWidth,
				"stroke-opacity":this.sOpacity,
			}
		)

		// Create g parent
		let g = this.#svgElWithAttrs("g", {"stroke":this.SColor,"fill":"none"})

		// Append path to it
		g.appendChild(path)

		// And return it at the end
		return g;
	}

	#svgElWithAttrs(type, attrs, specialAttr = {}) {
		return this.#setAttributes(
			document.createElementNS("http://www.w3.org/2000/svg", type),
			attrs,
			specialAttr
		);
	}

	#setAttributes(el, attrs, elSpecificAttrs = {}) {
		for(var key in attrs) {
			el.setAttribute(key, attrs[key]);
		}
		for(var key in elSpecificAttrs) {
			el.setAttribute(key, elSpecificAttrs[key]);
		}
		return el;
	}

	#genHolder() {
		let div = document.createElement("div")
		div.style.cssText = "position:fixed;width:100%;height:100%;left:0;top:0;z-index:-100;background-color:"+this.bColor
		div.setAttribute('id', this.#holderID);
		return div
	}

}