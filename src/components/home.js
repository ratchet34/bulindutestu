import React from 'react'
import { 
  Button,
  Form,
  Header,
  Icon,
  Input,
  Label,
  List,
  Message,
  Modal,
  Popup,
  Segment,
 } from 'semantic-ui-react'
 import _ from 'underscore'
 import { vars } from '../libs/vars'

class MyHome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username?this.props.username:'',
      gameType: '',
      usernameError: false,
      joinGameId: '',
      joinModal: false,
      waitModal: (this.props.game?true:false),
    };
  }

  startGame = () => {
    console.log(vars);
    if ( this.state.username && this.state.username !== '' && this.state.gameType && this.state.gameType !== '' ) {
      console.log('gotUsername');
      this.setState({ formError: false })
      fetch(vars.api+"game", {
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
            this.setState({ waitModal: true });
            this.checkGame();
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

  joinGame = () => {
    console.log('joinGame');
    if ( this.state.username && this.state.username !== '' && this.state.joinGameId && this.state.joinGameId !== '' ) {
      console.log('sending patch');
      this.setState({ formError: false });
      fetch(vars.api+"game", {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'origin': window.location.origin
        },
        body: JSON.stringify({
          gameId: this.state.joinGameId,
          username: this.state.username
        })
      }).then(res => res.json()).then(
        (result) => {
          if (result.body) {
            var game = JSON.parse(result.body);
            console.log(game);
            this.props.stateHandler.setUsername(this.state.username);
            this.props.stateHandler.setGameData(game);
            this.setState({ waitModal: true });
            this.checkGame();
          }
        },
        (error) => {
          console.error(error.message)
        }
      )
    } else {
      this.setState({ formError: true });
    }
  }

  setPlayerStatus = (status) => {
    if ( this.state.username && this.state.username !== '' && this.props.game.id ) {
      fetch(vars.api+"game", {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'origin': window.location.origin
        },
        body: JSON.stringify({
          gameId: this.props.game.id,
          username: this.state.username,
          status: status
        })
      }).then(res => res.json()).then(
        (result) => {
          console.log(result);
          var game = JSON.parse(result.body);
          if (game.players) {
            this.props.stateHandler.setPlayers(game.players);
          }
        }
      )
    }
  }

  removePlayer = (username) => {
    if (this.props.game.id) {
      fetch(vars.api+"game", {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'origin': window.location.origin
        },
        body: JSON.stringify({
          gameId: this.props.game.id,
          username: username,
          remove: true
        })
      }).then(res => res.json()).then(
        (result) => {
          console.log(result);
          var game = JSON.parse(result.body);
          if (game.players) {
            this.props.stateHandler.setPlayers(game.players);
          }
        }
      )
    }
  }

  checkGame = () => {
    this.timerCheckGame = setInterval(() => {
      if(this.props.game.state === 'init' && this.props.game.id) {
        fetch(vars.api+"game/"+this.props.game.id, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'origin': window.location.origin
          }
        }).then(res => res.json()).then(
          (result) => {
            console.log(result);
            var game = JSON.parse(result.body);
            if (game) {
              this.props.stateHandler.setGameData(game);
            }
          }
        )
      } else {
        clearInterval()
      }
    }, 1000);
  }

  goToSettings = () => {
    this.setState({waitModal: false});
    this.props.stateHandler.setMenu('settings');
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
              <Form error={this.state.formError}>
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
              onClick={this.joinGame}
              positive
            />
          </Modal.Actions>
        </Modal>

        <Modal
          open={this.state.waitModal}
          closeOnDimmerClick={false}
          onClose={() => {this.setState({ waitModal: false })}}
        >
          <Modal.Header>Waiting for players</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header><Icon loading name='spinner' /> Waiting for other players to join the game</Header>
              <Label as='a' color='teal' image>
                <Icon name='id card outline' />
                Game ID
                {this.props.game && <Label.Detail onClick={() => {navigator.clipboard.writeText(this.props.game.id)}}>{this.props.game.id} (click to copy)</Label.Detail>}
              </Label>
              {this.props.game ? <List>
              {Object.entries(this.props.game.players).map(x => <List.Item key={x[0]}><List.Icon name={x[0] === this.props.game.host ?'user secret':'user'}/><List.Content>{x[0]} {x[1].status === 'ready' && <Icon color='green' name='check' />} {this.props.game.host === this.state.username && x[0] !== this.props.game.host && <Icon name='close' as='a' onClick={() => this.removePlayer(x[0])}/>}</List.Content></List.Item>)}
              </List>:<p><Icon loading name='spinner' /> Waiting for game data.</p>}
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            {this.props.game &&
              (this.props.game.host === this.state.username ?
                <div>
                  <Button primary onClick={this.goToSettings}>Settings</Button>
                  <Button color='red'>Cancel</Button>
                  <Button
                    content="Launch"
                    positive
                    disabled={_.countBy(Object.entries(this.props.game.players).map(x => x[1].status), (i) => i).ready !== Object.entries(this.props.game.players).length}/>
                </div>:
                <div>
                  <Button color='red' onClick={() => this.removePlayer(this.state.username)}>Leave</Button>
                  {this.props.game.players[this.state.username].status !== 'ready' ?
                    <Button
                      content="Ready"
                      labelPosition='right'
                      icon='checkmark'
                      onClick={() => this.setPlayerStatus('ready')}
                      positive
                    />:
                    <Button
                      color='yellow'
                      content='Hold on'
                      labelPosition='right'
                      icon='close'
                      onClick={() => this.setPlayerStatus('hold')}
                    />
                  }
                </div>)}
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