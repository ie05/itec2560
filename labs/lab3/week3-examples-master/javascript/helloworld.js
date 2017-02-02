//Integer variable
var quantity = 6;

//Floating point variable
var price = 123.45;

//String variables. Use single or double quotes
var text = "hello world";
var moreText = 'single quotes are ok too';

//Can define variable, and then initalize later
var car;
car = 'toyota';

var information = 'coffee';   //Initialize as a string
information = 1234;         // turn into an integer.
//JS is cool with this, but avoid in code, often leads to bugs

//Type coercion
var data = 10;
console.log('data plus 1 is ' + data + 1);   // data coerced into a string 'Data plus 1 is 101'
console.log(data + 1 + ' is data plus 1');   // compare to output of this:  '11 is data plus 1'

var string_number = '123';
var times_two = string_number * 2;    // string_number is coerced to a numerical value
console.log(times_two);            // 246

var stringLength = text.length; //length is a property

var shout = text.toUpperCase();  //These are methods - convert to uppercase

var whisper = text.toLowerCase();   //And to lowercase

var whereIsW = text.indexOf("w");   //Index of first matching character or -1 if not found

var whereIsZ = text.indexOf("z");   //Index of first matching character or -1 if not found

var whisperAndShout = whisper.concat(shout);  //Join strings together

var replaceO = text.replace("o", "0");  //Replace the first instance of first thing with second thing
                                        //See reference for more info on this, can also do global
                                        //and more complex replacements with regular expressions

var replaceAllO = text.replace(/o/g, "0");  //Replace the all instance of first thing with second thing


var removeWhitespace = text.trim();   //Remove spaces, tabs, newlines etc. from both ends of the string

console.log(stringLength, shout, whisper, whereIsW, whereIsZ,
  whisperAndShout, replaceO, replaceAllO, removeWhitespace);


//boolean variable
var inputValid = false;

//Array variable (like a list in Python)
var my_list = [5, 6, "cake", 1234.124, text];

//A simple object. More on this later
var productQuantities = { "android":5, "iphone":3 };

console.log(quantity);
console.log(price);
console.log(text);
console.log(inputValid);

console.log(my_list);
console.log(my_list[2]);
console.log(my_list[-10]);   //non-existent indexes: these print "undefined"
console.log(my_list[10]);

console.log(productQuantities);
//Two ways to access things in an object
console.log(productQuantities.android);  // Dot notation
console.log(productQuantities['android']); //or square brackets



//for loop, repeat a certain number of times
for ( var x = 0 ; x < 10 ; x++) {
  console.log(x);
}

var letters = ['a', 'b', 'c'];

//loop over a list
for (var i = 0 ; i < letters.length ; i++) {
  console.log(letters[i]);
}

//Loop over all properties in an object
var pc_specs = { "CPU" : "3.0 GHz", "Memory" : "4GB"};

for (var spec in pc_specs) {
  console.log(spec, pc_specs[spec]);
}

//The loop above works for a simple object. With more complex objects
//you may have inherited properties that you may wish to exclude. So modify loop as follows
for (var spec in pc_specs) {
  if (pc_specs.hasOwnProperty(spec)) { //check that spec is an actual property of this object
    console.log(spec, pc_specs[spec]);
  }
}


/* A while loop to double a number and display it
Stop when a number greater than 100 is reached */

var maxVal = 100;
var number = 1;
while (number < maxVal) {
  number *= 2;
  console.log("number = " + number)
}

/* Another way of looping over an array. A non-existent array
element is "undefined" and JavaScript considers "undefined" = false.
Anything that has a value is considered to be true (except the value false)
What would happen if your list had 'false' or something that evaluated to undefined in it?
 */
var animals = ["Buffalo", "Elephant", "Yak"];
var a = 0;
while (animals[a]){
  console.log(animals[a]);
  a++;
}

//Infinite loop!
//Avoid. Scripts that take too long to run or appear to be stuck
//in infinite loops, will be killed by the browser.

//while (true) {
//  console.log ("hello");
//}

var grade = 100;

if (grade == 100) {
  console.log("You aced the quiz!");
}

var orderQuantity = -1;

if (orderQuantity < 0) {
  console.log("Error - can't order a negative number");
}




/* if else statements */
var animal = "zebra";

if (animal == "zebra") {
  console.log("This animal is a zebra");
} else {
  console.log("Not a zebra");
}



var cities = ["London", "Paris", "Berlin"];

