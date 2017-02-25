var loaderUtils = require("loader-utils");
var recast = require("recast");

module.exports = function(source) {

    this.cacheable && this.cacheable();

    var options = loaderUtils.getOptions(this);

    function getMatch(a, b) {
        var matches;

        for (var i = 0; i < a.length; i++) {
            for (var e = 0; e < b.length; e++) {
                if (a[i] === b[e]) {
                    matches = true
                } else {
                    matches = false;
                }
            }
        }
        return matches;
    }

    var prefixname = options.prefixname;
    var ignore = options.ignore;

    if (!options.ignore) {
        options.ignore = {
            elements: [''],
            className: ['']
        };
        ignore = options.ignore;
    } else if (!options.ignore.elements) {
        options.ignore.elements = [''];
    } else if (!options.ignore.className) {
        options.ignore.className = [''];
    } else {
        ignore = options.ignore;

    }

    var code = source;

    var ast = recast.parse(code);
    var b = recast.types.builders;

    recast.visit(ast, {
        visitJSXElement: function(path) {
            var obj = path.value.openingElement.attributes;
            var JSXElement = path.value.openingElement.name.name;

            if (ignore !== !ignore) {
                if (ignore.elements.indexOf(JSXElement) === -1) {
                    for (var i = 0; i < obj.length; i++) {
                        if (obj[i].name.name === "className" && obj[i].value.type === "Literal") {
                            var astClasses = obj[i].value.value.split(' ');
                            astClasses = astClasses.map(function(val, index) {
                                if (options.ignore.className.indexOf(val) === -1) {
                                    return astClasses[index] = `${prefixname}${astClasses[index]}`;
                                } else {
                                    return val;
                                }
                            })
                            obj[i].value.value = astClasses.join(' ');
                        } else if (obj[i].name.name === "className" && obj[i].value.type === "JSXExpressionContainer" && obj[i].value.expression.type === "ObjectExpression") {
                            var properties = obj[i].value.expression.properties;
                            for (var i = 0; i < properties.length; i++) {

                                if (properties[i].key.type === "Literal") {
                                    properties[i].key.value = `${prefixname}${properties[i].key.value.split(' ').join(` ${prefixname}`)}`;
                                }
                            }
                        } else if (obj[i].name.name === "className" && obj[i].value.type === "JSXExpressionContainer" && obj[i].value.expression.type === "CallExpression" && obj[i].value.expression.callee.name === "classNames" || obj[i].value.expression.callee.name === "classnames") {
                            var arg = obj[i].value.expression.arguments[0];

                            if (arg.type === 'ObjectExpression') {
                                for (var i = 0; i < arg.properties.length; i++) {

                                    if (arg.properties[i].key.type === "Literal") {
                                        arg.properties[i].key.value = `${prefixname}${arg.properties[i].key.value}`;
                                    }
                                }
                            }

                        }
                    }
                }
            }

            this.traverse(path);
        }
    });

    var output = recast.print(ast).code;
    source = output;
    return source;
}
