import React, {Component} from 'react';
import './App.css';
import {FormGroup, FormControl, InputGroup, Button} from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            artist: null,
            tracks: []
        }
    }
    search() {
        console.log('this.state', this.state);
        const BASE_URL = 'https://api.spotify.com/v1/search?'
        let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`
        const ALBUM_URL = 	'https://api.spotify.com/v1/artists'
        const token = 'BQA7i3pHpjKTSD8EoB_n0X_5wpmzGsCcWRzz6-lVLLAKTik_qEQWzdON8pGma3xrtw4dAlhw4uU_8lVjsNFYhoMa2gGVWbRrR3srbRaiNjFK-E4PaGXY6RmJyBBZqzob2ODOK-AZKTNw-MDlZSTlZMlBSOCi58s'
        console.log(FETCH_URL);
        fetch(FETCH_URL, {
            method:'GET',
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(json => {
            const artist = json.artists.items[0]
            console.log('artist', artist)
            this.setState({artist})

             FETCH_URL = `${ALBUM_URL}/${artist.id}/top-tracks?country=US&`
            fetch(FETCH_URL, {
                method:'GET',
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(json => {
                console.log('top tracks:', json);
                const { tracks } = json
                this.setState({tracks})
            })
        })
    }
    render(){
        return ( <div className="App">
            <div className="App-title">Music Master</div>
            <FormGroup>
                <InputGroup>
                <FormControl type="text" placeholder="Search artist..." 
                name="{this.state.query}"
                onChange={event => {this.setState({query: event.target.value})}}
                onKeyPress={event => {
                    if(event.key === 'Enter') {
                        this.search()
                    }
                }}
                />
                <Button onClick={() => this.search()}>Search</Button>
                </InputGroup>
                
            </FormGroup>
            {
                this.state.artist !==null
                ?
                <div>
                    <Profile
                artist={this.state.artist}
                
                />
                <Gallery
                    tracks={this.state.tracks}
                />
                </div>
                
                : <div></div>
              
            }

            
            
        </div>
        )
    }
}

export default App