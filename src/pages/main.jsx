import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  addDoc,
  query,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebaseConfig";
import { Card, Button, Alert, Form, Row, Col } from "react-bootstrap";

function Main() {
  const [hospitals, setHospitals] = useState([]);
  const [hospitalDetail, sethospitalDetail] = useState("");
  const [showForm, setShowForm] = useState(false);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  useEffect(() => {
    const getData = async () => {
      const hospitalData = await getDocs(collection(db, "hospitals"));
      hospitalData.forEach((doc) => {
        setHospitals(
          hospitalData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        console.log(`${doc.data().name}`);
      });
    };
    getData();
  }, []);

  const refresh = () => {
    window.location.reload();
  };

  const addData = async () => {
    const docRef = await addDoc(collection(db, "hospitals"), {
      name: hospitalDetail,
    });
    console.log("Document written with ID: ", docRef.id);
    refresh();
    setShowForm(false);
  };

  function AlertDismissible() {
    return (
      <>
        <Alert
          show={showForm}
          variant="success"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Alert.Heading>Add a hospital</Alert.Heading>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                value={hospitalDetail}
                onChange={(e) => sethospitalDetail(e.target.value)}
                placeholder="Enter hospital name"
              />
            </Form.Group>
          </Form>
          <hr />
          <div className="d-flex justify-content-end">
            <Row>
              <Col>
                <Button onClick={addData} variant="outline-success">
                  Save
                </Button>
              </Col>
              <Col>
                <Button
                  onClick={() => setShowForm(false)}
                  variant="outline-danger"
                >
                  Close
                </Button>
              </Col>
            </Row>
          </div>
        </Alert>
      </>
    );
  }

  return (
    <div style={{ padding: "10px" }}>
      <h1>List of Hospitals</h1>
      {hospitals.map((data) => (
        <div style={{ padding: "10px" }}>
          <Card>
            <Card.Body>{data.name}</Card.Body>
          </Card>
        </div>
      ))}
      <div style={{ padding: "10px" }}>
        {!showForm && (
          <Button variant="outline-success" onClick={() => setShowForm(true)}>
            + Add a new hospital
          </Button>
        )}
      </div>
      <AlertDismissible />
    </div>
  );
}

export default Main;
