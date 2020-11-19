import React from 'react'
import {
    Button,
    Checkbox,
    Icon,
    Image,
    Menu,
    Table,
} from 'semantic-ui-react'
import { vars } from '../libs/vars'



class MyReported extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        menu: 'reported',
        filter: '',
        items: [],
    };
  }

  componentDidMount = () => {
      this.getReportedItems();
  }

  getReportedItems = () => {
    fetch(vars.api+"admin/?a=reported", {
        method: 'GET',
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
            if (res) this.setState({ items: res.items })
          }
        },
        (error) => {
          console.error(error.message)
        }
      )
  }

  deleteRepored = (index) => {

  }

  keepReported = (index) => {

  }

  handleChange = (e) => {
    console.log(e.target.name);
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
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
                <Table.Cell><Button onClick={() => this.deleteRepored(this.state.items.map(a => a.id).indexOf(x.id))}>Delete</Button><Button onClick={() => this.keepReported(this.state.items.map(a => a.id).indexOf(x.id))}>Keep</Button></Table.Cell>
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
    )
  }
}

export default MyReported