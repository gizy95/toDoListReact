import { useState, useEffect } from 'react'
import { storeTodoList, getRandomId } from "../../utils";

export default function Form() {

  const [inputValue, setInputValue] = useState('');
  // Set initial list to be either from localstorage or empty arry
  const [toDoList, setToDoList] = useState(
    JSON.parse(localStorage.getItem('toDo')) || []
  );

  const getInputValue = event =>
  setInputValue(event.target.value);

    const handleSubmit = event => {
      event.preventDefault();
      const newTask = {
        id: getRandomId(),
        title: inputValue,
        isChecked: false
      };
      setToDoList(prevToDoList => [...prevToDoList, newTask]);
      // Remove the input value
      setInputValue('');
    };

    // Store data when toDolist has been successfully updated
    useEffect(() => {
      storeTodoList(toDoList);
    }, [toDoList]);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
          <input
           onChange={getInputValue}
           name="title"
           type="text"
           value={inputValue}
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