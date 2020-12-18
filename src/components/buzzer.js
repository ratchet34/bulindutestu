import React from 'react'
import { 
  Button,
  Header,
  Icon,
  Modal,
  Segment,
 } from 'semantic-ui-react'
import { vars } from '../libs/vars'



class MyBuzzer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        enabled: false,
        host: false,
        modalLogin: false
    };
  }

  componentDidMount = () => {
    this.checkGame();
  }

  setPlayerStatus = (status) => {
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
        username: this.props.username,
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

  checkGame = () => {
    this.setPlayerStatus('player_ready');
    this.setState({timerCheckGame: 0}, () => {
      var timerCheckGame = setInterval(() => {
        console.log(this.props.game.state);
        this.setState({timerCheckGame: this.state.timerCheckGame + 1});
        if(this.props.game.id) {
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
              var game = JSON.parse(result.body);
              console.log(game);
              if (game) {
                this.props.stateHandler.setGameData(game);
              }
              if(game.state === '04_item_running') {
                this.setState({enabled: true});
              } else if(game.state === '99_buzzing') {
                this.setState({enabled: false});
              }
            }
          )
        }
        if(this.state.checkGameCounter >= 120) {
          clearInterval(timerCheckGame);
        }
      }, 1000);
    })
  }

  render() {
    return (
      <Segment textAlign='center'>
        <Button>I am the host</Button>
        {!this.state.host && <Button style={{fontSize: '10em'}} circular icon disabled={!this.state.enabled}><Icon name='bell' /></Button>}

        <Modal
          onClose={() => this.setState({modalLogin: false})}
          onOpen={() => this.setState({modalLogin: true})}
          open={this.state.modalLogin}
        >
          <Modal.Header>Login as game host</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>To check the answers live</Header>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              content="Close"
              labelPosition='right'
              icon='close'
              onClick={() => this.setState({modalLogin: false})}
              negative
            />
            <Button
              content="Correct !"
              labelPosition='right'
              onClick={this.checkLogin}
              positive
            />
          </Modal.Actions>
        </Modal>
      </Segment>
    )
  }
}

export default MyBuzzer