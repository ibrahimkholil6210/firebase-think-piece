import React, { Component, createRef } from "react";
import { auth, firestore } from "../config/firebase";

class UserProfile extends Component {
  state = {
    displayName: "",
  };

  imageRef = createRef();

  get uid() {
    return auth.currentUser.uid;
  }

  get userRef() {
    return firestore.collection("users").doc(this.uid);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { displayName } = this.state;
    if (displayName) {
      try {
        this.userRef.update({
          displayName,
        });
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  render() {
    const { displayName } = this.state;
    return (
      <section className='UserProfile'>
        <form onSubmit={this.handleSubmit}>
          <input type='text' value={displayName} name='displayName' onChange={this.handleChange} />
          <input type='file' ref={(ref) => (this.imageRef = ref)} />
          <input className='update' type='submit' />
        </form>
      </section>
    );
  }
}

export default UserProfile;
