import React from 'react';

class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            readOnly: true,
            newFeed: this.props.feed.feed,
            newTitle: this.props.feed.title
        }
    }

    setReadOnly = e => this.setState({readOnly: !this.state.readOnly});

    setNewFeed = e => this.setState({newFeed: e.target.value});

    setNewTitle = e => this.setState({newTitle: e.target.value});

    editArticle = async (e) => {
        const token = this.props.user.token;
        const api = `http://localhost:8000/api/v1/articles/${this.props.feed.id}`;
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
        }
    }

    deleteArticle = async (e) => {
        const token = this.props.user.token;
        const api = `http://localhost:8000/api/v1/articles/${this.props.feed.id}`;
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
        }
    }

    render() {
        let delet; let edit; let authorName; 
        const category = `${this.props.feed.category}`;
        const dateAndTime = `${this.props.feed.createdon}`;
        if (this.props.user.userId === this.props.feed.authorid){
            delet = 'delete';
            edit = 'edit post';
        }
        authorName = `${this.props.feed.authorfirstname} ${this.props.feed.authorlastname}`;
        let feedVal = this.props.feed.feed; let doneEditing;
        let titleVal = this.props.feed.title;
        if (!this.state.readOnly) {
            feedVal = this.state.newFeed;
            titleVal = this.state.newTitle;
            doneEditing = 'Done';
        }
        return(
            <div >
                <span>{authorName}</span>
                <input type = 'text' value = {titleVal} readOnly = {this.state.readOnly} onChange = {this.setNewTitle}/>
                <textarea readOnly = {this.state.readOnly} value = {feedVal} onChange = {this.setNewFeed}></textarea>
                <span onClick = {this.editArticle}>{doneEditing}</span>
                <span onClick={(e) => this.props.change(4)}>comments</span>
                <span>{category}</span>
                <span onClick = {this.deleteArticle}>{delet}</span>
                <span onClick = {this.setReadOnly}>{edit}</span>
                <span>{dateAndTime}</span>
            </div>
        );
    }
}

export default Article;