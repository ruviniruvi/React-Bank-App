import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link, Route} from 'react-router-dom';
import Bank from '../images/Bank.jpg';
class Home extends Component {
  render() {
    return (
     
        <div>
          
          <img src= {Bank} alt="bank"/>
          <h1>Bank of React</h1>

          <Link to="/login">Log in</Link>
          <br/>
          <Link to="/userProfile">User Profile</Link>
          <br/>
          <Link to="/debits">Debits</Link>
          <br/>
          <Link to="/credits">Credits</Link>
          <AccountBalance accountBalance={this.props.accountBalance}/>
         
        </div>
   
    );
  }
}

export default Home;