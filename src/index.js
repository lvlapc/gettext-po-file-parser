export default (text, parsePluralHeader = false) => {

    //Cleaning text from line breaks (where they are not needed)
    //And normalizing escaped characters
    text = text.replace(/\\(.)|("[\r\n]{1,2}")(?![\w\-]+[^\s]: .*?\\n)/sg, function (...args) {

        if (args[2] !== undefined) {
            return "";
        }

        switch (args[1]) {
            case "t":
                return "\t";
            case "r":
                return "\r";
            case "n":
                return "\n";
            default:
                return args[1];
        }
    });

    let lastHeaderIndex = 0;

    let pluralDefault = {
        found: false,
        count: 0,
        fn: (n) => n
    };

    const parserHeaders = (text) => {
        let regexp = /"([\w\-]*?):\s(.*?)[\r\n]{1,2}"/g;

        let headers = {};
        let headerData;

        while ((headerData = regexp.exec(text))) {
            lastHeaderIndex = regexp.lastIndex;
            headers[headerData[1].toLowerCase()] = headerData[2];
        }

        return headers;
    };

    const parseMessages = (text) => {
        let messagesRegex = /(msg[^\s]+?)(?:\[\d+\])?\s"(.*?)"(?=\s+msg|\s*$|\s*#)/gs;
        messagesRegex.lastIndex = lastHeaderIndex;

        let messages = [];
        let messageData;

        let messageObject;

        while ((messageData = messagesRegex.exec(text))) {

            if (messageData[1] === "msgid") {
                messageObject = {msgstr: []};
                messages.push(messageObject);
            }

            if (messageData[1] === "msgstr") {
                messageObject.msgstr.push(messageData[2]);
            } else {
                messageObject[messageData[1]] = messageData[2];
            }
        }

        return messages;
    };

    const parsePlurals = (text) => {
        let regexpPlurals = /nplurals=(\d+);\splural=\(?([n%><=&|?!:\(\)\d\r\n\s]*?)\);/g;

        let pluralData = regexpPlurals.exec(text);

        if (pluralData === null) {
            return pluralDefault;
        }

        return {
            found: true,
            count: parseInt(pluralData[1]),
            fn: new Function(`return function(n){return ${pluralData[2]}}`)()
        };
    };

    const headers = parserHeaders(text);

    if (parsePluralHeader && typeof headers["plural-forms"] !== "undefined") {
        pluralDefault = parsePlurals(headers["plural-forms"]);
    }

    return {
        headers,
        messages: parseMessages(text),
        plural: pluralDefault
    };
}
