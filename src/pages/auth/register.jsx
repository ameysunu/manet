import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {Form, Button} from "react-bootstrap";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Registered user: ", user);
      setEmail("");
      setPassword("");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error ocured: ", errorCode, errorMessage);
    });
  };
  return (
    <div style={{padding: "10px"}}>
    <h1>Register</h1>
    <br />
    <Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email"  value={email}
        onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" value={password}
        onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
  </Form.Group>
  <Button variant="primary" onClick={handleRegister}>
    Register
  </Button>
</Form>
    </div>
  );
};

export default Register;
