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

// export function fetchNotes(callback) {

//   // do something here
//   // callback() when done
// }
