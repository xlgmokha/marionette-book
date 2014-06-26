var config = {
  writable: true,
  enumerable: true,
  configurable: true,
};

var defineProperty = function(object, name, value) {
  config.value = value;
  Object.defineProperty(object, name, config);
}

var person = Object.create(null);
defineProperty(person, 'firstName', 'john');
defineProperty(person, 'lastName', 'smith');
defineProperty(person, 'fullName', function() {
  return this.firstName + ' ' + this.lastName;
});

var man = Object.create(person);
defineProperty(man, 'gender', 'male');

var mo = Object.create(man);
defineProperty(mo, 'firstName', 'mo')
defineProperty(mo, 'lastName', 'khan')

console.log(mo.fullName());
console.log(mo.gender);
console.log(Object.getPrototypeOf(mo))



var fromPrototype = function(prototype, object) {
  var newObject = Object.create(prototype);

  for (var property in object) {
    if (object.hasOwnProperty(property)) {
      newObject[property] = object[property];
    }
  }
  return newObject;
};

var person = {
  toString: function() {
    return this.firstName + ' ' + this.lastName;
  }
};

var man = fromPrototype(person, {
  gender: 'male'
});

var mo = fromPrototype(man, {
  firstName: 'mo',
  lastName: 'khan',
});

console.log(mo.gender)
console.log(mo.toString())


var Person = function(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
};

Person.prototype = {
  toString: function() {
    return this.firstName + ' ' + this.lastName;
  }
};

function newObject(func) {
  var args = Array.prototype.slice.call(arguments, 1);
  var object = Object.create(func.prototype);
  func.apply(object, args);
  return object;
}

var mo = newObject(Person, 'mo', 'khan');
console.log(mo.toString());

var mo = new Person('mo', 'khan');
console.log(mo.toString());
