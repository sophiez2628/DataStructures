//nuances of return in js
//return does not break out of the forEach loop

//inheritance in javascript
  //js uses prototypal inheritance - setting up the prototype chain
  //an instance's prototype object references the constructor function's prototype
function inherits(child, parent) {
  function Surrogate() {};
  Surrogate.prototype = parent.prototype;
  child.prototype = new Surrogate();
}

function Animal() {};
function Dog() {};


  //surrogate class needed so that parent class constructor is not called directly
  //does adding a method to child affect parent?

  //what is the prototype in js? an object

  //what happens when a constructor is called? (i.e. new Vehicle())
    //creates a new object
    //sets up the constructor property of the object to Vehicle
    //sets up object to delegate to Vehicle.prototype

//call vs apply vs bind in js
  //apply is used to call a method for an object that does not have the method defined on it

  //call is similar to apply, except it takes in arguments individually instead of in an array

  //bind - binds the correct context to a function

//event loop?

//node.js is a server side JavaScript framework

//what is REPL? (read-eval-print loop)

//hoisting in js?
  //only functions create a new scope in javascript
  //how to create a new scope? make an anonymous function

//Function declarations and variable declarations are always moved (“hoisted”) invisibly to the top of their containing scope by the JavaScript interpreter. Function parameters and language-defined names are, obviously, already there. This means that code like this:

function foo() {
	bar();
	var x = 1;
}
//is actually interpreted like this:

function foo() {
	var x;
	bar();
	x = 1;
}


//module pattern?

//what is IIFE? immediately invoked function expressions - good for private variables
  //allows us to export objects to the browser while protecting the global namespace from pollution
  //this allow us to mix in libraries with less fear and make code safer for other programmers to include
