import React, { createContext, Component } from "react";
import { firestore } from "../config/firebase";
import { collectIdsAndDocs } from "../components/utils";

export const PostsContext = createContext();

class PostsProvider extends Component {
  state = {
    posts: [],
  };

  unsubscribeFromFirestore = null;

  componentDidMount = () => {
    this.unsubscribeFromFirestore = firestore.collection("posts").onSnapshot((snapshotCurr) => {
      const posts = snapshotCurr.docs.map(collectIdsAndDocs);
      this.setState({ posts });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore();
  };

  render() {
    return <PostsContext.Provider value={this.state.posts}>{this.props.children}</PostsContext.Provider>;
  }
}

export default PostsProvider;
