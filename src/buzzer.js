import React from 'react'
import { 
  Button,
  Icon,
  Segment,
 } from 'semantic-ui-react'



class MyBuzzer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        enabled: false
    };

    console.log(this.props.allData)
  }

  render() {
    return (
      <Segment textAlign='center'>
        <Button style={{fontSize: '10em'}} circular icon disabled={!this.state.enabled}><Icon name='bell' /></Button>
      </Segment>
    )
  }
}

export default MyBuzzer