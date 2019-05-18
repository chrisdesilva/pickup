import React from "react"
import CourtModal from './CourtModal'
import './Map.css'


const FindACourt = props => {


  return (
    <div>
      <CourtModal 
        image={props.image}
        name={props.name}
        address={props.address}
        url={props.url}
        lat={props.lat}
        lng={props.lng}
        id={props.id}
        gameDateTime={props.gameDateTime}
      />
    </div>
  );

};

export default FindACourt;


