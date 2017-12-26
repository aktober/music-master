import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile.jsx';
import Gallery from './Gallery.jsx';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            artist: null,
            tracks: []
        }
    }

    search(){
        console.log('this.state', this.state);
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        const FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
        const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
        console.log('fetch url', FETCH_URL);

        var accessToken = 'BQCZuYWWOuyqrIBh6Tv6ew3IF6C0Y64A0xJgi1miinCHeKLfx992mh7kWN28iM77twrxXr7TScUumaFFxDWrb1p3tpxgSuUDdOeJo0qAEupRZa8atNMgGUX9iw0UeN4umktfKXbEp8qzdgIQNsMFZTLlgX5bXS8png';
        var myOptions = {
            method: 'GET',
            headers:  {
                'Authorization': 'Bearer ' + accessToken
            },
            mode: 'cors',
            cache: 'default'
        };

        fetch(FETCH_URL, myOptions)
        .then(response => response.json())
        .then(json => {
            const artist = json.artists.items[0];
            this.setState({artist: artist});

            const FETCH_TRACKS_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=BG&`
            fetch(FETCH_TRACKS_URL, myOptions)
            .then(response => response.json())
            .then(json => {
                console.log('artist\'s top tracks:', json);
                const tracks = json.tracks;
                this.setState({tracks: tracks});
            })
        });
    }

    render() {
        return (
            <div className="App">
                <div className="App-title">Music Master</div>
                <InputGroup>
                    <FormGroup>
                        <FormControl
                            type='text'
                            placeholder='Search for an artist'
                            query={this.state.query}
                            onChange={event => {this.setState({query: event.target.value})}}
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    this.search();
                                }
                            }}
                        />
                    </FormGroup>
                    <InputGroup.Addon onClick={() => this.search()}>
                        <Glyphicon glyph="search"></Glyphicon>
                    </InputGroup.Addon>

                </InputGroup>
                {
                    this.state.artist !== null
                    ? <div>
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

export default App;
