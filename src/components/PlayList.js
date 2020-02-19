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