import "./App.css";
import { TodoProvider } from "./context";
import { useState } from "react";
import { useEffect } from "react";
import { TodoForm } from "./components/index";
import TodoItem from "./components/TodoItem";

function App() {
  let timE = new Date();
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [...prev, { id: Date.now(), ...todo }]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevtodo) => (prevtodo.id === id ? todo : prevtodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleCompleted = (id) => {
    setTodos((prev) =>
      prev.map((prevtoto) =>
        prevtoto.id === id
          ? { ...prevtoto, completed: !prevtoto.completed,
             time: prevtoto.time = timE.toLocaleTimeString() }
          : prevtoto
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);



  

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleCompleted }}
    >
      <div className="container">
      <h1>TO DO LIST</h1>
      <div>
        <TodoForm />
      </div>
      {todos.map((todo) => (
          <TodoItem todo={todo} key={todo.id} />
      ))}

      <section id="complete">
        <div >
          <h2>Uncomplete Todos</h2>
        <div className="complete-left">
          {
            todos.map((todo)=>(
              <p key={todo.id}>{!todo.completed?todo.todo:""}</p>
            ))
          }
          </div>
          </div>

          <div>
          <h2>Complete Todos</h2>
          <div className="complete-right">
          {
            todos.map((todo)=>(
              <p key={todo.id}>{todo.completed?`${todo.todo} Completed at: ${todo.time}`:""}</p>
            ))
          }
          </div>
        </div>
      </section>
      
      </div>
    </TodoProvider>
  );
}

export default App;
