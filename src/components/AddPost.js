import React, { Component } from "react";
import { firestore, auth } from "../config/firebase";

class AddPost extends Component {
  state = { title: "", content: "" };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, content } = this.state;
    const { uid, displayName, email, photoURL } = auth.currentUser || {
      uid: "1111",
      displayName: "Steve Kinney",
      email: "steve@mailinator.com",
      photoURL: "http://placekitten.com/g/200/200",
    };

    const post = {
      title,
      content,
      user: {
        uid,
        displayName,
        email,
        photoURL,
      },
      favorites: 0,
      comments: 0,
      createdAt: Date.now(),
    };

    firestore
      .collection("posts")
      .add(post)
      .catch((err) => console.log(err));
    this.setState({ title: "", content: "" });
  };

  render() {
    const { title, content } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className='AddPost'>
        <input type='text' name='title' placeholder='Title' value={title} onChange={this.handleChange} />
        <input type='text' name='content' placeholder='Body' value={content} onChange={this.handleChange} />
        <input className='create' type='submit' value='Create Post' />
      </form>
    );
  }
}

export default AddPost;
