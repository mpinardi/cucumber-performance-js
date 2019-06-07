import _ from 'lodash'

export default class Slice {
    constructor(rows) {
        this.rows = rows
    }
    parseTestCase(testCase) {
        let tc = _.cloneDeep(testCase);
        for(let step of tc.pickle.steps)
        {
           step.text = this.replaceParameter(step.text)
        }
        return tc
    }
    
    replaceParameter(value) {
        let loc = this.findParameter(value);
        if (loc >= 0) {
            value = value.replace("\"" + this.rows[0].cells[loc].value + "\"",
                    "\"" + this.rows[1].cells[loc].value + "\"");
        }
        return value;
    }

    hasParameter(value) {
        return this.findParameter(value) >= 0 ? true : false;
    }

    findParameter(value) {
    let i = 0;
    if (this.rows.length > 0) {
        for (let c of this.rows[0].cells) {
            if (value.includes("\"" + c.value + "\"")) {
                if (this.rows[1].cells.length >= i) {
                    return i;
                }
            }
            i++;
        }
    }
    return -1;
    }
}