// array.indexOf(var) returns -1 if element not found
//If "Minneapolis" not in our array, then add (push)
//it to the end of the array
if (cities.indexOf("Minneapolis") == -1) {
  cities.push("Minneapolis");
} else {
  console.log("Minneapolis is in the list of cities")
}

console.log(cities);



//&& represents logical AND
//used to check if two or more conditions are both true

var itemPrice = 100;
if (itemPrice == 100 && orderQuantity > 1) {
  console.log("You have ordered at 1 or more $100 items");
}

/* || represents logical OR
If at least one of these conditions are true, the whole expression is true
 */
var newCustomer = true;
var haveEmail = false;

if (newCustomer == true || haveEmail == false) {
  console.log("Need to request customer's email")
}

//More concise version. ! reverses the truth of a value.

if (newCustomer || !haveEmail) {
  console.log("Need to request customer's email")
}



console.log("Based on the number of legs a creature has, I will try to guess what it is.");

var legs = 4;    /* Pretend this is user input */

if (legs < 0) {
  console.log("I don't think anything has a negative number of legs");
}
else if (legs % 2 != 0) {
  console.log("An odd number of legs, are you sure?");
}
else if (legs == 0) {
  console.log("Is it a snake?");
}
else if (legs == 2) {
  console.log("A biped animal, such as a human?");
}
else if (legs == 4) {
  console.log("A quadruped, like a zebra?");
}
else if (legs == 6) {
  console.log("Probably an insect, like a bee?");
}
else if (legs == 8) {
  console.log("Possibly a spider?");
}
else if (legs > 8) {
  console.log("More than 8 legs - perhaps a millipede?");
}
else {
  console.log("This shouldn't happen, " +
    "but add an else clause anyway to help detect if it does");
}


birds = ["Parrot", "Chicken", "Dodo", "Owl"];

birds[1] = "Eagle";   //replace element 1 with "Eagle"
birds[5] = "Sparrow";  //JS lets you do this...
                  // Empty elements are added to fill in the gaps.
console.log(birds);

birds[4] = "Jay";   //Fil in the blank element
console.log(birds);

var firstBird = birds[0];    //Get a copy of data from the array
var thirdBird = birds[2];
console.log(firstBird, thirdBird);

lastBird = birds.pop();         //Removes last item and returns it
console.log(lastBird, birds);
birds.push("Seagull");          //Push adds new element to end of array
console.log(birds);

firstBird = birds.shift();      //Remove and returns first element
console.log(firstBird, birds);
birds.unshift("Wren");          //Add element to start of array
console.log(birds);


//How many elements in the array?
numberOfBirds = birds.length;
console.log(numberOfBirds);

//Where is an element in the array? Return index if found, -1 if not
console.log(birds.indexOf("Owl"));    // 3
console.log(birds.indexOf("Penguin"));    // -1

//Loop over array

for (var j = 0 ; j < birds.length ; j++) {
  console.log("Bird " + j + " is " + birds[j]);
}

birds.reverse();  //Reverse order of elements
console.log(birds);

birds.sort();   //arrange array in ascending order.
                // How would you sort in descending order?
console.log(birds);

var allBirds = birds.join();  //Join all elements into a string,
                                        // separated by commas
var allBirdsWithSeparator = birds.join(" % ");  //Join all elements,
                                              // connected with a custom string
console.log(allBirds);
console.log(allBirdsWithSeparator);


var sum = add(1, 2);
console.log(sum);

function add(a, b) {
  return a + b;
}


exampleList = ["Zebra", "Squid", "Cat"];
exampleList2 = ["Owl", "Plankton", "Llama"];

console.log(containsOwl(exampleList));
console.log(containsOwl(exampleList2));

/* A very specific function testing if a list contains "Owl"
in any case. How could you make this more generally useful? */
function containsOwl(birdList) {

  var owl = "owl";

  for (var i = 0; i < birdList.length ; i++) {
    if (birdList[i].toLowerCase() == owl) {
      return true;
    }
  }
  return false;

}

// JavaScript doesn't care if you use the arguments
// you defined in your function or not.

function do_something(a,b) {
  console.log('do_something function running. It received these arguments:\n' +
    'a: ' + a + ' \nb: ' + b);
  for (var i = 0 ; i < arguments.length; i++) {
    console.log('Here are all of the arguments: ' + arguments[i]);
  }
}

do_something('hello', 'bye!');   // Who cares about type :)
do_something('hello');
do_something('hello', 1234, 0.0001, 'bye');

do_something(1);
do_something(1, 2);
do_something(1, 2, 3);
do_something(1, 2, 3, 4);





