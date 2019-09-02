import React, { Component } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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
    const newList = [...this.state.items, data.item];
    this.setState({ items: newList }, () => console.log(this.state.items));
  };

  handleSubmit = event => {
    event.preventDefault();

    const { item } = this.state;

    const instance = axios.create({
      baseURL: "http://localhost:8000/api/"
    });

    instance.post(`/items`, { item }, { port: 8000 }).then(res => {
      console.log(res);
      console.log(res.data);
    });

    this.setState({item: ''});
  };

  handleChange = event => {
    this.setState({ item: event.target.value });
  };

  renderList() {
    const { items } = this.state;
    return (
      <div>
        <List component="nav">
          {items.map(item => {
            return (
              <ListItem button>
                <ListItemText primary={item.item} />
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }

  render() {
    const { item } = this.state;

    return (
      <div>
        <h1>Shopping List</h1>
        {this.renderList()}
        <form onSubmit={this.handleSubmit}>
          <label>
            <TextField
              id="standard-name"
              label="New Item"
              value={item}
              onChange={this.handleChange}
              margin="normal"
            />
          </label>
          <Fab color="primary" aria-label="add" type="submit">
            <AddIcon />
          </Fab>
        </form>
      </div>
    );
  }
}

export default ItemList;
