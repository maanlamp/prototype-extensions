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
- [You're doing what-now?](#you're%20doing%20what-now?)
- [Extended Prototypes](#extended%20prototypes)
	- [String](#string)
	- [Array](#array)
- [Future](#future)

## You're doing what-now?
Prototypal inheritance is one of the good parts of JavaScript in my opinion. I've never understood and/or agreed with any arguments against extending prototypes, since all arguments are trivially solved.

> "Changing the behaviour of an object that will only be used by your own code is fine. But when you change the behaviour of something that is also used by other code there is a risk you will break that other code." - [Abhi Beckert](https://stackoverflow.com/questions/14034180/why-is-extending-native-objects-a-bad-practice)


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

## Extended Prototypes

### String
- [#](link) _String_.**capitalise** ( ) / _String_.**capitalize** ( ) [<>](sourcefile)

Calling this function on a string will _Capitalise_ it.
```js
["wolfgang", "amadeus", "mozart"]
  .map(name => name.capitalise())
  .join(" ");
// > Wolfgang Amadeus Mozart
```

- [#](link) _String_.**decapitalise** ( ) / _String_.**decapitalize** ( ) [<>](sourcefile)

Calling this function on a string will _decapitalise_ it.
```js
["Wolfgang", "Amadeus", "Mozart"]
  .map(name => name.capitalise())
  .join(" ");
// > wolfgang amadeus mozart
```

- [#](link) _String_.**camelcasify** ( ) / _String_.**camelCasify** ( ) [<>](sourcefile)

Calling this function on a string will _camelCasify_ it.
```js
"My name is Jeff".camelcasify();
// > "myNameIsJeff"

"My-name-is-Jeff".camelcasify();
// > "myNameIsJeff"

"My_name_is_Jeff".camelcasify();
// > "myNameIsJeff"
```

- [#](link) _String_.**first** ( _count_: <u>number</u> = `1` ) [<>](sourcefile)

Gets the first _count_ charachters from a string. _Count_ defaults to one, so that
```js
"Hello World".first();
// > "H"
```

- [#](link) _String_.**last** ( _count_: <u>number</u> = `1` ) [<>](sourcefile)

Gets the last _count_ charachters from a string. _Count_ defaults to one, so that
```js
"Hello World".last();
// > "d"
```

- [#](link) _String_.**pad** ( count: <u>string</u> = `1`, padding?: <u>string</u> = `" "` ) [<>](sourcefile)

Pads a string on both sides with a given _padding_ repeated _count_ times.
When calling the function without a specified _padding_, it will be padded with `" "` (U+0020 'SPACE').

- [#](link) _String_.**padLeft** ( count: <u>string</u> = `1`, padding?: <u>string</u> = `" "` ) [<>](sourcefile)
>**DEPRECATED:** _use JavaScript's builtin String.padStart instead_.

- [#](link) _String_.**padRight** ( count: <u>string</u> = `1`, padding?: <u>string</u> = `" "` ) [<>](sourcefile)
>**DEPRECATED:** _use JavaScript's builtin String.padEnd instead_.

- [#](link) _String_.**reverse** ( ) [<>](sourcefile)

Reverses a string.
```js
"Reversible string!".reverse();
// > "!gnirts elbisreveR"
```

- [#](link) _String_.**letters** ( ) [<>](sourcefile)

Returns an array filled with all letters in a string.
```js
"String, that-contains; let'ters.".letters();
// > ["S", "t", "r", "i", "n", "g", "t", "h", "a", "t", "c", "o", "n", "t", "a", "i", "n", "s", "l", "e", "t", "t", "e", "r", "s"]
```

- [#](link) _String_.**punctuationMarks** ( ) [<>](sourcefile)

Returns an array filled with all punctuation marks in a string.
```js
`Hello, my name is "Barg'um G'act" -- and I speak Klingon.`.punctuationMarks();
// > [",", """, "'", "'", """, "-", "-", "."]
```

- [#](link) _String_.**escape** ( ) [<>](sourcefile)

Escapes all non-word characters as defined by JavaScript's _RegExp_ engine.

```js
`Hello, my name is "Barg'um G'act" -- and I speak Klingon.`.punctuationMarks();
// > "Hello\,\ my\ name\ is\ \"Barg\'um\ G\'act\"\ \-\-\ and\ I\ speak\ Klingon\."
```

- [#](link) _String_.**characters** ( _ignoreWhiteSpace_: <u>boolean</u> = false ) [<>](sourcefile)

Returns an array filled with all characters in a string. `ignoreWhiteSpace` is a boolean that, when false, will also include whitespace.
```js
`Hello, my name is "Barg'um G'act" -- and I speak Klingon.`.characters();
// > ["H", "e", "l", "l", "o", ",", "m", "y", "n", "a", "m", "e", "i", "s", """, "B", "a", "r", "g", "'", "u", "m", "G", "'", "a", "c", "t", """, "-", "-", "a", "n", "d", "I", "s", "p", "e", "a", "k", "K", "l", "i", "n", "g", "o", "n", "."]

`Hello, my name is "Barg'um G'act" -- and I speak Klingon.`.characters(false);
// > ["H", "e", "l", "l", "o", ",", " ", "m", "y", " ", "n", "a", "m", "e", " ", "i", "s", " ", """, "B", "a", "r", "g", "'", "u", "m", " ", "G", "'", "a", "c", "t", """, " ", "-", "-", " ", "a", "n", "d", " ", "I", " ", "s", "p", "e", "a", "k", " ", "K", "l", "i", "n", "g", "o", "n", "."]
```

- [#](link) _String_.**truncate** ( length: <u>number</u>, symbol?: <u>string</u> = `"..."`) [<>](sourcefile)

Truncates a string to a certain _length_, appending _symbol_ to it.
```js
"This is a string that's quite long. Let's truncate it!".truncate(9);
// > "This is a..."
```

- [#](link) _String_.**words** ( includeSpecialCharacters: <u>boolean</u> = `false` ) [<>](sourcefile)

Returns an array filled with the words in a string. Setting `includeSpecialCharacters` to true should be a bit more useful for strings with a lot of diacritic marks (e.g. French sentences), but doesn't work that well.
```js
"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...".words();
// > ["Neque", "porro", "quisquam", "est", "qui", "dolorem", "ipsum", "quia", "dolor", "sit", "amet", "consectetur", "adipisci", "velit"]
```

- [#](link) _String_.**wordCount** ( ) [<>](sourcefile)

Returns the amount of words found by the _String_.**wordCount**() function.

- [#](link) _String_.**hyphenate** ( ) [<>](sourcefile)

Replaces all word breaks by hyphens.
```js
"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...".hyphenate();
// > "Neque-porro-quisquam-est-qui-dolorem-ipsum-quia-dolor-sit-amet-consectetur-adipisci-velit"
```

- [#](link) _String_.**inflect** ( count: <u>number</u> ) [<>](sourcefile)

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

### Array
- [#](link) _Array_.**average** ( ) [<>](sourcefile)

Description

- [#](link) _Array_.**pluck** ( ) [<>](sourcefile)

Description
	return returnValue;
});

- [#](link) _Array_.**reject** ( ) [<>](sourcefile)

Description

- [#](link) _Array_.**max** ( ) [<>](sourcefile)

Description

- [#](link) _Array_.**min** ( ) [<>](sourcefile)

Description

- [#](link) _Array_.**first** ( ) [<>](sourcefile)

Description

- [#](link) _Array_.**last** ( ) [<>](sourcefile)

Description

- [#](link) _Array_.**clone** ( ) [<>](sourcefile)

Description

- [#](link) _Array_.**remove** ( ) [<>](sourcefile)

Description

- [#](link) _Array_.**clear** ( ) [<>](sourcefile)

Description

- [#](link) _Array_.**grab** ( ) [<>](sourcefile)

Description

## Future
If you want me to add any extensions, just ask. If you want to contribute, just make a PR. If you think this is a nice library, give it a star (and consider following me).

No concrete plans for extending the library as of yet (12/11/2018), but who knows...