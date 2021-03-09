const xStart = 0;
const xEnd = 10;
const xInc = 1;

const func = (x) => {
    return x**2;
}

let data = [];
for (let x = xStart; x <= xEnd; x+=xInc) {
    data.push(
        {
            "x":x,
            "y":func(x)
        }
    );
}

const sample_data = {
    "id": "summation function",
    "color": "hsl(24, 70%, 50%)",
    "data": data
};

export default sample_data;