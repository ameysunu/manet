import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Form, Button, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const auth = getAuth();
  const history = useHistory();
  
  const handleLogin = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Signed in user: ", user);
        setLoading(false);
        //history.push("/main", {user});
        history.push({
          pathname: "/main",
          state: user.uid ,
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("An error occured: ", errorCode, errorMessage);
        setLoading(false);
        setError(errorCode + errorMessage);
      });
  };
  return (
    <div style={{ padding: "10px" }}>
      <h1>Login</h1>
      <br />
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" onClick={handleLogin}>
          Login
        </Button>
       {loading && <div style={{ position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",}}>
        <Spinner animation="border" variant="primary" />
        </div> } 
        {error && <div style={{ color: "red", paddingTop: "10px" }}>{error}</div>}
      </Form>
    </div>
  );
};

export default Login;
