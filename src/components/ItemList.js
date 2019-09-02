import React, { Component } from "react";
import Pusher from "pusher-js";

class ItemList extends Component {
  componentDidMount() {
    const pusher = new Pusher("websocketkey", {
      wsHost: "127.0.0.1",
      wsPort: 6001
    });
    const channel = pusher.subscribe("list");
    channel.bind("item.added", data => {
      console.log(data);
    });
  }

  render() {
    return <div>Hola</div>;
  }
}

export default ItemList;
