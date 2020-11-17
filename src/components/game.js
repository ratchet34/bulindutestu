import React from 'react'
import YouTube from 'react-youtube'
import {
  Button,
  Loader,
  Modal,
  Segment,
  Header,
  Form,
  Progress,
  List,
  Popup,
} from 'semantic-ui-react'
import distance from 'jaro-winkler'
import { reduceField } from '../libs/functions'
import { vars } from '../libs/vars'



class MyGame extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      debug: true,
      visible: false,
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
      distance: {
        title: 0,
        artist: 0,
        origin: 0,
      },
      checked: false,
      modal: false,
      modalError: false,
      roundPoints: 0,
      answerTimer: 0,
      opts: {
        width: '100%',
      },
      seekDone: false,
    };
  }

  player = null;
  timerCheckGame = null;
  timerPlayGame = null;

  componentDidMount = () => {
    this.setPlayerStatus('game_loaded');
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

  setGameState = (state, callback) => {
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
        state: state
      })
    }).then(res => res.json()).then(
      (result) => {
        console.log(result);
        if (result.body) {
          var game = JSON.parse(result.body);
          this.props.stateHandler.setGameState(game.state);
          if (callback) callback();
        }
      },
      (error) => {
        console.error(error.message)
      }
    )
  }

  checkGame = () => {
    var timerCheckGame = setInterval(() => {
      console.log(this.props.game.state);
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
            if(game.state === '04_item_start') {
              clearInterval(timerCheckGame);
              
              //Play the game here
              this.setState({
                visible: false,
                timer: this.props.game.currentItem.time,
                answerTimer: this.props.game.currentItem.answerTime,
              }, () => this.startTimer());
              console.log('letsplay');
            }
          }
        )
      }
      
    }, 1000);
  }

  // Host method
  startItem = () => {
    this.setGameState('next');
  }

  startTimer = () => {
    console.log(this.state.opts);
    this.player.playVideo();
    this.setPlayerStatus('item_running');
    this.timerPlayGame = setInterval(() => {
      if (this.state.timer <= 0) {
        console.log('pause video');
        this.player.pauseVideo();
      }
      if (this.state.answerTimer <= 0) {
        this.checkValues();
        this.endRound();
      } else {
        this.setState({ timer: this.state.timer - 1, answerTimer: this.state.answerTimer - 1 })
      }
    }, 1000);
  }

  endRound = () => {
    console.log('endRound');
    this.player.pauseVideo();
    clearInterval(this.timerPlayGame);
    this.setState({ modal: true, visible: true, answerTimer: 0, timer: 0 });
    this.setPlayerStatus('item_done');
    this.checkGame();
  }

  getReadyForNext = () => {
    this.setState({ 
      visible: false,
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
      distance: {
        title: 0,
        artist: 0,
        origin: 0,
      },
      checked: false,
      modal: false,
      modalError: false,
      roundPoints: 0,
      answerTimer: 0,
      opts: {
        width: '100%',
      },
      seekDone: false,
    }, () => this.setPlayerStatus('player_ready'));
  }

  _onReady = (event) => {
    console.log('_onReady')
    // access to player in all event handlers via event.target
    this.player= event.target;
    this.setPlayerStatus('player_ready');
  }

  _onStateChange = (event) => {
    console.log('_onStateChange')
    console.log('Youtube player state: ' + event.data)
    switch (event.data) {
      case 1:
        if(!this.state.seekDone) this.setState({seekDone: true}, () => this.player.seekTo(this.props.game.currentItem.from, true))
        break;
      default:
        break;
    }

  }

  checkValues = () => {
    var tm = ("title" in this.props.game.currentItem === false || distance(reduceField(this.props.game.currentItem.title), reduceField(this.state.fields.title)) >= 0.99) ? true : false;
    var am = ("artist" in this.props.game.currentItem === false || distance(reduceField(this.props.game.currentItem.artist), reduceField(this.state.fields.artist)) >= 0.99) ? true : false;
    var om = ("origin" in this.props.game.currentItem === false || distance(reduceField(this.props.game.currentItem.origin), reduceField(this.state.fields.origin)) >= 0.99) ? true : false;
    var m = {artistMatch: am, titleMatch: tm, originMatch: om}
    var arrMatch = [{field: this.props.game.currentItem.artist, match: am}, {field: this.props.game.currentItem.title, match: tm}, {field: this.props.game.currentItem.origin, match: om}];

    var allDistance = {
      title: "title" in this.props.game.currentItem === true ? distance(reduceField(this.props.game.currentItem.title), reduceField(this.state.fields.title)):0,
      artist: "artist" in this.props.game.currentItem === true ? distance(reduceField(this.props.game.currentItem.artist), reduceField(this.state.fields.artist)):0,
      origin: "origin" in this.props.game.currentItem === true ? distance(reduceField(this.props.game.currentItem.origin), reduceField(this.state.fields.origin)):0,
    }

    this.setState({ roundPoints: arrMatch.map(x => (x.match && x.field != null)?1:0).reduce((a,b) => (a+b)), checked: true, match: m, distance: allDistance }, this.postCheck);
  }

  postCheck = () => {
    if (this.state.match.artistMatch && this.state.match.titleMatch && this.state.match.originMatch) {
      this.endRound();
    }
  }

  handleChange = (e) => {
    const value = e.target.value;
    var fields = this.state.fields;
    fields = { ...fields, [e.target.name]: value}
    this.setState({ fields: fields });
  }


  render() {
    return (
      <Segment>
        <Header as='h3'>Game</Header>
        <Segment basic>
          {this.state.debug && <Button secondary onClick={(e) => this.setState({ visible: !this.state.visible })}>Reveal</Button>}
          {this.props.game.players[this.props.username].status === 'item_done' && <Button secondary onClick={this.getReadyForNext}>Ready</Button>}
          {this.props.game.state === '03_all_youtube_ready' && this.props.username === this.props.game.host && <Button secondary onClick={this.startItem}>Start</Button>}
          {this.props.game.state === '06_next_item' && this.props.username === this.props.game.host && <Button secondary onClick={this.startItem}>Next</Button>}
          <Segment pAlign='center'>
            {this.props.game.currentItem && this.props.game.currentItem.id && <Progress progress='value' indicating value={this.state.answerTimer} total={this.props.game.currentItem.answerTime} />}
            <Segment basic style={{ display: this.state.visible ? 'block' : 'none' }}>
              <YouTube name='ytplayer' videoId={this.props.game.currentItem === null ? 'dummy' : this.props.game.currentItem.id} opts={this.state.opts} onReady={this._onReady} onStateChange={this._onStateChange} style={{position: 'absolute', top: '0', zIndex: '10'}}/>
            </Segment>
          </Segment>
          <Form>
            <Form.Group widths='equal'>
              {this.props.game.currentItem != null && this.props.game.currentItem.title != null &&
                <Popup
                  trigger={<Form.Input fluid name='title' label='Title' placeholder='Title' value={this.state.fields.title} onChange={this.handleChange} error={!this.state.match.titleMatch && this.state.checked} disabled={this.state.match.titleMatch && this.state.checked} />}
                  content={this.state.distance.title > 0.95 ?'You are close !':'Try again !'}
                  position='bottom left'
                  open={this.state.checked && this.state.distance.title < 0.99}
                />
              }
              {this.props.game.currentItem != null && this.props.game.currentItem.artist != null &&
                <Popup
                  trigger={<Form.Input fluid name='artist' label='Artist' placeholder='Artist' value={this.state.fields.artist} onChange={this.handleChange} error={!this.state.match.artistMatch && this.state.checked} disabled={this.state.match.artistMatch && this.state.checked} />}
                  content={this.state.distance.artist > 0.95 ?'You are close !':'Try again !'}
                  position='bottom left'
                  open={this.state.checked && this.state.distance.artist < 0.99}
                />
              }
              {this.props.game.currentItem != null && this.props.game.currentItem.origin != null &&
                <Popup
                  trigger={<Form.Input fluid name='origin' label='Origin' placeholder='Origin' value={this.state.fields.origin} onChange={this.handleChange} error={!this.state.match.originMatch && this.state.checked} disabled={this.state.match.originMatch && this.state.checked} />}
                  content={this.state.distance.origin > 0.95 ?'You are close !':'Try again !'}
                  position='bottom left'
                  open={this.state.checked && this.state.distance.origin < 0.99}
                />
              }
            </Form.Group>
            <Form.Button style={{marginTop: '3em'}} onClick={this.checkValues} disabled={this.state.answerTimer <= 0}>Check</Form.Button>
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
                {this.props.game.currentItem != null && this.props.game.currentItem.title != null && <List.Item>
                  <List.Icon style={styles.iconWidth} name='itunes note' size='large' verticalAlign='middle' />
                  <List.Content>
                    <List.Header>Title</List.Header>
                    <List.Description>{this.props.game.currentItem.title} <span style={styles.italic}>- Your last answer was : {this.state.fields.title}</span></List.Description>
                  </List.Content>
                  {this.state.match.titleMatch ?<List.Icon color='green' name='check' size='large' verticalAlign='middle' />:<List.Icon color='red' name='close' size='large' verticalAlign='middle' />}
                </List.Item>}
                {this.props.game.currentItem != null && this.props.game.currentItem.artist != null && <List.Item>
                  <List.Icon style={styles.iconWidth} name='male' size='large' verticalAlign='middle' />
                  <List.Content>
                    <List.Header>Artist</List.Header>
                    <List.Description>{this.props.game.currentItem.artist} <span style={styles.italic}>- Your last answer was : {this.state.fields.artist}</span></List.Description>
                  </List.Content>
                  {this.state.match.artistMatch ?<List.Icon color='green' name='check' size='large' verticalAlign='middle' />:<List.Icon color='red' name='close' size='large' verticalAlign='middle' />}
                </List.Item>}
                {this.props.game.currentItem != null && this.props.game.currentItem.origin != null && <List.Item>
                  <List.Icon style={styles.iconWidth} name='film' size='large' verticalAlign='middle' />
                  <List.Content>
                    <List.Header>Origin</List.Header>
                    <List.Description>{this.props.game.currentItem.origin} <span style={styles.italic}>- Your last answer was : {this.state.fields.origin}</span></List.Description>
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

export default MyGame