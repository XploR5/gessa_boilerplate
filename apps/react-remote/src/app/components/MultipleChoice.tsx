import React, { useState } from 'react'

const MultipleChoice = () => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [question, setQuestion] = useState('What is your favorite color?')
  const [options, setOptions] = useState(['Red', 'Green', 'Blue'])

  const handleEditClick = () => {
    setIsEditMode(!isEditMode)
  }

  const handleQuestionChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setQuestion(event.target.value)
  }

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newOptions = [...options]
    newOptions[index] = event.target.value
    setOptions(newOptions)
  }

  const handleAddOptionClick = () => {
    setOptions([...options, ''])
  }

  const handleRemoveOptionClick = (index: number) => {
    const newOptions = [...options]
    newOptions.splice(index, 1)
    setOptions(newOptions)
  }

  return (
    <div>
      <h2>{question}</h2>
      {isEditMode ? (
        <>
          <input type='text' value={question} onChange={handleQuestionChange} />
          {options.map((option, index) => (
            <div key={index}>
              <input
                type='text'
                value={option}
                onChange={(event) => handleOptionChange(event, index)}
              />
              <button onClick={() => handleRemoveOptionClick(index)}>
                Remove
              </button>
            </div>
          ))}
          <button onClick={handleAddOptionClick}>Add Option</button>
        </>
      ) : (
        <ul>
          {options.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
      )}
      <button onClick={handleEditClick}>{isEditMode ? 'Save' : 'Edit'}</button>
    </div>
  )
}

export default MultipleChoice