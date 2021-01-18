import React, { Component } from "react";
import { firestore } from "../config/firebase";
import Posts from "./Posts";
import { collectIdsAndDocs } from "./utils";

class Application extends Component {
  state = {
    posts: [],
  };

  unsubscribe = null;

  async componentDidMount() {
    this.unsubscribe = await firestore.collection("posts").onSnapshot((snapshotCurr) => {
      const posts = snapshotCurr.docs.map(collectIdsAndDocs);
      this.setState({ posts });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleCreate = (post) => {
    const { posts } = this.state;
    this.setState({ posts: [post, ...posts] });
  };

  render() {
    const { posts } = this.state;

    return (
      <main className='Application'>
        <h1>Think Piece</h1>
        <Posts posts={posts} onCreate={this.handleCreate} />
      </main>
    );
  }
}

export default Application;
