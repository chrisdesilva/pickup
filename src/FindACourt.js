import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBasketballBall } from '@fortawesome/free-solid-svg-icons'
import { Header, Image, Modal } from 'semantic-ui-react'

const FindACourt = props => {

    return (
        <div>
          <Modal trigger={<FontAwesomeIcon icon={faBasketballBall} />}>
            <Modal.Content image>
            <Image wrapped size='medium' src={props.image} />
            <Modal.Description>
                <Header>{props.name}</Header>
                <p>{props.address}</p>
            </Modal.Description>
            </Modal.Content>
        </Modal>
            
        </div>
      );

  
};

export default FindACourt;
