import React from 'react';
import './App.css';
import SignIn from './Signin';
import SignUp from './Signup';
import Home from './Home';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pageNumber: 1,
      user : {
        userId: 0,
        token: '',
        administrator: false
      }
    };
    // this.changePage = this.changePage.bind(this);
  }

  setPageNumber = (pageNumber) => {
    this.setState({pageNumber: pageNumber});
    console.log(this.state.pageNumber);
  } 

  setUser = (user) => {
    this.setState({
      user: {
        userId: user.userId,
        token: user.token,
        administrator: user.administrator
      }
    });
  }

  render() {
    let page;
    if(this.state.pageNumber === 1) page = <SignIn  change = {this.setPageNumber} user = {this.setUser}/>
    else if(this.state.pageNumber === 2) page = <SignUp change = {this.setPageNumber}/>
    else page = <Home change = {this.setPageNumber} user = {this.state.user}/>
  return (
    <div  className="App">
      {page}
    </div>
  );}
}

export default App;