# transliterate-cyrillic

Transliterate Latin text to Cyrillic (and vice versa) for Macedonian, Serbian, Bulgarian, Russian and Ukranian.  
Supports locale selection and an easy API for both directions.

transliterate-cyrillic is a ultra lightweight, dependency-free, and easy to use for any project!

---

## Installation

```sh
npm install transliterate-cyrillic
```

---

## Usage Example

```js
const tr = require("transliterate-cyrillic");
// or
import tr from "transliterate-cyrillic";

// Set the locale to Macedonian
tr.locale("mk");
console.log(tr.transliterate("kukja")); // куќа
console.log(tr.transliterate("куќа").reverse()); // kukja

// Set the locale to Serbian
tr.locale("rs");
console.log(tr.transliterate("ljubav")); // љубав
console.log(tr.transliterate("љубав").reverse()); // ljubav

// Set the locale to Bulgarian
tr.locale("bg");
console.log(tr.transliterate("zdravey")); // здравей
console.log(tr.transliterate("здравей").reverse()); // zdravey

// Set the locale to Russian
tr.locale("ru");
console.log(tr.transliterate("privet")); // привет
console.log(tr.transliterate("привет").reverse()); // privet

// Set the locale to Ukrainian
tr.locale("uk");
console.log(tr.transliterate("slava")); // слава
console.log(tr.transliterate("слава").reverse()); // slava
```

---

## API

### `tr.locale(localeCode)`

Set the target locale/alphabet.  
Supported: `'mk'` (Macedonian), `'rs'` (Serbian), `'bg'` (Bulgarian), `'ru'` (Russian), `'uk'` (Ukrainian)

### `tr.transliterate(text)`

Transliterates Latin text to Cyrillic for the selected locale.  
Returns a result object.

### `result.reverse()`

Transliterates the result back from Cyrillic to Latin.

### `result.toString()`

Returns the transliterated string (optional, for string contexts).

---
