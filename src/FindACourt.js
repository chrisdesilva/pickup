import React from "react"
import courtList from './CourtList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBasketballBall } from '@fortawesome/free-solid-svg-icons'

const FindACourt = props => {

const showDetails = () => {
    console.log(props.name)
}


    return (
        <div onClick={showDetails}>
            <FontAwesomeIcon icon={faBasketballBall} />
        </div>
      );

  
};

export default FindACourt;
