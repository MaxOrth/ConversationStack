
var WordStats = {
    filter: ["and", "the", "a", "he", "she", "they", "we", "that", "had", "to", "if", "what", "i", "of", "or", "not"],
    replaceAll: function(regex, text, replace) {
        while ( regex.test(text) ) {
            text = text.replace(regex, replace);
        }
        return text;
    }
};

WordStats.getRegexFilter = function() {
    var regex = "\\s(";
    for ( var a = 0; a < WordStats.filter.length; a++ ) {
        regex += WordStats.filter[a];
        regex += "|";
    }
    regex = regex.substring(0, regex.length-1);
    regex += ")[\\s.,!?]";
    var creg = new RegExp(regex);
    creg.compile(regex, "i");
    return creg;
};

/**
 * 
 * @param {string} text
 * @returns {string}
 */
WordStats.removeCommonWordsPunctuation = function(text) {  // TODO remove excess whitespace
    text = " " + text + " ";
    
    var regex = this.getRegexFilter();
    while ( regex.test(text) ) {
        text = text.replace(regex, " ");
    }
    regex = /[.,?!]/;
    while ( regex.test(text) ) {
        text = text.replace(regex, " ");
    }
    
    return text;
};

/**
 * 
 * @param {string} conv a conversation snippet
 * @returns {undefined}
 */
WordStats.doWordStats = function(conv) {
    var text = this.removeCommonWordsPunctuation(conv);
    
    var words = [];
    var word;
    var regex = /\w+/g;
    while ( (word = regex.exec(text)) !== null ) {
        var wreg = new RegExp(word, "g");
        var matches = text.match(wreg);
        console.log(matches);
        words.push({word: word, count: matches.length });
        text = this.replaceAll(wreg, text, " ");
    }
    console.log(words);
};


