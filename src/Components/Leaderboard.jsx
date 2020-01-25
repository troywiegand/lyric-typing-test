import React, { Component } from 'react';
import './Leaderboard.css';

class Leaderboard extends Component {

    state = {
        persons: []
    }

    componentWillMount() {

        let id = this.props.song.genius_id;
        let url = "http://34.74.220.91:8080/leaderboards/" + id + "/limit/10"

        fetch(url, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        }).then((response) => {
            return response.json()
        }).then((response) => {
            this.setState({persons: response["results"]})
        })
    }

    render() {

        let list = this.state.persons;
        console.log(this.state.persons)

        if (list.length === 0) {
            return <div id="empty">
                Be the first to complete this song!
            </div>
        } else {
            return <table id="leaderboard">
                <tbody>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Completed</th>
                    <th>Time</th>
                </tr>
                {list.map((value, index) => {
                    return <tr>
                        <td>{index + 1}</td>
                        <td>{value.username}</td>
                        <td>{value.milliseconds}</td>
                        <td>{value.time}</td>
                    </tr>
                })}
                </tbody>
            </table>
        }
        
    }

}

export default Leaderboard