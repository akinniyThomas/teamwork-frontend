import React from 'react';
import styles from './styles/Article.module.css';

class Article extends React.Component {
    constructor(props) {
        super(props);
        
        const dateCreated = this.props.feed.createdon;
        const dateAndTime = dateCreated.split('T');
        const date = dateAndTime[0];
        const time = dateAndTime[1].substring(0, 5);
        const dateTime = `${date} @ ${time}`;

        this.state = {
            readOnly: true,
            newFeed: this.props.feed.feed,
            newTitle: this.props.feed.title,
            dateTime: dateTime,
            url: 'https://andteawok.herokuapp.com/api/v1'
        }
        // this.setDateTime();
    }

    setDateTime = () => {
        // this.setState({dateTime: dateTime});
        // console.log(dateTime);
    }

    setReadOnly = e => this.setState({readOnly: !this.state.readOnly});

    setNewFeed = e => this.setState({newFeed: e.target.value});

    setNewTitle = e => this.setState({newTitle: e.target.value});

    editArticle = async (e) => {
        const token = this.props.user.token;
        const api = `${this.state.url}/articles/${this.props.feed.id}`;
        const data = {
            title: this.state.newTitle,
            feed: this.state.newFeed,
            inappropflag: false,
            // tagid: this.props.feed.tagid
        }
        const response = await fetch(api, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const jsonResponse = await response.json();
        if (jsonResponse.status === 'success') {
            alert('Article successfully updated!');
            this.setReadOnly();
            this.props.refresher();
        }
    }

    deleteArticle = async (e) => {
        const token = this.props.user.token;
        const api = `${this.state.url}/articles/${this.props.feed.id}`;
        // const data = {
        //     title: this.state.newTitle,
        //     feed: this.state.newFeed,
        //     inappropflag: false,
        //     // tagid: this.props.feed.tagid
        // }
        const response = await fetch(api, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const jsonResponse = await response.json();
        if (jsonResponse.status === 'success') {
            alert('Article successfully deleted!');
            this.props.refresher();
        }
    }

    setOneFeed = (e) => {
        e.preventDefault();
        if (this.state.readOnly && this.props.isNotOneFeed) {
            this.props.setOneFeed(this.props.feed);
            this.props.change(4);
        }
    }

    render() {
        let delet; let edit; let authorName; 
        const category = `${this.props.feed.category}`;
        const dateAndTime = this.state.dateTime;
        console.log(this.state.dateTime);
        if (this.props.user.userId === this.props.feed.authorid){
            delet = 'delete';
            edit = 'edit post';
            if (this.state.readOnly === false) edit = 'cancel';
        }
        authorName = `${this.props.feed.authorfirstname} ${this.props.feed.authorlastname}`;
        let feedVal = this.props.feed.feed; let doneEditing;
        let titleVal = this.props.feed.title;

        let subGroup = <div className = {styles.changable}>
            {/* <span className = {styles.done} onClick = {this.editArticle}>{doneEditing}</span> */}
            <span className = {styles.comment} onClick={this.setOneFeed}>comments</span>
            
            <span className = {styles.delete} onClick = {this.deleteArticle}>{delet}</span>
            <span className = {styles.edit} onClick = {this.setReadOnly}>{edit}</span>
        </div>;
        
        if (!this.state.readOnly) {
            feedVal = this.state.newFeed;
            titleVal = this.state.newTitle;
            doneEditing = 'done';

            subGroup = <div className = {styles.changable}>
                <span className = {styles.comment} onClick={this.setOneFeed}>comments</span>
                <span className = {styles.delete} onClick = {this.deleteArticle}>{delet}</span>
                <span className = {styles.edit} onClick = {this.setReadOnly}>{edit}</span>
                <span className = {styles.done} onClick = {this.editArticle}>{doneEditing}</span>
            </div>;
        }

        if (this.props.oneFeed) subGroup = '';
        return(
            <div className = {styles.container}>
                <div className = {styles.author}>{authorName}</div>
                <input className = {styles.title} type = 'text' value = {titleVal} readOnly = {this.state.readOnly} onChange = {this.setNewTitle}/>
                <textarea className = {styles.feed} onClick = {this.setOneFeed} readOnly = {this.state.readOnly} value = {feedVal} onChange = {this.setNewFeed}></textarea>
                <div className = {styles.bottom}>
                    {subGroup}
                    <div className = {styles.nonChangable}>
                        <span className = {styles.category}>{category}</span>
                        <span className = {styles.date}>{dateAndTime}</span>
                    </div>
                    {/* <hr></hr> */}
                </div>
            </div>
        );
    }
}

export default Article;