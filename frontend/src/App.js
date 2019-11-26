import React from 'react';
import './App.css';
import SignIn from './Signin';
import SignUp from './Signup';
import Home from './Home';
import OneFeed from './OneFeed';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pageNumber: 1,
      user : {
        userId: 0,
        firstname: '',
        lastname: '',
        staffnumber: '',
        token: '',
        administrator: false
      },
      feed: {}
    };
    // this.changePage = this.changePage.bind(this);
  }

  setFeed = (feed) => this.setState({feed: feed});

  userPage = (e) => this.setPageNumber(2);

  setPageNumber = (pageNumber) => {
    this.setState({pageNumber: pageNumber});
    console.log(this.state.pageNumber);
  } 

  setUser = (user) => {
    this.setState({
      user: {
        userId: user.userId,
        token: user.token,
        administrator: user.administrator,
        firstname: user.firstname,
        lastname: user.lastname,
        staffnumber: user.staffnumber
      }
    });
  }

  Logout = e => {
    const user = {
      userId: 0,
      firstname: '',
      lastname: '',
      staffnumber: '',
      token: '',
      administrator: false
    };
    this.setUser(user);
    this.setPageNumber(1);
  }

  teamworkClick = e => {
    if (this.state.user.userId !== 0) this.setPageNumber(3);
  }

  render() {
    let page; let fullName; let logOutIn; let createUser;
    if(this.state.pageNumber === 1) page = <SignIn  change = {this.setPageNumber} user = {this.setUser}/>
    else if(this.state.pageNumber === 2) {
      fullName = `${this.state.user.firstname} ${this.state.user.lastname} [${this.state.user.staffnumber}]`;
      logOutIn = 'Logout';
      page = <SignUp change = {this.setPageNumber} user = {this.state.user}/>
    }
    else if(this.state.pageNumber === 3) {
      fullName = `${this.state.user.firstname} ${this.state.user.lastname} [${this.state.user.staffnumber}]`;
      logOutIn = 'Logout';
      page = <Home change = {this.setPageNumber} user = {this.state.user} setOneFeed = {this.setFeed}/>
    } else {
      fullName = `${this.state.user.firstname} ${this.state.user.lastname} [${this.state.user.staffnumber}]`;
      logOutIn = 'Logout';
      page = <OneFeed change = {this.setPageNumber} user = {this.state.user} feed = {this.state.feed}/>
    }
    if (this.state.user.administrator) createUser = 'Create New User';
  return (
    <div  className="App">
      <div className = 'Header'>
        <span className = {`${this.state.user.userId !== 0 ?'Teamwork' : 'notLogedIn'}`} onClick = {this.teamworkClick}>TeamWork</span>
        <div className = 'RightSection'>
          <span className = 'CreateUser' onClick = {this.userPage}>{createUser}</span>
          <span className = 'FullName'>{fullName}</span>
          <span className = 'LogInOut' onClick = {this.Logout}>{logOutIn}</span>
        </div>
      </div>
      {page}
    </div>
  );}
}

export default App;