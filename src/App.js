import {  getDocs,
          onSnapshot,
          query,
          orderBy
        } from "firebase/firestore";
import { useEffect,useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import { db, todosCollectionRef } from './firebase'

import Todo from './components/todo/Todo'
import './App.css';
import AddTodo from "./components/todo-add/AddTodo";
import Login from "./components/login-logout/Login";

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

  return (
    <div className="app">
      <nav>
        <Link to="/" className="navigation--logo">Logo</Link>
        <div className="navigation--links">
          <Link to="/add-todo">Add ToDo</Link>
          <Link to="/login">Log in</Link>
          <Link to="/">Log out</Link>
        </div>
      </nav>
      {todos.map(({ todo, id }) => (
          <Todo todo={todo} id={id} />
        ))}

      <Routes>
        <Route path="/" />
        <Route path="/add-todo" element={<AddTodo />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
