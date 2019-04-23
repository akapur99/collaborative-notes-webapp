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
    //   id: 0,
      // eslint-disable-next-line new-cap
      notes: Map(),
    };
  }

  deleteNote = (i) => {
    // note the parens which are shorthand for return
    db.deleteNote(i);
  }

  addNote = (title) => {
    // const { id } = this.state;
    const note = {
      title,
      x: Math.floor(Math.random() * 500),
      y: Math.floor(Math.random() * 500),
      text: 'Click here to start working!',
      zindex: 0,
    };

    db.addNote(note);
  };

  addSameNote = (note) => {
    db.addNote(note);
  }

  updateNote = (id, note) => {
    db.updateNotes(id, note);
  }

  componentDidMount = () => {
    db.fetchNotes((notes) => {
      this.setState({ notes: Map(notes) });
    });
  }

  deleteAll = () => {
    this.state.notes.keySeq().forEach((id) => {
      db.deleteNote(id);
    });
  }

  render() {
    return (
      <div>
        <EntryBar onAddNote={this.addNote} deleteAll={this.deleteAll} />

        {this.state.notes.entrySeq().map(([id, note]) => {
          return <Note key={id} note={note} id={id} addNote={this.addSameNote} onDrag={this.updateNote} deleteNote={this.deleteNote} updateNote={this.updateNote} />;
        })}

      </div>
    );
  }
}

export default App;
