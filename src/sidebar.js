import React from 'react'
import {
    Button,
    Icon,
    Menu,
    Segment,
    Sidebar,
} from 'semantic-ui-react'
import MyVideo from './video'
import MyAudio from './audio'
import MyItems from './addItem'

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
            </Sidebar>

            <Sidebar.Pusher dimmed={visible}>
                <Segment basic>
                    <Button secondary
                        onClick={(e) => setVisible(true)}>Menu</Button>
                    {menu === 'video' && <MyVideo allData={allData}/>}
                    {menu === 'audio' && <MyAudio allData={allData}/>}
                    {menu === 'items' && <MyItems allData={allData}/>}
                </Segment>
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    )
}

export default MySidebar