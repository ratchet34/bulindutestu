import React from 'react'
import { 
  Button,
  Header,
  Popup,
  Segment,
  Statistic,
 } from 'semantic-ui-react'



class MyHome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };

    console.log(this.props.allData)
  }

  render() {
    return (
      <Segment>
        <Header as='h1' textAlign='center'>Welcome to my blind-esting app.</Header>
        <p>This app is made to let you be in charge of the game. Add your own music, your own clips, set your parameters and enjoy with your friends.<br/>
        Choose a game mode with the buttons below :</p>
        <Segment basic textAlign='center'>
          <Button.Group vertical>
            <Popup content='Play a solo game and score as much points as you can. Share your seed to challenge your friends on the same items.' position='top center' trigger={<Button size='massive'>Solo</Button>}/>
            <Popup content='Play online with your friends in a private lobby. All player in the lobby will get the same song at the same time.' position='top center' trigger={<Button size='massive'>Lobby</Button>}/>
            <Popup content='Play with your friends on the couch. Each player can use its cellphone as a buzzer.' position='top center' trigger={<Button size='massive'>Couch</Button>}/>
            <Popup content='Input a seed to join an existing game.' position='top center' trigger={<Button size='massive'>Join</Button>}/>
          </Button.Group>
        </Segment>
        <Statistic>
          <Statistic.Value>{this.props.allData.allData.length}</Statistic.Value>
          <Statistic.Label>Items</Statistic.Label>
        </Statistic>
      </Segment>
    )
  }
}

export default MyHome