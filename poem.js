var grammar = [];

function randint(a,b) {
    return Math.floor((Math.random() * b) + a);
}

function isNotIn(needle, stack) {
    return !(stack.indexOf(needle) > -1);
}

function isIn(needle, stack) {
    return (stack.indexOf(needle) > -1);
}

function globalReplace(find, rep, stack) {
    var re = new RegExp(find, 'g');
    return stack.replace(re, rep);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function init(file) {
    var f = d.split("\n");
    for (var line in f) {
        var lineSplit = f[line].split('=');
        if(lineSplit[0] != "") {
            grammar[lineSplit[0]] = [];
            if (typeof(lineSplit[1]) != "undefined") {
                var pipeSplit = lineSplit[1].split('|');
                for (var syntax in pipeSplit) {
                    grammar[lineSplit[0]].push(pipeSplit[syntax]);
                }
            }
        }
    }
}

function generate(key){
    var gram = grammar[key];
    if(typeof(gram) != "undefined") {
        var i = randint(0, gram.length - 1);
        var string = "";
        if (isNotIn("<", gram[i])) {
            string = gram[i];
        }
        else {
            var splitted = gram[i].split(" ");
            for (var word in splitted)
                if (isNotIn("<", splitted[word])) {
                    string += splitted[word] + " ";
                }
                else {
                    string += generate(splitted[word], 1) + " ";
                }
        }
        return globalReplace('newline', '\n', string);
    }
    return "";
}

function generatePretty(key){
    var poem = generate(key);
    var newPoem = "";
    var capitalize = true;
    var isTitle = false;
    if(key == "<title>")
        isTitle = true;
    var isParagraph = false;
    var lines = poem.split("\n");
    lines.push('\n');
    for( var line in lines) {
        lines[line] = lines[line].trim();
        lines[line] = lines[line].replace(' ,',',');
        lines[line] = lines[line].replace(' ?','?');
        lines[line] = lines[line].replace(' !','!');
        lines[line] = lines[line].replace(' \.','.');
        lines[line] = lines[line].replace(' :',':');
        lines[line] = lines[line].replace(' \'','\'');
        if (capitalize) {
            lines[line] = capitalizeFirstLetter(lines[line]);
            capitalize = false;
        }
        if (isTitle){
            var mydate = new Date();
            newPoem += "<h1>" + lines[line] + "</h1>\n<h2>by A Computer, "+mydate.toDateString()+"</h2>\n";
            isTitle = false;
        }
        else {
            if (lines[line].length < 1){
                if (isParagraph)
                    newPoem += "</p>";
                isParagraph = false;
            }
            else{
                if (!isParagraph) {
                    newPoem += "\n\n<p>";
                    lines[line] = capitalizeFirstLetter(lines[line]);
                }
                isParagraph = true;
                newPoem += lines[line] + "<br />"
            }
            if (isIn(".",lines[line]) || isIn("!",lines[line]) || isIn("?",lines[line]))
                capitalize = true;
        }
    }
    newPoem = globalReplace('<br /><br />','<br />',newPoem);
    newPoem = globalReplace('<br /></p>','</p>',newPoem);
    newPoem = globalReplace('<br />','<br />\n',newPoem);

    lines = newPoem.split("\n");
    newPoem = "";
    isParagraph = false;
    capitalize = false;

    for (var line in lines) {
        if (capitalize) {
            lines[line] = capitalizeFirstLetter(lines[line]);
            capitalize = false;
        }
        if (isIn("</p>", lines[line])){
            isParagraph = false;
            var app = lines[line].split('</p>');
            var lastChar = app[app.length -1].slice(-1);
            if (isIn(".", lastChar) || isIn("-", lastChar) || isIn(",", lastChar) || isIn("!", lastChar) || isIn("?", lastChar)){
                newPoem += lines[line] + "\n";
            }
            else{
                newPoem += globalReplace('</p>','.</p>\n', lines[line]);
            }
        }
        else if (isIn("<p>", lines[line])){
            isParagraph = true;
            newPoem += lines[line] + "\n"
        }
        else {
            if (isParagraph) {
                var app = lines[line].split('<br />');
                var lastChar = app[app.length -1].slice(-1);
                if (isIn(".", lastChar) || isIn("-", lastChar) || isIn(",", lastChar) || isIn("!", lastChar) || isIn("?", lastChar)){
                    ;
                }
                else {
                    if (randint(0, 20)<2) {
                        newPoem += globalReplace('<br />','?<br />\n', lines[line]);
                        capitalize = true;
                    }
                    else if (randint(0, 20)<2) {
                        newPoem += globalReplace('<br />','.<br />\n', lines[line]);
                        capitalize = true;
                    }
                    else if (randint(0, 20)<2) {
                        newPoem += globalReplace('<br />','!<br />\n', lines[line]);
                        capitalize = true;
                    }
                    else if (randint(0, 20)<2) {
                        newPoem += globalReplace('<br />',',<br />\n', lines[line]);
                        capitalize = true;
                    }
                    else{
                        newPoem += lines[line] + "\n"
                    }
                }
            }
            else {
                newPoem += lines[line] + "\n"
            }
        }
    }
    newPoem = newPoem.replace('\.\.','.');
    newPoem = newPoem.replace('?\.','!');
    newPoem = newPoem.replace('!\.','?');
    newPoem = globalReplace(' i ',' I ', newPoem);
    return newPoem;
}

function getKeys(){
    var arr = [];
    for(var key in grammar){
        arr.push(key);
    }
    return arr;
}

init('poems.bnf');


