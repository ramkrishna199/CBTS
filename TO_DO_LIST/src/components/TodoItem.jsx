import React from 'react'
import { useTodo } from '../context'
import { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from "@mui/material/Button";

function TodoItem({todo}) {
    const [istodoEditable,setIstodoeditable] = useState(false)
    const [todomsg,setTodomsg]=useState(todo.todo)
    const {updateTodo,toggleCompleted,deleteTodo}=useTodo()

    const editTodo=()=>{
        updateTodo((todo.id,{...todo,todo:todomsg}))
        setIstodoeditable(false)
    }
    const toggleComplete=()=>{
        toggleCompleted(todo.id)
        console.log(todo.id);
    }
  return (
    <>
    <div>
        <input type="checkbox"
        checked={todo.completed}
        onChange={toggleComplete}
        />
        <input 
        type="text"
        value={todomsg}
        onChange={(e)=>setTodomsg(e.target.value)}
        readOnly={!istodoEditable}
        />
        
        <Button
        id='button_left'
        variant="contained"
        onClick={()=>{
            if(todo.completed)return;
            if(istodoEditable){
                editTodo();
            }else setIstodoeditable((prv)=>!prv)
        }}
        disabled={todo.completed}
        >{istodoEditable?"save":<EditIcon/>}</Button>
        <Button
        variant="contained"
        color="error"
        onClick={()=>deleteTodo(todo.id)}
        ><DeleteForeverIcon/></Button>
    </div>
    </>
  )
}

export default TodoItem