console.log('hello world');
var number = 6;
var anotherNumber = 12
var total = number + anotherNumber;
console.log(total);
var text = 'hello';
var floatingPoint = 45.45;


for (var i = 0; i < 10; i++) {
	console.log(i);
}

var arr = [];
for (var i = 0; i < 10; i++) {
	arr.push(i);
}
console.log('arr = ' + arr);

var x = 0;
while (x < 15){
	x++;
	console.log(x);
}

var grade = 75;

grade > 100 ? console.log('you passed!') : console.log('try, try again...');

var animals = ['cat','dog','bird'];

console.log(animals);

animals.push('elephant');

console.log(animals);

animals.pop();
console.log(animals);

animals.pop('cat');
console.log(animals);

animals.reverse();
animals.sort();
console.log(animals);

function parseURL(url) { // check for parms in URL and writes to web form inputs
    // define vars
    // var url = window.location.href; 
    // grab url and break params into an array
    
    url = url.slice((url.indexOf('?')+1)); // slice off params string starting at '?'
    
    var paramArr = url.split('&');
    var userParams = [];
    paramArr.forEach(function(item,index){ 
        if(item.indexOf('%20') !== -1){ // remove any url encoded spaces
            item = item.replace('%20',' '); 
        } // end if
        
        // set regex pattern looking for >,},)
        var reg = RegExp(/[<>{}()]/g); 
        if(reg.test(item)){ // remove any malicious characters
          item = item.replace(/[<>{}()]/g,"");
        } // end if
        
        // looks for specific param then,
        // removes key=val format from array element and,
        // assigns to the input based on id where,
        // key = id, so fname = id="fname"
        if(item.indexOf('ct_id') !== -1){ // check for campaign param
            item = item.slice(item.indexOf('=') + 1);
            userParams.push(item);
        } // end if

        if(item.indexOf('fname') !== -1){ // check for fname param
            item = item.slice(item.indexOf('=') + 1);
            userParams.push(item);
        } // end if

        if(item.indexOf('lname') !== -1){ // check for lname param
            item = item.slice(item.indexOf('=') + 1);
            userParams.push(item);
        } // end if
        
    }); // end for-each
    console.log('user params: ' + userParams);
} // end parseURL();
parseURL('www.someWebsite.com/?ct_id=92efo73eafdafdsaafasd&fname=Ian&lname=Handshy');


var exampleList = ["Zebra", "Squid", "Cat"];
var exampleList2 = ["Owl", "Plankton", "Llama"];

// console.log(containsOwl(exampleList));
// console.log(containsOwl(exampleList2));

/* A very specific function testing if a list contains "Owl"
in any case. How could you make this more generally useful? */
function containsNeedle(hay,needle) {

  for (var i = 0; i < hay.length ; i++) {
    if (hay[i].toLowerCase() == needle.toLowerCase()) {
      return true;
    }
  }
  return false;

}

// refactor above code
var exampleList3 = ["Zebra", "Squid", "Cat"];

// define mutation function
function changeCase(arr){
	var nArr = [];
	arr.forEach(function(item,index){
		nArr.push(item.toLowerCase());
	});	
	return nArr;	
}

// pass array, what to look for, and an object w/ two attributes
function containsNeedleCase(hay,needle,caseSensitive) {
   caseSensitive.case == true ? hay : hay = caseSensitive.cs(hay);
   for (var i = 0; i < hay.length ; i++) {
    if (hay[i] == needle) {
      return true;
    }
  }
  return false;

}

console.log(containsNeedleCase(exampleList3,'squid',{case:true, cs: changeCase}));

