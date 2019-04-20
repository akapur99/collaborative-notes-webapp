import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import { Map } from 'immutable';
import Note from './components/note';
import EntryBar from './components/entry_bar';

class App extends Component {
  constructor(props) {
    // const { Map } = require('immutable');
    super(props);
    this.state = {
      id: 1,
      notes: Map({
        0: {
          title: 'Help',
          x: 60,
          y: 100,
          text: 'Welcome to Abhi\'s Note App!',
          zindex: 1,
        },
      }),
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
      x: 30,
      y: 90,
      text: '',
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

  render() {
    return (
      <div>
        <EntryBar onAddNote={this.addNote} />

        {this.state.notes.entrySeq().map(([id, note]) => {
          console.log({ id, note });
          return <Note note={note} id={id} deleteNote={this.deleteNote} updateNote={this.updateNote} />;
        })}

      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
