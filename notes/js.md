# JS - JavaScript
[**notes home**](../notes.md)

* Node.js is a runtime environment for JS
* debug in console, include script in HTML
* weakly typed (can reassign different types)

* 'let' lets vars change, 'const' does not

# TODO
*  javascript for delete buttons
* new category buttons
* add notes to categories
* delete notes
* global datastructure
* login buttons

use array of strings for notes
use array of objects for categories
use array of objects for users

displaying notes, adding div's to page??
styling settings for each category - tuple of color hex and check/item
ADD CHECKBOX FUNCTIONALITY
newitem/additem in flexbox so they shrink to fit

## Objects/Classes
'''javascript
const obj = new Object();
obj.prop = property;
// prints as {prop:property,etc};

OR use
const obj = {prop:property,etc};

function Person(name) {
    return { name:name,};
} // this returns a Person object

//equivalent to this!
class Person {
    constructor(name) {
        this.name = name;
    }
}
'''

* private values using '#property' in class definition.
* 'extends' works for inheritance, 'super' as well


## Arrays
* push, pop
* slice
* sort
* find
* forEach
* reduce
* map, filter, every (true if all true), some (true if one is true)

* 'for.of.' loop to iterate over an array
* 'for.in' loop to iterate over an object

### Destructuring
* 'const [a,b] = [1,2]' to assign a=1, b=2
* 'const {a,b} = {a:1,b:2}' to assign a=1, b=2
* 'const {a,b} = {a:1,b:2,c:3}' to assign a=1, b=2, ignore c
* 'const {a,b,c=3} = {a:1,b:2}' to assign a=1, b=2, c=3 (default value)
* assign values flexibly 
* unpacking/repacking works for this too ('...')

## Doodads
* make reg expressions using 'RegExp('pattern','flags')' or '/pattern/flags'
  * use 'test' method to check if a string matches a pattern
  * match method returns an array of matches
  * replace method replaces matches with a string
* '...' to combine params into array, or split array into params
* can style strings with CSS rules, also with types set in %c/%s etc
* '${code}' to include code in string concatenation (template literal)

* *try/catch* to provide fallback features if something fails
* console.table to manipulate table as array (LOOK AT NOTES FOR THIS AGAIN)
* console.time to time a function (start/stop)
* 'function*' to make a generator (yield keyword)


### Weird Typing
* automatic conversions: 1 + '2' = '12'
  * '1' == 1 is true
  * '1' + ['2','3'] --> '12,3' (string is first, so it gets converted)
  * true + null --> 1
  * NaN is Not a Number
  * true + undefined --> NaN (doesn't know what to do)
* *===* is strict equality (no conversion) USE THIS
* *==* is loose equality (converts then compares, useful for text -> number)

## Incorporate with HTML
* use 'script' tag to link to a JS file, ex '<script src="script.js"></script>'
* then in elements, use 'onclick="function()/code"'
* you can directly include code with script tags too

## DOM - Document Object Model
This is how you interact with and edit the HTML!

'document' keyword holds all the HTML elements
* querySelector('tag') to get an element (can use a class or id)
* createElement('tag') to create a new element
* appendChild(element) to add an element to the end of another
* removeChild(element) to remove an element from another
* innerHTML to get/set the HTML inside an element (risk of attack)

### Event Listeners
* addEventListener('event',function) to add a function to an event
  * events include click, focus, key presses, text selection
* to add in HTML: 
'''html
<button onclick='alert("clicked")'>click me</button>
'''
* *USE FUNCTION OBJECT* not the actual call. ex. function not function()

### Modules
* use 'export' keyword to export a function or variable ex. 'export function() {}'
* use 'import' keyword to import a function or variable ex. 'import {function} from './file.js'

* inline? use 'type="module"' in script tag.

'''javascript
function hello() = { console.log('hello'); }
module.exports = { function };
// then
const greet = require('./file.js');
greet.hello();
'''

* 'window.funcName = importedFunc' lets function be called in global scope

### Async
* JS is single threaded
* everything must be asynchronous!! can't run forever.
