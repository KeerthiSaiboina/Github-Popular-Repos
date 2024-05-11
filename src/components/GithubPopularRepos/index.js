import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRespos extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    repositoriesData: [],
    activelanguageFilterId: languageFiltersData[0].id,
  }

  componentWillDidMount = () => {
    this.getRepositories()
  }

  getRepositories = async () => {
    const {activelanguageFilterId} = this.state
    this.setState({apiStatusConstants: apiStatusConstants.inProgress})
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activelanguageFilterId}`,
    )
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachData => ({
        id: eachData.id,
        name: eachData.name,
        issuesCount: eachData.issues_count,
        forksCount: eachData.forks_count,
        starsCount: eachData.stars_count,
        avatarUrl: eachData.avatar_url,
      }))
      this.setState({
        repositoriesData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  renderRepositoriesListView = () => {
    const {repositoriesData} = this.state
    return (
      <ul>
        {repositoriesData.map(eachData => (
          <RepositoryItem key={eachData.id} repositoriesDetails={eachData} />
        ))}
      </ul>
    )
  }

  renderRepository = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoriesListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  setActiveLanguageFilterId = newFilterId => {
    this.setState({activelanguageFilterId: newFilterId}, this.getRepositories)
  }

  renderLanguagesList = () => {
    const {activelanguageFilterId} = this.state
    return (
      <ul>
        {languageFiltersData.map(eachData => (
          <LanguageFilterItem
            key={eachData.id}
            languageDetails={eachData}
            setActiveLanguageFilterId={this.setActiveLanguageFilterId}
            isActive={activelanguageFilterId === eachData.id}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div>
        <div>
          <h1>Popular</h1>
          {this.renderLanguagesList()}
          {this.renderRepository()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRespos
