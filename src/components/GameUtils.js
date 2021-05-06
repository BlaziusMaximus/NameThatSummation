import evaluatex from "evaluatex";


const pointEval = (evalChoice, e) => {
    let y = evaluatex(evalChoice)({x:e});
    if (y === Infinity || y === -Infinity) {
        return null;
    }
    return y;
}

export {
    pointEval,
};