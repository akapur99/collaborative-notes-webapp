import React, { Component } from 'react';

class EntryBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
    };
    // this.onInputChange = this.onInputChange.bind(this);
    // this.onClickAdd = this.onClickAdd.bind(this);
  }

  onInputChange = (event) => {
    console.log(event.target.value);
    // this.props.onSearchChange(event.target.value);
    this.setState({ title: event.target.value });
  }

  onAddNote = () => {
    this.props.onAddNote(this.state.title);
    this.setState({
      title: '',
    });
  }

  render() {
    return (
      <div>
        <input onChange={this.onInputChange} value={this.state.title} />
        <button type="submit" onClick={this.onAddNote}>New Note</button>

      </div>
    );
  }
}

export default EntryBar;
