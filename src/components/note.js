import React, { Component } from 'react';
import Draggable from 'react-draggable';
import TextareaAutosize from 'react-textarea-autosize';
import marked from 'marked';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashAlt, faCheck, faPalette, faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';


class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      title: this.props.note.title,
      text: this.props.note.text,
      x: this.props.note.x,
      y: this.props.note.y,
      isEditing: false,
      zindex: this.props.note.zindex,
      currIndex: this.props.note.zindex,
    };
  }

  onDrag = (e, ui) => {
    const note = {
      title: this.state.title,
      text: this.state.text,
      x: ui.x,
      y: ui.y,
      zindex: this.state.zindex,
    };
    this.setState({
      currIndex: 500,
    });
    this.props.onDrag(this.state.id, note);
  };

  onStopDrag = (e, ui) => {
    this.setState({
      x: ui.x,
      y: ui.y,
      currIndex: this.zindex,
    });
  }

  onContentChange = (event) => {
    this.setState({
      text: event.target.value,
    });

    this.updateNote();
  };

  onTitleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
    this.updateNote();
  }

  stopEditing = () => {
    this.setState({
      isEditing: false,
      zindex: this.props.note.zindex,
    });
    this.updateNote();
  }

  addNote = () => {
    const note = {
      title: this.state.title,
      text: this.state.text,
      x: this.state.x + 15,
      y: this.state.y + 15,
      zindex: this.state.zindex + 1,
    };

    this.props.addNote(note);
  }

  deleteNote = () => {
    this.props.deleteNote(this.state.id);
  };

  updateNote = () => {
    const note = {
      title: this.state.title,
      text: this.state.text,
      x: this.state.x,
      y: this.state.y,
      zindex: this.state.zindex,
    };
    this.props.updateNote(this.state.id, note);
  }

  changeColor = () => {
    const colors = ['red', 'blue', 'green', 'purple', 'black', 'orange', 'olive', 'teal', 'fuchsia'];
    const rcolor = colors[Math.floor(Math.random() * 8)];
    $('.note').css('background-color', rcolor);
  }


  renderNote = () => {
    if (this.state.isEditing) {
      return (
        <div className="note" style={{ zIndex: '1000' }}>
          <div className="handle" style={{ justifyContent: 'flex-start' }}>
            <FontAwesomeIcon onClick={this.deleteNote} icon={faTrashAlt} size="1x" />
            <FontAwesomeIcon onClick={this.stopEditing} icon={faCheck} size="1x" />
          </div>
          <input className="editTitle" onChange={this.onTitleChange} value={this.state.title} />

          <TextareaAutosize className="editing" onChange={this.onContentChange} value={this.state.text} />
        </div>

      );
    } else {
      return (
        <div className="note" style={{ zIndex: this.state.currIndex }}>
          <div className="handle">
            <FontAwesomeIcon onClick={this.deleteNote} icon={faTrashAlt} size="2x" />
            <FontAwesomeIcon onClick={this.changeColor} icon={faPalette} size="2x" />
            <FontAwesomeIcon onClick={this.addNote} icon={faPlusCircle} size="2x" />
            <p onClick={() => { this.setState({ isEditing: true }); }}>{this.state.title}</p>
            <span />
          </div>
          <div role="presentation"
            onClick={() => { this.setState({ isEditing: true }); }}
            className="noteBody"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: marked(this.state.text || '') }}
          />

        </div>
      );
    }
  }


  render() {
    const { x, y } = this.props.note;
    const position = {
      x, y, width: 100, height: 100,
    };

    return (

      <Draggable
        handle=".handle"
        grid={[10, 10]}
        position={position}
        onStop={this.onStopDrag}
        onDrag={this.onDrag}
        bounds="body"
      >
        {this.renderNote()}
      </Draggable>


    );
  }
}

export default Note;
