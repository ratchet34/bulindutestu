import React from 'react'
import YouTube from 'react-youtube'
import { 
  Header,
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
        <Header as='h1'>Welcome to my blind-esting app.</Header>
        <p>This app is made to let you be in charge of the game. Add your own music, your own clips, set your parameters and enjoy with your friends.</p>
        <Statistic>
          <Statistic.Value>{this.props.allData.allData.length}</Statistic.Value>
          <Statistic.Label>Items</Statistic.Label>
        </Statistic>
      </Segment>
    )
  }
}

export default MyHome