import React, {Component} from 'react';
import './App.css';

class Profile extends  Component {
    render() {
        console.log('this.props', this.props);
        let artist = {name: '', followers: {total: ''}, images:[{url: ''}], genres:[]};
        if (this.props.artist !== null) {
            artist = this.props.artist
        }
        return (
            <div className="profile">
                <img
                alt="Profile"
                className="prof-img"
                src={artist.images[0].url}
                />
                <div className="prof-info">
                <div className="prof-name">{artist.name}</div>
                <div className="prof-followers">{artist.followers.total} followers</div>
                <div className="prof-genres">
                    {
                        artist.genres.map((genre, index) => {
                            genre = genre !== artist.genres[artist.genres.length-1] ? `${genre},`: `& ${genre}`;

                            return (
                                <span key={index}>{genre}</span>
                            )
                        })
                    }
                </div>
                </div>

               
                
            </div>
        )
    }
}

export default Profile
