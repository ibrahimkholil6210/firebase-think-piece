import React from "react";

import CurrentUser from "./CurrentUser";
import SignInAndSignUp from "./SignInAndSignUp";

const Authentication = ({ user }) => {
  return <div>{user ? <CurrentUser {...user} /> : <SignInAndSignUp />}</div>;
};

export default Authentication;
