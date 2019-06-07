import _ from 'lodash'
import moment from 'moment'

const ARGUMENT_POSTFIX_PATTERN = "([^|]+)\\|(.*)"
const ARGUMENT_POSTFIX_SEPARATOR_PATTERN = "-|\\[|\\]|\\(|\\)|\\{|\\}|_"
const ARGUMENT_POSTFIX_PART_PATTERN = "(?:(?!#).)+?(?=@)|(?:(?!@).)+?(?=#)|(?:#).*$|(?:@).*$"

export function getPathWithPrefix({uri,count}) {
    let argumentWithPostfix = uri.match(ARGUMENT_POSTFIX_PATTERN)
    let path
    let argument;

    if (argumentWithPostfix) {
        path = argumentWithPostfix[1]
        argument = argumentWithPostfix[2]
    } else {
        path = uri;
        argument = "";
    }
    return path + parsePostFix(argument, count);
}

function parsePostFix(argument,count){
    let a = argument.split(/\./)
    let args = []
    let last = 0;
    // if there was an extension
    if (a.length > 1) {
        let match = a[0].match(ARGUMENT_POSTFIX_SEPARATOR_PATTERN)
        // if separator
        while (match !== null) {
            if (match.index > 0) {
                args.push(a[0].substring(0,match.index));
            }
            a[0] = a[0].substring(match.index+1)
            match = a[0].match(ARGUMENT_POSTFIX_SEPARATOR_PATTERN)
        }
        if (a[0].length>0) {
            args.push(a[0].substring(0, a[0].length));
        }
        if (args.length == 0) {
            // no separator
            args.push(a[0]);
        }
    }

    for (let larg of args) {
        let m = larg.match(ARGUMENT_POSTFIX_PART_PATTERN)
        while (m !== null){
            let value = larg.substring(1, (m+"").length);
            if(_.toNumber(value)){
                argument = argument.replace("#" + value,
                `${count}`.padStart(value.length,0))
            } else if (!_.isEmpty(value)) {
                argument = argument.replace("@" + value, getDateTime(value));
            }
            larg = larg.substring((m+"").length)
            m = larg.match(ARGUMENT_POSTFIX_PART_PATTERN)
        }
    }
    return argument;

}

function getDateTime(value) {
    return moment().format(value);  
}