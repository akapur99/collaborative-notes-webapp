import Firebase from 'firebase';

// Set the configuration for your app
const config = {
  apiKey: 'AIzaSyAqNW6XGwAERMqVCSR-mmIdYJMhDIsWPkY',
  authDomain: 'react-notes-573ca.firebaseapp.com',
  databaseURL: 'https://react-notes-573ca.firebaseio.com',
  projectId: 'react-notes-573ca',
  storageBucket: 'react-notes-573ca.appspot.com',
};
Firebase.initializeApp(config);

// Get a reference to the database service
const database = Firebase.database();

// fetchNotes = (callback) => {
//   Firebase.database().ref('notes').on('value', (snapshot) => {
//     const newNoteState = snapshot.val();
//     // do something with new note state
//     callback(snapshot);
//   });
// };

export function fetchNotes(func) {
  database.ref('notes').on('value', (snapshot) => {
    const newNoteState = snapshot.val();
    func(newNoteState);
  });
}

export function deleteNote(id) {
  database.ref('notes').child(id).remove();
}

export function addNote(note) {
  database.ref('notes').push(note);
}

export function updateNotes(id, note) {
  database.ref('notes').child(id).set({
    title: note.title,
    x: note.x,
    y: note.y,
    text: note.text,
    zindex: note.zindex,
  });
}
