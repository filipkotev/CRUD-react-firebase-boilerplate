import {  getDocs,
          addDoc,
          deleteDoc,
          doc,
          onSnapshot,
          query,
          serverTimestamp,
          orderBy
        } from "firebase/firestore";
import { useEffect,useState } from "react";

import { db, todosCollectionRef } from './firebase'

import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

  /**
   * Firebase Queries
   */
  // orderBy has 'asc' by default, therefore we can skip passing it as argument
  const q = query(todosCollectionRef, orderBy('createdAt', 'asc'));

  /**
   * Fetch all todos in initial load of the app
   */
  useEffect(() => {
    const getTodos = async () => {
      const data = await getDocs(todosCollectionRef);
      setTodos(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }

    // const getTodosPromise = () => {
    //   getDocs(todosCollectionRef)
    //     .then(data => {
    //       setTodos(data.docs.map(doc => ({...doc.data(), id: doc.id})));
    //     })
    //     .catch(err => console.log(err))
    // }
    // getTodosPromise();
    getTodos();
  }, []);

  /**
   * Real time listener to get a real time data / SUBSCRIPTION TO A DB /
   */
  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setTodos(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})));
    })
  }, [])

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
    .catch(err => console.log(err));

  }

  /**
   * Delete todo
   */
  const deleteTodo = (e) => {
    const todoId = e.target.previousSibling.querySelector('input').id;
    // First we have to store id of the document we want to delete
    const docRef = doc(db, 'todos', todoId)

    // Delete that document
    deleteDoc(docRef)
      .then(() => alert('Todo deleted'))
      .catch(err => console.log(err));
    
  }

  return (
    <div className="app">
      {todos.map(({ todo, id }) => (
        <span className="todo centered" key={id}>
          <span>
            <input type="checkbox" id={id} />
            <label htmlFor={id}>{todo}</label>
          </span>
          <button className="todo-delete" onClick={deleteTodo} >Delete</button>
        </span>
      ))}

      <div className="centered">
        <h3>Add another todo</h3>
        <form onSubmit={addTodo}>
          <input type="text" name="text" required/>
          <input type="submit"/>
        </form>
      </div>
    </div>
  );
}

export default App;
