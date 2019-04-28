<!--
When github starts supporting CSS, enable this :(-->
<style>
  code>em:first-of-type /*prototype*/ {
    color: #0089B3;
  } code>em+strong /*method*/,
    code>.type {
    color: #679C00;
  } code>.type {
    text-decoration: underline;
  } code>.type+em /*argument*/ {
    color: #CF7000;
  } code>.literal {
    color: #684D99;
    background-color: rgba(104, 77, 153, .1);
    border-radius: 2px;
  } code>.operator {
    color: #F9005A;
  }
</style>

# prototype-extensions
My personal prototype extension library. Feel free to use it in your own projects :).

Compile the source with this command
```shell
npx babel ./source --out-dir ./compiled
```

And just require the parts of the module you need as such:
```js
const extend = require("prototype-extensions/Extend");
extend({
  "String": require("prototype-extensions/String"), //Extend the String prototype
  "Array": require("prototype-extensions/Array") //Extend the Array prototype
});
```
Or use the extensions as standalone functions
```js
const { decaptialise } = require("prototype-extensions/String");
console.log(decapitalise("A Captialised String"));
// > a capitalised string
```

## Content
- [You're doing what-now?](#you're-doing-what-now?)
- [Handy info before reading the docs](#handy-info-before-reading-the-docs)
- [Extended Prototypes](#extended-prototypes)
  - [String](#string)
  - [Array](#array)
- [Future](#future)

## You're doing what-now?
Prototypal inheritance is one of the good parts of JavaScript in my opinion. I've never understood and/or agreed with any arguments against extending prototypes, since all arguments are trivially countered.

**Main argument against extending prototypes:**
> "Changing the behaviour of an object that will only be used by your own code is fine. But when you change the behaviour of something that is also used by other code there is a risk you will break that other code." - [Abhi Beckert (Stack Exchange)](https://stackoverflow.com/questions/14034180/why-is-extending-native-objects-a-bad-practice)

**Why I disagree:**

Simply make sure you don't overwrite existing prototype methods (including third-party ones), and make sure you use the correct version of the function. The intuitivity of using prototype extensions come with the price of keeping track of what library last extends the prototype. If programmed correctly, there shouldn't be a difference result-wise anyway.

---

How do I extend prototypes you ask? Well, like this:
```js
export default function extendPrototype (object, method) {
  Object.defineProperty(object.prototype || object, method.name, {
    value: method
  });
}
```
This way I don't create enumerable properties that show up when you use builtin iterators. This also prevents overwriting existing methods and disallows overwriting of the methods from this library.

## Handy info before reading the docs
Every method declared by this library is documented as such:

<a name="example_method" href="#example_method">#️⃣</a> <code>_ExamplePrototype_.**methodName** ( <span class="type">type:</span> _argument_ = <span class="literal">default</span> [, <span class="type">type:</span> _optionalArgument_])</code> [</>](#example_method)

- The [#️⃣](#example_method) Emoji is an anchor to link to this part of the documentation (aka what you're reading right now! 😱).
- The [</>](#example_method) symbol links to the place where the method is declared in the source code (not the compiled code).

I don't use TypeScript for this project (yet?), so the types aren't enforced. It's just for clarity.

## Extended Prototypes

### String
<a name="string_capitalise" href="#string_capitalise">#️⃣</a> <code>_String_.**capitalise** ( )</code> / <code>_String_.**capitalize** ( )</code> [</>](./source/String.js#L1-L3)

Calling this function on a string will _Capitalise_ it.
```js
["wolfgang", "amadeus", "mozart"]
  .map(name => name.capitalise())
  .join(" ");
// > Wolfgang Amadeus Mozart
```
---
<a name="string_decapitalise" href="#string_decapitalise">#️⃣</a> <code>_String_.**decapitalise** ( )</code> / <code>_String_.**decapitalize** ( )</code> [</>](./source/String.js#L5-L7)

Calling this function on a string will _decapitalise_ it.
```js
["Wolfgang", "Amadeus", "Mozart"]
  .map(name => name.decapitalise())
  .join(" ");
// > wolfgang amadeus mozart
```
---
<a name="string_camelcasify" href="#string_camelcasify">#️⃣</a> <code>_String_.**camelcasify** ( )</code> / <code>_String_.**camelCasify** ( )</code> [</>](./source/String.js#L9-L20)

Calling this function on a string will _camelCasify_ it.
```js
"My name is Jeff".camelcasify();
// > "myNameIsJeff"

"My-name-is-Jeff".camelcasify();
// > "myNameIsJeff"

"My_name_is_Jeff".camelcasify();
// > "myNameIsJeff"
```
---
<a name="string_first" href="#string_first">#️⃣</a> <code>_String_.**first** ( <span class="type">number:</span> _count_ = <span class="literal">1</span> )</code> [</>](./source/String.js#L22-L24)

Gets the first _count_ characters from a string. _Count_ defaults to one.
```js
"Hello World".first();
// > "H"

"Hello World".first(3);
// > "Hell"
// Woah... 😲
```
---
<a name="string_last" href="#string_last">#️⃣</a> <code>_String_.**last** ( <span class="type">number:</span> _count_ = <span class="literal">1</span> )</code> [</>](./source/String.js#L26-L28)

Gets the last _count_ characters from a string. _Count_ defaults to one.
```js
"Hello World".last();
// > "d"

"Hello World".last(3);
// > "rld"
```
---
<a name="string_pad" href="#string_pad">#️⃣</a> <code>_String_.**pad** ( <span class="type">number:</span> _count_ = <span class="literal">1</span> [, <span class="type">string:</span> _padding_ = <span class="literal">" "</span> ])</code> [</>](./source/String.js#L30-L43)

Pads a string on both sides with a given _padding_ repeated _count_ times.
When calling the function without a specified _padding_, it will be padded with <span>" "</span> (U+0020 'SPACE').

---
<a name="string_reverse" href="#string_reverse">#️⃣</a> <code>_String_.**reverse** ( )</code> [</>](./source/String.js#L45-L49)

Reverses a string.
```js
"Reversible string!".reverse();
// > "!gnirts elbisreveR"
```
---
<a name="string_letters" href="#string_letters">#️⃣</a> <code>_String_.**letters** ( )</code> [</>](./source/String.js#L51-L53)

Returns an array filled with all letters in a string.
```js
"String, that-contains; let'ters.".letters();
// > ["S", "t", "r", "i", "n", "g", "t", "h", "a", "t", "c", "o", "n", "t", "a", "i", "n", "s", "l", "e", "t", "t", "e", "r", "s"]
```
---
<a name="string_punctuationMarks" href="#string_punctuationMarks">#️⃣</a> <code>_String_.**punctuationMarks** ( )</code> [</>](./source/String.js#L55-L57)

Returns an array filled with all punctuation marks in a string.
```js
`Hello, my name is "Barg'um G'act" -- and I speak Klingon.`.punctuationMarks();
// > [",", """, "'", "'", """, "-", "-", "."]
```
---
<a name="string_escape" href="#string_escape">#️⃣</a> <code>_String_.**escape** ( )</code> [</>](./source/String.js#L59-L61)

Escapes all non-word characters as defined by JavaScript's _RegExp_ engine.

```js
`Hello, my name is "Barg'um G'act" -- and I speak Klingon.`.escape();
// > "Hello\,\ my\ name\ is\ \"Barg\'um\ G\'act\"\ \-\-\ and\ I\ speak\ Klingon\."
```
---
<a name="string_characters" href="#string_characters">#️⃣</a> <code>_String_.**characters** ( <span class="type">boolean:</span> _ignoreWhiteSpace_ = <span class="literal">false</span> )</code> [</>](./source/String.js#L63-L67)

Returns an array filled with all characters in a string. `ignoreWhiteSpace` is a boolean that, when true, will also include whitespace.
```js
`Hello, my name is "Barg'um G'act" -- and I speak Klingon.`.characters();
// > ["H", "e", "l", "l", "o", ",", "m", "y", "n", "a", "m", "e", "i", "s", """, "B", "a", "r", "g", "'", "u", "m", "G", "'", "a", "c", "t", """, "-", "-", "a", "n", "d", "I", "s", "p", "e", "a", "k", "K", "l", "i", "n", "g", "o", "n", "."]

`Hello, my name is "Barg'um G'act" -- and I speak Klingon.`.characters(false);
// > ["H", "e", "l", "l", "o", ",", " ", "m", "y", " ", "n", "a", "m", "e", " ", "i", "s", " ", """, "B", "a", "r", "g", "'", "u", "m", " ", "G", "'", "a", "c", "t", """, " ", "-", "-", " ", "a", "n", "d", " ", "I", " ", "s", "p", "e", "a", "k", " ", "K", "l", "i", "n", "g", "o", "n", "."]
```
---
<a name="string_truncate" href="#string_truncate">#️⃣</a> <code>_String_.**truncate** ( <span class="type">number:</span> _length_, <span>string:</span> _symbol_ = <span class="literal">"..."</span>)</code> [</>](./source/String.js#L69-L71)

Truncates a string to a certain _length_, appending _symbol_ to it.
```js
"This is a string that's quite long. Let's truncate it!".truncate(9);
// > "This is a..."
```
---
<a name="string_words" href="#string_words">#️⃣</a> <code>_String_.**words** ( <span class="type">boolean:</span> _includeSpecialCharacters_ = <span class="literal">false</span> )</code> [</>](./source/String.js#L73-L77)

Returns an array filled with the words in a string. Setting `includeSpecialCharacters` to true should be a bit more useful for strings with a lot of diacritic marks (e.g. French sentences), but doesn't work that well.
```js
"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...".words();
// > ["Neque", "porro", "quisquam", "est", "qui", "dolorem", "ipsum", "quia", "dolor", "sit", "amet", "consectetur", "adipisci", "velit"]
```
---
<a name="string_wordCount" href="#string_wordCount">#️⃣</a> <code>_String_.**wordCount** ( )</code> [</>](./source/String.js#L79-L83)

Returns the amount of words found by the [_String_.**words**()](#string_words) function.

---
<a name="string_hyphenate" href="#string_hyphenate">#️⃣</a> <code>_String_.**hyphenate** ( )</code> [</>](./source/String.js#L85-L89)

Replaces all word breaks by hyphens.
```js
"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...".hyphenate();
// > "Neque-porro-quisquam-est-qui-dolorem-ipsum-quia-dolor-sit-amet-consectetur-adipisci-velit"
```
---
<a name="string_inflect" href="#string_inflect">#️⃣</a> <code>_String_.**inflect** ( <span class="type">number:</span> _count_ )</code> [</>](./source/String.js#L91-L95)

Inflect the string to the correct count of things it describes. That's quite vague, so heres an example:
```js
const dogs = []; // dogs.length === 0
`${dogs.length} Dog`.inflect(dogs.length);
// > "0 Dogs"

dogs.push("Albert the Dog"); // dogs.length === 1
`${dogs.length} Dog`.inflect(dogs.length);
// > "1 Dog"

dogs.push("Barry the Dog"); // dogs.length === 2
`${dogs.length} Dog`.inflect(dogs.length);
// > "2 Dogs"
```
---
<a name="string_dedent" href="#string_dedent">#️⃣</a> <code>_String_.**dedent** (  )</code> [</>](./source/String.js#L97-L105)

Removes indentation from a string. The special character class `|<-` removes all indentation untill that class, including the class itself.
```js
`
            Unknown lexeme \`${lexeme}\` in FILENAME.EXTENSION
              at line ${line}, column ${column}${(lexeme.length > 1) ? " to " + (column + lexeme.length - 1) : ""}.
              
              |<-${lineString}
              |<-${" ".repeat(column - 1)}${"˜".repeat(lexeme.length)}
`.dedent();
/* >
`
Unknown lexeme \`${lexeme}\` in FILENAME.EXTENSION
  at line ${line}, column ${column}${(lexeme.length > 1) ? " to " + (column + lexeme.length - 1) : ""}.
  
${lineString}
${" ".repeat(column - 1)}${chalk.redBright("˜".repeat(lexeme.length))}
`
*/
```
---
#### Builtin Aliases
- <code>_String_.**toUpperCase**</code> -> <code>_String_.**toUpper**</code> / <code>_String_.**upper**</code> [</>](./source/String.js#L111-L112)
- <code>_String_.**toLowerCase**</code> -> <code>_String_.**toLower**</code> / <code>_String_.**lower**</code> [</>](./source/String.js#L113-L114)

### Array
<a name="array_average" href="#array_average">#️⃣</a> <code>_Array_.**average** ( )</code> / <code>_Array_.**avg** ( )</code> [</>](./source/Array.js#L14-L16)

Gets the average value from an array. Handles non-numerical values through [the `toNumber` function](./source/Array.js#L1-L6) from this library.
```js
[1, 2, 3, 4].average();
// > 2.5
```
I should probably filter non-numerical or incoercible values, but that's future stuff.

---
<a name="array_pluck" href="#array_pluck">#️⃣</a> <code>_Array_.**pluck** ( <span class="type">any:</span> _value_ )</code> [</>](./source/Array.js#L18-L31)

_"Plucks"_ any of _value_ out of the array this function is called on. works a bit like [Underscore.js Pluck](https://underscorejs.org/#pluck), but does more :)
```js
[
  "test",
  {test: 10},
  {test: "idk", otherIndex: 1337},
  false,
  null,
  "other value"
].pluck("test");
//> ["test", {test: 10}, {test: "idk", otherIndex: 1337}]
```
Currently only supports _values_ with types `string`, `number` or `function`. Objects will be added later, adding some sort of weird mix between same-key filtering and [MongoDB-like querying](https://docs.mongodb.com/manual/reference/operator/query/).

---
<a name="array_reject" href="#array_reject">#️⃣</a> <code>_Array_.**reject** ( <span class="type">any:</span> _value_ )</code> / <code>_Array_.**without** ( <span class="type">any:</span> _value_ )</code> [</>](./source/Array.js#L33-L36)

[_"Plucks"_](#array_pluck) all of _value_ and filters those items out of the array this function is called on, therefore _rejects_ all of those values out of the source array.
```js
[
  "test",
  {test: 10},
  {test: "idk", otherIndex: 1337},
  false,
  null,
  "other value"
].reject("test");
//> [false, null, "other value"]
```

---
<a name="array_max" href="#array_max">#️⃣</a> <code>_Array_.**max** ( )</code> [</>](./source/Array.js#L38-L40)

Gets the largest value from an array. Handles non-numerical values the same way [_Array_.**average**()](#array_average) does.
```js
[1, 2, 3, 4].max();
//> 4
```

---
<a name="array_min" href="#array_min">#️⃣</a> <code>_Array_.**min** ( )</code> [</>](./source/Array.js#L42-L44)

Gets the smallest value from an array. Handles non-numerical values the same way [_Array_.**average**()](#array_average) does.
```js
[1, 2, 3, 4].min();
//> 1
```

---
<a name="array_first" href="#array_first">#️⃣</a> <code>_Array_.**first** ( <span class="type">number:</span> _count_ = <span class="literal">1</span> )</code> [</>](./source/Array.js#L46-L48)

Gets the first _count_ items from an array. _Count_ defaults to `1`.
> Why not just use `array[0]`?

Yes, that's shorter, but not the purpose of _Array_.**first**(). It gets the first _count_ items, and just happens to default to 1 item.
```js
["Hello", "World", "!"].first();
// > ["Hello"]

["Hello", "World", "!"].first(2);
// > ["Hello", "World"]
```

---
<a name="array_last" href="#array_last">#️⃣</a> <code>_Array_.**last** ( <span class="type">number:</span> _count_ = <span class="literal">1</span> )</code> [</>](./source/Array.js#L50-L52)

Gets the last _count_ items from an array. _Count_ defaults to `1`.
```js
["Hello", "World", "!"].last();
// > ["!"]

["Hello", "World", "!"].last(2);
// > ["World", "!"]
```

---
<a name="array_clone" href="#array_clone">#️⃣</a> <code>_Array_.**clone** ( )</code> / <code>_Array_.**copy** ( )</code> [</>](./source/Array.js#L54-L56)

Clones an array.
```js
[1, 2, 3].clone();
// > [1, 2, 3]
```

---
<a name="array_remove" href="#array_remove">#️⃣</a> <code>_Array_.**remove** ( <span class="type">number:</span> _from_ [, <span class="type">number:</span> _to_ ] )</code> [</>](./source/Array.js#L58-L61)
> **Mutates** the array it's called on.

Splice all items starting at _from_, ending at _to_, returning the original array with those indexes removed.
```js
[6, 0, 5, 9].remove(2, 3);
// > [6, 9]
```

---
<a name="array_clear" href="#array_clear">#️⃣</a> <code>_Array_.**clear** ( )</code> [</>](./source/Array.js#L63-L66)
> **Mutates** the array it's called on.

Clears an array.
```js
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].clear();
// > []
```

---
<a name="array_grab" href="#array_grab">#️⃣</a> <code>_Array_.**grab** ( <span class="type">number:</span> _from_ [, <span class="type">number:</span> _to_ ])</code> [</>](./source/Array.js#L68-L70)
> **Mutates** the array it's called on.

Splices items starting at `from`, and ending at `to`, giving back a single value, or an array of values (depending on if you grabbed multiple elements).
```js
["Hello", "Amazing", "World", "!"].grab(1, 2);
// > ["Amazing", "World"]

["Hello", "World", "!"].grab(1);
// > "World"
```

---
<a name="array_deduplicate" href="#array_deduplicate">#️⃣</a> <code>_Array_.**deduplicate** ( )</code> / <code>_Array_.**dedup** ( )</code> [</>](./source/Array.js#L72-L74)

Returns a duplicate-free copy of (e.g. _deduplicates_) the array it is called on.
```js
[1, 1, 1, 2, 3, 4, 4, 4, 5, 5, 6].deduplicate();
// > [1, 2, 3, 4, 5, 6]
```

---
<a name="array_mapAsync" href="#array_mapAsync">#️⃣</a> <code>_Array_.**mapAsync** ( <span class="type">function:</span> _callback_ )</code> [</>](./source/Array.js#L76-L78)

Maps an array, supporting asynchronous mapping functions. Also works with synchronous ones, although you shouldn't use _map**Async**_ for that.
```js
[1, 2, 3, 4].mapAsync(number => {
  return Promise.resolve(number * 2);
});
// > Promise {<resolved>: [2, 4, 6, 8]}
```

---
<a name="array_filterAsync" href="#array_filterAsync">#️⃣</a> <code>_Array_.**filterAsync** ( <span class="type">function:</span> _predicate_ )</code> [</>](./source/Array.js#L80-L85)

Filters an array, supporting asynchronous filtering functions. Also works with synchronous ones, although you shouldn't use _Array_.**filterAsync** for that.
```js
[1, 2, 3, 4].filterAsync(number => {
  return Promise.resolve(![2, 3].includes(number));
});
// > Promise {<resolved>: [1, 4]}
```

---
<a name="array_chunkify" href="#array_chunkify">#️⃣</a> <code>_Array_.**chunkify** ( <span class="type">number:</span> _chunkSize_ = <span class="literal">1</span>)</code> [</>](./source/Array.js#L87-L93)

Returns a new array filled with chunks of the original array. These chunks will be at most _chunkSize_ items long. If the last few items in an array are not of length _chunkSize_ then they will be chunked as-is.

```js
["Hello", "Amazing", "World", "!"].chunkify(2);
// > [["Hello", "Amazing"], ["World", "!"]]

["Hello", "World", "!"].chunkify(2);
// > [["hello", "World"], ["!"]]
```

---
<a name="array_split" href="#array_split">#️⃣</a> <code>_Array_.**split** ( <span class="type">any:</span> _separator_, <span class="type">number:</span> _limit_ )</code> [</>](./source/Array.js#L95-L110)

Returns a new array split at _separator_ (exclusively). It's much like String.split, but it works on an array.
>_Limit is not implemented... yet(?)_

```js
[1, 2, 3, 1, 1, 2, 3, 5, 67, 123, 1, 3].split(2);
// > [[1], [3, 1, 1], [3, 5, 67, 123, 1, 3]]
```

---
<a name="array_merge" href="#array_merge">#️⃣</a> <code>_Array_.**merge** ( <span class="type">any:</span> ..._others_ )</code> [</>](./source/Array.js#L112-L115)

Concatenates _others_ with the original array, mutating it. Returns the modified array.

```js
[1, 2, 3].merge(4, 5, 6, [7, 8, [9, 10]]);
// > [1, 2, 3, 4, 5, 6, 7, 8, [9, 10]]
```

---
<a name="array_reversed" href="#array_reversed">#️⃣</a> <code>_Array_.**reversed** ( <span class="type">any:</span> ..._others_ )</code> [</>](./source/Array.js#L117-L121)

Works like `Array.reverse`, but doesn't mutate the original array.

```js
const a = [1, 2, 3];
a.reversed();
// > [3, 2, 1]
a
// > [1, 2, 3]
```