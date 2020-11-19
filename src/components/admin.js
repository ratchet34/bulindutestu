import React from 'react'
import { 
  Button,
  Form,
  Input,
  Menu,
  Segment,
 } from 'semantic-ui-react'
import MyReported from './reported'
import { vars } from '../libs/vars'



class MyAdmin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        logged: false,
        menu: 'reported',
        username: '',
        password: '',
    };
  }

  login = () => {
    fetch(vars.api+"admin/?a=login", {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'origin': window.location.origin
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then(res => res.json()).then(
      (result) => {
        if (result.body) {
          var res = JSON.parse(result.body);
          if (res) this.setState({ logged: true })
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

  render() {
    return (
      <Segment textAlign='center'>
        {this.state.logged === false && <Form>
            <Form.Input name='username' value={this.state.username} placeholder='Login' label='Login' onChange={this.handleChange}/>
            <Form.Input name='password' value={this.state.password} placeholder='Password' label='Password' type='password' onChange={this.handleChange}/>
            <Form.Button onClick={this.login}>Submit</Form.Button>
          </Form>}
        {this.state.logged && 
          <Segment basic>
            <Menu attached='top' tabular>
              <Menu.Item
                name='Reported'
                active={this.state.menu}
                onClick={() => this.setState({menu: 'reported'})}
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
            {this.state.menu === 'reported' && <MyReported/>}
          </Segment>
        }
        
      </Segment>
    )
  }
}

export default MyAdmin