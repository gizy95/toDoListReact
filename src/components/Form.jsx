import { useState, useEffect } from 'react'
import { storeTodoList, getRandomId } from "../../utils";

export default function Form() {
  const [toDoList, setToDoList] = useState(
    JSON.parse(localStorage.getItem('todo')) || []
  );

  const [task, setTask] = useState({
    id: '',
    title: '',
    isChecked: false
  });

  // Store todo list when update happens
  useEffect(() => {
    storeTodoList(toDoList);
  }, [toDoList]);

  const getTask = event => {
    setTask({
      ...task,
      id:getRandomId(),
      [event.target.name]: event.target.value
    });
  }

  const handleSubmit = event => {
    event.preventDefault();
    // Making sure that toDoList and localStorage are always the same
    const latestToDoList = JSON.parse(localStorage.getItem('todo')) || [];
    setToDoList([...latestToDoList, task]);
    // Reset task everytime submits
    setTask({id: '', title: '', isChecked:false});
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
          <input
           onChange={getTask}
           name="title"
           type="text"
           // Reset the input field
           value={task.title}
           placeholder="Add a new task"
           id="input"/>

        <button id="add">Add</button>
        <button id="cancel">Cancel</button>
      </form>
      <ul>

      </ul>    
    </div>
  )
}