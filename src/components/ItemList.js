import React, { Component } from "react";
import Pusher from "pusher-js";

class ItemList extends Component {
  componentDidMount() {
    const pusher = new Pusher("websocketkey", {
      cluster: "mt1",
      wsHost: "127.0.0.1",
      wsPort: 6001
    });
    const channel = pusher.subscribe("list");
    channel.bind("itemAdded", data => {
      console.log(data);
    });
  }

  render() {
    return <div>Hola</div>;
  }
}

export default ItemList;
