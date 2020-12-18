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
import MyHome from './components/home'
import MyGame from './components/game'
import MyItems from './components/addItem'
import MyBuzzer from './components/buzzer'
import MySettings from './components/settings'
import MyAdmin from './components/admin'

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

    setGameState = (state, callback) => {
        this.setState({ gameData: {...this.state.gameData, state: state} }, callback)
    }

    setMenu = (menu) => {
        this.setState({ menu: menu });
    }

    setVisible = () => {
        console.log(this.state.visible);
        this.setState({ visible: true});
    }

    handleOnHide = (e, data) => {
        console.log('handle on hide');
        console.log(e);
        console.log(data);
        if(!e.target.classList.contains('NoClose')){
            this.setState({ visible: !this.state.visible });
        }
    }

    sortPlayersByPoints = (a, b) => {
        if ( a.points > b.points ) return -1;
        if ( a.points < b.points ) return 1;
        return 0;
    }

    stateHandler = { setUsername: this.setUsername, setGameData: this.setGameData, setMenu: this.setMenu, setPlayers: this.setPlayers, setGameState: this.setGameState }

    render() {
        return (
            <Sidebar.Pushable as={Segment} basic style={{height: '100vh'}}>
                
      
                <Sidebar
                    as={Menu}
                    animation='overlay'
                    icon='labeled'
                    
                    onHide={this.handleOnHide}
                    vertical
                    visible={this.state.visible}
                    width='thin'
                >
                    <Menu.Item as='a'
                        onClick={(e) => this.setState({ menu: 'home' })}>
                        <Icon name='home' />
                        Home
                    </Menu.Item>
                    {this.state.gameData && <Menu.Item as='a'
                        onClick={(e) => this.setState({ menu: 'game' })}>
                        <Icon name='sound' />
                        Audio
                    </Menu.Item>}
                    {this.state.gameData && <Menu.Item as='a'
                        onClick={(e) => this.setState({ menu: 'buzzer' })}>
                        <Icon name='bell' />
                        Buzzer
                    </Menu.Item>}
                    <Menu.Item as='a'
                        onClick={(e) => this.setState({ menu: 'items' })}>
                        <Icon name='add' />
                        Add
                    </Menu.Item>
                    <Menu.Item as='a'
                        onClick={(e) => this.setState({ menu: 'settings' })}>
                        <Icon name='settings' />
                        Settings
                    </Menu.Item>
                    <Menu.Item as='a'
                        onClick={(e) => this.setState({ menu: 'admin' })}>
                        <Icon name='user secret' />
                        Admin
                    </Menu.Item>
                </Sidebar>

                <Sidebar.Pusher dimmed={this.state.visible} style={{backgroundColor: 'aliceblue'}}>
                    <Container>
                        <Button size='huge' className="NoClose" icon style={{marginTop: '1em'}}
                            onClick={this.setVisible}><Icon className="NoClose" name='list' /> Menu</Button>
                        <Header as='h1' textAlign='center' style={styles.glitchFont}>Quizz-O-Tron 3000</Header>
                        <p style={{textAlign: 'center'}}>The best, the only, the all-in-one blindtest of all time !</p>
                        {this.state.menu === 'home' && <MyHome game={this.state.gameData} username={this.state.username} stateHandler={this.stateHandler}/>}
                        {this.state.gameData && this.state.menu === 'game' && <MyGame game={this.state.gameData} username={this.state.username} menu={this.state.menu} stateHandler={this.stateHandler}/>}
                        {this.state.gameData && this.state.menu === 'buzzer' && <MyBuzzer game={this.state.gameData}/>}
                        {this.state.menu === 'items' && <MyItems/>}
                        {this.state.gameData && this.state.menu === 'settings' && <MySettings game={this.state.gameData} username={this.state.username}/>}
                        {this.state.menu === 'admin' && <MyAdmin/>}
                    </Container>
                    {this.state.gameData && <Popup
                        trigger={<Button icon onClick={this.handleOpen} style={{ position: 'absolute', top: '2em', right: '2em' }}><Icon name='plus'/></Button>}
                        open={this.state.gamePopup}
                        position='bottom left'
                        flowing
                    >
                        {this.state.gameData && <Segment basic style={{ minWidth: '20rem' }}>
                            <Header as='h3'>Game state</Header>
                            <List>
                                <List.Item key="gameId">
                                    <Label color='teal' style={styles.labelFullwidth}>
                                        Game ID
                                        <Label.Detail>{this.state.gameData.id}</Label.Detail>
                                    </Label>
                                </List.Item>
                                <List.Item key="username">
                                    <Label color='blue' style={styles.labelFullwidth}>
                                        Your username
                                        <Label.Detail>{this.state.username}</Label.Detail>
                                    </Label>
                                </List.Item>
                                {this.state.gameData.players && this.state.gameData.players[this.state.username] && <List.Item key="points">
                                    <Label color='violet' style={styles.labelFullwidth}>
                                        Your points
                                    <Label.Detail>{this.state.gameData.players[this.state.username].points}</Label.Detail>
                                </Label></List.Item>}
                            </List>
                            <p>Game Top 3</p>
                            <List ordered divided relaxed>
                                <List.Item key="first">
                                    <List.Content>
                                        <List.Header as='a'>{Object.entries(this.state.gameData.players).map(x => {x[1].name = x[0]; return x[1]}).sort(this.sortPlayersByPoints)[0].name}</List.Header>
                                        <List.Description as='a'>With {Object.entries(this.state.gameData.players).map(x => {x[1].name = x[0]; return x[1]}).sort(this.sortPlayersByPoints)[0].points} {Object.entries(this.state.gameData.players).map(x => {x[1].name = x[0]; return x[1]}).sort(this.sortPlayersByPoints)[0].points === 1?'point':'points'}</List.Description>
                                    </List.Content>
                                </List.Item>
                                {Object.keys(this.state.gameData.players).length > 1 && <List.Item key="second">
                                    <List.Content>
                                        <List.Header as='a'>{Object.entries(this.state.gameData.players).map(x => {x[1].name = x[0]; return x[1]}).sort(this.sortPlayersByPoints)[1].name}</List.Header>
                                        <List.Description as='a'>With {Object.entries(this.state.gameData.players).map(x => {x[1].name = x[0]; return x[1]}).sort(this.sortPlayersByPoints)[1].points} {Object.entries(this.state.gameData.players).map(x => {x[1].name = x[0]; return x[1]}).sort(this.sortPlayersByPoints)[1].points === 1?'point':'points'}</List.Description>
                                    </List.Content>
                                </List.Item>}
                                {Object.keys(this.state.gameData.players).length > 2 && <List.Item key="third">
                                    <List.Content>
                                        <List.Header as='a'>{Object.entries(this.state.gameData.players).map(x => {x[1].name = x[0]; return x[1]}).sort(this.sortPlayersByPoints)[2].name}</List.Header>
                                        <List.Description as='a'>With {Object.entries(this.state.gameData.players).map(x => {x[1].name = x[0]; return x[1]}).sort(this.sortPlayersByPoints)[2].points} {Object.entries(this.state.gameData.players).map(x => {x[1].name = x[0]; return x[1]}).sort(this.sortPlayersByPoints)[2].points === 1?'point':'points'}</List.Description>
                                    </List.Content>
                                </List.Item>}
                            </List>
                        </Segment>}
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
    },
    labelFullwidth: {
        width: '100%'
    }
}

export default MySidebar