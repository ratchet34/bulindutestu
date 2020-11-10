import React from 'react'
import { 
  Button,
  Form,
  Grid,
  Header,
  Input,
  Message,
  Modal,
  Popup,
  Segment,
  Statistic,
 } from 'semantic-ui-react'



class MyHome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      gameType: '',
      usernameError: false,
    };
  }

  startGame = () => {
    console.log('startGame');
    if (this.state.username && this.state.username !== '' && this.state.gameType && this.state.gameType !== '') {
      console.log('gotUsername');
      this.setState({ formError: false })
      fetch("http://localhost:3001/game", {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'origin': window.location.origin
        },
        body: JSON.stringify({
          host: this.state.username,
          gameType: this.state.gameType
        })
      }).then(res => res.json()).then(
        (result) => {
          if (result.body) {
            var game = JSON.parse(result.body);
            console.log(game);
            this.props.stateHandler.setUsername(this.state.username);
            this.props.stateHandler.setGameData(game);
          }
        },
        (error) => {
          console.error(error.message)
        }
      )
    } else {
      this.setState({ formError: true })
    }
  }

  redirectToApp = () => {

  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  closeOnDimmerClickHandle = (e) => {
    this.setState({ joinModal: false })
  }

  render() {
    return (
      <Segment>
        <Header as='h1' textAlign='center'>Welcome to my blind-testing app.</Header>
        <p>This app is made to let you be in charge of the game. Add your own music, your own clips, set your parameters and enjoy with your friends.<br/>
        Choose a game mode with the buttons below :</p>
        <Form size='massive' error={this.state.formError} style={{width: '100%'}}>
              <Form.Field inline>
                <Input fluid name='username' label='Username' value={this.state.username} onChange={this.handleChange}/>
              </Form.Field>
        <Segment basic textAlign='center' style={styles.noPaddingX}>
          <Button.Group vertical style={{width: '100%'}}>
            <Popup content='Play a solo game and score as much points as you can. Share your seed to challenge your friends on the same items.' position='top center' trigger={<Button toggle style={styles.homeButtons} active={this.state.gameType === 'solo'} size='massive' onClick={(e) => {this.setState({ gameType: 'solo' })}}>Solo</Button>}/>
            <Popup content='Play online with your friends in a private lobby. All player in the lobby will get the same song at the same time.' position='top center' trigger={<Button toggle style={styles.homeButtons} active={this.state.gameType === 'lobby'} size='massive' onClick={(e) => {this.setState({ gameType: 'lobby' })}}>Lobby</Button>}/>
            <Popup content='Play with your friends on the couch. Each player can use its cellphone as a buzzer.' position='top center' trigger={<Button toggle style={styles.homeButtons} active={this.state.gameType === 'couch'} size='massive' onClick={(e) => {this.setState({ gameType: 'couch' })}}>Couch</Button>}/>
            <Popup content='Input a seed to join an existing game.' position='top center' trigger={<Button style={styles.homeButtons} onClick={() => this.setState({ joinModal: true })} size='massive'>Join</Button>}/>
          </Button.Group>
        </Segment>
            <Form.Button fluid size='massive' style={styles.homeButtons} onClick={this.startGame}>Let's Go !</Form.Button>
              <Message
                error
                header='Invalid fields'
                content='Please enter a username and select a type of game.'
              />
        </Form>

        <Modal
          open={this.state.joinModal}
          closeOnDimmerClick={true}
          onClose={() => {this.setState({ joinModal: false })}}
        >
          <Modal.Header>Join a game</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>Join an ongoing game with your friends</Header>
              <p>
                Enter the id of the game and your username then press the join button
              </p>
              <Form>
                <Form.Input name='joinGameId' label='Game ID' value={this.state.joinGameId} onChange={this.handleChange}/>
                <Form.Input nmae='username' label='Username' value={this.state.username} onChange={this.handleChange}/>
              </Form>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={() => this.setState({ joinModal: false })}>
              Cancel
            </Button>
            <Button
              content="Join"
              labelPosition='right'
              icon='checkmark'
              onClick={() => this.setState({ joinModal: true })}
              positive
            />
          </Modal.Actions>
        </Modal>
      </Segment>
    )
  }
}

const styles={
  homeButtons: {
    fontSize: '3rem',
    lineHeight: '0'
  },
  noPaddingX: {
    paddingLeft: '0',
    paddingRight: '0'
  }
}
export default MyHome