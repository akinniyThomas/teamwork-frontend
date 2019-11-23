import React from 'react';
import Comment from './Comment';
import Article from './Article';
import Gif from './Gif';
import styles from './styles/OneFeed.module.css';

class OneFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            commentText: ''
        }
        this.makeRequest();
    }

    setComments = comments => this.setState({comments: comments});

    setCommentText = e => this.setState({commentText: e.target.value});

    makeRequest = async () => {
        let api;
        const token = this.props.user.token;
        if (this.props.feed.feedtype === 'art') api = `http://localhost:8000/api/v1/articles/${this.props.feed.id}`;
        else api = `http://localhost:8000/api/v1/gifs/${this.props.feed.id}`;
        const response = await fetch(api, {
            method: 'GET',
            // params: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('right here waiting...');
        const jsonResponse = await response.json();
        if (jsonResponse.status === 'success') {
            this.setComments(jsonResponse.data.comments);
            console.log(jsonResponse.data);
        }
    }

    postComment = async (e) => {
        e.preventDefault();
        let api;
        const token = this.props.user.token;
        if (this.props.feed.feedtype === 'art') api = `http://localhost:8000/api/v1/articles/${this.props.feed.id}/comment`;
        else api = `http://localhost:8000/api/v1/gifs/${this.props.feed.id}/comment`;
        const data = {
            coment: this.state.commentText,
            inappropflag: false,
            authorid: this.props.user.userId
        };
        const response = await fetch(api, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const jsonResponse = await response.json();
        if (jsonResponse.status === 'success') {
            alert('comment successfully posted');
            this.setState({commentText: ''});
            this.makeRequest();
        }
    }

    render() {
        let feed;
        if (this.props.feed.feedtype === 'art') {
            feed = <Article feed = {this.props.feed} key = {this.props.feed.id} user = {this.props.user} oneFeed = {true}/>

            // <Article feed = {feed} key = {feed.id} user = {this.props.user} change = {this.props.change} setOneFeed = {this.props.setOneFeed}/>
        }
        else {
            feed = <Gif feed = {this.props.feed} key = {this.props.feed.id} user = {this.props.user} oneFeed = {true}/>
        }

        let comment = this.state.comments.map((comment) =>         <Comment user = {this.props.user} comment = {comment} feed = {this.props.feed} key = {comment.comentid}/>
        );
        return(
            <div >
                <div className = {styles.backHome}>
                    <h4 onClick = {e => this.props.change(3)}>&larr;Go Back</h4>
                </div>
                <h3>{feed}</h3>

                <div className = {styles.container}>
                    <form className = {styles.formContainer} onSubmit = {this.postComment}>
                        <input className = {styles.comment} type = 'text' value = {this.state.commentText} onChange = {this.setCommentText} placeholder = 'Your Thoughts...'/>
                        <button>Post Comment</button>
                    </form>
                </div>

                {comment}
            </div>
        );
    }
}

export default OneFeed;