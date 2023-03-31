import React from 'react';
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api';
import Table from './Table';
import Tooltip from './Tooltip';

function LanguagesNav({onUpdateLanguage, selectedLanguage}){

  const languageOptions = ["All", "Javascript", "Ruby", "Java", "CSS", "Python"]

  return (
    <select
    onChange={(e) => onUpdateLanguage(e.target.value)}
    selected={selectedLanguage}
    >
      {
        languageOptions.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))
      }
   
    </select>
  )
}

LanguagesNav.propTypes = {
  onUpdateLanguage: PropTypes.func.isRequired,
  selectedLanguage: PropTypes.string.isRequired
}

export default class Popular extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedLanguage: "All",
      repos: null,
      error: null
    }

    this.updateLanguage = this.updateLanguage.bind(this)
  }

  updateLanguage(language){
    this.setState({ selectedLanguage: language, error: null })
    fetchPopularRepos(language)
    .then((repos) => this.setState({repos, error: null}))
    .catch((error) => {
      console.warn("error getting repos:", error)
      this.setState({error: 'error fetching repos'})
    })
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage)
  }

  render () {
  
    return(
      <main className='stack main-stack animate-in'>
        <div className='split'>
        <h1>Popular</h1>
        <LanguagesNav 
          onUpdateLanguage={this.updateLanguage}
          selectedLanguage={this.state.selectedLanguage}/>
          </div>
        {this.state.error && <p className='text-center error'>{this.state.error}</p> }

        {this.state.repos && <Table repos={this.state.repos}/> }
      </main>
    )
   
  }
}

