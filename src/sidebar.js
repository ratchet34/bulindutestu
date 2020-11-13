import React from 'react'
import {
    Button,
    Container,
    Form,
    Header,
    Icon,
    Input,
    Label,
    List,
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
        username: '',
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

    setPlayers = (players) => {
        this.setState({ gameData: {...this.state.gameData, players: players} })
    }

    setMenu = (menu) => {
        this.setState({ menu: menu })
    }

    sortPlayersByPoints = (a, b) => {
        if ( a.points > b.points ) return -1;
        if ( a.points < b.points ) return 1;
        return 0;
    }

    stateHandler = { setUsername: this.setUsername, setGameData: this.setGameData, setMenu: this.setMenu, setPlayers: this.setPlayers }

    render() {
        return (
            <Sidebar.Pushable as={Segment} basic style={{height: '100vh'}}>
                <Sidebar
                    as={Menu}
                    animation='overlay'
                    icon='labeled'
                    
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
                        <Button size='huge' icon style={{marginTop: '1em'}}
                            onClick={(e) => this.setState({ visible: true})}><Icon name='list' /> Menu</Button>
                        <Header as='h1' textAlign='center' style={styles.glitchFont}>Quizz-O-Tron 3000</Header>
                        <p style={{textAlign: 'center'}}>The best, the only, the all-in-one blindtest of all time !</p>
                        {this.state.menu === 'home' && <MyHome game={this.state.gameData} stateHandler={this.stateHandler}/>}
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
                                    <Input fluid value={this.state.gameData.seed}><Label basic>Game seed</Label><input /></Input>
                                </Form.Field>
                                <Form.Field>
                                    <Input fluid value={this.state.username}><Label basic>Your username</Label><input /></Input>
                                </Form.Field>
                                {this.state.gameData.players[this.state.username] && <Form.Field>
                                    <Input fluid value={this.state.gameData.players[this.state.username].points}><Label basic>Your points</Label><input /></Input>
                                </Form.Field>}
                            </Form>
                            <p>Game Top 3</p>
                            <List ordered divided relaxed>
                                <List.Item>
                                    <List.Content>
                                        <List.Header as='a'>{Object.entries(this.state.gameData.players).map(x => {x[1].name = x[0]; return x[1]}).sort(this.sortPlayersByPoints)[0].name}</List.Header>
                                        <List.Description as='a'>With {Object.entries(this.state.gameData.players).map(x => {x[1].name = x[0]; return x[1]}).sort(this.sortPlayersByPoints)[0].points} {Object.entries(this.state.gameData.players).map(x => {x[1].name = x[0]; return x[1]}).sort(this.sortPlayersByPoints)[0].points === 1?'point':'points'}</List.Description>
                                    </List.Content>
                                </List.Item>
                                {Object.keys(this.state.gameData.players).length > 1 && <List.Item>
                                    <List.Content>
                                        <List.Header as='a'>{Object.entries(this.state.gameData.players).map(x => {x[1].name = x[0]; return x[1]}).sort(this.sortPlayersByPoints)[1].name}</List.Header>
                                        <List.Description as='a'>With {Object.entries(this.state.gameData.players).map(x => {x[1].name = x[0]; return x[1]}).sort(this.sortPlayersByPoints)[1].points} {Object.entries(this.state.gameData.players).map(x => {x[1].name = x[0]; return x[1]}).sort(this.sortPlayersByPoints)[1].points === 1?'point':'points'}</List.Description>
                                    </List.Content>
                                </List.Item>}
                                {Object.keys(this.state.gameData.players).length > 2 && <List.Item>
                                    <List.Content>
                                        <List.Header as='a'>{Object.entries(this.state.gameData.players).map(x => {x[1].name = x[0]; return x[1]}).sort(this.sortPlayersByPoints)[2].name}</List.Header>
                                        <List.Description as='a'>With {Object.entries(this.state.gameData.players).map(x => {x[1].name = x[0]; return x[1]}).sort(this.sortPlayersByPoints)[2].points} {Object.entries(this.state.gameData.players).map(x => {x[1].name = x[0]; return x[1]}).sort(this.sortPlayersByPoints)[2].points === 1?'point':'points'}</List.Description>
                                    </List.Content>
                                </List.Item>}
                            </List>
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