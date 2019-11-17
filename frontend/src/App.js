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
      }
    };
    // this.changePage = this.changePage.bind(this);
  }

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

  render() {
    let page; let fullName; let logOutIn; let createUser;
    if(this.state.pageNumber === 1) page = <SignIn  change = {this.setPageNumber} user = {this.setUser}/>
    else if(this.state.pageNumber === 2) {
      fullName = `${this.state.user.firstname} ${this.state.user.lastname} [${this.state.user.staffnumber}]`;
      logOutIn = 'Logout';
      page = <SignUp change = {this.setPageNumber}/>
    }
    else if(this.state.pageNumber === 3) {
      fullName = `${this.state.user.firstname} ${this.state.user.lastname} [${this.state.user.staffnumber}]`;
      logOutIn = 'Logout';
      page = <Home change = {this.setPageNumber} user = {this.state.user}/>
    } else {
      fullName = `${this.state.user.firstname} ${this.state.user.lastname} [${this.state.user.staffnumber}]`;
      logOutIn = 'Logout';
      page = <OneFeed change = {this.setPageNumber} user = {this.state.user}/>
    }
    if (this.state.user.administrator) createUser = 'Create New User';
  return (
    <div  className="App">
      <div>
        <span>TeamWork</span>
        <span onClick = {this.userPage}>{createUser}</span>
        <span>{logOutIn}</span>
        <span>{fullName}</span>
      </div>
      {page}
    </div>
  );}
}

export default App;