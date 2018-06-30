import React, { Component} from 'react'
import ReactDOM from 'react-dom'

import DatePicker from 'react-datepicker';
import moment from 'moment';

import axios from 'axios';

import Home from './Home.js'
import Results from './Results.js'

class Layout extends Component {
  constructor () {
    super()
    this.state = {
      name: 'Joe',
      location: 'home',
      date: moment(),
      data: ''
    }

    this.routingSystem = this.routingSystem.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.apiCall = this.apiCall.bind(this)
  }

  routingSystem () {
    switch(this.state.location) {
        case 'home':
            return <Home handleDateChange={this.handleDateChange} globalState={this.state} />
            break;

        case 'results':
            return <Results />
            break;

        default:
            return <Home />
    }
  }

  handleDateChange(date) {
    this.setState({
      date: date
    }, () => console.log(this.state.date.unix()));
  }

  apiCall() {
    // https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=BTC,USD,EUR&ts=1452680400&extraParams=your_app_name

    var self = this;

    axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=BTC,USD,EUR&ts=1452680400&extraParams=your_app_name')
      .then(function (response) {
        // console.log(response.data.ETH);

        // this.setState is not correct
        self.setState({
          data: response.data.ETH
        }, () => {
          console.log(response.data.ETH);

        })

      })

      .catch(function (error) {
        console.log(error);
      });
  }

  render () {
    return (<div className='home'>
        <div className="container">
          <header>
            <div className="logo" onClick={this.apiCall}>
              Crypto Profits
            </div>

            <nav className="menu">
              <a href="#" className="main-btn">Register</a>
            </nav>
          </header>

          {this.routingSystem()}
        </div>
      </div>)
  }
}

const app = document.getElementById('app')

ReactDOM.render(<Layout />, app)
