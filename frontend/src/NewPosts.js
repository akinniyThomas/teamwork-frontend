import React from 'react';

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

    render() {
        let page;
        if (this.props.artORgif === 'article') {
           page = <div>
                <input type = 'text' value = {this.state.title} onChange = {this.setData} name = 'title'/>
                <textarea value = {this.state.feed} onChange = {this.setData} name = 'feed'></textarea>
                <select value = {this.state.tag} onChange = {this.setData} name = 'tag'>
                    <option value = 'casual'>Casual</option>
                    <option value = 'work'>Work</option>
                    <option value = 'family'>Family</option>
                </select>
            </div>
        } else {
            page = <div>
                <input type = 'text' value = {this.state.title} onChange = {this.setData} name = 'title'/>
                <input type = 'file' onChange = {this.setFile} name = 'file'/>
                <select value = {this.state.tag} onChange = {this.setData} name = 'tag'>
                    <option value = 'casual'>Casual</option>
                    <option value = 'work'>Work</option>
                    <option value = 'family'>Family</option>
                </select>
            </div>
        }
        return (
            <div>
                {page}
            </div>
        );
    }
}

export default NewPosts;