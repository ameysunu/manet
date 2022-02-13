import { useLocation } from "react-router-dom";
import {useEffect} from "react";

function Main() {
    const location = useLocation();
    useEffect(() => {  
        console.log("userID: ", location.state);
    }, [location]);

    return (
        <div style={{padding:"10px"}}>
            <h1>List of Hospitals</h1>
            <p>UID: {location.state}</p>
        </div>
    );
}

export default Main;