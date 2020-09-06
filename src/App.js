import React, { Component } from 'react';
import './App.css';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    }
  }

  componentDidMount(){
    //fetch('http://jsonplaceholder.typicode.com/users')
    //fetch('http://jhendpoint0845.azurewebsites.net/api/allstaff')

    //the 'core-anywhere' prefix url is an app that removes the CORS access-origin error from sometimes occuring
    //when accessing web apis. This is a temporary solution used duriing development and before
    //an SSL certificate is purchased and deployed to the production web api backend.
    fetch('https://cors-anywhere.herokuapp.com/http://jhendpoint0845.azurewebsites.net/api/allstaff')
    .then(res => res.json())
    .then(json => {
      this.setState({
        isLoaded: true,
        items: json,
      })
    });
  }

  render(){

    var { isLoaded, items } = this.state;

    if (!isLoaded){
      return <div>Web app starting and data is being fetched...</div>
    }
    else{
      return(
        <div className="bannertext">
          <label>JH Technical Assignment: Staff Data Displayed and Sorted on Sales Figures</label>
          <div>
          <table className="datatable">
              <thead className="datatableheader">
                <td>Employee ID</td>
                <td>First Name</td>
                <td>Surname</td>
                <td>Manager</td>
                <td>YTD Sales</td>
              </thead>
            {items.map(item => (
              <tbody key={item.id}>
                <td>{item.employeeId}</td>
                <td>{item.firstName} </td>
                <td>{item.surname}</td>
                <td>{item.reportsTo}</td>
                <td>£{item.ytdsales}</td>
              </tbody>
            ))}
          </table>
        </div>
        </div>
      );
    }
  }
}

export default App;
