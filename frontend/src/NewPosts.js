import React from 'react';
import styles from './styles/NewPost.module.css';

class NewPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // data:{
                feed: '',
                title: '',
                inappropflag: false,
                authorid: this.props.user.userId,
                tagid: 1,
                tag: 'casual',
                selectedFile: null
            }
        // }
    }

    setData = (e) => {
        this.setState({[e.target.name]: e.target.value});
        if(e.target.name === 'tag') {
            let tagid;
            switch (e.target.value) {
                case 'casual':
                    tagid = 1;
                    break;
                case 'work':
                    tagid = 2;
                    break;
                case 'family':
                    tagid = 3;
                    break;
                default:
                    tagid = 1
                    break;
            }
            this.setState({tagid: tagid});
        }
    }

    setFile = e => {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }

    MakePost = e => {
        e.preventDefault();
        this.props.postPosts(this.state.feed, this.state.title, this.state.inappropflag, this.state.authorid, this.state.tagid, this.state.selectedFile, this.props.artORgif);
    }

    render() {
        let page;
        if (this.props.artORgif === 'article') {
           page = <div>
                <form className = {styles.formContainer} onSubmit = {this.MakePost}>
                    <input className = {styles.title} type = 'text' value = {this.state.title} onChange = {this.setData} name = 'title' placeholder = 'Enter Title Here'/>
                    <textarea className = {styles.feed} value = {this.state.feed} onChange = {this.setData} name = 'feed' placeholder = 'Article Here'></textarea>
                    <select className = {styles.category} value = {this.state.tag} onChange = {this.setData} name = 'tag'>
                        <option value = 'casual'>Casual</option>
                        <option value = 'work'>Work</option>
                        <option value = 'family'>Family</option>
                    </select>
                    <button className = {styles.button }>Post Article</button>
                </form>
            </div>
        } else {
            page = <div>
                <form onSubmit = {this.MakePost}>
                    <input type = 'text' value = {this.state.title} onChange = {this.setData} name = 'title'/>
                    <input type = 'file' onChange = {this.setFile} name = 'file'/>
                    <select value = {this.state.tag} onChange = {this.setData} name = 'tag'>
                        <option value = 'casual'>Casual</option>
                        <option value = 'work'>Work</option>
                        <option value = 'family'>Family</option>
                    </select>
                    <button>Post Gif</button>
                </form>
            </div>
        }
        return (
            <div className = {styles.container}>
                {page}
            </div>
        );
    }
}

export default NewPosts;