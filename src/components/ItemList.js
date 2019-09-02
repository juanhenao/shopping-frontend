import React, { Component } from "react";
import Pusher from "pusher-js";
import axios from "axios";

class ItemList extends Component {
  state = {
    item: "",
    items: []
  };

  componentDidMount() {
    const pusher = new Pusher("websocketkey", {
      wsHost: "127.0.0.1",
      wsPort: 6001
    });
    const channel = pusher.subscribe("list");
    channel.bind("item.added", this.handleList);
  }

  handleList = data => {
    console.log(data);
    const newList = [...this.state.items, data.item]
    this.setState({items: newList}, () => console.log(this.state.items));
  };

  handleSubmit = event => {
    event.preventDefault();

    const { item } = this.state;

    const instance = axios.create({
      baseURL: 'http://localhost:8000/api/',
    });

    instance.post(`/items`, { item }, {port: 8000}).then(res => {
      console.log(res);
      console.log(res.data);
    });
  };

  handleChange = event => {
    this.setState({ item: event.target.value });
  };
  
  renderList() {
    const {items} = this.state;
    return (
      <div>
        <ul>
          { items.map(item => <li key={item.id}>{item.item}</li>)}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>Shopping List</h1>
        {this.renderList()}
        <form onSubmit={this.handleSubmit}>
          <label>
            New Item:
            <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

export default ItemList;
