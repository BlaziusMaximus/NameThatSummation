const nameList = document.querySelector('#name-list');
const form = document.querySelector('#add-name-form"');


function renderNmaes(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(cross);

    nameList.appendChild(li);

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('names').doc(id).delete();
    });
}

// getting data
// db.collection('cafes').where('city' , '==' ,'Chapel hill').orderBy('name').get().then(snapshot => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc);
//     });
// });


// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('names').add({
        name: form.name.value
    });
    form.name.value = '';
});

// real-time listener
db.collection('name').orderBy('name').onSnapshot(snapshot=> {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
            if(change.type == 'added'){
                renderCafe(change.doc);
            } else if(change.type == 'removed'){
                let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
                cafeList.removeChild(li);
            }
    })
})