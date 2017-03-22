class mString {
	constructor(frequency, decay=0.996) {
		this.decay = decay
		this.frequency = frequency
		this.fillCount = 0
		this.capacity = Math.round(String.SR / frequency)
		this.buffer = []
		for (let i = 0; i < this.capacity; i++) {
			this.buffer.push(0)
			this.fillCount += 1
		}
	}

	pluck() {
		while (this.fillCount > 0) {
			this.buffer.pop()
			this.fillCount--
		}
		while (this.fillCount < this.capacity) {
			var i = Math.random() - 0.5
			this.buffer.push(i)
			this.fillCount++

		}
//		console.log(this.buffer)
	}

	tic() {
		let front = this.buffer.shift()
		let second = this.buffer[0]
		this.buffer.push((front + second) / 2.0 * this.decay)
	}

	sample() {
		return this.buffer[0]
	}

	print() {
		for (let i = 0; i < this.buffer.length; i++) {
			console.log(this.buffer[i])
		}
	}
}
String.SR = 44100.0

class HarpString extends mString {
	constructor(frequency, decay=0.996) {
		super(frequency, decay)
		this.fillCount = 0
		this.capacity = 2 * Math.round(String.SR / frequency)
		this.buffer = []
		for (let i = 0; i < this.capacity; i++) {
			this.buffer.push(0)
			this.fillCount += 1
		}
	}
	tic() {
		let front = this.buffer.shift()
		let second = this.buffer[0]
		this.buffer.push(-(front + second) / 2.0 * this.decay)
	}
}

class DrumString extends mString {
	constructor(frequency, decay=1.0) {
		super(frequency, decay)
		this.fillCount = 0
		this.capacity = Math.round(String.SR / frequency)
		this.buffer = []
		for (let i = 0; i < this.capacity; i++) {
			this.buffer.push(0)
			this.fillCount += 1
		}
	}
	tic() {
		let front = this.buffer.shift()
		let second = this.buffer[0]
		let flip = Math.random()
		if (flip >= 0.8) {
			this.buffer.push(-(front + second) / 2.0 * this.decay)
		} else {
			this.buffer.push((front + second) / 2.0 * this.decay)
		}
	}
}