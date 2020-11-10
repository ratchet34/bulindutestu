import React from 'react'
import { 
  Button,
  Form,
  Grid,
  Header,
  Input,
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
    };
  }

  startGame = () => {
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
    }).then(res => res.json())
      .then(
        (result) => {
          if (result.body) {
            var game = JSON.parse(result.body);
            this.setState({ game: game });
          }
        },
        (error) => {
          console.error(error.message)
        }
      )
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <Segment>
        <Header as='h1' textAlign='center'>Welcome to my blind-esting app.</Header>
        <p>This app is made to let you be in charge of the game. Add your own music, your own clips, set your parameters and enjoy with your friends.<br/>
        Choose a game mode with the buttons below :</p>
        <Segment basic textAlign='center' style={styles.noPaddingX}>
          <Button.Group vertical style={{width: '100%'}}>
            <Popup content='Play a solo game and score as much points as you can. Share your seed to challenge your friends on the same items.' position='top center' trigger={<Button toggle style={styles.homeButtons} active={this.state.gameType === 'solo'} size='massive' onClick={(e) => {this.setState({ gameType: 'solo' })}}>Solo</Button>}/>
            <Popup content='Play online with your friends in a private lobby. All player in the lobby will get the same song at the same time.' position='top center' trigger={<Button toggle style={styles.homeButtons} active={this.state.gameType === 'lobby'} size='massive' onClick={(e) => {this.setState({ gameType: 'lobby' })}}>Lobby</Button>}/>
            <Popup content='Play with your friends on the couch. Each player can use its cellphone as a buzzer.' position='top center' trigger={<Button toggle style={styles.homeButtons} active={this.state.gameType === 'couch'} size='massive' onClick={(e) => {this.setState({ gameType: 'couch' })}}>Couch</Button>}/>
            <Popup content='Input a seed to join an existing game.' position='top center' trigger={<Button style={styles.homeButtons} size='massive'>Join</Button>}/>
          </Button.Group>
        </Segment>
        <Grid centered>
          <Form size='massive' style={{width: '100%'}}>
              <Form.Field inline>
                <Input fluid name='username' label='Username' value={this.state.username} onChange={this.handleChange}/>
              </Form.Field>
              <Form.Button fluid size='massive' style={styles.homeButtons} onClick={this.startGame}>Submit</Form.Button>
          </Form>
        </Grid>
        <Statistic>
          <Statistic.Value>{this.props.allData.allData.length}</Statistic.Value>
          <Statistic.Label>Items</Statistic.Label>
        </Statistic>
      </Segment>
    )
  }
}

const styles={
  homeButtons: {
    fontSize: '4rem',
    lineHeight: '0'
  },
  noPaddingX: {
    paddingLeft: '0',
    paddingRight: '0'
  }
}
export default MyHome