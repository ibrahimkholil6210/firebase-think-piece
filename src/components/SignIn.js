import React, { Component } from "react";
import { signInWithGoogle, auth } from "../config/firebase";

class SignIn extends Component {
  state = { email: "", password: "" };

  handleChange = async (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.state.email && this.state.password) await auth.signInWithEmailAndPassword(this.state.email, this.state.password);
    this.setState({ email: "", password: "" });
  };

  render() {
    const { email, password } = this.state;

    return (
      <form className='SignIn' onSubmit={this.handleSubmit}>
        <h2>Sign In</h2>
        <input type='email' name='email' placeholder='Email' value={email} onChange={this.handleChange} />
        <input type='password' name='password' placeholder='Password' value={password} onChange={this.handleChange} />
        <input type='submit' value='Sign In' />
        <button onClick={signInWithGoogle}>Sign In With Google</button>
      </form>
    );
  }
}

export default SignIn;
