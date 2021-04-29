import { db } from "../firebase";


const deletePlayers = (players) => {
    players.forEach(player => {
        db.collection('playersDB').doc(player.name).delete();
        console.log(`player '${player.name}' deleted`);
    });
}

const kickPlayer = (player) => {
    db.collection('playersDB').doc(player.name).delete();
    console.log(`player '${player.name}' deleted`);
}

const setFirebaseGameState = (state) => {
    db.collection('adminVars').doc('GameState').set(state);
    console.log("gameState set", state);
}

const uploadQuestions = (json) => {
    let blankAnswers = {};
    for (let i = 0; i < json.length; i++) {
        db.collection('questions').doc('q'+i).set({...json[i]});
        blankAnswers['q'+i] = {};
    }
    db.collection('adminVars').doc('PlayerAnswers').set(blankAnswers);
}

const deleteQuestions = (questions) => {
    questions.forEach(question => {
        db.collection('questions').doc(question.id).delete();
        console.log(`question '${question.id}' deleted`);
    })
}

const setAnswers = (ans) => {
    db.collection('adminVars').doc('PlayerAnswers').set(ans);
}

export {
    deletePlayers,
    kickPlayer,
    setFirebaseGameState,
    uploadQuestions,
    deleteQuestions,
    setAnswers,
};