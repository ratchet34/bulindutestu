import React from 'react'
import YouTube from 'react-youtube'
import {
    Button,
    Container,
    Icon,
    Image,
    Label,
    Menu,
    Modal,
    Segment,
    Table,
} from 'semantic-ui-react'
import { vars } from '../libs/vars'
import { reduceField } from '../libs/functions'



class MyReported extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        items: [],
        page: 1,
        pageSize: 10
    };
  }

  componentDidMount = () => {
    this.getReportedItems();
  }

  getReportedItems = () => {
    fetch(vars.api+"admin/?a=reported", {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'origin': window.location.origin
        },
        body: JSON.stringify({
          username: this.props.username,
          password: this.props.password
        })
      }).then(res => res.json()).then(
        (result) => {
          if (result.body) {
            var res = JSON.parse(result.body);
            console.log(res);
            if (res) this.setState({ items: res.items })
          }
        },
        (error) => {
          console.error(error.message)
        }
      )
  }

  deleteRepored = (index) => {
    fetch(vars.api+"admin/"+this.state.items[index].id+"?a=delete", {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'origin': window.location.origin
      },
      body: JSON.stringify({
        username: this.props.username,
        password: this.props.password,
        itemIndex: index,
        itemType: this.state.items[index].itemType,
      })
    }).then(res => res.json()).then(
      (result) => {
        if (result.body) {
          var body = JSON.parse(result.body);
          this.setState({ items: body.items });
        }
      },
      (error) => {
        console.error(error.message)
      }
    )
  }

  keepReported = (index) => {
    fetch(vars.api+"admin/"+this.state.items[index].id+"?a=keep", {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'origin': window.location.origin
      },
      body: JSON.stringify({
        username: this.props.username,
        password: this.props.password,
        itemIndex: index,
        itemType: this.state.items[index].itemType,
      })
    }).then(res => res.json()).then(
      (result) => {
        if (result.body) {
          var body = JSON.parse(result.body);
          console.log(body.items);
          this.setState({ items: body.items });
        }
      },
      (error) => {
        console.error(error.message)
      }
    )
  }

  handleChange = (e) => {
    console.log(e.target.name);
    this.setState({ [e.target.name]: e.target.value });
  }

  filteredItems = (items) => {
    return items.filter(x => (x.title && reduceField(x.title).includes(reduceField(this.props.filter))) || (x.artist && reduceField(x.artist).includes(reduceField(this.props.filter))) || (x.origin && reduceField(x.origin).includes(reduceField(this.props.filter))))
  }

  clickPreview = (item) => {
    this.setState({ modalItem: item, previewModal: true });
  }

  render() {
    return (
      <Segment>
          <Table attached='bottom' celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Artist</Table.HeaderCell>
              <Table.HeaderCell>Origin</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.items && this.filteredItems(this.state.items).slice((this.state.page - 1)*this.state.pageSize,this.state.page*this.state.pageSize-1).map((x, index) => (
              <Table.Row key={x.id}>
                <Table.Cell><Image size='tiny' src={`https://img.youtube.com/vi/${x.id}/0.jpg`} onClick={() => this.clickPreview(x)}/></Table.Cell>
                <Table.Cell>{x.title?x.title:''}</Table.Cell>
                <Table.Cell>{x.artist?x.artist:''}</Table.Cell>
                <Table.Cell>{x.origin?x.origin:''}</Table.Cell>
                <Table.Cell textAlign='center'><Button positive onClick={() => this.keepReported(this.state.items.map(a => a.id).indexOf(x.id))}>Keep</Button><Button negative onClick={() => this.deleteRepored(this.state.items.map(a => a.id).indexOf(x.id))}>Delete</Button></Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='4'>
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
              <Table.HeaderCell colSpan='1' textAlign='center'>
                <Button primary onClick={this.setCustomItems}>
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
    <Modal.Header>Preview Item
      <Button negative floated='right' onClick={() => this.deleteRepored(this.state.modalItem.id)}>Delete</Button>
      <Button positive floated='right' onClick={() => this.keepReported(this.state.modalItem.id)}>Keep</Button>
    </Modal.Header>
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

export default MyReported