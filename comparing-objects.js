/*var india ={
	people: "150c",
	race: "all types",
	currency : "rupees",
	corruption : function(){
		return "lot of corruption";
	}
};//literal notation

var US = {
	people: "300m",
	race: "white",
	currency: "dollars",
	corruption: function(){
		return "some what";
	}
};//literal notation

function human(height,weight,complexion){
	this.height = height;
	this.weight = weight;
	this.complexion = complexion;
}//constructor notation

var john = new human(5.1, 65, "white");
//console.log(india.constructor === US.constructor);
//console.log(india.isPrototypeOf(US));

function comparing_objects(o1, o2){
	var obj1 = o1;
	var obj2 = o2;
	var x;
	for (x in obj1){
		if(obj1.hasOwnProperty(x) && obj2.hasOwnProperty(x)){
			console.log("both have same properties");
		}
		
		/*continue;
		if(typeOf(obj1[x]) && typeOf(obj2[x])){
			console.log(obj1 + " and " + obj2 + " have same type of values")+}
	/*	}
}
comparing_objects(india, US);*/

//using "bind"
var myObj = {
	firstName : 'hello',
	getFirstName : function(){
		return this.firstName;
	}
};
var copyGetFirstName = myObj.getFirstName.bind(myObj);
console.log(myObj.getFirstName());
console.log(copyGetFirstName()); 
//here copyGetFirstName is a function(i.e bind retruns a function) so we use parenthesis

//Using "call"
var myObj = {
	firstName : 'hello',
	getFirstName : function(){
		return this.firstName;
	}
};
//var copyGetFirstName = {firstName : 'hi'};
var copyGetFirstName = myObj.getFirstName.call(myObj);
console.log(myObj.getFirstName());
console.log(copyGetFirstName);
//here copyGetFirstName has the value returned by the long length "call" statement
//same thing happens even for the .apply instead of .call to make copyGetFirstName print string "hello"

//here is how we use using bind and apply refer to the video "https://www.youtube.com/watch?v=sXutwVoQKE4"
function bind(context, name){
	return function(){
		return context[name].apply(context, arguments);
	}
}

var myObj = {
	firstName : 'java',
	getFirstName : function(){
		return this.firstName;
	}
};
//var copyGetFirstName = {firstName : 'hi'};
var copyGetFirstName = bind(myObj, "getFirstName");
console.log(myObj.getFirstName());
console.log(copyGetFirstName());

//refer to function.prototype.bind MDN
var myObj = {
	firstName : 'mad',
	getFirstName : function(){
		return this.firstName;
	}
};
var copyGetFirstName = myObj.getFirstName.bind(myObj);
//in order to bind myObj's getFirstName function we use this
console.log(myObj.getFirstName());
console.log(copyGetFirstName());


//classical inheritance
function inherits(ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
}
var School = function(name, place){
this.name = name;
this.place = place;
};

var school1 = new School("DonBosco", "Delhi");
var school2 = new School("StPeter's", "hyd");

School.prototype.syllabus = function(syll){
	this.syll = syll;
console.log("syllabus is " + this.syll);
};
School.prototype.namePlace = function(){
console.log("I am the name place method of School, " + this.name );	
};

var school3 = new School();
school1.syllabus("CBSE");
var Block = function(name, color){
	School.call(this, name);

	this.color = color;
	//Block.super_.call(this, name);
	//Block.super_.call(this, place);
};
inherits(Block, School);//block inherits all the properties and methods of school
Block.prototype.whichColor = function(){
console.log("color of block is " + this.color);	
};

Block.prototype.namePlace = function(){
console.log("I am the namePlace method of Block, " + this.name);	
};

var chemBlock = new Block("chemistry block", "gold");
chemBlock.syllabus("Organic chemistry");
chemBlock.whichColor();
chemBlock.namePlace();//here chemBlock searches for namePlace in Block first, 
//if it finds it then it is used, if Block doesnt have it then
// it looks up to inheritance chain in School from which it inherited from,
// so if that School has namePlace then that method is used.

//prototypal inheritance
var person1 = {
	name: "person1",
	age: 29,
	create: function(values) {
  var instance = Object.create(this);
  Object.keys(values).forEach(function(key) {
    instance[key] = values[key];
  });
  return instance;
 },
	property: function(){
		console.log("lot of property (I am in person1)");
	}
};

var person2 = Object.create(person1);
var person3 = person2.create({
	name: "person3",
	age: 40,
	family: function(){
		console.log("very good family (I am in person3)");
	}
});
person2.property();
person3.family();
person3.property();
person1.property();

//call and apply invokes a function, but bind returns a function. We use 
//bind when we are passing a function to a variable and we wanted to use that variable to invoke the 
//function. Refer https://codeplanet.io/javascript-apply-vs-call-vs-bind/ 
//call--invokes a function, in order to bind "function's this" of an object or global "function's this"
//we use <function_name>.call(<binding_object>, argument of function_name);