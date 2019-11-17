import React from 'react';
import Article from './Article';
import Gif from './Gif';
import RadioButtons from './RadioButtons';
import NewPosts from './NewPosts';

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
        this.getFeeds();
        this.getMyArticlesAndGifs();
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
            // uploadData.append
        const response = await fetch(api, {
                method: verb,
                headers: {
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization' : `Bearer ${token}`
                },
                body: data
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
        }
        api = 'http://localhost:8000/api/v1/gifs';
        const gifsGotten = await this.makeRequests('GET', api, '', token, false);
        if (gifsGotten.status === 'success') {
            const gifs = gifsGotten.data;
            this.setGifs(gifs);
            console.log(gifs);
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
        }
    }

    setPostPage = (page) => this.setState({
        postPage: page
    });

    render() {
        let feed; let show = 'Show Feeds'; let radioButtons;
        let newPost; let NewPost;
        radioButtons = <RadioButtons selectedState = {this.state.selectedState} setCheckedState = {this.setCheckedState}/>
        if (this.state.showFeeds) {
            feed = this.state.feeds.map((feed) => {
                if (feed.feedtype === 'art') return <Article feed = {feed} key = {feed.id} user = {this.props.user} change = {this.props.change}/>
                else if (feed.feedtype === 'gif') return <Gif feed = {feed} key = {feed.id} user = {this.props.user} change = {this.props.change}/>
            });
            show = 'Show My Articles/Gifs';
            radioButtons = '';
        } else if (!this.state.showFeeds && this.state.selectedState === 'articleState') {
            feed = this.state.articles.map((feed) => <Article feed = {feed} key = {feed.id} user = {this.props.user} change = {this.props.change}/>
            );
            newPost = <label onClick = {(e) => this.setPostPage('article')}>Post New Article</label>
        } else if (!this.state.showFeeds && this.state.selectedState === 'gifState') {
            feed = this.state.articles.map((feed) => <Gif feed = {feed} key = {feed.id} user = {this.props.user} change = {this.props.change}/>
            );
            newPost = <label onClick = {(e) => this.setPostPage('gif')}>Post New Gif</label>;
        }
        if (newPost && this.state.postPage) NewPost = this.newPoster(this.state.postPage);

        return(
            <div className="home">
                <h1>Home</h1>
                {/* {/* <div>{this.props.user.userId}</div>
                <p>My Name is {this.props.user.userFirstName}  {this.props.user.userLastName} with Number {this.props.user.userStaffNumber}</p> */}
                <div>
                    <label onClick = {this.setShowFeeds}>{show}</label>
                </div> 
                <div>
                    {radioButtons}
                </div>
                {newPost}
                {NewPost}
                {feed}
                {/* <Gif/>
                <Article/> */}
            </div>
        );
    }
}

export default Home;