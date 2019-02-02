# Gettext po file parser
Parses file.po content

## Installing

```
npm i gettext-po-file-parser
```

## Usage

Including: 
```
const parse = require('gettext-po-file-parser');
```

Parse file content with function:
```
parse(poString[, parsePluralHeader]);
```

Example:
```
const fs = require('fs');
const parse = require('gettext-po-file-parser');

const content = fs.readFileSync('path/to/file.po', 'utf8');

let parsed = parse(content, true);

console.dir(parsed); 
//
{
    headers : {...},
    messages : [
        {
            msgid : "Some message to translate",
            msgctxt : "ContextOfMessage",
            msgstr: [
                "Translation", //...
            ]
        },
        // ...
    ],
    plural : {
        found: true,
        count: 2,
        fn: (n) => n
    }
};
```
