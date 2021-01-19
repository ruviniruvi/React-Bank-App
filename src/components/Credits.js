import React from 'react';
import {Link } from 'react-router-dom';


class Credits extends React.Component {

    CreditsView() {
        const { credits } = this.props;
        return credits.map((credit) => {
            return <li key={credit.id}>{credit.amount} {credit.description} {credit.date}</li>
        }) 
    }

    render() {
        const { addCredit } = this.props
        return <div className="card">
            <h1>CREDITS</h1>
            {this.CreditsView()}
            <br/>
            <form action="#" onSubmit={addCredit}>
                Description: <input type="text" name="description" />
                Amount: <input type="number" name="amount" />
                Date: <input type="date" name="date" />
                <button type="submit">Add Credit</button>
            </form>

                <br/>
                <br/>
                <Link to="/">Return to Home</Link>
                <br/>
                <Link to="/login">Log in</Link>
                <br/>
                <Link to="/userProfile">User Profile</Link>
                <br/>
                <Link to="/debits">Debits</Link>
                <br/>
                <Link to="/credits">Credits</Link>
        </div>
    }









}

export default Credits;