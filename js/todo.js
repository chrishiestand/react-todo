/** @jsx React.DOM */

'use strict';

var todoApp = React.createClass({

  updateData: function(newValue, index) {
    var data    = this.state.data;
    data[index] = data[index].concat([newValue]);
    this.setState({data: data});
  },
  getInitialState: function() {
    return {data: {'work': [ 'work1', 'work2'], 'home' : ['home1', 'home2'] }};
  },
  render: function() {
      return (
        <div className="todoApp">
          <h1>TODO Lists</h1>
          <todoLists data={this.state.data} updateData={this.updateData} />
        </div>
      );
  }
});

var todoLists = React.createClass({

  render: function() {
    var todo_list_names = Object.keys(this.props.data);
    var props           = this.props
    var todo_lists      = todo_list_names.map(function (list) {
      return (
        <div className="todoList" key={list}>
          <h2 className="todoList">{list}<span className="badge">{props.data[list].length}</span></h2>
          <todoList data={props.data[list]} index={list} updateList={props.updateData} />
        </div>
      );
    });
    return (
      <div className="todoLists">
      {todo_lists}
      </div>
    );
  }

});

var todoList = React.createClass({

  addValue: function(e) {
    var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
    if (charCode == 13) {
      var newValue = $.trim(this.refs.newitem.getDOMNode().value);
      if (newValue == '') {  // Do not accept whitespace only
        return;
      }
      if ($.inArray(newValue, this.props.data) != -1 ) { //Not found
        alert(newValue + ' is already in the list')
        this.refs.newitem.getDOMNode().value = '';
        return;
      }
      this.props.updateList(newValue, this.props.index);
      this.refs.newitem.getDOMNode().value = '';
      return;
    }
  },
  render: function() {
    var todo_items = this.props.data.map(function (text) {
      return (
        <todoItem key={text} text={text} />
      );
    });
  
    return (
      <div className="todoList">
        <ul>
        {todo_items}
        </ul>
        <input type="text" placeholder="add todo item" ref="newitem" onKeyPress={this.addValue} />
      </div>
    );
  }

});

var todoItem = React.createClass({

  todoDone : function(e) {
    var node = this.getDOMNode();

    if ($(node).find('input[type="checkbox"]').prop('checked')) {
      $(node).css('text-decoration', 'line-through');
    }
    else {
      $(node).css('text-decoration', '');
    }
  },
  render: function() {
    return (
      <li className="todoItem">
      {this.props.text}
      <input type="checkbox" onClick={this.todoDone} />
      </li>
    );
  }
})

var todoForm = React.createClass({
  render: function() {
      return (
        <div className="todoApp">
        </div>
      );
  }
});


React.renderComponent(
  <todoApp />,
  document.getElementById('todoapp')
);
