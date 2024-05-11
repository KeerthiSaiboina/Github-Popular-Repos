// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoriesDetails} = props
  const {id, issuesCount, forksCount, starsCount, avatarUrl, name} =
    repositoriesDetails

  return (
    <li>
      <img src={avatarUrl} alt={name} />
      <h1>{name}</h1>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p>{starsCount} stars</p>
      </div>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p>{forksCount} forks</p>
      </div>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open"
        />
        <p>{issuesCount} open issues </p>
      </div>
    </li>
  )
}

export default RepositoryItem
