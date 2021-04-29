import { db } from "../firebase";


const setPlayer = (obj) => {
    db.collection("playersDB").doc(obj.name).set(obj);
    console.log(obj)
}

const setAnswers = (ans) => {
    db.collection('adminVars').doc('PlayerAnswers').set(ans);
}

export {
    setPlayer,
    setAnswers,
};