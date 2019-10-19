import React from 'react'
import Geocode from 'react-geocode'
import { Button, Container, Form, Grid, Header, Image, Message, Checkbox, Loader, Icon} from 'semantic-ui-react'
import db from '../fire'
import { storage } from '../fire';
import courtPhoto from '../Images/beach-court.jpg'

Geocode.setApiKey(`${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`)

const style = {
  header: {
    margin: '2rem 0',
    fontSize: '2.5rem',
    color: 'black'
  },
  p: {
    fontSize: '1.25rem',
    padding: '0 3rem',
    color: 'black'
  },
  button: {
    display: 'flex',
    justifyContent: 'center'
  },
  form: {
    padding: '0 3rem'
  },
  message: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem'
  }
}

class AddCourt extends React.Component {
  fileInput = React.createRef();
  state = {
      name: '',
      address: '',
      avgRating: '',
      ratings: [],
      zip: '',
      image: '', /*---> I used this state property to add imageUrl*/
      latitude: 0,
      longitude: 0,
      mapsURL: 'https://maps.google.com?q=',
      submitReady: false,
      showConfirmMsg: false,
      localUpload: false, /*---> Added this state property*/
      isUploading: false, /*---> Added this state property*/
      uploadButtonText: 'Upload an image', /*---> Added this state property*/
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  // calculate latitude and longitude when user clicks confirm button, then switch button to submit by updating submitReady
  getLatAndLng = () => Geocode.fromAddress(this.state.address).then(
    response => {
      const { lat, lng } = response.results[0].geometry.location
      this.setState({
        latitude: lat,
        longitude: lng,
        submitReady: true
      })
      console.log(lat, lng)
    },
    error => {
      this.setState({
        latitude: 'invalid address',
        longitude: 'check street address field',
      })
      console.log(error)
    }
  )

  /*Used when detect a change in the input file DOM Element and then do the magic in firebase storage */
  updatedFile = () => {
    console.log("---> Detecting files...", this.fileInput.current.files);
    //Get image
    const image = this.fileInput.current.files[0];
    //Check if user tricked us so if he/she tried to trick us then exit the function
    if(image == undefined){
      alert("You have to select and image");
      return true;
    }
    //Restrict the files, only image files
    console.log("---> ", image.type);
    if(!image.type.includes("image/")){
      alert("You've selected a wrong format");
      return true;
    }
    //Show the loading icon in the upload button
    this.setState({isUploading: true});
    console.log("---> Image detected", image);
    //Some firebase thing, all of this is in documentation, it is easy
    const storageRef = storage.ref();
    const imageToUpload = storageRef.child(image.name);
    imageToUpload.put(image).then((snapshot) => {
      console.log("---> DEBUG INFO:",snapshot);
      imageToUpload.getDownloadURL().then((url) => {
        console.log("---> URL of the image:", url);
        //Set the url of the image, hide the loading icon, and change the button text
        this.setState({image: url, isUploading: false, uploadButtonText: "Image uploaded correctly"});
      }).catch((err) => {
        //Hide the loading icon and display an error in the button
        this.setState({isUploading: false, uploadButtonText: "An error occurred uploading, please try again"});
        throw new Error(err);
      })
    }).catch((err) => {
      //Hide the loading and display an error in the button
      this.setState({isUploading: false, uploadButtonText: "An error occurred uploading, please try again"});
      throw new Error(err);
    })
  }

  /*Function that will show the text field for enter the URL of the image or to show the upload image button from your device*/
  LocalOrURL = (e,data) => {
    if(data.value == "remote"){
      this.setState({localUpload: false});
    }else{
      this.setState({localUpload: true});
    }
  }

  // make reference to courts collection on Firebase, add state object to database
  addCourt = e => {
    e.preventDefault()
    db.collection('courts').add({
      name: this.state.name,
      address: this.state.address,
      avgRating: Number(this.state.avgRating),
      ratings: [Number(this.state.avgRating)],
      zip: this.state.zip,
      image: this.state.image,
      latitude: Number(this.state.latitude),
      longitude: Number(this.state.longitude),
      mapsURL: this.state.mapsURL + this.state.address + this.state.zip
    })
    .then(function(docRef) {
      console.log("ID: ", docRef.id)
    })
    .catch(function(error) {
      console.error("Error: ", error)
    })

    this.setState({
      name: '',
      address: '',
      avgRating: 0,
      ratings: [],
      zip: '',
      image: '',
      latitude: 0,
      longitude: 0,
      mapsURL: '',
      submitReady: false,
      showConfirmMsg: true,
    })
  }

  render() {
    return (
      <Container>
      <Header style={style.header} as='h2' id="h2" inverted textAlign='center'>Add A Court</Header>
      <Grid stackable>
        <Grid.Row verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <p style={style.p}>Know about a great court nearby? Enter the information in the form to the right then click submit!</p>
            <Image alt="Aerial view of a basketball court" rounded src={courtPhoto} />
            </Grid.Column>
          <Grid.Column>
            <Form onSubmit={this.addCourt} style={style.form}>
              <Form.Group>
                <Form.Input 
                  placeholder='Name of court' 
                  name='name' 
                  value={this.state.name} 
                  onChange={this.handleChange} 
                  width={16}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  placeholder='Street address with city and state'
                  name='address'
                  value={this.state.address}
                  onChange={this.handleChange}
                  width={16}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  placeholder='Zip Code'
                  name='zip'
                  value={this.state.zip}
                  onChange={this.handleChange}
                  width={16}
                  required
                />
              </Form.Group>
              {/*These are the radio buttons for displaying the input text or the button to upload the file*/}
              <Form.Group>
                <Form.Field>
                  <Checkbox radio checked={!this.state.localUpload} name="uploadRadio" value="remote" label="Upload using a URL" onChange={(e,data) => this.LocalOrURL(e,data)}/>
                </Form.Field>
                <Form.Field>
                  <Checkbox radio checked={this.state.localUpload} name="uploadRadio" value="local" label="Local Upload" onChange={(e,data) => this.LocalOrURL(e,data)}/>
                </Form.Field>
              </Form.Group>
              {!this.state.localUpload ? 
              <Form.Group>
                <Form.Input
                  placeholder="Copy and paste image url"
                  name='image'
                  value={this.state.image}
                  onChange={this.handleChange}
                  width={16}
                  required
                />
              </Form.Group>
              :
              <div>
                <input accept="image/x-png,image/gif,image/jpeg" ref={this.fileInput} style={{display: "none"}} id="upload" type="file" onChange={() => this.updatedFile()} required/>
                <Button icon="upload" content={this.state.uploadButtonText} secondary loading={this.state.isUploading} onClick={() => this.fileInput.current.click()} />               </div>
              }
              <Form.Group>
                <Form.Input
                  placeholder='Rating from 1 to 5'
                  name='avgRating'
                  value={this.state.avgRating}
                  onChange={this.handleChange}
                  width={16}
                  required
                  pattern="[1-5]*"
                />
              </Form.Group>
            </Form> 
            <br />
            <div style={style.button} >
              {!this.state.submitReady ? <Button color="red" onClick={this.getLatAndLng} content='Click To Confirm Address'/> : <Button color="green" onClick={this.addCourt} content='Click To Submit Court' secondary />}
            </div>
            {this.state.showConfirmMsg && <div style={style.message}>
              <Message positive>
                <Message.Header>Your court was successfully added</Message.Header>
                <p>Click the orange Find A Court Button above to view all nearby basketball courts</p>
              </Message>
            </div>}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container> 
    )
  }
}

export default AddCourt