import Heading from "../ui/Heading";
import Row from "../ui/Row.jsx";
import {useEffect} from "react";
import {getCabins} from "../services/apiCabins.js";

function Cabins() {

  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
        <img src="https://gajgkvgubluimiivcggj.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg" alt=""/>
    </Row>
  );
}

export default Cabins;
