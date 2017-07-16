import React, { Component } from 'react';

import './App.css';

class Profile extends Component {
  render() {
    let artist = {
      name: '',
      followers: {
        total: ''
      },
      images: [{url: ''}],
      genres: []
    }

    if(this.props.artist !== null) {
      artist = this.props.artist
    }

    return (
      <div className="profile">
        <img
          alt="Profile"
          className="profile-img"
          src={artist.images[0].url}
        />
      <div className="profile-info">
          <div className="profile-name">{artist.name}</div>
          <div className="profile-followers">
            {artist.followers.total} followers 
          </div>
          <div className="profile-genres">
            {
              artist.genres.map((genre, key) => {
                //I hate terenery operators
                genre = genre !== artist.genres[artist.genres.length-1]
                                ? ` ${genre},`
                                : ` & ${genre}`;
                return(
                  //each child in an array should have a unique key prop
                  <span key={key}>{genre}</span>
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
