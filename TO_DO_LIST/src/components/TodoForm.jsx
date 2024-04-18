import React from "react";
import { useState } from "react";
import { useTodo } from "../context";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();

    if (!todo) return;

    addTodo({
      todo,
      completed: false,
    });
    setTodo("");
  };
  return (
    <div>
      <form className="flex" onSubmit={add}>
        <input
          type="text"
          placeholder="Add Todos...."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <Button variant="contained" color="success" type="submit">
          <AddIcon/>
        </Button>
      </form>
    </div>
  );
}

export default TodoForm;
