import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(r => r.json())
      .then(questions => setQuestions(questions))
  }, [])

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
    setPage('List')
  }

  function handleDeleteQuestion(deletedQuestion) {
    let filteredQuestions = questions.filter((question) => question.id !== deletedQuestion.id);
    setQuestions(filteredQuestions);
  }

  function handlePatch(patchedObj) {
    const updatedQuestions = questions.map((question) => {
      if (question.id === patchedObj.id) {
        return patchedObj
      } else {
        return question
      }
    });
    setQuestions(updatedQuestions);

  }

  console.log(questions)


  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAdd={handleAddQuestion} /> : <QuestionList
        questions={questions}
        onDelete={handleDeleteQuestion}
        onPatch={handlePatch}
      />}
    </main>
  );
}

export default App;
