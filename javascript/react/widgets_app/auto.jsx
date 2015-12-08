var React = require('react');


var AutoComplete = React.createClass({
  getInitialState: function() {
    return {inputValue: "", names: [
      'UCB',
      'UCLA',
      'UCSD',
      'UCD',
      'UCI',
      'UCR',
      'UCSF']
    };
  },

  matches: function() {
    var matches = [];
    var lengthInput = this.state.inputValue.length;
    this.state.names.forEach(function(name) {
      if (name.slice(0, lengthInput) === this.state.inputValue) {
        matches.push(name);
      }
    }.bind(this));
    return matches;
  },

  handleInput: function(e) {
    this.setState({inputValue: e.currentTarget.value});
  },

  handleNewEntry: function(e) {
    //upon enter, adds new entry to list 
    if (e.keyCode === 13) {
      this.state.names.push(e.currentTarget.value);
      this.setState({names: this.state.names, inputValue: ""});
    }
  },

  render: function() {
    results = this.matches();
    return (
      <div>
        <input onChange={this.handleInput}
          onKeyUp={this.handleNewEntry}
            value={this.state.inputValue} />
        <ul>
          {
            results.map(function(result, idx) {
              return <li key={idx}>{result}</li>;
            })
          }
        </ul>
      </div>

    )
  }

});


module.exports = AutoComplete;
