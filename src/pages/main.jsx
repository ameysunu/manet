import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebaseConfig";
import { Card, Button, Alert, Form, Row, Col } from "react-bootstrap";

function Main() {
  const [hospitals, setHospitals] = useState([]);
  const [hospitalDetail, sethospitalDetail] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showSplit, setShowSplit] = useState("");
  const [triggerSplit, setTriggerSplit] = useState(false);
  const [showSecondarySplit, setShowSecondarySplit] = useState("");
  const [secondaryTriggerSplit, setSecondaryTriggerSplit] = useState(false);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  useEffect(
    () => {
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
    },
    //eslint-disable-next-line
    []
  );

  const refresh = () => {
    window.location.reload();
  };

  const getSplit = async () => {
    const splitData = await getDocs(collection(db, "split"));
    splitData.forEach((doc) => {
      setShowSplit(
        splitData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      console.log(`${doc.data().name}`);
    });
    setTriggerSplit(true);
    const splitSecondaryData = await getDocs(collection(db, "splittwo"));
    splitSecondaryData.forEach((doc) => {
      setShowSecondarySplit(
        splitSecondaryData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setSecondaryTriggerSplit(true);
    });
  };

  const addData = async () => {
    const docRef = await addDoc(collection(db, "hospitals"), {
      name: hospitalDetail
    });
    console.log("Document written with ID: ", docRef.id);
    refresh();
    setShowForm(false);
    setTriggerSplit(false);
  };

  const deleteData = async (id) => {
    await deleteDoc(doc(db, "hospitals", id));
    refresh();
  };

  const revertData = async () => {
    setTriggerSplit(false);
    setSecondaryTriggerSplit(false);
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
      <h1>List of Ambulances</h1>
      {!triggerSplit && !secondaryTriggerSplit && (
        <div>
          {hospitals.map((data) => (
            <div style={{ padding: "10px" }}>
              <Card>
                <Row>
                  <Col>
                    <Card.Body>
                      {data.name}
                      <p style={{ fontSize: "12px" }}>ID: {data.id}</p>
                    </Card.Body>
                  </Col>
                  <Col style={{ padding: "10px" }} sm={1}>
                    <Button
                      variant="outline-danger"
                      onClick={() => deleteData(data.id)}
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
              </Card>
            </div>
          ))}
        </div>
      )}
      {triggerSplit && (
        <div>
          MANET 1
          {showSplit.map((data) => (
            <div style={{ padding: "10px" }}>
              <Card>
                <Row>
                  <Col>
                    <Card.Body>
                      {data.name}
                      <p style={{ fontSize: "12px" }}>ID: {data.id}</p>
                    </Card.Body>
                  </Col>
                  <Col style={{ padding: "10px" }} sm={1}>
                    <Button
                      variant="outline-danger"
                      onClick={() => deleteData(data.id)}
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
              </Card>
            </div>
          ))}
        </div>
      )}
      {secondaryTriggerSplit && (
        <div>
          MANET 2
          {showSecondarySplit.map((data) => (
            <div style={{ padding: "10px" }}>
              <Card>
                <Row>
                  <Col>
                    <Card.Body>
                      {data.name}
                      <p style={{ fontSize: "12px" }}>ID: {data.id}</p>
                    </Card.Body>
                  </Col>
                  <Col style={{ padding: "10px" }} sm={1}>
                    <Button
                      variant="outline-danger"
                      onClick={() => deleteData(data.id)}
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
              </Card>
            </div>
          ))}
        </div>
      )}
      <Row>
        <Col>
          <div style={{ padding: "10px" }}>
            {!showForm && (
              <Button
                variant="outline-success"
                onClick={() => setShowForm(true)}
              >
                + Add a new hospital
              </Button>
            )}
          </div>
        </Col>
        <Col>
          <Button variant="outline-primary" onClick={getSplit}>
            Split
          </Button>
        </Col>
        <Col>
          <Button variant="outline-danger" onClick={revertData}>
            Merge
          </Button>
        </Col>
      </Row>
      <AlertDismissible />
    </div>
  );
}

export default Main;
