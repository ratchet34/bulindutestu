import React from 'react'
import {
    Button,
    Header,
    Icon,
    Menu,
    Segment,
    Sidebar,
} from 'semantic-ui-react'
import MyHome from './home'
import MyVideo from './video'
import MyAudio from './audio'
import MyItems from './addItem'
import MyBuzzer from './buzzer'

const MySidebar = (allData) => {
    const [visible, setVisible] = React.useState(false)
    const [menu, setMenu] = React.useState('home')

    return (
        <Sidebar.Pushable as={Segment} basic style={{height: '100vh'}}>
            <Sidebar
                as={Menu}
                animation='overlay'
                icon='labeled'
                inverted
                onHide={() => setVisible(false)}
                vertical
                visible={visible}
                width='thin'
            >
                <Menu.Item as='a'
                    onClick={(e) => setMenu('home')}>
                    <Icon name='home' />
              Home
            </Menu.Item>
                <Menu.Item as='a'
                    onClick={(e) => setMenu('audio')}>
                    <Icon name='sound' />
              Audio
            </Menu.Item>
                <Menu.Item as='a'
                    onClick={(e) => setMenu('video')}>
                    <Icon name='video' />
              Video
            </Menu.Item>
                <Menu.Item as='a'
                    onClick={(e) => setMenu('items')}>
                    <Icon name='add' />
              Add
            </Menu.Item>
                <Menu.Item as='a'
                    onClick={(e) => setMenu('buzzer')}>
                    <Icon name='add' />
              Buzzer
            </Menu.Item>
            </Sidebar>

            <Sidebar.Pusher dimmed={visible} style={{backgroundColor: 'aliceblue'}}>
                <Segment basic>
                    <Button secondary
                        onClick={(e) => setVisible(true)}>Menu</Button>
                    <Header as='h1' textAlign='center' style={styles.glitchFont}>Quizz-O-Tron 3000</Header>
                    <p style={{textAlign: 'center'}}>The best, the only, the all-in-one blindtest of all time !</p>
                    {menu === 'home' && <MyHome allData={allData}/>}
                    {menu === 'video' && <MyVideo allData={allData}/>}
                    {menu === 'audio' && <MyAudio allData={allData}/>}
                    {menu === 'items' && <MyItems allData={allData}/>}
                    {menu === 'buzzer' && <MyBuzzer/>}
                </Segment>
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    )
}

const styles={
    glitchFont: {
        fontFamily: 'Glitch Inside',
        fontSize: '5em',
        marginBottom: '0px',
    }
}

export default MySidebar