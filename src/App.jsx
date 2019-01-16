import React, { Component } from 'react';
import './App.css'
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';
import RelatedArtists from './RelatedArtists';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            query: '',
            artist: null,
            tracks:[],
            related_artists:[]
        }
    }

    search(){
        // console.log('this.state', this.state);
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
        const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
        var accessToken = 'BQAUeLmNBrl2A0UKEQv2c71dqJWoOH6G5Q_1X4mDsb-bryMQNYBpX3uQ_coMAPIU5pvmn511m1xUoX0cQryhFsB505CrUF83WavnCJCys0rLfM45N0T1Bz7r5qoI2EhCRFcju7B8OQWLd3FAqlZwcopQwxXYYGZW&refresh_token=AQAwy3mI9lu2CPj-AQm28cHd-G1gAZIefkXNPysZw5FwntKD7HMlVmnfGTDNPrYm43c3ugUidn0IpSMTob5dYxVNtQqOi1UoTN_qf64Ek5dxDyMoZ57tjDE20K1y2FuG6T1ajA';
        // console.log('FETCH_URL: ', FETCH_URL);
        var myOptions = {
            method: 'GET',
            headers:  {
              'Authorization': 'Bearer ' + accessToken
           },
            mode: 'cors',
            cache: 'default'
          };
        fetch(FETCH_URL, myOptions )
        .then(response => response.json())
        .then(json => {
            const artist = json.artists.items[0];
            // console.log('artist', artist);
            this.setState({artist});

            FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`
            fetch(FETCH_URL, myOptions)
            .then(response => response.json())
            .then(json => {
                // console.log('artist\'s top tracks:', json);
                const { tracks } = json;
                this.setState({tracks});
            })
        });
        fetch(FETCH_URL, myOptions )
        .then(response => response.json())
        .then(json => {
            const artist = json.artists.items[0];
            // console.log('artist', artist);
            this.setState({artist});

            FETCH_URL = `${ALBUM_URL}${artist.id}/related-artists`
            fetch(FETCH_URL, myOptions)
            .then(response => response.json())
            .then(json => {
                // console.log('artist\'s related artists: ', json);
                // console.log('related artists: ', json.artists);
                const related_artists = json.artists;
                // console.log('Thhis is a variable: ',related_artists)
                this.setState({related_artists}); 
            })
        });  
    }

    render(){
        return (
            <div className="App">
                
                <div className="App-title">bassBeatz</div>
                <FormGroup>
                    <InputGroup>
                        <FormControl 
                            type="text"
                            placeholder="Search for an artist"
                            value={this.state.query}
                            onChange={ event => {this.setState({query: event.target.value})}}
                            onKeyPress={event => {
                                if(event.key ==='Enter'){
                                    this.search();
                                }
                            }}
                        />
                        <InputGroup.Addon onClick={() => this.search()}>
                            <Glyphicon glyph="search"></Glyphicon>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                


                {
                    this.state.artist !== null 
                    ? <div>
                        <Profile 
                            artist={this.state.artist}
                        />

                        <RelatedArtists
                           onChange={ event => {this.setState({query: event.target.value})}}
                            related_artists={this.state.related_artists}
                           
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