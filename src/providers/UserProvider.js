import React, { createContext, Component } from "react";
import { auth, createUserProfileDocument } from "../config/firebase";

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  state = {
    user: null,
  };

  unsubscribeFromAuth = null;

  componentDidMount = () => {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      try {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapshot) => {
          this.setState({ user: { uid: snapshot.id, ...snapshot.data() } });
        });
        this.setState({ user: userAuth });
      } catch (err) {
        console.error(err.message);
      }
    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromAuth();
  };

  render() {
    return <UserContext.Provider value={this.state.user}>{this.props.children}</UserContext.Provider>;
  }
}

export default UserProvider;
