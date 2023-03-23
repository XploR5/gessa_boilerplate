import React, { useState } from 'react'

const SingleCorrect = () => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [question, setQuestion] = useState('What is the capital of France?')
  const [options, setOptions] = useState([
    { id: 1, text: 'Paris', isCorrect: true },
    { id: 2, text: 'Rome', isCorrect: false },
    { id: 3, text: 'Berlin', isCorrect: false },
    { id: 4, text: 'Madrid', isCorrect: false },
  ])

  const handleEditClick = () => {
    setIsEditMode(!isEditMode)
  }

  const handleQuestionChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setQuestion(event.target.value)
  }

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newOptions = [...options]
    newOptions[index].text = event.target.value
    setOptions(newOptions)
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newOptions = [...options]
    newOptions.forEach((option) => (option.isCorrect = false))
    newOptions[index].isCorrect = event.target.checked
    setOptions(newOptions)
  }

  const handleAddOptionClick = () => {
    const newId = options.length + 1
    setOptions([...options, { id: newId, text: '', isCorrect: false }])
  }

  const handleRemoveOptionClick = (index: number) => {
    const newOptions = [...options]
    newOptions.splice(index, 1)
    setOptions(newOptions)
  }

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    const correctOption = options.find((option) => option.isCorrect)
    setIsEditMode(false)
  }

  return (
    <div>
      <h2>{question}</h2>
      {isEditMode ? (
        <form onSubmit={handleSubmit}>
          <input type='text' value={question} onChange={handleQuestionChange} />
          {options.map((option, index) => (
            <div key={option.id}>
              <label>
                <input
                  type='checkbox'
                  checked={option.isCorrect}
                  onChange={(event) => handleCheckboxChange(event, index)}
                />
                <input
                  type='text'
                  value={option.text}
                  onChange={(event) => handleOptionChange(event, index)}
                />
              </label>
              <button onClick={() => handleRemoveOptionClick(index)}>
                Remove
              </button>
            </div>
          ))}
          <button onClick={handleAddOptionClick}>Add Option</button>
          <button type='submit'>Submit</button>
        </form>
      ) : (
        <ul>
          {options.map((option) => (
            <li key={option.id}>{option.text}</li>
          ))}
        </ul>
      )}
      <button onClick={handleEditClick}>{isEditMode ? 'Save' : 'Edit'}</button>
    </div>
  )
}

export default SingleCorrect