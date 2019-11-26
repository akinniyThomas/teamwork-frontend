import React from 'react';
import styles from './styles/Comment.module.css';

class Comment extends React.Component {
    constructor(props) {
        super(props);
        
        const dateCreated = this.props.comment.createdon;
        const dateAndTime = dateCreated.split('T');
        const date = dateAndTime[0];
        const time = dateAndTime[1].substring(0, 5);
        const dateTime = `${date} @ ${time}`;

        this.state = {
            dateTime: dateTime
        }
    }

    render() {
        const dateAndTime = this.state.dateTime;
        const authorName = `${this.props.comment.firstname} ${this.props.comment.lastname}`;
        return (
            <div className = {styles.container}>
                <span className = {styles.author}>{authorName}</span>
                {/* <input type = 'text' value = {titleVal} readOnly = {this.state.readOnly} onChange = {this.setNewTitle}/> */}
                <label className = {styles.comment} readOnly value = {this.props.comment.coment}>{this.props.comment.coment}</label>
                {/* // <span onClick = {this.editArticle}>{doneEditing}</span>
                // <span onClick={(e) => this.props.change(4)}>comments</span>
                // <span onClick = {this.deleteArticle}>{delet}</span>
                // <span onClick = {this.setReadOnly}>{edit}</span> */}
                <span className = {styles.date}>{dateAndTime}</span>
            </div>
        );
    }
}

export default Comment;