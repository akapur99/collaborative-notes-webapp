import React, { Component } from 'react';
import '../style.scss';
import { Map } from 'immutable';
import Note from './note';
import EntryBar from './entry_bar';
import * as db from '../services/datastore';

class App extends Component {
  constructor(props) {
    // const { Map } = require('immutable');
    super(props);
    this.state = {
      id: 0,
      notes: Map(),
    };
  }

  deleteNote = (i) => {
    // note the parens which are shorthand for return
    this.setState(prevState => ({
      notes: prevState.notes.delete(i),
    }));
    console.log(i);
  }

  addNote = (title) => {
    const { id } = this.state;
    const note = {
      title,
      x: Math.floor(Math.random() * 300),
      y: Math.floor(Math.random() * 100),
      text: 'Click here to start working!',
      zindex: 4,
    };

    this.setState(prevState => ({
      notes: prevState.notes.set(id, note),
      id: id + 1,
    }));
  };

  updateNote = (id) => {
    this.setState(prevState => ({
      notes: prevState.notes.update(id, (n) => { return Object.assign({}, n, fields); }),
    }));
  }

  //   componentDidMount = () => {
  //     firebasedb.fetchNotes((notes) => {
  //       this.setState({ notes: Immutable.Map(notes) });
  //     });
  //   }

  render() {
    return (
      <div>
        <EntryBar onAddNote={this.addNote} />

        {this.state.notes.entrySeq().map(([id, note]) => {
          console.log({ id, note });
          return <Note key={id} note={note} id={id} deleteNote={this.deleteNote} updateNote={this.updateNote} />;
        })}

      </div>
    );
  }
}

export default App;
