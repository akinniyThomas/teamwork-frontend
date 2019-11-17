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

    makeRequests = async (verb, api, data, token, isSignin) => {
        if (verb === 'POST' && isSignin) {
        const response = await fetch(api, {
                method: verb,
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
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
        } else if((verb === 'POST' && !isSignin) || verb === 'PATCH' || 'DELETE') {
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
        const param = {
            userId: this.props.user.userId
        }
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

    newPoster = (post) => <NewPosts user = {this.props.user} artORgif = {post}/>

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