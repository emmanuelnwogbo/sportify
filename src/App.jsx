import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap'

import Profile from './Profile';
import Gallery from './Gallery';

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      artist: null,
      tracks: [],
      creator: 'nerdyemmanuel@gmail.com'
    }
  }

  search() {
    console.log('this.state', this.state);
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
    let accessToken = 'BQBQExbpB9-3ZvRJdYbyMPSgWQaiLblunCKhEwd2dl980r1t8D-BfYSCYucdiKtcnDqqdBdpHngech9_xd2O0NwBdRbFZsyYVY_zGgEwckRSqKTWRg86JCFOYsTinUGRwIEmh61gahZ2hoQ7Jj5V__yJFWRR9ktNz7chQ6dmrJNGFAWNVrQ&refresh_token=AQB6OLSwEtZW2hb09T8gFSgioXs7pMu7kUz-5cyuICUNIwiil7MU3eOvJHpiRURbqKYGnR3uRLBvslnG8hpHO-BedL7p6ZQqRcuRSOgTL64TbMDCHG2u4HZxTK_296kjHgk';
    console.log('FETCH_URL', FETCH_URL);

    let myOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    }

    fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        const artist = json.artists.items[0];
        this.setState({artist})

        FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`
        fetch(FETCH_URL, myOptions)
          .then(response => response.json())
          .then(json => {
            console.log('artist\'s top tracks:', json)
            const { tracks } = json; //this is the same, ofcourse as saying tracks = json.tracks;
            this.setState({tracks});
            console.log(this.state);
          })
      })
      .catch(err => console.log('err', err));
  }

  render() {
    return (
      <div className="App">
        <div className="App-title">Sportify</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for an Artist"
              value={this.state.query}
              onChange={(event) => {this.setState({query: event.target.value})}}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  return this.search();
                }
              }}
            />
          <InputGroup.Addon onClick={() => this.search()}>
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
        </InputGroup>
        </FormGroup>
        {
          this.state.artist !== null ?
          <div>
            <Profile
              artist={this.state.artist}
            />
          <div className="Gallery">
            <Gallery
              tracks={this.state.tracks}
            />
          </div>
          </div>
        : <div></div>
        }

        <div><p>contact: {this.state.creator}</p></div>
      </div>
    )
  }
}

export default App;
