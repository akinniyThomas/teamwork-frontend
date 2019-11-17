import React from 'react';

class Gif extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        let delet; let edit; let authorName;
        const category = 'category here';
        const dateAndTime = '23-12-2019 3:22am';
        if (this.props.user.userId === this.props.feed.authorid){
            delet = 'delete';
            edit = 'edit post';
        }
        authorName = `${this.props.feed.authorfirstname} ${this.props.feed.authorlastname}`;
        return(
            <div >
                <span>{authorName}</span>
                <img src = {this.props.feed.feed} alt={this.props.feed.title}></img>
                <span onClick={(e) => this.props.change(4)}>comments</span>
                <span>{delet}</span>
                <span>{edit}</span>
                <span>{category}</span>
                <span>{dateAndTime}</span>
            </div>
        );
    }
}

export default Gif;