import { Card, Button, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";

function Home() {
  const [greeting, setGreeting] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const openPop = () => setShow(true);

  useEffect(() => {
    var d = new Date();
    var hours = d.getHours();

    if (hours < 12) {
      setGreeting("Good Morning!");
    } else if (hours < 18) {
      setGreeting("Good Afternoon!");
    } else {
      setGreeting("Good Evening!");
    }
  }, []);

  return (
    <div style={{ padding: "10px", color: "white" }} className="body">
      <Card border="dark" bg="dark">
        <Card.Title style={{ padding: "10px" }}>
          <h2>{greeting}</h2>
        </Card.Title>
        <Card.Body>
          <Button variant="outline-light" onClick={openPop}>
            More Info
          </Button>{" "}
        </Card.Body>
      </Card>
      <div style={{ paddingTop: "10px" }}>
        <Alert show={show} variant="success" onClose={handleClose}>
          <Alert.Heading>Hospitals</Alert.Heading>
          <p>
            This application creates a MANET which can connect various
            hospitals, i.e. nodes, to provide patient details to the hospital,
            with equipments that only certain hospitals have.
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShow(false)} variant="outline-success">
              Done
            </Button>
          </div>
        </Alert>
      </div>
    </div>
  );
}

export default Home;
