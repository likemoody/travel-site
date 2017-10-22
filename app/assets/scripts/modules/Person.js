class Person {
	constructor (fullName, favColor) {
		this.name = fullName
		this.color = favColor
	}

	greet() {
		console.log("Hi there, I am " + this.name + " and my favorite color is " + this.color + ".");
	}
}

export default Person;