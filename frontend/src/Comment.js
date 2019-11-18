import React from 'react';

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // comment
        }
    }

    render() {
        let dateAndTime;
        dateAndTime = this.props.comment.createdon;
        const authorName = `${this.props.comment.firstname} ${this.props.comment.lastname}`;
        return (
            <div>
                <span>{authorName}</span>
                {/* <input type = 'text' value = {titleVal} readOnly = {this.state.readOnly} onChange = {this.setNewTitle}/> */}
                <textarea readOnly value = {this.props.comment.coment}></textarea>
                {/* // <span onClick = {this.editArticle}>{doneEditing}</span>
                // <span onClick={(e) => this.props.change(4)}>comments</span>
                // <span onClick = {this.deleteArticle}>{delet}</span>
                // <span onClick = {this.setReadOnly}>{edit}</span> */}
                <span>{dateAndTime}</span>
            </div>
        );
    }
}

export default Comment;