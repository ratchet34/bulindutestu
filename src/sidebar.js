import React from 'react'
import {
    Button,
    Checkbox,
    Grid,
    Header,
    Icon,
    Image,
    Menu,
    Segment,
    Sidebar,
} from 'semantic-ui-react'
import MyAudio from './audio'

const MySidebar = () => {
    const [visible, setVisible] = React.useState(false)
    const [menu, setMenu] = React.useState('home')

    return (
        <Segment>
            <Sidebar.Pushable as={Segment}>
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
                </Sidebar>

                <Sidebar.Pusher dimmed={visible}>
                    <Segment basic>
                        <Button secondary
                        onClick={(e) => setVisible(true)}>Menu</Button>
                        {menu == 'audio' && <MyAudio/>}
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </Segment>
    )
}

export default MySidebar