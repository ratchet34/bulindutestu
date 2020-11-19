import React from 'react'
import YouTube from 'react-youtube';
import { 
  Button,
  Checkbox,
  Icon,
  Input,
  Image,
  Label,
  Menu,
  Modal,
  Segment,
  Table,
  Container,
 } from 'semantic-ui-react'
 import { vars } from '../libs/vars'
 import { reduceField } from '../libs/functions'


class MySettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        menu: 'audio',
        filter: '',
        page: 1,
        pageSize: 10,
        opts: {
          playerVars: {
            start: 0,
            end: 30,
          }
        },
    };
  }

  ytbPlayer = null;

  componentDidMount() {
    this.getItemsByType(this.state.menu);
  }

  clickPreview = (item) => {
    this.setState({ modalItem: item, previewModal: true });
  }

  handleCheckbox = (index) => {
    var items = this.state.items;
    items[index].active = !items[index].active;
    this.setState({items: items});
  }

  _onReady = (event) => {
    console.log(this.state.modalItem);
    this.ytbPlayer = event.target;
    this.setState({
      opts: {
        playerVars: {
          start: this.state.modalItem.from,
          end: this.state.modalItem.from + this.state.modalItem.time,
        }
      }
    });
  }

  handleChange = (e) => {
    console.log(e.target.name);
    this.setState({ [e.target.name]: e.target.value });
  }

  getItemsByType = (itemType) => {
    fetch(vars.api+"item/?itemType="+itemType, {
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
        var items = JSON.parse(result.body);
        if (items) {
          this.setState({ items: items.map(x => {x.active = true; return x}) });
        }
      }
    )
  }

  setCustomItems = () => {
    var customItems = [];
    this.state.items.forEach(i => {
      if (i.active) {
        customItems.push(i);
      }
    });
    if(customItems.length < this.state.items.length) {
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
          customItems: customItems,
          itemType: this.state.menu
        })
      }).then(res => res.json()).then(
        (result) => {
          if (result.body) {
            var ci = JSON.parse(result.body);
            console.log(ci);
          }
        },
        (error) => {
          console.error(error.message)
        }
      )
    }
  }

  filteredItems = (items) => {
    return items.filter(x => (x.title && reduceField(x.title).includes(reduceField(this.state.filter))) || (x.artist && reduceField(x.artist).includes(reduceField(this.state.filter))) || (x.origin && reduceField(x.origin).includes(reduceField(this.state.filter))))
  }

  render() {
    return (
      <Segment textAlign='center'>
        <Menu attached='top' tabular>
          <Menu.Item
            name='audio'
            active={this.state.menu === 'audio'}
            onClick={() => this.setState({menu:'audio'}, this.getItemsByType('audio'))}
          />
          <Menu.Item
            name='video'
            active={this.state.menu === 'video'}
            onClick={() => this.setState({menu:'video'}, this.getItemsByType('video'))}
          />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input
                transparent
                name='filter'
                icon={{ name: 'search', link: true }}
                placeholder='Search items...'
                value={this.state.filter}
                onChange={this.handleChange}
              />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Table attached='bottom' celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell />
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Artist</Table.HeaderCell>
              <Table.HeaderCell>Origin</Table.HeaderCell>
              <Table.HeaderCell>From</Table.HeaderCell>
              <Table.HeaderCell>Time</Table.HeaderCell>
              <Table.HeaderCell>Answer Time</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.items && this.filteredItems(this.state.items).slice((this.state.page - 1)*this.state.pageSize,this.state.page*this.state.pageSize-1).map((x, index) => (
              <Table.Row key={x.id}>
                <Table.Cell collapsing>
                  <Checkbox slider checked={this.state.items[this.state.items.map(a => a.id).indexOf(x.id)].active} onChange={() => this.handleCheckbox(this.state.items.map(a => a.id).indexOf(x.id))} />
                </Table.Cell>
                <Table.Cell><Image size='tiny' src={`https://img.youtube.com/vi/${x.id}/0.jpg`} onClick={() => this.clickPreview(x)}/></Table.Cell>
                <Table.Cell>{x.title?x.title:''}</Table.Cell>
                <Table.Cell>{x.artist?x.artist:''}</Table.Cell>
                <Table.Cell>{x.origin?x.origin:''}</Table.Cell>
                <Table.Cell>{x.from?x.from:0}</Table.Cell>
                <Table.Cell>{x.time?x.time:0}</Table.Cell>
                <Table.Cell>{x.answerTime?x.answerTime:0}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='7'>
                <Menu floated='right' pagination>
                  <Menu.Item icon onClick={() => {if(this.state.page > 1) this.setState({page: this.state.page-1})}} key='down'>
                    <Icon name='chevron left' />
                  </Menu.Item>
                  {this.state.items && new Array(Math.floor(this.filteredItems(this.state.items).length/this.state.pageSize)+1).fill(0).map((x, index) => <Menu.Item active={this.state.page === index+1} onClick={() => this.setState({page: index+1})} key={index+1}>{index+1}</Menu.Item>)}
                  <Menu.Item icon onClick={() => {
                    if(this.state.page < 1 + new Array(Math.floor(this.filteredItems(this.state.items).length/this.state.pageSize)).fill(0).length) {
                      this.setState({page: this.state.page+1})
                    }
                  }} key='up'>
                    <Icon name='chevron right' />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
              <Table.HeaderCell colSpan='1'>
                <Button fluid primary onClick={this.setCustomItems}>
                  Apply
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>

        <Modal
          onClose={() => this.setState({previewModal:false})}
          open={this.state.previewModal}
        >
      <Modal.Header>Preview Item</Modal.Header>
      {this.state.modalItem && <Modal.Content>
        <Modal.Description>
          <Container textAlign='center'>
            {this.state.modalItem.title && <Label color='blue'>
              Title
              <Label.Detail>{this.state.modalItem.title}</Label.Detail>
            </Label>}
            {this.state.modalItem.artist && <Label color='green'>
              Artist
              <Label.Detail>{this.state.modalItem.artist}</Label.Detail>
            </Label>}
            {this.state.modalItem.origin && <Label color='red'>
              Origin
              <Label.Detail>{this.state.modalItem.origin}</Label.Detail>
            </Label>}
            <br/><br/>
            <YouTube name='ytplayer_settings' videoId={this.state.modalItem.id} onReady={this._onReady} opts={this.state.opts} />
          </Container>
        </Modal.Description>
      </Modal.Content>}
    </Modal>

      </Segment>
    )
  }
}

export default MySettings