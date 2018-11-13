<!--
When github starts supporting CSS, enable this :(

<style>
  code>em+strong~em+span+span /*type*/ {
    text-decoration: underline;
  }

  code>em:first-of-type /*prototype*/ {
    color: #0089B3;
  } code>em+strong /*method*/,
    code>em+strong~em+span+span /*type*/ {
    color: #679C00;
  } code>em+strong~em /*arguments*/ {
    color: #CF7000;
  } code>em+strong~em+span+span+span /*literal*/ {
    color: #684D99;
    background-color: rgba(104, 77, 153, .1);
    border-radius: 2px;
  } code>em+strong~em+span /*operator*/ {
    color: #F9005A;
  }
</style>
-->

# prototype-extensions
My personal prototype extension library. Feel free to use it in your own projects :).

Compile the source with this command
```shell
npx babel ./source --out-dir ./compiled
```

And just require the parts of the module you need as such:
```js
require("prototype-extensions/Array"); //Extend the Array prototype
require("prototype-extensions/String"); //Extend the String prototype
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
function extendPrototype (prototype, method) {
  Object.defineProperty((prototype.prototype) ? prototype.prototype : prototype, method.name, {
    value: method
  });
}
```
This way I don't create enumerable properties that show up when you use builtin iterators.

I plan on checking if a method already exists instead of just creating it, but that's future stuff.

## Handy info before reading the docs
Every method declared by this library is documented as such:

<a name="example_method" href="#example_method">#️⃣</a> <code>_ExamplePrototype_.**methodName** ( <span>type</span><span>:</span> _argument_ = <span>default</span> [, type: optionalArgument])</code> [</>](#example_method)

