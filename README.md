# Gettext po file parser
Parses file.po content

## Installing

```
npm i gettext-po-file-parser
```

## Usage

```
const fs = require('fs');
const parse = require('gettext-po-file-parser');

const content = fs.readFileSync('path/to/file.po', 'utf8');

let parsed = parse(content);

console.dir(parsed); 
//
{
    headers : {...},
    messages : [
        {
            msgid : "Some message to translate",
            msgctxt : "ContextOfMessage",
            msgstr: [
                "Translation", ...
            ]
        },
        ...
    ]
};
```
