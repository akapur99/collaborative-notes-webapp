/* eslint-disable new-cap */
import React, { Component } from 'react';
import '../style.scss';
import { Map } from 'immutable';
import Note from './note';
import EntryBar from './entry_bar';
import * as db from '../services/datastore';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      // eslint-disable-next-line new-cap
      notes: Map(),
    };
  }

  deleteNote = (i) => {
    // note the parens which are shorthand for return

    db.deleteNote(i);

    // this.setState(prevState => ({
    //   notes: prevState.notes.delete(i),
    // }));
  }

  addNote = (title) => {
    const { id } = this.state;
    const note = {
      title,
      x: Math.floor(Math.random() * 500),
      y: Math.floor(Math.random() * 500),
      text: 'Click here to start working!',
      zindex: 4,
    };

    db.addNote(note);

    this.setState(prevState => ({
      notes: prevState.notes.set(id, note),
      id: id + 1,
    }));
  };

  //   updateNote = (id) => {
  //     this.setState(prevState => ({
  //       notes: prevState.notes.update(id, (n) => { return Object.assign({}, n, fields); }),
  //     }));
  //   }

    componentDidMount = () => {
      console.log('ssss');
      db.fetchNotes((notes) => {
        this.setState({ notes: Map(notes) });
      });
    }

    render() {
      return (
        <div>
          <EntryBar onAddNote={this.addNote} />

          {this.state.notes.entrySeq().map(([id, note]) => {
            return <Note key={id} note={note} id={id} deleteNote={this.deleteNote} updateNote={this.updateNote} />;
          })}

        </div>
      );
    }
}

export default App;
