import React, { Component } from 'react';

class EntryBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Enter Title Here!',
    };
  }

  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({ title: event.target.value });
  }

  onAddNote = () => {
    this.props.onAddNote(this.state.title);
    this.setState({
      title: 'Enter Title Here!',
    });
  }

  deleteAll = () => {
    this.props.deleteAll();
  }

  render() {
    return (
      <div className="addBar">
        <input onChange={this.onInputChange} value={this.state.title} />
        <button type="submit" onClick={this.onAddNote}>New Note</button>
        <button type="submit" onClick={this.deleteAll}>Delete All</button>

      </div>
    );
  }
}

export default EntryBar;
