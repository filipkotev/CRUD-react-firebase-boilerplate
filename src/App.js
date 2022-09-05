import { getDocs } from "firebase/firestore";
import { useEffect,useState } from "react";

import { todosCollectionRef } from './firebase'

import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

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

  return (
    <div className="app">
      {todos.map(({ todo, id }) => (
        <span className="todo centered" key={id}>
          <input type="checkbox" id={id} />
          <label htmlFor={id}>{todo}</label>
        </span>
      ))}

      <div className="centered">
        <h3>Add another todo</h3>
        <form>
          <input type="text" />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}

export default App;
