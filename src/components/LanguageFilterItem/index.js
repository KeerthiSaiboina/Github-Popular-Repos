// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, setActiveLanguageFilterId, isActive} = props
  const {id, language} = languageDetails
  const onClickLanguage = () => {
    setActiveLanguageFilterId(id)
  }
  return (
    <li>
      <button type="button" onClick={onClickLanguage}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
