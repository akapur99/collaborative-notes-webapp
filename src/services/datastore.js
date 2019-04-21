import firebase from 'firebase';

// Set the configuration for your app
const config = {
  apiKey: 'AIzaSyAqNW6XGwAERMqVCSR-mmIdYJMhDIsWPkY',
  authDomain: 'react-notes-573ca.firebaseapp.com',
  databaseURL: 'https://react-notes-573ca.firebaseio.com',
  projectId: 'react-notes-573ca',
  storageBucket: 'react-notes-573ca.appspot.com',
  messagingSenderId: '927055454052',
};
firebase.initializeApp(config);

// Get a reference to the database service
const database = firebase.database();

// fetchNotes = (callback) => {
//   Firebase.database().ref('notes').on('value', (snapshot) => {
//     const newNoteState = snapshot.val();
//     // do something with new note state
//     callback(snapshot);
//   });
// };

export function fetchNotes(func) {
  console.log('juobhsikjfgkhlabdhknf');
  database.ref('notes').on('value', (snapshot) => {
    const newNoteState = snapshot.val();
    console.log(newNoteState);
    func(newNoteState);
  });
}

export function deleteNote(callback) {
    firebase.database().ref('notes').child(id).remove();
    callback(newNoteState);
  });
}

// export function updateNotes(callback) {
//   function writeUserData(userId, name, email, imageUrl) {
//     firebase.database().ref(`users/${  userId}`).set({
//       username: name,
//       email,
//       profile_picture: imageUrl,
//     });
//   }
// }
