import React from 'react';

class Gif extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    deleteGif = async (e) => {
        const token = this.props.user.token;
        const api = `http://localhost:8000/api/v1/gifs/${this.props.feed.id}`;
        const response = await fetch(api, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const jsonResponse = await response.json();
        if (jsonResponse.status === 'success') {
            alert('Gif successfully deleted!');
        }
    }

    render() {
        let delet; let authorName;
        const category = 'category here';
        const dateAndTime = '23-12-2019 3:22am';
        if (this.props.user.userId === this.props.feed.authorid){
            delet = 'delete';
            // edit = 'edit post';
        }
        authorName = `${this.props.feed.authorfirstname} ${this.props.feed.authorlastname}`;
        return(
            <div >
                <span>{authorName}</span>
                <img src = {this.props.feed.feed} alt={this.props.feed.title}></img>
                <span onClick={(e) => this.props.change(4)}>comments</span>
                <span onClick = {this.deleteGif}>{delet}</span>
                {/* <span>{edit}</span> */}
                <span>{category}</span>
                <span>{dateAndTime}</span>
            </div>
        );
    }
}

export default Gif;