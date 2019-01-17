import React, { Component } from 'react';
import './App.css';

class RelatedArtists extends Component{
    constructor(props){
        super(props);
        this.state={
            
                clicked: [],
        

        }
    }

    
    getNewArtist = (switchArtist)  => {
        console.log('pinged1');
        // console.log('Index of Artist: ', switchArtist.target.getAttribute('data-key'))
        
        let indexOfArtist = switchArtist.target.getAttribute('data-key');

        console.log('Artist Index: ',  indexOfArtist);
        console.log('this.props.related_artists', this.props.related_artists) 

        // let listofArtists = this.props.related_artists;

        // console.log('Length of artists array', listofArtists.length);
        if(this.state.clicked.indexOf(switchArtist)===-1){
            console.log('pinged4');
        }  
        

        // listofArtists.map((makeaMatch, k) => {
            // console.log('Artist: ', makeaMatch);

            // console.log('index value: ', k);
            // console.log('Artist id: ', makeaMatch.id)  
            
        // }) 
        
    }

    render(){
        const { related_artists } = this.props;
        // console.log('RELTAED ARTISTS: ', related_artists)
        
      
       
        
        return(
            <div className="profilez">
                {
                    related_artists.map((similar_artist, k) => {
                        // console.log('similar_artist: ', similar_artist);

                        const simArtist = similar_artist.images[0].url;
                        // console.log('Sim artist: ', simArtist);

                        // const simAtristHref = similar_artist.href;
                        // console.log('simArtisthref', simAtristHref);

                        const artistId = similar_artist.id
                        // console.log(artistId);


                        return (

                            <div  
                                key={artistId}
                                className="similar-arists"
                                onClick={this.getNewArtist.bind(this)}
                            >
                            <img src={simArtist}
                                className="sim-artists"
                                alt="related"
                                
                                data-key={k}
                                

                            />
                            </div>
                        )

                    })
                }
                

            </div>
        )
    }
}
export default RelatedArtists;