import { useState, useEffect } from "react";
import { storeTodoList, getRandomId } from "../../utils";
import ListItems from "./ListItems";

export default function Form() {
  /* State */
  const [idToUpdate, setIdToUpdate] = useState("");
  const [inputValue, setInputValue] = useState('');
  const [toDoList, setToDoList] = useState(
    () => JSON.parse(localStorage.getItem("todo")) || []
  );
  const [btnText, setBtnText] = useState("Add");

  // Store todo list when update happens
  useEffect(() => {
    storeTodoList(toDoList);
    if(toDoList.length===0) {
      setBtnText("Add");
      setInputValue("");
    }
  }, [toDoList]);

  const getInputValue = (event) => {
    // This way time lag of state is solved
    const newInputValue = event.target.value;
    setInputValue(newInputValue);
  };

  const getUpdateItem = (id) => {
    const itemToBeUpdated = toDoList.find((item) => item.id === id);
    if (itemToBeUpdated) {
      setBtnText("Edit");
      setIdToUpdate(id);
      setInputValue(itemToBeUpdated.title);
    } 
  };

  const editItems = () => {
    const updatedToDoList = toDoList.map((item) =>
      item.id === idToUpdate ? { ...item, title: inputValue } : item
    );
    setToDoList(updatedToDoList);
    setInputValue("");
    setBtnText("Add");
  };

  const handleCancel = () => {
    setBtnText("Cancel");
  }

  const submitTask = () => {
      // Making sure that toDoList and localStorage are always the same
      const latestToDoList = JSON.parse(localStorage.getItem("todo")) || [];
      const task = {
        id:getRandomId(),
        title:inputValue,
        isChecked:false
      }
      setToDoList([...latestToDoList, task]);
      // Reset input everytime submits
      setInputValue("")
  }

  const handleSubmit = (event) => {
    console.log(btnText);
    if (btnText === "Edit") {
      event.preventDefault();
      editItems();
    } else if (btnText === "Add") {
      event.preventDefault();
      submitTask();
    } else {
      // Cancell
      event.preventDefault();
      setInputValue("");
      setBtnText("Add");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          onChange={getInputValue}
          name="title"
          type="text"
          // Reset the input field
          value={inputValue}
          placeholder="Add a new task"
          id="input"
        />

        <button id="add" disabled={!inputValue}> {btnText}</button>
        <button
          id="cancel"
          style={{
             display: btnText === "Edit"
              ? "inline-block"
              : null }}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
      <ListItems
        toDoList={toDoList}
        setToDoList={setToDoList}
        getUpdateItem={getUpdateItem}
      />
    </div>
  );
}
