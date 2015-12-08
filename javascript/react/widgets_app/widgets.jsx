var React = require('react');
var ReactDOM = require('react-dom');
var AutoComplete = require('./auto.jsx')


var MyComponent = React.createClass({

  render: function () {
    return(
      <div>
        <AutoComplete />
      </div>
    );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<MyComponent />, document.getElementById('main'));
});
