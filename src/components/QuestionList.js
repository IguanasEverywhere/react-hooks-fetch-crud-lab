import React from "react";
import QuestionItem from './QuestionItem';

function QuestionList({ questions, onDelete, onPatch }) {

  const questionsToDisplay = questions.map((question) => <QuestionItem key={question.id} question={question} onDelete={onDelete} onPatch={onPatch}/>)

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionsToDisplay}</ul>
    </section>
  );
}

export default QuestionList;
