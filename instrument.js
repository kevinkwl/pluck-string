
// C2-B4, C3-B5, C4-B6
var select_base = 1;
var base_range = [33, 21, 9];
function keytarConcert(i) {
	return 440.0 * Math.pow(2, (i - base_range[select_base]) / 12.0)
}

function createStrings(n, concert, decay=0.996, stringType=mString) {
	strs = []
	for (let i = 0; i < n; i++) {
		strs.push(new stringType(concert(i), decay))
	}
	return strs
}

function sampleAll(inst) {
	return inst.strings.reduce(function(acc, val) {
		return acc + val.sample()
	}, 0.0)
}

function ticAll(inst) {
	for (let i = 0; i < inst.strings.length; i++) {
		inst.strings[i].tic()
	}
}

const Keytar = {
	keyboard: "q2w3er5t6y7ui9o0p[=]azsxcfvgbnjmk,l.",
	strings: createStrings(36, keytarConcert),
	ns: 36,

	handleKey: function(keytyped) {
		let idx = this.keyboard.indexOf(keytyped)
		if (idx != -1) {
			this.strings[idx].pluck()
			console.log(keytarConcert(idx))
		}
	},

	regenerate: function() {
		console.log(select_base);
		this.strings = createStrings(36, keytarConcert);
	}
}

function createKeytar() {
	this.keyboard = "q2w3er5t6y7ui9o0p[=]azsxcfvgbnjmk,l.";
	this.strings = createStrings(36, keytarConcert);
	this.ns = 36;

	this.handleKey = function(keytyped) {
		let idx = this.keyboard.indexOf(keytyped)
		if (idx != -1) {
			this.strings[idx].pluck()
			console.log(keytarConcert(idx))
		}
	};
	this.regenerate = function() {
		console.log(select_base);
		this.strings = createStrings(36, keytarConcert);
	}
}
