import React from "react";
import { Container, Row, Col, FormInput, Button } from "shards-react";

const Messages = ({ msgs, state }) => {
    return (
      <>
        {msgs.messages.map(({ id, user: messageUser, content }) => (
          <div
            style={{
              display: "flex",
              justifyContent: state.user === messageUser ? "flex-end" : "flex-start",
              paddingBottom: "1em",
            }}
          >
            {state.user !== messageUser && (
              <div
                style={{
                  height: 50,
                  width: 50,
                  marginRight: "0.5em",
                  border: "2px solid #e5e6ea",
                  borderRadius: 25,
                  textAlign: "center",
                  fontSize: "18pt",
                  paddingTop: 5,
                }}
              >
                {messageUser.slice(0, 2).toUpperCase()}
              </div>
            )}
            <div
              style={{
                background: state.user === messageUser ? "blue" : "#e5e6ea",
                color: state.user === messageUser ? "white" : "black",
                padding: "1em",
                borderRadius: "1em",
                maxWidth: "60%",
              }}
            >
              {content}
            </div>
          </div>
        ))}
      </>
    );
  };

export default Messages