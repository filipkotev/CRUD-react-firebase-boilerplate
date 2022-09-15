import React from 'react'
import './todo.css'
import Button from '@mui/material/Button';

import { deleteDoc, doc } from "firebase/firestore";
import { db } from '../../firebase'

function Todo({todo, id}) {
  /**
   * Delete todo
   */
  const deleteTodo = (e) => {
    const todoId = e.target.previousSibling.querySelector('input').id;
    // First we have to store id of the document we want to delete
    const docRef = doc(db, 'todos', todoId)

    // Delete that document
    deleteDoc(docRef)
      .then(() => console.log('Todo deleted'))
      .catch(err => console.log(err));
  }

  return (
    <span className="todo centered" key={id}>
    <span>
      <input type="checkbox" id={id} />
      <label htmlFor={id}>{todo}</label>
    </span>
    {/* <button className="todo-delete" onClick={deleteTodo} >Delete</button> */}
    <Button variant="text" onClick={deleteTodo}>Delete</Button>
  </span>
  )
}

export default Todo