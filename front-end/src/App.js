import React, { Component, Text } from "react";


class App extends Component {
  state = { users: [], clicked: false }

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }


  render(){
    return (
      <div className="App">
        <h1>Users</h1>
        <button onClick={() => this.setState({clicked: true})}>Afficher les users</button>
        {this.state.clicked ?
            (<ul>
                {this.state.users.map(user =><li key={user.id}>{user.username}</li>)}
            </ul>)
        :
        null}
        <br></br>
      </div>      
    );
  }
  
}
export default App;