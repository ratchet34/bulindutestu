import React from 'react'
import YouTube from 'react-youtube'
import {
  Button,
  Loader,
  Modal,
  Segment,
  Header,
  Container,
  Form,
  Progress
} from 'semantic-ui-react'



class MyAudio extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      data: null,
      timer: 0,
      answerTimer: 0,
      fields: {
        title: '',
        titleMatch: false,
        artist: '',
        artistMatch: false,
        origin: '',
        originMatch: '',
      },
      checked: false,
      start: false,
      ytplayer: null,
      loading: false,
      modal: false,
      modalError: false,
    };
  }

  opts = {
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  player = null;

  _onReady = (event) => {
    console.log('_onReady')
    // access to player in all event handlers via event.target
    this.setState({ ytplayer: event.target });
    event.target.seekTo(this.state.data.from, true)
    event.target.playVideo();
  }

  _onStateChange = (event) => {
    console.log('_onStateChange')
    console.log('Youtube player state: ' + event.data)
    switch (event.data) {
      case 1:
        this.startRound();
        break;
      case 3:
        event.target.seekTo(this.state.data.from, true)
        event.target.playVideo();
        break;
      case 5:
        event.target.seekTo(this.state.data.from, true)
        event.target.playVideo();
        break;
    }

  }

  selectData = () => {
    console.log('selectData')
    console.log(this.props.allData.allData)
    var currData = null;
    var allData = this.props.allData.allData;
    var notdone = allData.map(x => x.done).indexOf(false);
    if (notdone !== -1) {
      while (currData === null || currData.done === true) {
        currData = allData[Math.floor(Math.random() * allData.length)];
      }
      this.setState({ data: currData, timer: currData.time, answerTimer: currData.answerTime, loading: true, start: false });
      this.props.allData.allData[this.props.allData.allData.indexOf(currData)].done = true;
    } else {
      this.setState({ modalError: true})
    }
  }

  prepareNextRound = () => {
    console.log('prepareNextRound')
    /*if (this.state.ytplayer != null) {
      this.state.ytplayer.pauseVideo();
    }*/
    this.selectData();
    /*if (this.state.ytplayer != null) {
      this.state.ytplayer.playVideo();
    }*/
    this.setState({ visible: false, fields: { title: '', titleMatch: false, artist: '', artistMatch: false }, checked: false })
  }

  startRound = () => {
    console.log('startRound')
    this.setState({ start: true, loading: false });
    var countdown = setInterval(() => {
      if (this.state.timer <= 0) {
        this.state.ytplayer.pauseVideo();
      }
      if (this.state.answerTimer <= 0) {
        clearInterval(countdown)
        this.endRound()
      } else if (this.state.start === false) {
        clearInterval(countdown)
      } else {
        this.setState({ timer: this.state.timer - 1, answerTimer: this.state.answerTimer - 1 })
      }
    }, 1000)
  }

  endRound = () => {
    this.setState({ start: false, visible: true });
  }

  checkValues = () => {
    console.log(this.state.fields)
    var am = ("artist" in this.state.data === false || this.state.fields.artist.toLowerCase() === this.state.data.artist.toLowerCase()) ? true : false;
    var tm = ("title" in this.state.data === false || this.state.fields.title.toLowerCase() === this.state.data.title.toLowerCase()) ? true : false;
    var om = ("origin" in this.state.data === false || this.state.fields.origin.toLowerCase() === this.state.data.origin.toLowerCase()) ? true : false;
    var f = {artist: this.state.fields.artist, artistMatch: am, title: this.state.fields.title, titleMatch: tm, origin: this.state.fields.origin, originMatch: om}
    this.setState({ checked: true, fields: f }, this.postCheck);
  }

  postCheck = () => {
    if (this.state.fields.artistMatch && this.state.fields.titleMatch && this.state.fields.originMatch) {
      this.setState({modal: true})
    }
  }

  handleChange = (e) => {
    console.log('handleChange')
    const value = e.target.value;
    var fields = this.state.fields;
    fields = { ...fields, [e.target.name]: value}
    console.log(fields)
    this.setState({ fields: fields });
  }

  render() {
    return (
      <Segment>
        <Header as='h3'>Audio</Header>
        <Segment basic>
          <Button secondary onClick={(e) => this.setState({ visible: !this.state.visible })}>Reveal</Button>
          {this.state.data === null && <Button secondary onClick={this.prepareNextRound} disabled={this.state.loading}>Start</Button>}
          {this.state.data !== null && <Button secondary onClick={this.prepareNextRound} disabled={this.state.loading}>Next</Button>}
          <Segment textAlign='center'>
            {this.state.data != null && <Progress progress='value' indicating value={this.state.answerTimer} total={this.state.data.answerTime} />}
            {this.state.loading && <Loader active />}
            <Segment basic style={{ display: this.state.visible ? 'block' : 'none' }}>
              {this.state.data != null && <YouTube name='ytplayer' videoId={this.state.data === null ? 'dummy' : this.state.data.id} opts={this.opts} onReady={this._onReady} onStateChange={this._onStateChange} />}
            </Segment>
          </Segment>
          <Form>
            <Form.Group widths='equal'>
              {this.state.data != null && this.state.data.title != null &&
                <Form.Input fluid name='title' label='Title' placeholder='Title' value={this.state.fields.title} onChange={this.handleChange} error={!this.state.fields.titleMatch && this.state.checked} disabled={this.state.fields.titleMatch && this.state.checked} />}
              {this.state.data != null && this.state.data.artist != null &&
                <Form.Input fluid name='artist' label='Artist' placeholder='Artist' value={this.state.fields.artist} onChange={this.handleChange} error={!this.state.fields.artistMatch && this.state.checked} disabled={this.state.fields.artistMatch && this.state.checked} />}
              {this.state.data != null && this.state.data.origin != null &&
                <Form.Input fluid name='origin' label='Origin' placeholder='Origin' value={this.state.fields.origin} onChange={this.handleChange} error={!this.state.fields.originMatch && this.state.checked} disabled={this.state.fields.originMatch && this.state.checked} />}
            </Form.Group>
            <Form.Button onClick={this.checkValues} disabled={!this.state.start}>Check</Form.Button>
          </Form>
        </Segment>

        <Modal
          onClose={() => this.setState({modal: false})}
          onOpen={() => this.setState({modal: true})}
          open={this.state.modal}
        >
          <Modal.Header>Congratulations</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>You have successfully found all the fields for this question !</Header>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              content="Got it !"
              labelPosition='right'
              icon='checkmark'
              onClick={() => this.setState({modal: false})}
              positive
            />
          </Modal.Actions>
        </Modal>

        <Modal
          onClose={() => this.setState({modalError: false})}
          onOpen={() => this.setState({modalError: true})}
          open={this.state.modalError}
        >
          <Modal.Header>That's all folks</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>Sorry but you have done all the items of this category, try addind some more to keep playing</Header>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              content="Okay"
              labelPosition='right'
              icon='close'
              onClick={() => this.setState({modalError: false})}
              negative
            />
          </Modal.Actions>
        </Modal>
      </Segment>
    )
  }
}

export default MyAudio