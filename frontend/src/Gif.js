import React from 'react';

class Gif extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    deleteGif = async (e) => {
        const token = this.props.user.token;
        const api = `http://localhost:8000/api/v1/gifs/${this.props.feed.id}`;
        const response = await fetch(api, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const jsonResponse = await response.json();
        if (jsonResponse.status === 'success') {
            alert('Gif successfully deleted!');
            this.props.refresher();
        }
    }

    setOneFeed = (e) => {
        if (this.props.isNotOneFeed) {
            e.preventDefault();
            this.props.setOneFeed(this.props.feed);
            this.props.change(4);
        }
    }

    render() {
        let delet; let authorName;
        const category = 'category here';
        const dateAndTime = '23-12-2019 3:22am';
        if (this.props.user.userId === this.props.feed.authorid){
            delet = 'delete';
            // edit = 'edit post';
        }
        authorName = `${this.props.feed.authorfirstname} ${this.props.feed.authorlastname}`;

        let subGroup = <div>
            <span onClick = {this.setOneFeed}>comments</span>
            <span onClick = {this.deleteGif}>{delet}</span>
        </div>;
        if (this.props.oneFeed) subGroup = '';

        return(
            <div >
                <span>{authorName}</span>
                <img onClick = {this.setOneFeed} src = {this.props.feed.feed} alt={this.props.feed.title}></img>
                {subGroup}
                <span>{category}</span>
                <span>{dateAndTime}</span>
            </div>
        );
    }
}

export default Gif;