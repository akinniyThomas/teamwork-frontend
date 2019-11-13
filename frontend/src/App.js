import React from 'react';
import './App.css';
import SignIn from './Signin';
import SignUp from './Signup';
import Home from './Home';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pageNumber: 1
    };
    this.changePage = this.changePage.bind(this);
  }

  changePage = (pageNumber) => {
    this.setState({pageNumber: pageNumber});
    console.log(this.state.pageNumber);
  } 
  render() {
    let page;
    if(this.state.pageNumber === 1) page = <SignIn  change = {this.changePage}/>
    else if(this.state.pageNumber === 2) page = <SignUp change = {this.changePage}/>
    else page = <Home change = {this.changePage}/>
  return (
    <div  className="App">
      {page}
    </div>
  );}
}

export default App;