- The [#️⃣](#example_method) Emoji is an anchor to link to this part of the documentation (aka what you're reading right now! 😱).
- The [</>](#example_method) symbol links to the place where the method is declared in the source code (not the compiled code).

I don't use TypeScript for this project (yet?), so the types aren't enforced. It's just for clarity.

## Extended Prototypes

### String
<a name="string_capitalise" href="#string_capitalise">#️⃣</a> <code>_String_.**capitalise** ( )</code> / <code>_String_.**capitalize** ( )</code> [</>](./source/String.js#L4-L6)

Calling this function on a string will _Capitalise_ it.
```js
["wolfgang", "amadeus", "mozart"]
  .map(name => name.capitalise())
  .join(" ");
// > Wolfgang Amadeus Mozart
```
---
<a name="string_decapitalise" href="#string_decapitalise">#️⃣</a> <code>_String_.**decapitalise** ( )</code> / <code>_String_.**decapitalize** ( )</code> [</>](./source/String.js#L8-L10)

Calling this function on a string will _decapitalise_ it.
```js
["Wolfgang", "Amadeus", "Mozart"]
  .map(name => name.decapitalise())
  .join(" ");
// > wolfgang amadeus mozart
```
---
<a name="string_camelcasify" href="#string_camelcasify">#️⃣</a> <code>_String_.**camelcasify** ( )</code> / <code>_String_.**camelCasify** ( )</code> [</>](./source/String.js#L12-L15)

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
<a name="string_first" href="#string_first">#️⃣</a> <code>_String_.**first** ( <span>number</span><span>:</span> _count_ = <span>1</span> )</code> [</>](./source/String.js#L17-L19)

Gets the first _count_ characters from a string. _Count_ defaults to one.
```js
"Hello World".first();
// > "H"

"Hello World".first(3);
// > "Hell"
// Woah... 😲
```
---
<a name="string_last" href="#string_last">#️⃣</a> <code>_String_.**last** ( <span>number</span><span>:</span> _count_ = <span>1</span> )</code> [</>](./source/String.js#L21-L23)

Gets the last _count_ characters from a string. _Count_ defaults to one.
```js
"Hello World".last();
// > "d"

"Hello World".last(3);
// > "rld"
```
---
<a name="string_pad" href="#string_pad">#️⃣</a> <code>_String_.**pad** ( <span>number</span><span>:</span> _count_ = <span>1</span> [, <span>string</span><span>:</span> _padding_ = <span>" "</span> ])</code> [</>](./source/String.js#L25-L34)

Pads a string on both sides with a given _padding_ repeated _count_ times.
When calling the function without a specified _padding_, it will be padded with <span>" "</span> (U+0020 'SPACE').

---
<a name="string_padLeft" href="#string_padLeft">#️⃣</a> <code>_String_.**padLeft** ( <span>number</span><span>:</span> _count_ = <span>1</span> [, <span>string</span><span>:</span> _padding_ = <span>" "</span> ])</code> [</>](./source/String.js#L37-L46)
>**DEPRECATED:** _use JavaScript's builtin String.padStart instead_.
---
<a name="string_padRight" href="#string_padRight">#️⃣</a> <code>_String_.**padRight** ( <span>number</span><span>:</span> _count_ = <span>1</span> [, <span>string</span><span>:</span> _padding_ = <span>" "</span> ])</code> [</>](./source/String.js#L48-L57)
>**DEPRECATED:** _use JavaScript's builtin String.padEnd instead_.
---
<a name="string_reverse" href="#string_reverse">#️⃣</a> <code>_String_.**reverse** ( )</code> [</>](./source/String.js#L59-L61)

Reverses a string.
```js
"Reversible string!".reverse();
// > "!gnirts elbisreveR"
```
---
<a name="string_letters" href="#string_letters">#️⃣</a> <code>_String_.**letters** ( )</code> [</>](./source/String.js#L63-L56)

Returns an array filled with all letters in a string.
```js
"String, that-contains; let'ters.".letters();
// > ["S", "t", "r", "i", "n", "g", "t", "h", "a", "t", "c", "o", "n", "t", "a", "i", "n", "s", "l", "e", "t", "t", "e", "r", "s"]
```
---
<a name="string_punctuationMarks" href="#string_punctuationMarks">#️⃣</a> <code>_String_.**punctuationMarks** ( )</code> [</>](./source/String.js#L67-L69)

Returns an array filled with all punctuation marks in a string.
```js
`Hello, my name is "Barg'um G'act" -- and I speak Klingon.`.punctuationMarks();
// > [",", """, "'", "'", """, "-", "-", "."]
```
---
<a name="string_escape" href="#string_escape">#️⃣</a> <code>_String_.**escape** ( )</code> [</>](./source/String.js#L71-L73)

Escapes all non-word characters as defined by JavaScript's _RegExp_ engine.

```js
`Hello, my name is "Barg'um G'act" -- and I speak Klingon.`.escape();
// > "Hello\,\ my\ name\ is\ \"Barg\'um\ G\'act\"\ \-\-\ and\ I\ speak\ Klingon\."
```
---
<a name="string_characters" href="#string_characters">#️⃣</a> <code>_String_.**characters** ( <span>boolean</span><span>:</span> _ignoreWhiteSpace_ = <span>false</span> )</code> [</>](./source/String.js#L75-L77)

Returns an array filled with all characters in a string. `ignoreWhiteSpace` is a boolean that, when true, will also include whitespace.
```js
`Hello, my name is "Barg'um G'act" -- and I speak Klingon.`.characters();
// > ["H", "e", "l", "l", "o", ",", "m", "y", "n", "a", "m", "e", "i", "s", """, "B", "a", "r", "g", "'", "u", "m", "G", "'", "a", "c", "t", """, "-", "-", "a", "n", "d", "I", "s", "p", "e", "a", "k", "K", "l", "i", "n", "g", "o", "n", "."]

`Hello, my name is "Barg'um G'act" -- and I speak Klingon.`.characters(false);
// > ["H", "e", "l", "l", "o", ",", " ", "m", "y", " ", "n", "a", "m", "e", " ", "i", "s", " ", """, "B", "a", "r", "g", "'", "u", "m", " ", "G", "'", "a", "c", "t", """, " ", "-", "-", " ", "a", "n", "d", " ", "I", " ", "s", "p", "e", "a", "k", " ", "K", "l", "i", "n", "g", "o", "n", "."]
```
---
<a name="string_truncate" href="#string_truncate">#️⃣</a> <code>_String_.**truncate** ( <span>number</span><span>:</span> _length_, <span>string</span><span>:</span> _symbol_ = <span>"..."</span>)</code> [</>](./source/String.js#L79-L81)

Truncates a string to a certain _length_, appending _symbol_ to it.
```js
"This is a string that's quite long. Let's truncate it!".truncate(9);
// > "This is a..."
```
---
<a name="string_words" href="#string_words">#️⃣</a> <code>_String_.**words** ( <span>boolean</span><span>:</span> _includeSpecialCharacters_ = <span>false</span> )</code> [</>](./source/String.js#L83-L85)

Returns an array filled with the words in a string. Setting `includeSpecialCharacters` to true should be a bit more useful for strings with a lot of diacritic marks (e.g. French sentences), but doesn't work that well.
```js
"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...".words();
// > ["Neque", "porro", "quisquam", "est", "qui", "dolorem", "ipsum", "quia", "dolor", "sit", "amet", "consectetur", "adipisci", "velit"]
```
---
<a name="string_wordCount" href="#string_wordCount">#️⃣</a> <code>_String_.**wordCount** ( )</code> [</>](./source/String.js#L87-L89)

Returns the amount of words found by the [_String_.**words**()](#string_words) function.

---
<a name="string_hyphenate" href="#string_hyphenate">#️⃣</a> <code>_String_.**hyphenate** ( )</code> [</>](./source/String.js#L91-L93)

Replaces all word breaks by hyphens.
```js
"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...".hyphenate();
// > "Neque-porro-quisquam-est-qui-dolorem-ipsum-quia-dolor-sit-amet-consectetur-adipisci-velit"
```
---
<a name="string_inflect" href="#string_inflect">#️⃣</a> <code>_String_.**inflect** ( <span>number</span><span>:</span> _count_ )</code> [</>](./source/String.js#L95-L97)

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

#### Builtin Aliases
- <code>_String_.**toLowerCase**</code> -> <code>_String_.**toLower**</code> -> <code>_String_.**lower**</code> [</>](./source/String.js#L104-L105)
- <code>_String_.**toUpperCase**</code> -> <code>_String_.**toUpper**</code> -> <code>_String_.**upper**</code> [</>](./source/String.js#L164-L107)

### Array
<a name="array_average" href="#array_average">#️⃣</a> <code>_Array_.**average** ( )</code> / <code>_Array_.**avg** ( )</code> [</>](./source/Array.js#L8-L10)

Gets the average value from an array. Handles non-numerical values through [the `toNumber` function](./source/Array.js#L3-L6) from this library.
```js
[1, 2, 3, 4].average();
// > 2.5
```
I should probably filter non-numerical or incoercible values, but that's future stuff.

---
<a name="array_pluck" href="#array_pluck">#️⃣</a> <code>_Array_.**pluck** ( <span>any</span><span>:</span> _value_ )</code> [</>](./source/Array.js#L12-L25)

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
<a name="array_reject" href="#array_reject">#️⃣</a> <code>_Array_.**reject** ( <span>any</span><span>:</span> _value_ )</code> / <code>_Array_.**without** ( <span>any</span><span>:</span> _value_ )</code> [</>](./source/Array.js#L27-L30)

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
<a name="array_max" href="#array_max">#️⃣</a> <code>_Array_.**max** ( )</code> [</>](./source/Array.js#L32-L34)

Gets the largest value from an array. Handles non-numerical values the same way [_Array_.**average**()](#array_average) does.
```js
[1, 2, 3, 4].max();
//> 4
```

---
<a name="array_min" href="#array_min">#️⃣</a> <code>_Array_.**min** ( )</code> [</>](./source/Array.js#L36-L38)

Gets the smallest value from an array. Handles non-numerical values the same way [_Array_.**average**()](#array_average) does.
```js
[1, 2, 3, 4].min();
//> 1
```

---
<a name="array_first" href="#array_first">#️⃣</a> <code>_Array_.**first** ( <span>number</span><span>:</span> _count_ = <span>1</span> )</code> [</>](./source/Array.js#L40-L42)

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
<a name="array_last" href="#array_last">#️⃣</a> <code>_Array_.**last** ( <span>number</span><span>:</span> _count_ = <span>1</span> )</code> [</>](./source/Array.js#L44-L46)

Gets the last _count_ items from an array. _Count_ defaults to `1`.
```js
["Hello", "World", "!"].last();
// > ["!"]

["Hello", "World", "!"].last(2);
// > ["World", "!"]
```

---
<a name="array_clone" href="#array_clone">#️⃣</a> <code>_Array_.**clone** ( )</code> / <code>_Array_.**copy** ( )</code> [</>](./source/Array.js#L48-L50)

Clones an array.
```js
[1, 2, 3].clone();
// > [1, 2, 3]
```

---
<a name="array_remove" href="#array_remove">#️⃣</a> <code>_Array_.**remove** ( <span>number</span><span>:</span> _from_ [, <span>number</span><span>:</span> _to_ ] )</code> [</>](./source/Array.js#L52-L55)
> **Mutates** the array it's called on.

Splice all items starting at _from_, ending at _to_, returning the original array with those indexes removed.
```js
[6, 0, 5, 9].remove(2, 3);
// > [6, 9]
```

---
<a name="array_clear" href="#array_clear">#️⃣</a> <code>_Array_.**clear** ( )</code> [</>](./source/Array.js#L57-L60)
> **Mutates** the array it's called on.

Clears an array.
```js
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].clear();
// > []
```

---
<a name="array_grab" href="#array_grab">#️⃣</a> <code>_Array_.**grab** ( <span>number</span><span>:</span> _from_ [, <span>number</span><span>:</span> _to_ ])</code> [</>](./source/Array.js#L62-L65)
> **Mutates** the array it's called on.

Splices items starting at `from`, and ending at `to`, giving back a single value, or an array of values (depending on if you grabbed multiple elements).
```js
["Hello", "Amazing", "World", "!"].grab(1, 2);
// > ["Amazing", "World"]

["Hello", "World", "!"].grab(1);
// > "World"
```

---
## Future
If you want me to add any extensions, just ask. If you want to contribute, just make a PR. If you think this is a nice library, give it a star (and consider following me).

No concrete plans for extending the library as of yet (12/11/2018), but who knows...