import React, { Component } from 'react';
import Draggable from 'react-draggable';
import TextareaAutosize from 'react-textarea-autosize';
import marked from 'marked';
// import firebase from 'firebase';


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
    this.props.onDrag(this.state.id, note);
  };

  onStopDrag = (e, ui) => {
    this.setState({
      x: ui.x,
      y: ui.y,
    });
  }

  onContentChange = (event) => {
    this.setState({
      text: event.target.value,
      zindex: Number.MAX_SAFE_INTEGER,
    });

    const note = {
      title: this.state.title,
      text: this.state.text,
      x: this.state.x,
      y: this.state.y,
      zindex: this.state.zindex,
    };
    this.props.updateNote(this.state.id, note);
  };

  stopEditing = () => {
    this.setState({
      isEditing: false,
      zindex: this.props.note.zindex,
    });
  }

  deleteNote = () => {
    this.props.deleteNote(this.state.id);
  };


  renderNote = (x, y, position) => {
    if (this.state.isEditing) {
      return (
        <div className="note">
          <div className="handle">
            <button type="submit" onClick={this.deleteNote}>Delete</button>
            <button type="submit" onClick={this.stopEditing}>Done</button>
            <h3>Editing</h3>
          </div>
          <TextareaAutosize className="editing" onChange={this.onContentChange} value={this.state.text} />
        </div>

      );
    } else {
      return (
        <div className="note">
          <div className="handle">
            <button type="submit" onClick={this.deleteNote}>Delete</button>
            <h3>{this.state.title}</h3>
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
    const { x, y } = this.state;
    const position = {
      x, y, width: 100, height: 100,
    };

    return (

      <Draggable
        handle=".handle"
        grid={[25, 25]}
        position={position}
        onStop={this.onStopDrag}
        onDrag={this.onDrag}
        z-index={this.state.zindex}
      >
        {this.renderNote(x, y, position)}
      </Draggable>


    );
  }
}

export default Note;
