import React from "react";

function QuestionItem({ question, onDelete, onPatch }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteClick() {
    console.log(question)
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: 'DELETE'
    })
    .then(r => r.json())
    .then(deletedItem => onDelete(question))
  }

  function handleSelectChange(e) {
    // console.log(e.target.value)
    // console.log(id)
    const changedQuestionObj = {
      ...question,
      correctIndex: parseInt(e.target.value),
    }
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type' : 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(changedQuestionObj)
    })
    .then(r => r.json())
    .then(patchedObj => onPatch(patchedObj))

  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleSelectChange} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
