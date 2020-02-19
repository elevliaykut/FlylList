import React, { Component } from "react";
import queryString from 'query-string';

class PlayList extends Component {

    componentDidMount(){
        let parsed = queryString.parse(window.location.search);
        let accessToken = parsed.access_token;
        if(!accessToken)
            return;
        fetch('https://api.spotify.com/v1/me', {
            headers: {'Authorization': 'Bearer' + accessToken }
        }).then(data => this.setState({
            user: {
                name: data.display_name
            }
        }))
        fetch('https://api.spotify.com/v1/me/playlists', {
            headers: {'Authorization':'Bearer' + accessToken }
        }).then(response => response.json())
        .then(playlistData => {
            let playlists = playlistData.items
            let trackDataPromises = playlists.map(playlist => {
                let responsePromise = fetch(playlist.tracks.href, {
                    headers: {'Authorization':'Bearer' + accessToken }
                })
                let trackDataPromises = responsePromise
                    .then(response => response.json())
                return trackDataPromise
            })
            let allTracksDataPromises = 
                Promise.all(trackDataPromises)
            let playlistsPromise = allTracksDataPromises.then(trackDatas => {
                trackDatas.forEach((trackData, i) => {
                    playlists[i].trackDatas = trackData.items
                        .map(item => item.track)
                        .map(trackData => ({
                            name:trackData.name,
                            durations:trackData.duration_ms / 1000
                        }))
                })
                return playlists
            })
            return playlistsPromise
        })
        .then(playlists => this.setState({
            playlists: playlists.map(item => {
                return {
                    name:item.name,
                    imageUrl:item.images[0].url,
                    songs:item.trackDatas.slice(0,3)
                }
            })
        }))
    }
    render() {
        return ( 
            <div class="PlayList-colon col-md-12">
                <h1>Playlist</h1>
            </div>
        )
    }
}

export default PlayList;