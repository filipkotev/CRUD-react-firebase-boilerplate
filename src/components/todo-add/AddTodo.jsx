import React from 'react';
import './add-todo.css';
import { addDoc, serverTimestamp } from "firebase/firestore";
import { todosCollectionRef } from '../../firebase'

function AddTodo() {

  /**
   * Add new todo
   */
   const addTodo = (e) => {
    e.preventDefault();
    const form = e.target

    //We have to pass collection reference and a todo matching the db format we have set in firebase
    addDoc(todosCollectionRef, {
      todo: form.text.value,
      createdAt: serverTimestamp()
    })
    .then(() => form.reset())
    .catch(err => console.error(err));

  }

  return (
    <div className="centered">
    <h3>Add another todo</h3>
    <form onSubmit={addTodo}>
      <input type="text" name="text" required/>
      <input type="submit"/>
    </form>
  </div>
  )
}

export default AddTodo