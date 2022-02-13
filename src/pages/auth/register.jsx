import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Form, Button, Spinner } from "react-bootstrap";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const auth = getAuth();
  const handleRegister = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Registered user: ", user);
        setEmail("");
        setPassword("");
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error ocured: ", errorCode, errorMessage);
        setLoading(false);
        setError(errorCode + errorMessage);
      });
  };
  return (
    <div style={{ padding: "10px" }}>
      <h1>Register</h1>
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
        <Button variant="primary" onClick={handleRegister}>
          Register
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

export default Register;
