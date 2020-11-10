import React from 'react'
import {
    Button,
    Container,
    Form,
    Header,
    Icon,
    Input,
    Menu,
    Popup,
    Segment,
    Sidebar,
} from 'semantic-ui-react'
import MyHome from './home'
import MyVideo from './video'
import MyAudio from './audio'
import MyItems from './addItem'
import MyBuzzer from './buzzer'

class MySidebar extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        visible: false,
        menu: 'home',
        gamePopup: false,
      };
    }

    handleOpen = () => {
        this.setState({ gamePopup: !this.state.gamePopup });
    }

    setUsername = (username) => {
        this.setState({ username: username })
    }

    setGameData = (gameData) => {
        this.setState({ gameData: gameData })
    }

    render() {
        return (
            <Sidebar.Pushable as={Segment} basic style={{height: '100vh'}}>
                <Sidebar
                    as={Menu}
                    animation='overlay'
                    icon='labeled'
                    inverted
                    onHide={() => this.setState({ visible: false })}
                    vertical
                    visible={this.state.visible}
                    width='thin'
                >
                    <Menu.Item as='a'
                        onClick={(e) => this.setState({ menu: 'home' })}>
                        <Icon name='home' />
                Home
                </Menu.Item>
                    <Menu.Item as='a'
                        onClick={(e) => this.setState({ menu: 'audio' })}>
                        <Icon name='sound' />
                Audio
                </Menu.Item>
                    <Menu.Item as='a'
                        onClick={(e) => this.setState({ menu: 'video' })}>
                        <Icon name='video' />
                Video
                </Menu.Item>
                    <Menu.Item as='a'
                        onClick={(e) => this.setState({ menu: 'items' })}>
                        <Icon name='add' />
                Add
                </Menu.Item>
                    <Menu.Item as='a'
                        onClick={(e) => this.setState({ menu: 'buzzer' })}>
                        <Icon name='add' />
                Buzzer
                </Menu.Item>
                </Sidebar>

                <Sidebar.Pusher dimmed={this.state.visible} style={{backgroundColor: 'aliceblue'}}>
                    <Container basic>
                        <Button secondary
                            onClick={(e) => this.setState({ visible: true})}>Menu</Button>
                        <Header as='h1' textAlign='center' style={styles.glitchFont}>Quizz-O-Tron 3000</Header>
                        <p style={{textAlign: 'center'}}>The best, the only, the all-in-one blindtest of all time !</p>
                        {this.state.menu === 'home' && <MyHome game={this.state.gameData} stateHandler={{setUsername: this.setUsername, setGameData: this.setGameData}}/>}
                        {this.state.menu === 'video' && <MyVideo game={this.state.gameData}/>}
                        {this.state.menu === 'audio' && <MyAudio game={this.state.gameData}/>}
                        {this.state.menu === 'items' && <MyItems game={this.state.gameData}/>}
                        {this.state.menu === 'buzzer' && <MyBuzzer/>}
                    </Container>
                    {this.state.gameData && <Popup
                        trigger={<Button icon onClick={this.handleOpen} style={{ position: 'absolute', top: '2em', right: '2em' }}><Icon name='plus'/></Button>}
                        open={this.state.gamePopup}
                        position='bottom left'
                        flowing
                    >
                        <Segment basic style={{ minWidth: '20rem' }}>
                            <Header as='h3'>Game state</Header>
                            <Form>
                                <Form.Field>
                                    <Input fluid label='Game seed' value={this.state.gameData.seed} />
                                </Form.Field>
                                <Form.Field>
                                    <Input fluid label='Your username' value={this.state.username} />
                                </Form.Field>
                                <Form.Field>
                                    <Input fluid label='Your points' value={this.state.gameData.players[this.state.gameData.players.map(x => x.name).indexOf(this.state.username)].points} />
                                </Form.Field>
                            </Form>
                        </Segment>
                    </Popup>}
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        )
    }
}

const styles={
    glitchFont: {
        fontFamily: 'Glitch Inside',
        fontSize: '5em',
        marginBottom: '0px',
    }
}

export default MySidebar