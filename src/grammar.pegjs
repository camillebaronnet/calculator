{
  var floatFix = 1000000000;
      if(window.exportVars === undefined){
      window.exportVars = {
          'pi' : Math.PI
      };
    }
    new Map();
}


Lines = vars:Variable* result:Result {
  Object.keys(window.exportVars).forEach(function(key){
      if(window.exportVars[key] === null){
          window.exportVars[key] = result
        }
    });
  return {
      'result' : result,
      'vars' : window.exportVars
  };
}

Variable = varname:String _ "=" _ { window.exportVars[varname.join('').toLowerCase()] = null; }

Result = Tolerence exp:Expression Tolerence { return Math.round(exp  * floatFix) / floatFix; }

Expression
  = head:Term tail:(_ ("+" / "-") _ Term)* {
      return tail.reduce(function(result, element) {
        if (element[1] === "+") { return result + element[3]; }
        if (element[1] === "-") { return result - element[3]; }
      }, head);
    }

Term
  = head:Factor tail:(_ ("*" / "/") _ Factor)* {
      return tail.reduce(function(result, element) {
        if (element[1] === "*") { return result * element[3]; }
        if (element[1] === "/") { return result / element[3]; }
      }, head);
    }

Factor
  = "(" _ expr:Expression _ ")" { return expr; }
  / ResolveVariable
  / num:Number { return num }


ResolveVariable
  = string:String { return window.exportVars[string.join('').toLowerCase()]; }

Number "number"
  = _ [0-9a-fA-F,\.]+ {
  if(text().match(/[a-fA-F]+/)){
    return parseInt(text(), 16);
  }
  else{
    return parseFloat(text().replace(',', '.'), 10);
  }
}

String = [^0-9 \t\n\r]+

_ "whitespace"
  = [ \t]*
  
Tolerence = [ \t+/:=*]*
