
//Acts as our class definition - define a constructor
var Squirrel = function(n) {
  this.name = n;
  this.nuts = 0;
  this.jump = function() {
  console.log(this.name + " is jumping!");
	}
};

//Add a method to the Squirrel class
Squirrel.prototype.sayHello = function() {
  console.log("Hello!");
};

//Add another method
Squirrel.prototype.faveFood = function(){
  console.log(this.name + " likes nuts");
};

//And another method
Squirrel.prototype.addNutsToStore = function(newNuts) {
  this.nuts += newNuts;
};

var fluffy = new Squirrel("Fluffy");
var squeaky = new Squirrel("Squeaky");

//#############
// ## Part 1 ##
//#############

// add squirrels to a list
var squirrelArr = {
					squirrel1: fluffy,
					squirrel2: squeaky
				};

// iterate over the list and make them jump
for (var key in squirrelArr) {
	console.log(squirrelArr[key].name);
	squirrelArr[key].jump();
}

