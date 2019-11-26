import React from 'react';
import styles from './styles/Gif.module.css';

class Gif extends React.Component {
    constructor(props) {
        super(props);
         
        const dateCreated = this.props.feed.createdon;
        const dateAndTime = dateCreated.split('T');
        const date = dateAndTime[0];
        const time = dateAndTime[1].substring(0, 5);
        const dateTime = `${date} @ ${time}`;

        this.state = {
            dateTime: dateTime
        }
    }

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
        const category = `${this.props.feed.category}`;
        // const dateAndTime = '23-12-2019 3:22am';
        if (this.props.user.userId === this.props.feed.authorid){
            delet = 'delete';
            // edit = 'edit post';
        }
        authorName = `${this.props.feed.authorfirstname} ${this.props.feed.authorlastname}`;

        let subGroup = <div className = {styles.changable}>
            <span className = {styles.comment} onClick = {this.setOneFeed}>comments</span>
            <span className = {styles.delete} onClick = {this.deleteGif}>{delet}</span>
        </div>;
        if (this.props.oneFeed) subGroup = '';

        return(
            <div className = {styles.container}>
                <span className = {styles.author}>{authorName}</span>
                <div className = {styles.title}>{this.props.feed.title}</div>
                <img className = {styles.feed} onClick = {this.setOneFeed} src = {this.props.feed.feed} alt={this.props.feed.title}></img>
                <div className = {styles.bottom}>
                    {subGroup}
                    <div className = {styles.nonChangable}>
                        <span className = {styles.category}>{category}</span>
                        <span className = {styles.date}>{this.state.dateTime}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Gif;