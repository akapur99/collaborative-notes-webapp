/* eslint-disable new-cap */
import React, { Component } from 'react';
import '../style.scss';
import { Map } from 'immutable';
import io from 'socket.io-client';
import Note from './note';
import EntryBar from './entry_bar';
// import * as db from '../services/datastore';

const socketserver = 'http://localhost:9090';

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = io(socketserver);
    this.socket.on('connect', () => { console.log('socket.io connected'); });
    this.socket.on('disconnect', () => { console.log('socket.io disconnected'); });
    this.socket.on('reconnect', () => { console.log('socket.io reconnected'); });
    this.socket.on('error', (error) => { console.log(error); });
    this.state = {
    //   id: 0,
      // eslint-disable-next-line new-cap
      notes: Map(),
    };
  }

  deleteNote = (i) => {
    // note the parens which are shorthand for return
    this.socket.emit('deleteNote', i);
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

    this.socket.emit('createNote', note);
  };

  addSameNote = (note) => {
    this.socket.emit('createNote', note);
  }

  updateNote = (id, note) => {
    this.socket.emit('updateNote', id, note);
  }

  componentDidMount = () => {
    this.socket.on('notes', (notes) => {
      this.setState({ notes: Map(notes) });
    });
  }

  render() {
    return (
      <div>
        <EntryBar onAddNote={this.addNote} />

        {this.state.notes.entrySeq().map(([id, note]) => {
          return <Note key={id} note={note} id={id} addNote={this.addSameNote} onDrag={this.updateNote} deleteNote={this.deleteNote} updateNote={this.updateNote} />;
        })}

      </div>
    );
  }
}

export default App;
