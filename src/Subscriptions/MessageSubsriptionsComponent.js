 
import React from "react";
import { Subscription } from "react-apollo";
import { gql } from "apollo-boost";

const newMessage = gql`
  subscription {
    message {
        _id
        text
    }
  }
`;

export default () => (
  <Subscription subscription={newMessage}>
    {({ data }) => {
      return <h1>   </h1>
    }}
  </Subscription>
);