import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/home';
import UserProfile from './components/UserProfile';
import Debits from './components/Debits';
import AccountBalance from "./components/AccountBalance"
import Credits from "./components/Credits"
import LogIn from "./components/LogIn"
import axios from "axios"
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      accountBalance: 0,
      currentUser: {
        userName: 'raj_ruvi',
        membership: '01/01/2021',
      },
      debits: [],
      credits: []
    }
    this.addDebit = this.addDebit.bind(this)
    this.addCredit = this.addCredit.bind(this)
  }

  async componentDidMount() {
    let debits = await axios.get("https://moj-api.herokuapp.com/debits")
    let credits = await axios.get("https://moj-api.herokuapp.com/credits")
    debits = debits.data
    credits = credits.data
    let debitSum = 0;
    let creditSum = 0;

    debits.forEach((debit) => {
      debitSum += debit.amount
    })
    credits.forEach((credit) => {
      creditSum += credit.amount
    })
    const accountBalance = creditSum - debitSum
    debugger
    this.setState({debits, credits, accountBalance})
  } 

  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }
  
  addCredit(event) {
    event.preventDefault()
    const {credits, accountBalance } = this.state;
    const description  = event.target[0].value;
    const amount  = Number(event.target[1].value);
    const date = event.target[2].value;
    const newCredit = [{description, amount, date}];
    this.setState({credits: credits.concat(newCredit), accountBalance: accountBalance + amount});
  }
  

  addDebit(event) {
    event.preventDefault()
    const {debits, accountBalance } = this.state;
    const description  = event.target[0].value;
    const amount  = Number(event.target[1].value);
    const date = event.target[2].value;
    const newDebit = [{description, amount, date}];
    this.setState({debits: debits.concat(newDebit), accountBalance: accountBalance - amount});
}


  render() {
    const { debits, credits } = this.state
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (
        <UserProfile userName={this.state.currentUser.userName} membership={this.state.currentUser.membership}  />
    );
    const DebitsComponent = () => (<Debits addDebit={this.addDebit} debits={debits} />)
    const AccountBalanceComponent = () => <AccountBalance accountBalance={this.state.accountBalance}/>
    const CreditsComponent = () => <Credits addCredit={this.addCredit} credits={credits} />
    const LogInComponent = () => (<LogIn user={this.state.currentUser}  mockLogIn={this. mockLogIn} {...this.props}/>)
    
    return (
        <Router>
        <div className="App">
        <div className="App-header">
          <Switch>
            <Route exact path="/" render={HomeComponent}/>
           
            <Route exact path="/login" render={LogInComponent}/>
          
            <Route exact path="/userProfile" render={UserProfileComponent}/>
            
            <Route exact path="/debits" render={DebitsComponent}/>
            
            <Route exact path="/credits" render={CreditsComponent}/>
           
            <Route path="/" render={AccountBalanceComponent} />
          </Switch>
          </div>
          </div>

        </Router>
    );
  }

}
export default App;
