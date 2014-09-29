/** @jsx React.DOM */

'use strict';

var todoApp = React.createClass({

  updateData: function(newValue, index) {
    var data      = this.state.data;
    var tmp       = {}
    tmp[newValue] = false
    data[index]   = data[index].concat([ tmp ]);
    this.setState({data: data});
  },

  updateItem: function(itemDone, list_item, list_index) {
    var data      = this.state.data;
    var list_dict = _.filter(data[list_index], function(dict) {
      return _.keys(dict)[0] == list_item;
    })[0];
    var dict_index = _.indexOf(data[list_index], list_dict);
    data[list_index][dict_index][list_item] = itemDone;
    this.setState({data:data});
  },

  getInitialState: function() {
    return { data: {'work' : [ {'work1' : false}, {'work2' : false}, {'already done' : true }],
                    'home' : [ {'home1' : false}, {'home2' : false} ] 
                  }
           };
  },

  render: function() {
      return (
        <div className="todoApp">
          <h1>TODO Lists</h1>
          <todoLists data={this.state.data} updateData={this.updateData} updateItem={this.updateItem} />
        </div>
      );
  }
});

var todoLists = React.createClass({

  render: function() {
    var todo_list_names = Object.keys(this.props.data);
    var props           = this.props
    var todo_lists      = todo_list_names.map(function (list) {
      var todo_count = $.grep(props.data[list], function(obj, i) { return _.values(obj)[0] === false }).length;
      return (
        <div className="todoList" key={list}>
          <h2 className="todoList">{list}<span className="badge">{todo_count}</span></h2>
          <todoList data={props.data[list]} index={list} updateList={props.updateData} updateItem={props.updateItem}/>
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
      var list_items = _.map(this.props.data, function(list_items) {return Object.keys(list_items)[0]})
      if ($.inArray(newValue, list_items) != -1 ) { //Not found
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
    var props = this.props
    var todo_items = this.props.data.map(function (dict) {
      return (
        <todoItem key={Object.keys(dict)[0]} text={Object.keys(dict)[0]} done={dict[Object.keys(dict)[0]]} index={props.index} updateItem={props.updateItem} />
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

  handleItemUpdate : function(e) {
    var node      = this.getDOMNode();
    var todo_item = this.props.text;
    var item_done = $(node).find('input[type="checkbox"]').prop('checked')
    this.props.updateItem(item_done, todo_item, this.props.index);

  },

  componentDidMount: function() {
    if (this.props.done) {
      var node     = this.getDOMNode();
      var checkbox =  $(node).find('input[type="checkbox"]')
      $(checkbox).prop('checked', true);
    }
  },

  render: function() {
    var done = this.props.done
    return (
      <li className={done ? "todoItem done" : "todoItem"}>
      {this.props.text}
      <input type="checkbox" onClick={this.handleItemUpdate} />
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
