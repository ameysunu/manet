import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebaseConfig";
import { Card } from "react-bootstrap";

function Main() {
  const [hospitals, setHospitals] = useState([]);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  useEffect(() => {
    const getData = async () => {
      const hospitalData = await getDocs(collection(db, "hospitals"));
      setHospitals(
        hospitalData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      console.log(hospitalData.docs);
    };
    getData();
  }, []);

  return (
    <div style={{ padding: "10px" }}>
      <h1>List of Hospitals</h1>
      {hospitals.map((data) => (
        <div key={data.id} style={{ padding: "10px" }}>
          <Card>
            <Card.Body>{data.id}</Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default Main;
