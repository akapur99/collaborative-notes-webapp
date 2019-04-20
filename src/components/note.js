import React, { Component } from 'react';
import Draggable from 'react-draggable';
import TextareaAutosize from 'react-textarea-autosize';
import marked from 'marked';


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

    // this.onContentChange = this.onContentChange.bind(this);
    // this.deleteNote = this.onDelete.bind(this);
    // this.onDrag = this.onDrag.bind(this);
  }

  onDrag = (e, ui) => {
    this.setState({
      x: ui.x,
      y: ui.y,
    });
  };

  onContentChange = (event) => {
    console.log(event.target.value);
    // this.props.onSearchChange(event.target.value);
    this.setState({ text: event.target.value });
  };

  stopEditing = () => {
    this.setState({
      isEditing: false,
    });
  }

  deleteNote = () => {
    console.log('fuck');
    console.log(this.state.id);
    console.log('this shit');
    this.props.deleteNote(this.state.id);
  };


  renderNote = (x, y, position) => {
    if (this.state.isEditing) {
      return (
        <div className="note">
          <button type="submit" onClick={this.stopEditing}>Done</button>
          <h3>{this.state.title}</h3>
          <h3>Editing</h3>
          <TextareaAutosize class="editing" onChange={this.onContentChange} value={this.state.text} />
        </div>

      );
    } else {
      return (
        <div className="note">
          <span className="handle">Drag Here</span>
          <button type="submit" onClick={this.deleteNote}>Delete</button>
          <h3>{this.state.title}</h3>
          <h3>{this.state.id}</h3>
          <div role="presentation"
            onClick={() => { this.setState({ isEditing: true }); }}
            className="noteBody"
            dangerouslySetInnerHTML={{ __html: marked(this.state.text || '') }}
          />

          {/* <TextareaAutosize onChange={this.onContentChange} value={this.state.text} /> */}

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
        // onStart={this.onStartDrag}
        onDrag={this.onDrag}
      >
        {this.renderNote(x, y, position)}
      </Draggable>


    );
  }
}

export default Note;
