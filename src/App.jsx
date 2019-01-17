import React, { Component } from 'react';
import './App.css'
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';
import RelatedArtists from './RelatedArtists';
import queryString from 'query-string';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            query: '',
            artist: null,
            tracks:[],
            related_artists:[],
            serverData:{},
            image:null
        }
    }

    componentDidMount(){
        let parsed = queryString.parse(window.location.search);
        console.log('accessToken', parsed);

        let accessToken = parsed.access_token;

        if(!accessToken)
            return;

        fetch('https://api.spotify.com/v1/me', {headers:  {
            'Authorization': 'Bearer ' + accessToken }}
        ).then(response => response.json())
        .then(jsonresponse => 
        //    {console.log(jsonresponse)}
            
            this.setState({
            user: {
                name: jsonresponse.display_name,
                
                image: jsonresponse.images[0].url
            }   
            
            })
        
        )
        
        
        

        fetch('https://api.spotify.com/v1/me/playlists', {headers:  {
            'Authorization': 'Bearer ' + accessToken }}
        ).then(response => response.json())
        .then(jsonresponse => 
            {console.log('Playlists: ', jsonresponse)}
            // this.setState({
            //     playlists: jsonresponse.items.map(item => ({
            //         name: item.name, 
            //         songs:[]
                    // }))
                // })
        )   
    }

    

    

    search(){

        let parsedToken = queryString.parse(window.location.search);
        console.log('parsedToken', parsedToken);

        let accessToken = parsedToken.access_token;
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
        const ALBUM_URL = 'https://api.spotify.com/v1/artists/';

        fetch(FETCH_URL, {headers:  {
            'Authorization': 'Bearer ' + accessToken }}
        ).then(response => response.json())
        .then(jsonresponse => {

            console.log('Artist: ', jsonresponse);
            const artist = jsonresponse.artists.items[0];
    
            this.setState({artist});

            FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`
            fetch(FETCH_URL, {headers:  {
                'Authorization': 'Bearer ' + accessToken }}
            ).then(response => response.json())
            .then(json => {
                // console.log('artist\'s top tracks:', json);
                const { tracks } = json;
                this.setState({tracks});
            })
        
        })
    }
        
        // console.log('this.state', this.state);
        // const BASE_URL = 'https://api.spotify.com/v1/search?';
        // let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
        // const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
        // // var accessToken = 'BQAUeLmNBrl2A0UKEQv2c71dqJWoOH6G5Q_1X4mDsb-bryMQNYBpX3uQ_coMAPIU5pvmn511m1xUoX0cQryhFsB505CrUF83WavnCJCys0rLfM45N0T1Bz7r5qoI2EhCRFcju7B8OQWLd3FAqlZwcopQwxXYYGZW&refresh_token=AQAwy3mI9lu2CPj-AQm28cHd-G1gAZIefkXNPysZw5FwntKD7HMlVmnfGTDNPrYm43c3ugUidn0IpSMTob5dYxVNtQqOi1UoTN_qf64Ek5dxDyMoZ57tjDE20K1y2FuG6T1ajA';
        // // console.log('FETCH_URL: ', FETCH_URL);
        // var myOptions = {
        //     method: 'GET',
        //     headers:  {
        //       'Authorization': 'Bearer ' + accessToken
        //    },
        //     mode: 'cors',
        //     cache: 'default'
        //   };
        // fetch(FETCH_URL, myOptions )
        // .then(response => response.json())
        // .then(json => {
        //     const artist = json.artists.items[0];
        //     // console.log('artist', artist);
        //     this.setState({artist});

        //     FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`
        //     fetch(FETCH_URL, myOptions)
        //     .then(response => response.json())
        //     .then(json => {
        //         // console.log('artist\'s top tracks:', json);
        //         const { tracks } = json;
        //         this.setState({tracks});
        //     })
        // });
    // }
    //     fetch(FETCH_URL, myOptions )
    //     .then(response => response.json())
    //     .then(json => {
    //         const artist = json.artists.items[0];
    //         // console.log('artist', artist);
    //         this.setState({artist});

    //         FETCH_URL = `${ALBUM_URL}${artist.id}/related-artists`
    //         fetch(FETCH_URL, myOptions)
    //         .then(response => response.json())
    //         .then(json => {
    //             // console.log('artist\'s related artists: ', json);
    //             // console.log('related artists: ', json.artists);
    //             const related_artists = json.artists;
    //             // console.log('Thhis is a variable: ',related_artists)
    //             this.setState({related_artists}); 
    //         })
    //     });  
    // }

    render(){


        return (
            <div className="App">
                {this.state.user ? 
                    <div>
                        <h1 className="user-info" style={{'color': 'white'}}>
                            {this.state.user.name}  
                        </h1>
                        
                        <img 
                            className="user-pic"
                            alt="user-profilePic"
                            src={this.state.user.image}
                            style={{
                                'height': '120px',
                                'borderRadius': '60px',
                                'border': '3px solid white'
                            }}
                        />
                        
                        
                        <div 
                            className="App-title">
                            bassBeatz
                        </div>
                        
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
                        </div> : <button 
                                    onClick={ () => {
                                        window.location = window.location.href.includes('localhost') 
                                            ? 'http://localhost:8888/login' 
                                            : 'https://bassbeatz-backend.herokuapp.com/login'
                                    }}
                                    style={{padding: '20px', 'fontSize': '20px', 'color': 'black'}}>Sign in with Spotify</button>
                    }
                        
                        
                    </div>   
        )
    }
}
export default App;