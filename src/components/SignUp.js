import React, { Component } from "react";
import { auth, createUserProfileDocument } from "./../config/firebase";

class SignUp extends Component {
  state = { displayName: "", email: "", password: "" };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, displayName } = this.state;

    this.setState({ displayName: "", email: "", password: "" });

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      await createUserProfileDocument(user, { displayName });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { displayName, email, password } = this.state;

    return (
      <form className='SignUp' onSubmit={this.handleSubmit}>
        <h2>Sign Up</h2>
        <input type='text' name='displayName' placeholder='Display Name' value={displayName} onChange={this.handleChange} />
        <input type='email' name='email' placeholder='Email' value={email} onChange={this.handleChange} />
        <input type='password' name='password' placeholder='Password' value={password} onChange={this.handleChange} />
        <input type='submit' value='Sign Up' />
      </form>
    );
  }
}

export default SignUp;
