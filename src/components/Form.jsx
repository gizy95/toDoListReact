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
  const [task, setTask] = useState({
    id: "",
    title: "",
    isChecked: false,
  });
  const [btnText, setBtnText] = useState("Add");

  // Store todo list when update happens
  useEffect(() => {
    storeTodoList(toDoList);
  }, [toDoList]);

  const getTask = (event) => {
    // This way time lag of state is solved
    const newInputValue = event.target.value;
    setInputValue(newInputValue);
    setTask({
      ...task,
      id: getRandomId(),
      title:newInputValue
    });
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
    setBtnText("Add");
    setInputValue("");
  };

  const submitTask = () => {
      // Making sure that toDoList and localStorage are always the same
      const latestToDoList = JSON.parse(localStorage.getItem("todo")) || [];
      setToDoList([...latestToDoList, task]);
      // Reset task everytime submits
      setTask({ id: "", title: "", isChecked: false });
      setInputValue("")
  }

  const handleSubmit = (event) => {
    if (btnText === "Edit") {
      event.preventDefault();
      editItems();
    } else {
      event.preventDefault();
      submitTask();
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          onChange={getTask}
          name="title"
          type="text"
          // Reset the input field
          value={inputValue}
          placeholder="Add a new task"
          id="input"
        />

        <button id="add"> {btnText}</button>
        <button
          id="cancel"
          style={{ display: btnText === "Edit" ? "inline-block" : null }}
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
