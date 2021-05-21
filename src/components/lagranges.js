export let Lagrange = function(x1, y1, x2, y2) {
	
	this.xs = [x1, x2];
	this.ys = [y1, y2];
	this.ws = [];
	this._updateWeights();
}

Lagrange.prototype.addPoint = function(x, y) {
	this.xs.push(x);
	this.ys.push(y);
	this._updateWeights();
	return this.xs.length-1;
}

Lagrange.prototype.changePoint = function(index, x, y) {
	this.xs[index] = x;
	this.ys[index] = y;
	this._updateWeights();
}

Lagrange.prototype._updateWeights = function() {
	let k = this.xs.length;
	let w;
	
	for (let j = 0; j < k; ++j) {
		w = 1;
		for (let i = 0; i < k; ++i) {
			if (i !== j) {
				w *= this.xs[j] - this.xs[i];
			}
		}
		this.ws[j] = 1/w;
	}
}

Lagrange.prototype.valueOf = function(x) {
	let a = 0;
	let b = 0;
	let c = 0;
	
	for (let j = 0; j < this.xs.length; ++j) {
		if (x !== this.xs[j]) {
			a = this.ws[j] / (x - this.xs[j]);
			b += a * this.ys[j];
			c += a;
		} else {
			return this.ys[j];
		}
	}
	
	return b / c;
}

export default Lagrange;