var letters = [ 'a' , 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

/* S L I C E */
//  slice copies elements from an array and returns a new array
//  containing the copied elements
// The original array is not changed
//  sLice arguments are start (inclusive), and end (exclusive) index

console.log("Slice methods");

var someletters = letters.slice(2, 5);   // Copies elements 2, 3 and 4 to a new array
console.log("Element 2, 3, 4", someletters);

var three_to_end  = letters.slice(3);      // If you only specify the start element
                                                //then slice will copy to the end of the array
console.log("Element 3 to the end: ", three_to_end);

var element_three_in_a_list  = letters.slice(3, 4);  // Copy one element. Still returns a list
console.log("Element three, in a list: " , element_three_in_a_list);

var element_three = element_three_in_a_list[0];     //So if you need the element itself, you need to extract it from the list
console.log("Element 3: ", element_three);

console.log("Original array is still: ",  letters);

console.log();  //empty line

console.log("Splice methods");


// sPlice removes element or elements from an array
// sPlice arguments are start index, number of elements  - different to slice!

remove_element_3 = letters.splice(3, 1);  // sPlice removes elements and returns them in a new list
console.log("Remove element 3 from the letters array - letters is now:",  letters);
console.log("And here's the removed elements", remove_element_3);

letters.splice(4);  //Remove 4 through to the end
console.log("Remove element 4 through the end, new array is : ", letters);

letters.splice(1,2);
console.log("Removed elements 1 through 2, letters is now: ", letters);
