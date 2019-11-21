import React from 'react';
import Article from './Article';
import Gif from './Gif';
import RadioButtons from './RadioButtons';
import NewPosts from './NewPosts';
import styles from './styles/Home.module.css';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feeds: [],
            articles: [],
            gifs: [],
            showFeeds: false,
            selectedState: 'articleState',
            postPage: null
        }
        this.refresher();
    }

    setFeed = (feed) =>
        this.setState({feeds: feed});

    setArticle = articles => this.setState({articles: articles});

    setGifs = gifs => this.setState({gifs: gifs});

    setShowFeeds = e => this.setState({showFeeds: !this.state.showFeeds});

    setCheckedState = e => this.setState({
        selectedState: e.target.value,
        postPage: null
    });

    makeRequests = async (verb, api, data, token, upload) => {
        if (verb === 'POST' && upload) {
            const uploadData = new FormData();
            uploadData.append('inappropflag', data.inappropflag);
            uploadData.append('upload file', data.selectedFile);
            uploadData.append('title', data.title);
            uploadData.append('tagid', data.tagid);
            uploadData.append('authorid', data.authorid);
        const response = await fetch(api, {
                method: verb,
                headers: {
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization' : `Bearer ${token}`
                },
                body: uploadData
            });
            return await response.json();
        } else if (verb === 'GET') {
            const response = await fetch(api, {
                method: verb,
                params: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            return await response.json();
        } else if((verb === 'POST' && !upload) || (verb === 'PATCH' && !upload) || 'DELETE') {
            const response = await fetch(api, {
                method: verb,
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            return await response.json();
        }
    }

    getFeeds = async () => {
        const api = 'http://localhost:8000/api/v1/feed';
        const token = this.props.user.token;
        // const param = {
        //     userId: this.props.user.userId
        // }
        const feedsGotten = await this.makeRequests('GET', api, '', token, false);
        if (feedsGotten.status === 'success') {
            const feed = feedsGotten.data;
            this.setFeed(feed);
            console.log(feed);
        } else if (feedsGotten.error.message === 'no rows') {
            this.setFeed([]);
        }
    }

    getMyArticlesAndGifs = async () => {
        let api = 'http://localhost:8000/api/v1/articles';
        const token = this.props.user.token;
        const articlesGotten = await this.makeRequests('GET', api, '', token, false);
        if (articlesGotten.status === 'success') {
            const articles = articlesGotten.data;
            this.setArticle(articles);
            console.log(articles);
        } else if (articlesGotten.error.message === 'no rows') {
            this.setArticle([]);
        }
        api = 'http://localhost:8000/api/v1/gifs';
        const gifsGotten = await this.makeRequests('GET', api, '', token, false);
        if (gifsGotten.status === 'success') {
            const gifs = gifsGotten.data;
            this.setGifs(gifs);
            console.log(gifs);
        } else if (gifsGotten.error.message === 'no rows') {
            this.setGifs([]);
        }
    }

    newPoster = (post) => <NewPosts user = {this.props.user} artORgif = {post} postPosts = {this.postPosts}/>

    postPosts = async (feeds, title, inappropflag, authorid, tagid, selectedFiles, artORgif) => {
        let feed; let api; let selectedFile;
        if (artORgif === 'article') {
            feed = feeds;
            api = 'http://localhost:8000/api/v1/articles';
            selectedFile = null;
        } else {
            feed = '';
            api = 'http://localhost:8000/api/v1/gifs';
            selectedFile = selectedFiles;
        }
        const data = {
            title,
            inappropflag,
            authorid,
            tagid,
            feed,
            selectedFile
        }
        const token = this.props.user.token;
        console.log(data);
        let response;
        if (artORgif === 'gif')
        response = await this.makeRequests('POST', api, data, token, true);
        else response = await this.makeRequests('POST', api, data, token, false);
        if (response.status === 'success') {
            alert('Post Done Successfully');
            this.setState({
                postPage: null
            });
            this.refresher();
        } else {
            alert('Issue encountered with Post..');
        }
    }

    setPostPage = (page) => {
        if (this.state.postPage !== page) {
            this.setState({
            postPage: page
        });} else {
            this.setState({
                postPage: null
            });
        }
    }

    refresher = () => {
        this.getFeeds();
        this.getMyArticlesAndGifs();
    }

    render() {
        let feed; let show = 'Show Feeds'; let radioButtons;
        let newPost; let NewPost;
        // let createUser;
        radioButtons = <RadioButtons selectedState = {this.state.selectedState} setCheckedState = {this.setCheckedState} valueOne = 'articleState' valueTwo = 'gifState' radioOne = 'Article' radioTwo = 'Gif' name = 'gif_art' home = {true}/>
        if (this.state.showFeeds && this.state.feeds !== []) {
            feed = this.state.feeds.map((feed) => {
                if (feed.feedtype === 'art') return <Article feed = {feed} key = {feed.id} user = {this.props.user} change = {this.props.change} setOneFeed = {this.props.setOneFeed} refresher = {this.refresher} isNotOneFeed = {true}/>
                else if (feed.feedtype === 'gif') return <Gif feed = {feed} key = {feed.id} user = {this.props.user} change = {this.props.change} setOneFeed = {this.props.setOneFeed} refresher = {this.refresher} isNotOneFeed = {true}/>
            });
            show = 'Show My Articles/Gifs';
            radioButtons = '';
        } else if (!this.state.showFeeds && this.state.selectedState === 'articleState' && this.state.articles !== []) {
            feed = this.state.articles.map((feed) => <Article feed = {feed} key = {feed.id} user = {this.props.user} change = {this.props.change} setOneFeed = {this.props.setOneFeed} refresher = {this.refresher} isNotOneFeed = {true}/>
            );
            newPost = <label className = {styles.newPost} onClick = {(e) => this.setPostPage('article')}>Post New Article</label>
        } else if (!this.state.showFeeds && this.state.selectedState === 'gifState' && this.state.gifs !== []) {
            feed = this.state.gifs.map((feed) => <Gif feed = {feed} key = {feed.id} user = {this.props.user} change = {this.props.change} setOneFeed = {this.props.setOneFeed} refresher = {this.refresher} isNotOneFeed = {true}/>
            );
            newPost = <label className = {styles.new} onClick = {(e) => this.setPostPage('gif')}>Post New Gif</label>;
        }
        if (newPost && this.state.postPage) NewPost = this.newPoster(this.state.postPage);

        return(
            <div className = {styles.container}>
                <h1 className = {styles.header}>Home</h1>
                {/* {/* <div>{this.props.user.userId}</div>
                <p>My Name is {this.props.user.userFirstName}  {this.props.user.userLastName} with Number {this.props.user.userStaffNumber}</p> */}
                <div>
                    <label className = {styles.showFeeds} onClick = {this.setShowFeeds}>{show}</label>
                </div> 
                <div>
                    {radioButtons}
                </div>
                {newPost}
                <hr></hr>
                {NewPost}
                <div className = {styles.artGif}>
                    {feed}
                </div>
                {/* <Gif/>
                <Article/> */}
            </div>
        );
    }
}

export default Home;