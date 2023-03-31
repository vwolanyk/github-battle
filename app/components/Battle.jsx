import * as React from 'react'
import { Link }  from 'react-router-dom'
import PropTypes from 'prop-types'



function Instructions () {
  return (
    <section className='instructions-container'>
      <h2>Instructions</h2>
      <ol>
        <li>Enter 2 github users</li>
        <li>Battle On!</li>
        <li>See the Winners!</li>
      </ol>
    </section>
  )
}

PlayerPreview.propTypes = {
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
}

function PlayerPreview ({ username, onReset, label}) {
 return (
  <article className='card'>
    <h3 className='player-label'>{label}</h3>
    <div className="split">
      <div className='row gap-md'>
        <img width={32} height={32} src={`https://github.com/${username}.png?size=200`} alt={`${username} Avatar`} />
        <a href={`https://github.com/${username}`} className="link">{username}</a>
     </div>
      <button onClick={onReset} className="button secondary icon">
        X
      </button>
    </div>
  </article>
 )
}

class PlayerInput extends React.Component {
  state = {
    username: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onSubmit(this.state.username)
  }

  handleChange = (event) => {
    this.setState({ username: event.target.value})
  }

  

  render() {
    return (
      <form className="card" onSubmit={this.handleSubmit}>
        <label htmlFor="username" className="player-label">
          {this.props.label}
        </label>
        <div className="input-row">
          <input
            type="text"
            id="username"
            placeholder="github username"
            autoComplete="off"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <button
            className="btn link"
            type="submit"
            disabled={!this.state.username}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}
// the reason it is a class is because we want it to hold state if it
// is just taking props that are updated externally it could just be a functioncomponent
export default class Battle extends React.Component{
  state ={
    playerOne: null,
    playerTwo: null,
    
  }

 handleSubmit = (id, player) => {
  this.setState({
    [id]: player
  })
  
 }

 handleReset = (id) => {
  this.setState({[id]: null})
  
}


 render() {
  const {playerOne, playerTwo, battle} = this.state;
  const disabled = !playerOne || !playerTwo


  return (
    <main className='stack main stack animate-in'>
      <div className='split'>
        <h1>Players</h1>
          <Link
          to={{
            pathname:'/results',
            search: `playerOne=${playerOne}&playerTwo=${playerTwo}`
          }}>
          Battle
          </Link>
      </div>
      <section className='grid'>
        { playerOne === null ? (
        <PlayerInput 
        label="Player One"
        onSubmit={(player) => this.handleSubmit("playerOne", player)}/>
        ) : <PlayerPreview username={playerOne} onReset={() => this.handleReset("playerOne")} label="Player One"/>
        }
        { playerTwo === null ? (
        <PlayerInput
         label="Player Two"
         onSubmit={(player) => this.handleSubmit("playerTwo", player)}/>
         ) :  <PlayerPreview username={playerTwo} onReset={() => this.handleReset("playerTwo")} label="Player Two"/>
         }
      </section>
      <Instructions/>
    </main>
  )
 }
}