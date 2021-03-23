/*
CSV FILE
{
    question1: {
        xStart: 0,
        xEnd: 10,
        xInc: 1,
        latexFunc: x**2,
        latexChoices: [ x, x**2, lg(x), x**3 ],
        
    },
    ...,
    ...
}
*/

const xStart = 0;
const xEnd = 10;
const xInc = 1;

const func1 = (x) => {
    return x**2;
}
const func2 = (x) => {
    return Math.sqrt(x);
}

let data1 = [];
let data2 = [];
for (let x = xStart; x <= xEnd; x+=xInc) {
    data1.push(
        {
            "x":String(x),
            "y":func1(x)
        }
    );
    data2.push(
        {
            "x":String(x),
            "y":func2(x)
        }
    );
}

const sample_data = [
    {
        "id": "summation function 1",
        "color": "hsl(24, 70%, 50%)",
        "data": data1,
        "answerChoices": ["x", "x^2", "logn(x,2)", "sqrt(x)"],
        "latexExp": ["x", "x^2", "log_{2} x", "\\sqrt{x}"],
        "answer": 1
    },
    {
        "id": "summation function 2",
        "color": "hsl(54, 70%, 50%)",
        "data": data2,
        "answerChoices": ["x", "x**2", "log_2(x)", "sqrt(x)"],
        "latexExp": ["x", "x^2", "log_{2} x", "\\sqrt{x}"],
        "answer": 3
    }
];

export default sample_data;