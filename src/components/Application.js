import React, { Component } from "react";
import { firestore, auth } from "../config/firebase";
import Posts from "./Posts";
import { collectIdsAndDocs } from "./utils";
import Authentication from "./Authentication";

class Application extends Component {
  state = {
    posts: [],
    user: null,
  };

  unsubscribeFromFirestore = null;
  unsubscribeFromAuth = null;

  async componentDidMount() {
    this.unsubscribeFromFirestore = await firestore.collection("posts").onSnapshot((snapshotCurr) => {
      const posts = snapshotCurr.docs.map(collectIdsAndDocs);
      this.setState({ posts });
    });

    this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      this.setState({ user: user });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromFirestore();
    this.unsubscribeFromAuth();
  }

  render() {
    const { posts, user } = this.state;
    return (
      <main className='Application'>
        <h1>Think Piece</h1>
        <Authentication user={user} />
        <Posts posts={posts} />
      </main>
    );
  }
}

export default Application;
