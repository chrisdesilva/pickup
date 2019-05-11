import React from "react"
import { Icon } from 'semantic-ui-react'
import { Header, Image, Modal } from 'semantic-ui-react'

const FindACourt = props => {

    return (
        <div>
          <Modal trigger={<Icon inverted name="basketball ball" size="large" color="orange"/>}>
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
