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
            var indexData = this.props.allData.allData.map(x => ({type: x.type, id: x.id})).indexOf({type: this.state.fields.type, id: this.state.fields.id})
            if (indexData !== -1) {
                this.setState({ error: true, errorMsg: 'This video is already referenced for this type of item'})
            } else {
                var newdata = {};
                if (this.state.fields.title !== '') {
                    newdata.title = this.state.fields.title
                }
                if (this.state.fields.artist !== '') {
                    newdata.artist = this.state.fields.artist
                }
                if (this.state.fields.origin !== '') {
                    newdata.origin = this.state.fields.origin
                }
                newdata.type = this.state.fields.type
                newdata.id = this.state.fields.id
                newdata.done = false
                newdata.from = this.state.fields.from
                newdata.time = this.state.fields.to - this.state.fields.from
                newdata.answerTime = this.state.fields.answer
                this.props.allData.allData.push(newdata)
                this.setState({ success: true })
            }
        }
    }

    importJSON = () => {
        var obj = JSON.parse(this.state.fields.json)
        obj.forEach(item => {
            if ('id' in item && ('title' in item || 'artist' in item || 'origin' in item) && 'from' in item && 'time' in item && 'answerTime' && item) {
                item.done = false
                if (this.props.allData.allData.map(x => ({type: x.type, id: x.id})).indexOf({type: item.type, id: item.id}) === -1) {
                    this.props.allData.allData.push(item)
                }
            }
        })
    }

    handleChange = (e) => {
        const value = e.target.value;
        var fields = this.state.fields;
        fields = { ...fields, [e.target.name]: value }
        this.setState({ fields: fields });
    }

    handleChangeYoutubeId = (e) => {
        var value = e.target.value;
        var re = new RegExp('(?:youtube(?:-nocookie)?\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})');
        if(re.test(value)) {
            value = value.match(re)[1];
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