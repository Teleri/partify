import React, { Component } from "react";
import { auth } from "../services/firebase";
import { db } from "../services/firebase"

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      chats: [],
      content: '',
      readError: null,
      writeError: null
    };
  }
  async componentDidMount() {
    this.setState({ readError: null });
    try {
      db.ref("chats").on("value", snapshot => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        this.setState({ chats });
      });
    } catch (error) {
      this.setState({ readError: error.message });
    }
  }
  render() {
    return (
      <div> Fuffa </div>
    )
  }
}

export default Chat