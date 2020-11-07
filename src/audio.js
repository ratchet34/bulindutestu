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
  Progress,
  List,
  Popup,
} from 'semantic-ui-react'
import levenshtein from 'js-levenshtein'
import distance from 'jaro-winkler'



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
        artist: '',
        origin: '',
      },
      match: {
        titleMatch: false,
        artistMatch: false,
        originMatch: false,
      },
      popup: {
        title: false,
        artist: false,
        origin: false,
      },
      checked: false,
      start: false,
      ytplayer: null,
      loading: false,
      modal: false,
      modalError: false,
      points: 0,
      roundPoints: 0,
    };
  }

  opts = {
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      controls: 0,
      showinfo: 0,
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
    this.setState({ visible: false, match: { title: '', titleMatch: false, artist: '', artistMatch: false }, checked: false })
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
    if (!(this.state.match.artistMatch && this.state.match.titleMatch && this.state.match.originMatch)){
      this.setState({modal: true})
    }
  }

  checkValues = () => {
    console.log(this.state.fields)
    if(this.state.data.title != null && this.state.fields.title != null) {
      console.log('jaro-winkler title: ' + distance(this.reduceField(this.state.data.title), this.reduceField(this.state.fields.title)))
      console.log('levenshtein title: ' + levenshtein(this.reduceField(this.state.data.title), this.reduceField(this.state.fields.title)))
    }
    if(this.state.data.artist != null && this.state.fields.artist != null) {
      console.log('jaro-winkler artist: ' + distance(this.reduceField(this.state.data.artist), this.reduceField(this.state.fields.artist)))
      console.log('levenshtein artist: ' + levenshtein(this.reduceField(this.state.data.artist), this.reduceField(this.state.fields.artist)))
    }
    if(this.state.data.origin != null && this.state.fields.origin != null) {
      console.log('jaro-winkler origin: ' + distance(this.reduceField(this.state.data.origin), this.reduceField(this.state.fields.origin)))
      console.log('levenshtein origin: ' + levenshtein(this.reduceField(this.state.data.origin), this.reduceField(this.state.fields.origin)))
    }

    var tm = ("title" in this.state.data === false || distance(this.reduceField(this.state.data.title), this.reduceField(this.state.fields.title)) >= 0.99) ? true : false;
    var am = ("artist" in this.state.data === false || distance(this.reduceField(this.state.data.artist), this.reduceField(this.state.fields.artist)) >= 0.99) ? true : false;
    var om = ("origin" in this.state.data === false || distance(this.reduceField(this.state.data.origin), this.reduceField(this.state.fields.origin)) >= 0.99) ? true : false;
    var m = {artistMatch: am, titleMatch: tm, originMatch: om}
    var arrMatch = [{field: this.state.data.artist, match: am}, {field: this.state.data.title, match: tm}, {field: this.state.data.origin, match: om}];

    var popups = {
      title: "title" in this.state.data === true && distance(this.reduceField(this.state.data.title), this.reduceField(this.state.fields.title)) >= 0.95 && distance(this.reduceField(this.state.data.title), this.reduceField(this.state.fields.title)) < 0.99,
      artist: "artist" in this.state.data === true && distance(this.reduceField(this.state.data.artist), this.reduceField(this.state.fields.artist)) >= 0.95 && distance(this.reduceField(this.state.data.artist), this.reduceField(this.state.fields.artist)) < 0.99,
      origin: "origin" in this.state.data === true && distance(this.reduceField(this.state.data.origin), this.reduceField(this.state.fields.origin)) >= 0.95 && distance(this.reduceField(this.state.data.origin), this.reduceField(this.state.fields.origin)) < 0.99,
    }

    this.setState({ roundPoints: arrMatch.map(x => (x.match && x.field != null)?1:0).reduce((a,b) => (a+b)), checked: true, match: m, popup: popups }, this.postCheck);
  }

  postCheck = () => {
    if (this.state.match.artistMatch && this.state.match.titleMatch && this.state.match.originMatch) {
      this.setState({modal: true, visible: true})
    }
  }

  reduceField = (field) => {
    return (field === null || field === undefined ? null:field.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
  }

  handleChange = (e) => {
    console.log('handleChange')
    const value = e.target.value;
    var fields = this.state.fields;
    fields = { ...fields, [e.target.name]: value}
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
          <Segment pAlign='center'>
            {this.state.data != null && <Progress progress='value' indicating value={this.state.answerTimer} total={this.state.data.answerTime} />}
            {this.state.loading && <Loader active />}
            <Segment basic style={{ display: this.state.visible ? 'block' : 'none' }}>
              {this.state.data != null && <YouTube name='ytplayer' videoId={this.state.data === null ? 'dummy' : this.state.data.id} opts={this.opts} onReady={this._onReady} onStateChange={this._onStateChange} style={{position: 'absolute', top: '0', zIndex: '10'}}/>}
            </Segment>
          </Segment>
          <Form>
            <Form.Group widths='equal'>
              {this.state.data != null && this.state.data.title != null &&
                <Popup
                  trigger={<Form.Input fluid name='title' label='Title' placeholder='Title' value={this.state.fields.title} onChange={this.handleChange} error={!this.state.match.titleMatch && this.state.checked} disabled={this.state.match.titleMatch && this.state.checked} />}
                  content='You are close !'
                  position='bottom left'
                  open={this.state.popup.title}
                  on='click'
                  onClose={this.handlePopupClose}
                />
              }
              {this.state.data != null && this.state.data.artist != null &&
                <Popup
                  trigger={<Form.Input fluid name='artist' label='Artist' placeholder='Artist' value={this.state.fields.artist} onChange={this.handleChange} error={!this.state.match.artistMatch && this.state.checked} disabled={this.state.match.artistMatch && this.state.checked} />}
                  content='You are close !'
                  position='bottom left'
                  open={this.state.popup.artist}
                />
              }
              {this.state.data != null && this.state.data.origin != null &&
                <Popup
                  trigger={<Form.Input fluid name='origin' label='Origin' placeholder='Origin' value={this.state.fields.origin} onChange={this.handleChange} error={!this.state.match.originMatch && this.state.checked} disabled={this.state.match.originMatch && this.state.checked} />}
                  content='You are close !'
                  position='bottom left'
                  open={this.state.popup.origin}
                />
              }
            </Form.Group>
            <Form.Button style={{marginTop: '3em'}} onClick={this.checkValues} disabled={!this.state.start}>Check</Form.Button>
          </Form>
        </Segment>

        <Modal
          onClose={() => this.setState({modal: false})}
          onOpen={() => this.setState({modal: true})}
          open={this.state.modal}
        >
          <Modal.Header>{this.state.match.artistMatch && this.state.match.titleMatch && this.state.match.originMatch ? 'Congratulations':'Time is up !'}</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>{this.state.match.artistMatch && this.state.match.titleMatch && this.state.match.originMatch ? 'You have successfully found all the fields for this question !':'Sorry but you have done all the items of this category, try addind some more to keep playing'}</Header>
              <p>
                Here are the expected answers for this item :
              </p>
              <List divided relaxed>
                {this.state.data != null && this.state.data.title != null && <List.Item>
                  <List.Icon style={styles.iconWidth} name='itunes note' size='large' verticalAlign='middle' />
                  <List.Content>
                    <List.Header>Title</List.Header>
                    <List.Description>{this.state.data.title} <span style={styles.italic}>- Your last answer was : {this.state.fields.title}</span></List.Description>
                  </List.Content>
                  {this.state.match.titleMatch ?<List.Icon color='green' name='check' size='large' verticalAlign='middle' />:<List.Icon color='red' name='close' size='large' verticalAlign='middle' />}
                </List.Item>}
                {this.state.data != null && this.state.data.artist != null && <List.Item>
                  <List.Icon style={styles.iconWidth} name='male' size='large' verticalAlign='middle' />
                  <List.Content>
                    <List.Header>Artist</List.Header>
                    <List.Description>{this.state.data.artist} <span style={styles.italic}>- Your last answer was : {this.state.fields.artist}</span></List.Description>
                  </List.Content>
                  {this.state.match.artistMatch ?<List.Icon color='green' name='check' size='large' verticalAlign='middle' />:<List.Icon color='red' name='close' size='large' verticalAlign='middle' />}
                </List.Item>}
                {this.state.data != null && this.state.data.origin != null && <List.Item>
                  <List.Icon style={styles.iconWidth} name='film' size='large' verticalAlign='middle' />
                  <List.Content>
                    <List.Header>Origin</List.Header>
                    <List.Description>{this.state.data.origin} <span style={styles.italic}>- Your last answer was : {this.state.fields.origin}</span></List.Description>
                  </List.Content>
                  {this.state.match.originMatch ?<List.Icon color='green' name='check' size='large' verticalAlign='middle' />:<List.Icon color='red' name='close' size='large' verticalAlign='middle' />}
                </List.Item>}
              </List>
              {this.state.roundPoints > 0 && <p>
                Your answers on this round granted you {this.state.roundPoints} {this.state.roundPoints > 1 ? 'points':'point'}.
              </p>}
              {this.state.roundPoints === 0 && <p>
                Your answers on this round did not grant you any points.
              </p>}
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              content="Got it !"
              labelPosition='right'
              icon={this.state.match.artistMatch && this.state.match.titleMatch && this.state.match.originMatch ? 'checkmark':'close'}
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

const styles = {
  italic: {
    fontStyle: 'italic',
  },
  iconWidth: {
    width: '10%',
    textAlign: 'center',
  }
}

export default MyAudio