import { Button } from "@material-ui/core";
import React from "react";
import { auth, Fprovider, provider } from "../../firebase";

import "./Login.css";

function Login() {
  const signInFB = () => {
    auth
      .signInWithPopup(Fprovider)
      .then((result) => console.log(result))
      .catch((err) => console.log(err.message));
  };
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => console.log(result))
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="login">
      <div className="login-container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2042px-WhatsApp.svg.png"
          alt="wApp-logo"
        />

        <div className="login-text">
          <h1>Sign into Whatsapp!</h1>
        </div>

        <Button onClick={signIn}>Sign In with Google</Button>
        {/* <Button onClick={signInFB}>Sign in With Facebook</Button> */}
      </div>
    </div>
  );
}

export default Login;
