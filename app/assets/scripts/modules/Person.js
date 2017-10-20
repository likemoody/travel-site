function Person (fullName, favColor) {
	this.name = fullName
	this.color = favColor
	this.greet = function () {
		console.log("Hello there! I am " + this.name + " and my favorite color is " + this.color + ".");
	}
}

module.exports = Person;