import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { firestore } from "../config/firebase";
import { collectIdsAndDocs } from "./utils";
import Post from "./Post";
import Comments from "./Comments";
import withUser from "../hoc/withUser";

class PostPage extends Component {
  state = {
    post: null,
    comments: [],
    user: null,
  };

  get postId() {
    return this.props.match.params.id;
  }

  get postRef() {
    return firestore.collection("posts").doc(this.postId);
  }

  get commentsRef() {
    return this.postRef.collection("comments");
  }

  unsubscribeFromPost = null;
  unsubscribeFromComments = null;

  async componentDidMount() {
    this.unsubscribeFromPost = this.postRef.onSnapshot((snapshot) => this.setState({ post: snapshot.data() }));
    this.unsubscribeFromComments = this.commentsRef.onSnapshot((snapshot) => {
      const comments = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ comments });
    });

    this.setState({ user: this.context });
  }

  componentWillUnmount() {
    this.unsubscribeFromPost();
    this.unsubscribeFromComments();
  }

  createComment = ({ content }) => {
    this.commentsRef.add({
      content,
      user: this.props.user,
    });
  };

  render() {
    const { post, comments } = this.state;
    return (
      <section>
        {post && <Post {...post} />}
        <Comments comments={comments} postId={this.postId} onCreate={this.createComment} />
      </section>
    );
  }
}

export default withRouter(withUser(PostPage));
