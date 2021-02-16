import React from "react";
import { UserContext } from "../providers/UserProvider";

const withUser = (WrappedComponent) => {
  const withUserWrapper = (props) => {
    return <UserContext.Consumer>{(user) => <WrappedComponent {...props} user={user} />}</UserContext.Consumer>;
  };
  return withUserWrapper;
};

export default withUser;
