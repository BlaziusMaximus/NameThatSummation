

$(function () {
    loadGame();
})
class person {
    constructor(name) {
        this.name = name;
        this.score = 0;
    }
};
export async function loadGame() {
    console.log("ejwnfwjnew")
    const $boot = $('#boot');
    
    
   
    
    $boot.on('click', "#startgame", GameHasStarted);
    $boot.on('click', "#waitinggame", GameHasReallyStarted);
    $boot.on('click', "#endgame", EndTheGame);

    
}



let players = [];
var myMachine;
export const playerTableRender = function (players) {

    players.sort(function(a,b) {
        return b.score - a.score
     })
    let timeTable = document.createElement("table")
    timeTable.id = "PlayerScore"
    timeTable.className = "table is-fullwidth"
    // timeTable.style = "border: 2px solid black;border-collapse: collapse;width: 15%; background-color: powderblue;text-align: center"
    //timeDiv.append(timeTable)
    let timeRowHeader = document.createElement("tr")
    timeRowHeader.style = "background-color: grey; font-family: sans-serif;color: white"
    let timeHeader0 = document.createElement("th")
    timeHeader0.innerText = ""
    let timeHeader1 = document.createElement("th")
    timeHeader1.className = 'subtitle has-text-weight-bold has-text-warning'
    timeHeader1.innerText = "Player"
    let timeHeader2 = document.createElement("th")
    timeHeader2.className = 'subtitle has-text-weight-bold has-text-warning'
    timeHeader2.innerText = "Score"
    

    timeRowHeader.append(timeHeader0)
    timeRowHeader.append(timeHeader1)
    timeRowHeader.append(timeHeader2)
    timeTable.append(timeRowHeader)

    /*
    lettimeTable2 = document.createElement("ol")
    timeTable2.id = "times"
    timeTable2.style = "border: 2px solid black; width: 10%; background-color: white; float: left; text-align: center"
    */
    //timeScoreBoard.forEach(e => {

    for (let i =0; i < players.length; i++) {
        // let e = timeScoreBoard[i]
        let timeRow = document.createElement("tr")
        let timeData0 = document.createElement("td")
        timeData0.innerText = `${i+1}`
        let timeData1 = document.createElement("td")
        timeData1.className = 'has-text-weight-bold'
        timeData1.innerText = `${players[i].name}`
        let timeData2 = document.createElement("td")
        timeData2.innerText = `${players[i].score}`
        timeRow.append(timeData0)
        timeRow.append(timeData1)
        timeRow.append(timeData2)
        timeTable.append(timeRow)
        /** 
        timeRow2 = document.createElement("li")
        timeRow2.innerText = `${e.player} ${e.time}`
        timeTable2.append(timeRow2)
        */
    //});
    }
    // document.getElementById("PlayerScore").replaceWith(timeTable); 
    return timeTable;

}

export const GameHasStarted = function(event) {
    db.collection("adminVars").doc("GameState").set({
        inWaitingRoom: true,
        GameBegun: false,
        GameEnded: false
         })
    const $boot = $('#boot');
    $boot.empty();

    const $root = $('#root');
    
    const $cut = $('#cut');
    $cut.empty();
    let geu = `     
    <div class="content has-text-centered">
            <h1 class="title has-text-info is-family-secondary">Waiting For Players</h1>
        </div>
    `
    $cut.append(geu);
    let duck = `
            
    <button id = "waitinggame" class="button is-fullwidth is-link title has-text-weight-bold ">Begin</button>


    `
    $boot.append(duck);

    myMachine = window.setInterval(function () {
    
    
    db.collection('playersDB').get().then((snapshot) => {snapshot.docs.forEach(doc => {players[players.length] = new person(doc.data().name)})});
    $root.empty();
    $root.append(playerTableRender(players));
    players = [];
    }, 1000);
};

export const GameHasReallyStarted = function(event) {
    const $boot = $('#boot');
    $boot.empty();
    let duck = `
            
    <button id = "endgame" class="button is-fullwidth is-link title has-text-weight-bold">End Game</button>


    `
    $boot.append(duck);
    
    
    const $cut = $('#cut');
    $cut.empty()
    // Append the Graph/Question here into this div:
    $cut.append();
};

export const EndTheGame = function(event) {
    db.collection("adminVars").doc("GameState").delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
    const $boot = $('#boot');
    $boot.empty();

    const $root = $('#root');
    clearInterval(myMachine);
    $root.empty();
    const $cut = $('#cut');
    $cut.empty()
    let duck = `
            
    <button id = "startgame" class="button is-fullwidth is-link title has-text-weight-bold">Start Game</button>


    `
    $boot.append(duck);
    
    $root.append(winnerRender(players));
};

export const winnerRender = function (players) {

    players.sort(function(a,b) {
        return b.score - a.score
     })
    let timeTable = document.createElement("table")
    timeTable.id = "Winners"
    timeTable.className = "table is-fullwidth"
    // timeTable.style = "border: 2px solid black;border-collapse: collapse;width: 15%; background-color: powderblue;text-align: center"
    //timeDiv.append(timeTable)
    let timeRowHeader = document.createElement("tr")
    timeRowHeader.style = "background-color: brown; font-family: sans-serif;color: white"
    let timeHeader0 = document.createElement("th")
    timeHeader0.innerText = ""
    let timeHeader1 = document.createElement("th")
    timeHeader1.className = 'subtitle has-text-weight-bold has-text-warning'
    timeHeader1.innerText = "Player"
    let timeHeader2 = document.createElement("th")
    timeHeader2.className = 'subtitle has-text-weight-bold has-text-warning'
    timeHeader2.innerText = "Score"
    

    timeRowHeader.append(timeHeader0)
    timeRowHeader.append(timeHeader1)
    timeRowHeader.append(timeHeader2)
    timeTable.append(timeRowHeader)

    /*
    lettimeTable2 = document.createElement("ol")
    timeTable2.id = "times"
    timeTable2.style = "border: 2px solid black; width: 10%; background-color: white; float: left; text-align: center"
    */
    //timeScoreBoard.forEach(e => {
        db.collection('playersDB').get().then((snapshot) => {snapshot.docs.forEach(doc => {players[players.length] = new person(doc.data().name)})});

    for (let i =0; i < 3; i++) {
        // let e = timeScoreBoard[i]
        let timeRow = document.createElement("tr")
        let timeData0 = document.createElement("td")
        timeData0.className = 'title has-text-weight-bold has-text-info is-family-secondary'
        if(i == 0){
            timeData0.innerText = 'Winner! 👑🥇';
        }
        if(i == 1){
            timeData0.innerText = 'Runner Up 🥈 ';
        }
        if(i == 2){
            timeData0.innerText = '3rd Place 🥉';
        }
        // timeData0.innerText = `${i+1}`
        let timeData1 = document.createElement("td")
        timeData1.className = 'title has-text-weight-bold'
        timeData1.innerText = `${players[i].name}`
        let timeData2 = document.createElement("td")
        timeData2.className = 'title'
        timeData2.innerText = `${players[i].score}`
        timeRow.append(timeData0)
        timeRow.append(timeData1)
        timeRow.append(timeData2)
        timeTable.append(timeRow)
        /** 
        timeRow2 = document.createElement("li")
        timeRow2.innerText = `${e.player} ${e.time}`
        timeTable2.append(timeRow2)
        */
    //});
    }
    // document.getElementById("PlayerScore").replaceWith(timeTable); 
    return timeTable;

}
