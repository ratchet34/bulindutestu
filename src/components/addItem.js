import React from 'react'
import YouTube from 'react-youtube'
import {
    Accordion,
    Icon,
    Label,
    Form,
    Message,
} from 'semantic-ui-react'
import { findLastIndex } from 'underscore';
import { vars } from '../libs/vars'

const options = [
    { key: 'a', text: 'Audio', value: 'audio' },
    { key: 'v', text: 'Video', value: 'video' },
]

class MyItems extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fields: {
                id: '',
                title: '',
                artist: '',
                origin: '',
                type: '',
                from: 0,
                to: 30,
                answer: 30,
            },
            error: false,
            success: false,
            errorMsg: '',
            activeIndex: 0,
            opts: {
                width: '100%',
            },
        };
    }

    addItem = () => {
        if (this.state.fields.title === '' && this.state.fields.artist === '' && this.state.fields.origin === '') {
            this.setState({ error: true, errorMsg: 'You need to fill at least one of the fields above.' })
        } else if (this.state.fields.type === '') {
            this.setState({ error: true, errorMsg: 'You need to select a type of item.' })
        } else {
            fetch(vars.api+"item", {
                method: 'POST',
                mode: 'cors',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'origin': window.location.origin
                },
                body: JSON.stringify({
                    id: this.state.fields.id,
                    title: this.state.fields.title,
                    artist: this.state.fields.artist,
                    origin: this.state.fields.origin,
                    itemType: this.state.fields.type,
                    from: this.state.fields.from,
                    to: this.state.fields.to,
                    answer: this.state.fields.answer,
                })
              }).then(res => res.json()).then(
                (result) => {
                  console.log(result);
                  if (result.body) {
                    this.setState({fields: {
                        id: '',
                        title: '',
                        artist: '',
                        origin: '',
                        type: '',
                        from: 0,
                        to: 30,
                        answer: 30,
                    }});
                  }
                },
                (error) => {
                  console.error(error.message)
                }
              )
        }
    }

    importJSON = () => {
        fetch(vars.api+"item", {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'origin': window.location.origin
            },
            body: this.state.importJSON
          }).then(res => res.json()).then(
            (result) => {
              console.log(result);
              if (result.body) {
                this.setState({fields: {
                    id: '',
                    title: '',
                    artist: '',
                    origin: '',
                    type: '',
                    from: 0,
                    to: 30,
                    answer: 30,
                }});
              }
            },
            (error) => {
              console.error(error.message)
            }
          )
    }

    handleChange = (e) => {
        const value = e.target.value;
        var fields = this.state.fields;
        fields = { ...fields, [e.target.name]: value }
        this.setState({ fields: fields });
    }

    handleChangeYoutubeId = (e) => {
        var value = e.target.value;
        console.log(value);
        var re = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gm;
        var m;

        m = re.exec(value);
        if(m !== null) {
            console.log(m);
            value = m[1];
        }
        var fields = this.state.fields;
        fields = { ...fields, [e.target.name]: value }
        this.setState({ fields: fields });
    }

    handleChangeSelect = (e, result) => {
        var fields = this.state.fields;
        fields = { ...fields, [result.name]: result.value }
        this.setState({ fields: fields });
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const activeIndex = this.state.activeIndex
        const newIndex = activeIndex === index ? -1 : index
    
        this.setState({ activeIndex: newIndex })
    }

    _onReady = (event) => {
        console.log('_onReady')
        // access to player in all event handlers via event.target
        this.player= event.target;
    }

    getStartTime = () => {
        var fields = this.state.fields;
        fields = { ...fields, from: Math.floor(this.player.getCurrentTime()) }
        this.setState({ fields: fields });
    }

    getEndTime = () => {
        var fields = this.state.fields;
        fields = { ...fields, to: Math.floor(this.player.getCurrentTime()) - this.state.fields.from }
        this.setState({ fields: fields });
    }

    render() {
        return (
            <Accordion styled fluid style={{marginTop: '1rem'}}>
                <Accordion.Title
                    active={this.state.activeIndex === 0}
                    index={0}
                    onClick={this.handleClick}
                >
                    <Icon name='dropdown' />
                    Add Item
                </Accordion.Title>
                <Accordion.Content active={this.state.activeIndex === 0}>
                    <YouTube name='ytplayer' videoId={this.state.fields.id} onReady={this._onReady} opts={this.state.opts}/>
                    <Form error={this.state.error} success={this.state.success}>
                        <Form.Group widths='equal'>
                            <Form.Input fluid name='id' label='Youtube ID' placeholder='Ex: MqDWL0MgAtc' value={this.state.fields.id} onChange={this.handleChangeYoutubeId} />
                            <Form.Input fluid name='title' label='Title' placeholder='Title' value={this.state.fields.title} onChange={this.handleChange} />
                            <Form.Input fluid name='artist' label='Artist' placeholder='Artist' value={this.state.fields.artist} onChange={this.handleChange} />
                            <Form.Input fluid name='origin' label='Origin' placeholder='Origin' value={this.state.fields.origin} onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Select required fluid name='type' options={options} label='Type' placeholder='Type' value={this.state.fields.type} onChange={this.handleChangeSelect} />
                            <Form.Input required fluid type="number" name='from' label='Starting From (sec)' placeholder='0' value={this.state.fields.from} onChange={this.handleChange} >
                                <input />
                                <Label as='a' onClick={this.getStartTime} style={styles.youtubeLabel}><Icon name='youtube' size='large' style={styles.youtubeIcon}/></Label>
                            </Form.Input>
                            <Form.Input required fluid type="number" name='to' label='Time (sec)' placeholder='30' value={this.state.fields.to} onChange={this.handleChange} >
                                <input />
                                <Label as='a' onClick={this.getEndTime} style={styles.youtubeLabel}><Icon name='youtube' size='large' style={styles.youtubeIcon}/></Label>
                            </Form.Input>
                            <Form.Input required fluid type="number" name='answer' label='Answering Time (sec)' placeholder='30' value={this.state.fields.answer} onChange={this.handleChange} />
                        </Form.Group>
                        <Message
                            error
                            header='Fields Missing'
                            content={this.state.errorMsg}
                        />
                        <Message
                            success
                            header='Sucess'
                            content='Item added successfully.'
                        />
                        <Form.Button onClick={this.addItem} >Add</Form.Button>
                    </Form>
                </Accordion.Content>
                <Accordion.Title
                    active={this.state.activeIndex === 1}
                    index={1}
                    onClick={this.handleClick}
                >
                    <Icon name='dropdown' />
                    Advanced Import
                </Accordion.Title>
                <Accordion.Content active={this.state.activeIndex === 1}>
                    <Form error={this.state.error} success={this.state.success}>
                        <Form.TextArea name='json' rows={10} label='JSON Import' value={this.state.fields.json} onChange={this.handleChange} />
                        <Form.Button onClick={this.importJSON} >Import</Form.Button>
                    </Form>
                </Accordion.Content>
            </Accordion>
        )
    }

}

const styles = {
    youtubeIcon: {
        margin: '0',
    },
    youtubeLabel: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

export default MyItems