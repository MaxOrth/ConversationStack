
/**
 * Creates an element with the webpage as its content.
 * 
 * @param {name} name of the wikipedia page
 * @param {Function} callback function(Array:string)
 */
function getWikiPageLinks(name, callback) {
    console.log(name);
    var name = "https://en.wikipedia.org/w/api.php?action=query&titles=" + name + "&prop=revisions&rvprop=content&format=json&callback=?";
    //var name = "https://en.wikipedia.org/w/api.php?action=query&titles=pet&prop=revisions&rvprop=content&format=json&callback=?";
    
    
    $.getJSON(name, function(e) { // TODO jquery makes it really easy.  see jQuery.ajax.toString()
        var q = e.query.pages;
        for ( var w in q ) {
            q = q[w];
            break;
        }
        var text = q.revisions[0]["*"];  
        
        
        // looks for wikipedia links, which look like this: [[house]]
        // the \w only lets letters and numbers and underscores in to it, removing things like [[File:Hanging houses in Cuenca Spain.jpg|thumb|15th-century Hanging Houses in [[Cuenca, Spain|Cuenca]], [[Spain]].]]
        var r = /\u005B\u005B[\w]+\u005D\u005D/g;
        //would work if js had lookbehind and lookahead, and we woouldnt need to remove the square brackets.  Would be something like this:
        //var rq = /(?<=\u005B)(?<=\u005B)[\w]+(?=\u005D\u005D)/

        var results = [];
        var result;

        while ( (result = r.exec(text) ) !== null ) {
            results.push(result[0].substring(2,result[0].length-2));
        }
        
        callback(results);
    });    
    
}


